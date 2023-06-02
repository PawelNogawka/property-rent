"use client";

import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { SafeUser } from "@/app/types";
import NavItem from "./NavItem";
import "./UserNav.scss";

const navItems = ["login", "register"];
const userNavItems = [
  { name: "my reservations", url: "reservations" },
  { name: "guest reservations", url: "guests" },
  { name: "my favorites", url: "favorites" },
  { name: "my properties", url: "properties" },
  { name: "rent home", url: "" },
  { name: "logout" },
];

interface UserNavProps {
  setIsNavOpen: (show: boolean) => void;
  setShowModal: (show: string) => void;
  currentUser?: SafeUser | null;
}

interface PortalProps {
  children: React.ReactNode;
  setShowModal: (show: string) => void;
}

const Portal: React.FC<PortalProps> = ({ children, setShowModal }) => {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    return () => setMounted(false);
  }, []);

  const container = document.querySelector("#overlays");

  return mounted && container ? createPortal(children, container) : null;
};

const UserNav: React.FC<UserNavProps> = ({
  setIsNavOpen,
  setShowModal,
  currentUser,
}) => {
  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const target = e.target as HTMLElement;
    if (target.closest(".user-nav")) {
      return;
    }

    setIsNavOpen(false);
  };

  return (
    <Portal setShowModal={setShowModal}>
      <div onClick={handleModalClick} className="nav-overlay">
        <nav className="user-nav" aria-label="User navigation">
          <ul className="user-nav__list">
            {!currentUser &&
              navItems.map((item, index) => (
                <NavItem
                  key={index}
                  name={item}
                  setIsNavOpen={setIsNavOpen}
                  setShowModal={setShowModal}
                />
              ))}
            {currentUser &&
              userNavItems.map((item, index) => (
                <NavItem
                  key={index}
                  name={item.name}
                  url={item.url}
                  setShowModal={setShowModal}
                  setIsNavOpen={setIsNavOpen}
                />
              ))}
          </ul>
        </nav>
      </div>
    </Portal>
  );
};

export default UserNav;
