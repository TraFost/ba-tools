import Link from "next/link";

export const BigCard = ({
  children,
  href,
  bgUrl,
}: { children: React.ReactNode; href: string; bgUrl: string }) => {
  return (
    <Link
      href={href}
      style={{ backgroundImage: `url(${bgUrl})` }}
      className="bg-cover bg-center text-secondary-foreground w-48 h-52 rounded-md -skew-x-6 relative py-4 px-3 hover:outline-4 hover:outline-accent-foreground"
    >
      <div className="bg-gradient-to-b from-white from-0% via-50% via-white/50 to-transparent to-75% size-full absolute inset-0 rounded-md" />
      <p className="text-2xl font-bold skew-x-6 italic w-fit">{children}</p>
    </Link>
  );
};

export default BigCard;
