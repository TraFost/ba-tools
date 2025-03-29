import type { FC } from "react";
import { Link } from "components/ui/link";

interface Props {
  children?: React.ReactNode;
  text: string;
  href: string;
}

const AsideContent: FC<Props> = (props) => {
  const { children, text, href } = props;

  return (
    <Link
      href={href}
      className="hover:bg-white/50 px-4 py-2 cursor-pointer rounded-lg transition-colors ease-in-out duration-200 flex gap-2 items-center"
    >
      <span className="shrink-0">{children}</span>
      <span className="capitalize line-clamp-1">{text}</span>
    </Link>
  );
};

export default AsideContent;
