/* eslint-disable @next/next/no-img-element */
"use client";

import {
  AppBar as MUIAppBar,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
// import AccountAppBar from "./AccountAppBar";
import { Squares2X2Icon, ChevronDownIcon } from "@heroicons/react/24/solid";
import { drawerAtom } from "../utils/atoms";
import { useState } from "react";
import Image from "next/image";
import type { User } from "next-auth";
import { signOut } from "next-auth/react";

interface AppBarProps {
  drawerWidth: number;
  user: User;
}

const AppBar = ({ drawerWidth, user }: AppBarProps) => {
  const theme = useTheme();
  const router = useRouter();
  // if width is less than 600px, then responsiveWidth = 0
  const responsiveWidth = useMediaQuery(theme.breakpoints.down("xl"))
    ? 0
    : drawerWidth;

  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const [drawer, setDrawer] = useAtom(drawerAtom);

  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <div>
      <MUIAppBar
        position="sticky"
        sx={{
          width: `calc(100% - ${responsiveWidth}px)`,
          ml: `${responsiveWidth}px`,
          backgroundColor: "white",
          //   backgroundColor: "#1e1e1e",
          p: {
            sx: 0,
            md: 1,
          },
        }}
        elevation={0}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            // cursor: "pointer",
          }}
          className="text-gray-600"
        >
          {/* <Link href="/" passHref scroll={false} shallow> */}
          <div
            onClick={() => {
              if (isMobile) {
                setDrawer(!drawer);
              } else {
                router.push("/");
              }
            }}
            className="flex cursor-pointer flex-row space-x-3"
          >
            <Squares2X2Icon className="h-8 w-8 fill-current text-blue-500" />
          </div>
          <div>
            <div
              className="flex cursor-pointer flex-row items-center justify-center space-x-3 rounded-lg  p-2 px-3"
              onClick={handleOpenUserMenu}
            >
              <Image
                src="/profile.png"
                alt="logo"
                width={35}
                height={15}
                className="rounded-lg"
              />
              <div className="hidden flex-col sm:flex">
                <p className="text-sm font-semibold">{user.name}</p>
                <p className="text-xs ">{user.username}</p>
              </div>
              <ChevronDownIcon className="hidden h-4 w-4 fill-current text-gray-500 sm:block" />
            </div>
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                onClick={() => {
                  router.push(`/dashboard/admin/${user.id}`);
                  handleCloseUserMenu();
                }}
              >
                Profile
              </MenuItem>

              <MenuItem
                onClick={() => {
                  void signOut();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </div>
          {/* <AccountAppBar /> */}
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default AppBar;
