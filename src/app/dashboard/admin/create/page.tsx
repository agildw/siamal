import { redirect } from "next/navigation";
import AdminForm from "~/app/components/AdminForm";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import PageWrapper from "~/app/components/PageWrapper";
import { getServerAuthSession } from "~/server/auth";

const CreateCampaign = async () => {
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
    {
      title: "Create Admin",
      url: "/dashboard/admin/create",
    },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />

      <AdminForm />
    </PageWrapper>
  );
};

export default CreateCampaign;
