import { Link } from "@/features/common/components/ui";

export function HeaderLogo() {
  return (
    <Link href="/">
      <div className="hidden lg:flex lg:items-center gap-2">
        <p className="font-semibold text-white text-2xl ml-2">週案アプリ</p>
        <img src="/assets/logo.svg" alt="ロゴ" />
      </div>
    </Link>
  );
}
