/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { DonationStatus } from "@prisma/client";
import { type NextRequest, NextResponse } from "next/server";
import { env } from "~/env";
import { db } from "~/server/db";
import { headers } from "next/headers";
import moment from "moment";

export async function POST(req: NextRequest) {
  const headerList = headers();
  const callbackToken = headerList.get("X-CALLBACK-TOKEN");
  if (callbackToken !== env.XENDIT_WEBHOOK_TOKEN) {
    return NextResponse.json({
      status: 401,
      body: {
        message: "Unauthorized",
      },
    });
  }

  const data = await req.json().catch(() => null);

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  const externalId = String(data?.external_id);
  const status = String(data?.status).toUpperCase() as DonationStatus;
  const paidAt = String(data?.paid_at);
  const paymentMethod = String(data?.payment_method);

  if (!externalId || !status) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "Invalid request",
      },
    });
  }

  if (!["PAID", "EXPIRED"].includes(status)) {
    return NextResponse.json({
      status: 400,
      body: {
        message: "Invalid status",
      },
    });
  }

  const donation = await db.donation.findUnique({
    where: {
      id: externalId,
    },
  });

  if (donation) {
    await db.donation.update({
      where: {
        id: externalId,
      },
      data: {
        status,

        paidAt: status === "PAID" ? moment(paidAt).toDate() : null,
        paymentMethod: status === "PAID" ? paymentMethod : null,
      },
    });
  }

  return NextResponse.json({
    status: 200,
    body: {
      message: "Success",
    },
  });
}
