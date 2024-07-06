import {
  Button,
  Chip,
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

const RoleChip = ({ role }: { role: string }) => {
  return (
    <Chip
      label={role}
      sx={{
        color: role === "ADMIN" ? "#f87171" : "#3b82f6",
        backgroundColor: role === "ADMIN" ? "#fee2e2" : "#dbeafe",
        width: "fit-content",
      }}
    />
  );
};

const Users = async () => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  const links = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Users",
      url: "/dashboard/users",
    },
  ];

  const users = await api.user.getAll();

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />
      <div className="mt-4 flex flex-col space-y-4 rounded-lg bg-white p-4 text-gray-600">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xl font-bold">Users</p>
          <Link href="/dashboard/admin/create" passHref>
            <Button
              variant="contained"
              color="primary"
              className="rounded-lg"
              sx={{ borderRadius: "0.5rem" }}
            >
              Create User
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
                <TableCell>Role</TableCell>
                <TableCell>Created At</TableCell>
                <TableCell></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>
                    <RoleChip role={user.role} />
                  </TableCell>
                  <TableCell>
                    {moment(user.createdAt).format("YYYY-MM-DD")}
                  </TableCell>
                  <TableCell>
                    <Link href={`/dashboard/users/${user.id}`}>
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

export default Users;
