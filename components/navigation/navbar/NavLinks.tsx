"use client";
import { SheetClose } from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const NavLinks = ({ isMobileNav = false }: { isMobileNav?: boolean }) => {
  const pathName = usePathname();
  const userId = 1;
  return (
    <>
      {sidebarLinks.map((navlink) => {
        const isActive = (pathName.includes(navlink.route) && navlink.route.length > 1) || pathName === navlink.route;

        if (navlink.route === "/profile") {
          if (userId) navlink.route = `${navlink.route}/${userId}`;
          else return null;
        }

        const LinkComponent = (
          <Link
            href={navlink.route}
            key={navlink.label}
            className={cn(
              isActive ? "primary-gradient text-light-900 rounded-lg" : "text-dark300_light900",
              "justify-satart flex items-center gap-4 bg-transparent p-4"
            )}
          >
            <Image
              src={navlink.imgURL}
              alt={navlink.label}
              width={20}
              height={20}
              className={cn({ "invert-colors": !isActive })}
            />
            <p className={cn(isActive ? "base-bold" : "base-medium", !isMobileNav && "max-lg:hidden")}>
              {navlink.label}
            </p>
          </Link>
        );

        return isMobileNav ? (
          <SheetClose asChild key={navlink.route}>
            {LinkComponent}
          </SheetClose>
        ) : (
          <React.Fragment key={navlink.route}>{LinkComponent}</React.Fragment>
        );
      })}
    </>
  );
};

export default NavLinks;
