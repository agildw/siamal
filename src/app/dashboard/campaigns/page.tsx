import { Button, Divider } from "@mui/material";
import Link from "next/link";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import PageWrapper from "~/app/components/PageWrapper";
import { api } from "~/trpc/server";
import { getServerAuthSession } from "~/server/auth";
import { redirect } from "next/navigation";
import CampaignCard from "~/app/components/CampaignCard";

const Campaigns = async () => {
  const session = await getServerAuthSession();
  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  const links = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Campaigns",
      url: "/dashboard/campaigns",
    },
  ];

  const campaigns = await api.campaign.getAllWithDonations();

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />
      <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Campaigns</p>

          <Link
            href="/dashboard/campaigns/create"
            passHref
            // className="flex justify-end"
          >
            <Button
              variant="contained"
              color="primary"
              className="rounded-lg"
              sx={{
                borderRadius: "0.5rem",
              }}
            >
              Create Campaign
            </Button>
          </Link>
        </div>
        <Divider />
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
          {campaigns.map((campaign) => (
            <Link
              key={campaign.id}
              href={`/dashboard/campaigns/${campaign.id}`}
            >
              <CampaignCard showStatus key={campaign.id} campaign={campaign} />
            </Link>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
};

export default Campaigns;
