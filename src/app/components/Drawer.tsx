"use client";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { Squares2X2Icon, GlobeAmericasIcon } from "@heroicons/react/24/solid";
import { useTheme } from "@mui/material/styles";
import MUIDrawer from "@mui/material/Drawer";

import { useAtom } from "jotai";
import { drawerAtom } from "../utils/atoms";
import Image from "next/image";

interface DrawerItemsProps {
  title: string;
  icon: JSX.Element;
}

const navItems = [
  {
    title: "Dashboard",
    icon: <Squares2X2Icon className="text-inherit" />,
  },
  {
    title: "Campaigns",
    icon: <GlobeAmericasIcon className="text-inherit" />,
  },
];

const DrawerItems = ({ title, icon }: DrawerItemsProps) => {
  return (
    <ListItem
      disablePadding
      // sx={{
      //   color: "white",
      // }}
      className="rounded-lg text-gray-400 hover:text-blue-500"
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
  );
};

const Drawer = ({ drawerWidth }: { drawerWidth: number }) => {
  const theme = useTheme();
  const [drawer, setDrawer] = useAtom(drawerAtom);
  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));

  return (
    <MUIDrawer
      PaperProps={{
        sx: {
          // backgroundColor: "#1e1e1e",
          backgroundColor: "white",
          // shadow effect
          boxShadow: "0px 8px 8px rgba(0, 0, 0, 0.1)",
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
        }}
        className="space-y-4"
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
        {navItems.map((item, index) => (
          <DrawerItems key={index} title={item.title} icon={item.icon} />
        ))}
      </List>
    </MUIDrawer>
  );
};

export default Drawer;
