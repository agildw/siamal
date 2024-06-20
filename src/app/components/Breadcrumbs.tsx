"use client";
import { Breadcrumbs as MUIBreadcrumbs } from "@mui/material";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface BreadcrumbsProps {
  links: {
    title: string;
    url: string;
  }[];
}

const Breadcrumbs = ({ links }: BreadcrumbsProps) => {
  const pathName = usePathname();

  return (
    <MUIBreadcrumbs>
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.url}
          passHref
          scroll={false}
          className={pathName === link.url ? "text-blue-500" : "text-gray-400"}
        >
          {link.title}
        </Link>
      ))}
    </MUIBreadcrumbs>
  );
};

export default Breadcrumbs;
