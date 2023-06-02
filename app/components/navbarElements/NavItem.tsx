"use client";

import { useRouter } from "next/navigation";
import { signOut } from "next-auth/react";

import "./NavItem.scss";

interface NavItemProps {
  name: string;
  url?: string;
  setIsNavOpen?: (show: boolean) => void;
  setShowModal?: (show: string) => void;
}

const NavItem: React.FC<NavItemProps> = ({
  name,
  url,
  setIsNavOpen = () => {},
  setShowModal = () => {},
}) => {
  const router = useRouter();

  const handleButtonClick = () => {
    if (name === "register") {
      setShowModal("register");
    } else if (name === "login") {
      setShowModal("login");
      
    }else if(name === "rent home") {
      setShowModal('rent')
    }
    
    else {
      router.push(`/${url}`);
    }
    setIsNavOpen(false);
  };

  if (name == "logout") {
    return (
      <li className="nav-item nav-item--last">
        <button
          onClick={() => signOut()}
          aria-label={`Go to ${name}`}
          className="nav-item__link"
        >
          {name}
        </button>
      </li>
    );
  }

  return (
    <li className="nav-item">
      <button
        onClick={handleButtonClick}
        aria-label={`Go to ${name}`}
        className="nav-item__link"
      >
        {name}
      </button>
    </li>
  );
};

export default NavItem;
