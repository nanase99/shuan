import { Link as RemixLink } from "@remix-run/react";
import { type ReactNode, forwardRef } from "react";

export type LinkProps = {
  href: string;
  children: ReactNode;
};

export const Link = forwardRef<HTMLAnchorElement, LinkProps>(function Link(
  { href, ...otherProps },
  ref,
) {
  return <RemixLink ref={ref} to={href} {...otherProps} />;
});
