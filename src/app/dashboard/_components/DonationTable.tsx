"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
} from "@mui/material";
import type { Donation, Campaign } from "@prisma/client";
import moment from "moment";
import { useState } from "react";
import StatusChip from "~/app/components/StatusChip";
import { handleAmount } from "~/app/utils/util";

type DonationWithCampaign = Donation & { campaign: Pick<Campaign, "title"> };

interface DontaionTableProps {
  donations: DonationWithCampaign[];
}

const DonationTable = ({ donations }: DontaionTableProps) => {
  donations.sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  // const filteredDonations = donations.filter((donation) => {
  //   return donation.status === "PAID";
  // });

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - donations.length) : 0;

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  return (
    <div className="flex flex-col space-y-4 bg-white p-4">
      <p className="text-xl font-bold text-gray-600">Donasi Terkini</p>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Donatur</TableCell>
            <TableCell>Jumlah</TableCell>
            <TableCell>Kampanye</TableCell>
            <TableCell>Status</TableCell>
            <TableCell>Tanggal</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {donations.length === 0 && (
            <TableRow>
              <TableCell colSpan={5}>No donations yet</TableCell>
            </TableRow>
          )}
          {/* {donations.map((donation) => ( */}
          {donations
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map((donation) => (
              <TableRow key={donation.id}>
                <TableCell>{donation.donorName}</TableCell>
                <TableCell>Rp{handleAmount(donation.amount)}</TableCell>
                <TableCell className="max-w-[20px] truncate">
                  {donation.campaign.title}
                </TableCell>
                <TableCell>
                  <StatusChip status={donation.status} />
                </TableCell>
                <TableCell>
                  {moment(donation.createdAt).format("MMM D, YYYY")}
                </TableCell>
              </TableRow>
            ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={6} />
            </TableRow>
          )}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              count={donations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              colSpan={5}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
};

export default DonationTable;
