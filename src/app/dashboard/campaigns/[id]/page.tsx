import { redirect } from "next/navigation";
import Breadcrumbs from "~/app/components/Breadcrumbs";
import CampaignForm from "~/app/components/CampaignForm";
import PageWrapper from "~/app/components/PageWrapper";
import { getServerAuthSession } from "~/server/auth";
import { api } from "~/trpc/server";

const CampaignDetail = async ({ params }: { params: { id: string } }) => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }

  const campaign = await api.campaign.get(params.id);
  if (!campaign) {
    redirect("/dashboard/campaigns");
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
      title: campaign.title || "Campaign",
      url: `/dashboard/campaigns/${params.id}`,
    },
  ];

  return (
    <PageWrapper>
      <Breadcrumbs links={links} />
      <CampaignForm userId={session.user.id} campaign={campaign} />
    </PageWrapper>
  );
};

export default CampaignDetail;
