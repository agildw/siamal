"use client";
import { Menu, MenuItem } from "@mui/material";
import type { User } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { handleTruncate } from "../utils/util";
import { signOut } from "next-auth/react";

const Navbar = ({ user }: { user?: User }) => {
  const router = useRouter();
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  return (
    <nav className="border-gray-200 bg-white ">
      <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4">
        <Link
          href="/"
          className="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Image
            src={"/logo.png"}
            alt="logo"
            width={40}
            height={40}
            className="rounded-lg"
          />
          <span className="self-center whitespace-nowrap text-2xl font-semibold text-gray-700">
            Siamal
          </span>
        </Link>
        <div className="flex items-center space-x-6 rtl:space-x-reverse">
          {!user && (
            <>
              <Link
                href="/api/auth/signin"
                className="text-sm text-gray-600  hover:underline"
              >
                Login
              </Link>
              <button
                type="button"
                className="rounded-lg bg-blue-700 px-4 py-2 text-sm font-medium text-white hover:bg-blue-800"
                onClick={() => router.push("/campaigns")}
              >
                Donasi
              </button>
            </>
          )}
          {user && (
            <>
              <div
                className="flex cursor-pointer flex-row items-center justify-center space-x-3 rounded-lg  p-2 px-3"
                onClick={handleOpenUserMenu}
              >
                <Image
                  src={user.image ?? "/profile.png"}
                  alt="logo"
                  width={30}
                  height={15}
                  className="rounded-full"
                />
                <div className="hidden flex-col sm:flex">
                  <p className="text-sm">{handleTruncate(user.name, 20)}</p>
                </div>
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
                    router.push("/donations");
                    handleCloseUserMenu();
                  }}
                >
                  Riwayat Donasi
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    void signOut();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
