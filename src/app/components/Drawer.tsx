"use client";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import {
  Squares2X2Icon,
  GlobeAmericasIcon,
  UserCircleIcon,
} from "@heroicons/react/24/solid";
import { useTheme } from "@mui/material/styles";
import MUIDrawer from "@mui/material/Drawer";

import { useAtom } from "jotai";
import { drawerAtom } from "../utils/atoms";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface DrawerItemsProps {
  title: string;
  icon: JSX.Element;
  url: string;
}

const navItems = [
  {
    title: "Dashboard",
    icon: <Squares2X2Icon className="text-inherit" />,
    url: "/dashboard",
  },
  {
    title: "Kampanye",
    icon: <GlobeAmericasIcon className="text-inherit" />,
    url: "/dashboard/campaigns",
  },
  {
    title: "Pengguna",
    icon: <UserCircleIcon className="text-inherit" />,
    url: "/dashboard/users",
  },
];

const DrawerItems = ({ title, icon, url }: DrawerItemsProps) => {
  const pathname = usePathname();
  return (
    <Link href={url} passHref>
      <ListItem
        disablePadding
        // className="rounded-lg text-gray-400 hover:text-blue-500"
        className={`rounded-lg ${
          pathname === url ? "bg-blue-100 text-blue-500" : "text-gray-400"
        } hover:text-blue-500
          `}
      >
        <ListItemButton sx={{ borderRadius: 2 }}>
          <ListItemIcon
            sx={{
              height: 28,
              width: 28,
              color: "inherit",
            }}
          >
            {icon}
          </ListItemIcon>
          <ListItemText
            primary={title}
            primaryTypographyProps={{ variant: "body1" }}
          />
        </ListItemButton>
      </ListItem>
    </Link>
  );
};

const Drawer = ({ drawerWidth }: { drawerWidth: number }) => {
  const theme = useTheme();
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const isMobile = useMediaQuery(theme.breakpoints.down("lg"));

  return (
    <MUIDrawer
      PaperProps={{
        sx: {
          // backgroundColor: "#1e1e1e",
          backgroundColor: "white",
          // shadow effect
          boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
          height: "100vh",
        },
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
      open={(isMobile && drawer) || !isMobile}
      onClose={() => setDrawer(false)}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      // hideBackdrop={!isMobile}
      variant={isMobile ? "temporary" : "permanent"}
      anchor="left"
    >
      <List
        sx={{
          p: 4,
          justifyContent: "center",
          height: "100vw",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div className="mb-16 flex flex-row space-x-4">
          <Image
            src="/logo.png"
            alt="logo"
            width={50}
            height={50}
            className="rounded-lg"
          />
          <div className="flex w-full w-full flex-col space-y-1">
            <p className="text-xl font-semibold text-gray-600">Siamal</p>
            <p className="text-sm text-gray-400">Dashboard</p>
          </div>
        </div>
        {/* <DrawerItems title="Dasboard" icon={<BeakerIcon />} /> */}
        <div className="flex grow flex-col gap-2">
          {navItems.map((item, index) => (
            <DrawerItems
              key={index}
              title={item.title}
              icon={item.icon}
              url={item.url}
            />
          ))}
        </div>
        {/* <Button
          variant="contained"
          sx={{
            backgroundColor: "#3b82f6",
          }}
          className="rounded-lg bg-blue-300"
        >
          Logout
        </Button> */}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
