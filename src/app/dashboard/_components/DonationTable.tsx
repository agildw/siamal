import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import type { Donation, Campaign } from "@prisma/client";
import moment from "moment";

type DonationWithCampaign = Donation & { campaign: Pick<Campaign, "title"> };

interface DontaionTableProps {
  donations: DonationWithCampaign[];
}

const DonationTable = ({ donations }: DontaionTableProps) => {
  return (
    <div className="flex flex-col space-y-2">
      <p className="text-xl font-bold text-gray-600">Recent Donations</p>
      <Table component={Paper}>
        <TableHead>
          <TableRow>
            <TableCell>Donor</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Campaign</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.length === 0 && (
            <TableRow>
              <TableCell colSpan={4}>No donations yet</TableCell>
            </TableRow>
          )}
          {donations.map((donation) => (
            <TableRow key={donation.id}>
              <TableCell>{donation.donorName}</TableCell>
              <TableCell>{donation.amount}</TableCell>
              <TableCell>{donation.campaign.title}</TableCell>
              <TableCell>
                {moment(donation.createdAt).format("MMM D, YYYY")}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default DonationTable;
