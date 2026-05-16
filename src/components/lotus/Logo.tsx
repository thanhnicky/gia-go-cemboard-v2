import logoSrc from "@/assets/logo-lotus.jpg";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <a
      href="#top"
      aria-label="Sơn Lotus — về đầu trang"
      className={`flex items-center ${className}`}
    >
      <img
        src={logoSrc}
        alt="Sơn Lotus Paint"
        width={140}
        height={56}
        className="h-9 w-auto sm:h-10"
      />
    </a>
  );
}
