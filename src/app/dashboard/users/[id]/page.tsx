import { redirect } from "next/navigation";
import AdminForm from "~/app/components/AdminForm";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import PageWrapper from "~/app/components/PageWrapper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const AdminDetails = async ({ params }: { params: { id: string } }) => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const user = await api.user.get(params.id);

  if (!user) {
    redirect("/dashboard/admin");
  }

  const links = [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Userse",
      url: "/dashboard/users",
    },
    {
      title: user.name || "Users",
      url: `/dashboard/users/${user.id}`,
    },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />
      <AdminForm user={user} />
    </PageWrapper>
  );
};

export default AdminDetails;
