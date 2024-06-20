import {
  Button,
  Divider,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import moment from "moment";
import Link from "next/link";
import { redirect } from "next/navigation";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import PageWrapper from "~/app/components/PageWrapper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const Administrators = async () => {
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
      title: "Admin",
      url: "/dashboard/admin",
    },
  ];

  const users = await api.user.getAll();

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />
      <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Admin</p>
          <Link href="/dashboard/admin/create" passHref>
            <Button
              variant="contained"
              color="primary"
              className="rounded-lg"
              sx={{ borderRadius: "0.5rem" }}
            >
              Create Admin
            </Button>
          </Link>
        </div>
        <Divider />
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Username</TableCell>
                <TableCell>Name</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    {moment(user.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/admin/${user.id}`}>
                      <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        sx={{ borderRadius: "0.5rem" }}
                      >
                        Manage
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </PageWrapper>
  );
};

export default Administrators;
