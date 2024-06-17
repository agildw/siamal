/* eslint-disable @next/next/no-img-element */
"use client";

import { AppBar as MUIAppBar, Toolbar, useMediaQuery } from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useAtom } from "jotai";
import { useRouter } from "next/navigation";
// import AccountAppBar from "./AccountAppBar";

import { drawerAtom } from "../utils/atoms";
import Image from "next/image";

const AppBar = ({ drawerWidth }: { drawerWidth: number }) => {
  const theme = useTheme();
  const router = useRouter();
  // if width is less than 600px, then responsiveWidth = 0
  const responsiveWidth = useMediaQuery(theme.breakpoints.down("xl"))
    ? 0
    : drawerWidth;

  const isMobile = useMediaQuery(theme.breakpoints.down("xl"));
  const [drawer, setDrawer] = useAtom(drawerAtom);

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
          >
            <p>siamal</p>
          </div>
          <div className="flex flex-row space-x-3 rounded-lg bg-gray-100 p-2 px-3">
            <Image
              src="/profile.png"
              alt="logo"
              width={35}
              height={15}
              className="rounded-lg"
            />
            <div className="flex flex-col">
              <p className="text-sm">Agil Yudistira</p>
              <p className="text-xs">@agil</p>
            </div>
          </div>
          {/* <AccountAppBar /> */}
        </Toolbar>
      </MUIAppBar>
    </div>
  );
};

export default AppBar;
