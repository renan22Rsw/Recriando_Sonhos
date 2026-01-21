"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import { MobileNavbar } from "./mobile-navbar";
import { DesktopNavbar } from "./desktop-navbar";

export const NavBar = () => {
  const isMobile = useIsMobile();

  return isMobile ? <MobileNavbar /> : <DesktopNavbar />;
};
