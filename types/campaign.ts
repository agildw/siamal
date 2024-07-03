import type { Campaign, Donation, User } from "@prisma/client";

export interface DonationWithUser extends Donation {
  user: User;
}

export interface CampaignWithDonations extends Campaign {
  donations: DonationWithUser[];
}

export interface CampaignWithTotalDonations extends Campaign {
  totalFunds: number;
  totalDonations: number;
}
