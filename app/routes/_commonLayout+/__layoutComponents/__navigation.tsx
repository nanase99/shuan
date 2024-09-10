import { NavButton } from "@/components/features/common/ui";
import { useLocation } from "@remix-run/react";

const ROUTES = [
  {
    href: "/",
    label: "Overview",
  },
  { href: "/subjects", label: "教科" },
  { href: "/timetable", label: "時間割" },
];

export function Navigation() {
  const { pathname } = useLocation();
  return (
    <div className="flex items-center gap-x-2">
      {ROUTES.map(({ href, label }) => (
        <NavButton
          key={href}
          href={href}
          label={label}
          isActive={pathname === href}
        />
      ))}
    </div>
  );
}
