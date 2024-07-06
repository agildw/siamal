import type { CampaignWithDonations } from "types/campaign";

export const handleAmount = (amount: number, digit = 1) => {
  // change thousands to k and millions to m
  if (amount >= 1000000) {
    return `${(amount / 1000000).toFixed(digit)}M`;
  }
  if (amount >= 1000) {
    return `${(amount / 1000).toFixed(digit)}K`;
  }
  return `${amount}`;
};

export const handleTruncate = (text: string, length: number) => {
  return text.length > length ? `${text.substring(0, length)}...` : text;
};

export const handleStatisticalAmount = (number: number) => {
  let roundedNumber;
  if (number < 50) {
    roundedNumber = Math.round(number / 10) * 10;
  } else {
    roundedNumber = Math.min(Math.round(number / 50) * 50, number);
  }

  if (roundedNumber >= 1000000) {
    return (roundedNumber / 1000000).toFixed(0) + "M";
  } else if (roundedNumber >= 1000) {
    return (roundedNumber / 1000).toFixed(0) + "K";
  } else {
    return roundedNumber.toString();
  }
};

export const calculateFunds = (campaign: CampaignWithDonations) => {
  return campaign.donations
    .filter((donation) => donation.status === "PAID")
    .reduce((acc, donation) => acc + donation.amount, 0);
};

export const countPaidDonations = (campaign: CampaignWithDonations) => {
  return campaign.donations.filter((donation) => donation.status === "PAID")
    .length;
};
