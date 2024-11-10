import { menuItems } from "../../../routes/common-routes";
import { useLocation } from "react-router-dom";

interface SidebarLinkProps {
  href: string;
  src: string;
  alt: string;
}

export const SidebarLink = ({ href, src, alt }: SidebarLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === href;

  return (
    <li className={`cursor-pointer ${isActive ? "bg-black" : ""}`}>
      <a href={href}>
        <img src={src} alt={alt} width={30} height={30} className="mx-auto" />
      </a>
    </li>
  );
};

const Sidebar = () => {
  return (
    <aside className="w-[60px] bg-black text-white h-full">
      <nav className="mt-[18px] mx-[15px]">
        <ul className="flex flex-col justify-center gap-[40px]">
          {menuItems.map((link, id) => (
            <SidebarLink
              key={id}
              href={link.path}
              src={link.icon}
              alt={link.title}
            />
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
