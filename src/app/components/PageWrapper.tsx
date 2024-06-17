import AppBar from "./Appbar";
import Drawer from "./Drawer";

const PageWrapper = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-full min-h-screen">
      <AppBar drawerWidth={180} />
      <Drawer drawerWidth={300} />
      <div className={`p-5 xl:ml-80 xl:mr-20 xl:py-10`}>{children}</div>
    </div>
  );
};

export default PageWrapper;
