import { Link } from "@remix-run/react";

export function HeaderLogo() {
  return (
    <Link to="/">
      <div className="hidden lg:flex lg:items-center">
        <img src="/logo.svg" alt="Logo" height={28} width={28} />
        <p className="font-semibold text-white text-2xl ml-2">Logo</p>
      </div>
    </Link>
  );
}
