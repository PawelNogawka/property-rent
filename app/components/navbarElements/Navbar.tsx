"use client";

import { useState, useEffect } from "react";

import { BiUser } from "@react-icons/all-files/bi/BiUser";
import { AiOutlineClose } from "@react-icons/all-files/ai/AiOutlineClose";
import { AiOutlineMenu } from "@react-icons/all-files/ai/AiOutlineMenu";

import { SafeUser } from "@/app/types";

import UserNav from "./UserNav";
import Wrapper from "../uiElements/Wrapper";
import Search from "./Search";
import Logo from "./Logo";
import Auth from "../modals/Auth";
import Avatar from "../uiElements/Avatar";
import Categories from "./Categories";
import Rent from "../modals/Rent";

import "./Navbar.scss";

interface NavbarProps {
  currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [boxShadow, setBoxShadow] = useState(false);
  const [showModal, setShowModal] = useState("");

  const handleUserButtonClick = () => {
    setIsNavOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setBoxShadow(true);
      } else {
        setBoxShadow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className={`navbar ${boxShadow ? "navbar--box-shadow" : ""}`}>
      {showModal && showModal == "register" && (
        <Auth setShowModal={setShowModal} mode="register" />
      )}
      {showModal && showModal == "login" && (
        <Auth setShowModal={setShowModal} mode="login" />
      )}
      {showModal && showModal == "rent" && <Rent setShowModal={setShowModal} />}
      <Wrapper>
        <div className="navbar__container">
          <Logo />
          <Search />
          <div className="navbar__user">
            {currentUser && (
              <button
                onClick={() => setShowModal("rent")}
                aria-label="Rent home"
                className="navbar__rent-btn"
              >
                Rent your home!
              </button>
            )}
            <button
              onClick={handleUserButtonClick}
              className="navbar__user-btn"
              aria-label="Open user navigation"
            >
              {!isNavOpen ? <AiOutlineMenu /> : <AiOutlineClose />}
              {(!currentUser || currentUser.image === null) && (
                <BiUser className="navbar__user-icon" />
              )}
              {currentUser && currentUser.image && (
                <Avatar src={currentUser.image} name={currentUser.name} />
              )}
            </button>

            {isNavOpen && (
              <UserNav
                currentUser={currentUser}
                setIsNavOpen={setIsNavOpen}
                setShowModal={setShowModal}
              />
            )}
          </div>
        </div>
        <Categories />
      </Wrapper>
    </header>
  );
};

export default Navbar;
