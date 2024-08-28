import { Link } from "@remix-run/react";

export function HeaderLogo() {
  return (
    <Link to="/">
      <div className="hidden lg:flex lg:items-center">
        <p className="font-semibold text-white text-2xl ml-2">Logo</p>
      </div>
    </Link>
  );
}