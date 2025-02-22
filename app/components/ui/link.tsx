import type { AnchorHTMLAttributes } from "react";

import NextLink from "next/link";
import type { LinkProps as NextLinkProps } from "next/link";

type LinkProps = NextLinkProps & AnchorHTMLAttributes<HTMLAnchorElement>;

export const Link = (props: LinkProps) => {
  return <NextLink prefetch={false} {...props} />;
};
