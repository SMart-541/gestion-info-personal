import { SidebarLink } from "@/components/SidebarItems";
import { LogOut, HomeIcon } from "lucide-react";

type AdditionalLinks = {
  title: string;
  links: SidebarLink[];
};

export const defaultLinks: SidebarLink[] = [
  { href: "/dashboard", title: "Home", icon: HomeIcon },
  { href: "/sign-out", title: "Sign Out", icon: LogOut },
];

export const additionalLinks: AdditionalLinks[] = [];
