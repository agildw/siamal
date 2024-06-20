import type { Campaign, Donation } from "@prisma/client";

export type CampaignWithDonations = Campaign & {
  donations: Donation[];
};
