import type { Campaign, Donation, User } from "@prisma/client";

export interface DonationWithCampaign extends Donation {
  campaign: Pick<Campaign, "title" | "id">;
  user: Pick<User, "name" | "image">;
}
