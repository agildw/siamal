import { redirect } from "next/navigation";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import CampaignForm from "~/app/components/CampaignForm";
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
      title: "Campaigns",
      url: "/dashboard/campaigns",
    },
    {
      title: "Create Campaign",
      url: "/dashboard/campaigns/create",
    },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />

      <CampaignForm userId={session.user.id} />
    </PageWrapper>
  );
};

export default CreateCampaign;
