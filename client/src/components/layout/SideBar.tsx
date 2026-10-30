import { Link } from "react-router-dom";
import Logo from "../ui/Logo";
import type { IconType } from "react-icons/lib";

interface HeaderProps {
  links: {
    label: string;
    to: string;
    icon: IconType;
  }[];
}

export default function SideBar({ links }: HeaderProps) {
  return (
    <aside className="w-full flex flex-col items-center">
      <div className="mb-10 mt-3">
        <Logo />
      </div>
      <div>
        <nav>
          <ul className="flex flex-col gap-8">
            {links.map((link) => {
              const Icon = link.icon;
              return (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="flex items-center justify-center flex-col gap-1 hover:text-blue-500"
                  >
                    <Icon size={18} />
                    <span className="text-[9px] text-center">{link.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </aside>
  );
}
