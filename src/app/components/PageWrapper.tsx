import { getServerAuthSession } from "~/server/auth";
import AppBar from "./Appbar";
import Drawer from "./Drawer";
import { redirect } from "next/navigation";

const PageWrapper = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerAuthSession();

  if (!session?.user) {
    redirect("/api/auth/signin");
  }
  return (
    <div className="h-full min-h-screen">
      <AppBar drawerWidth={180} user={session.user} />
      <Drawer drawerWidth={300} />
      <div className={`p-5 lg:ml-80 lg:mr-6 lg:py-10`}>{children}</div>
    </div>
  );
};

export default PageWrapper;
