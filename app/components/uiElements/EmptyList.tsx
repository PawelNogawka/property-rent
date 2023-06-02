"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Button from "../formElements/Button";
import Auth from "../modals/Auth";

import "./EmptyList.scss";

interface EmptyListProps {
  title: string;
  subtitle: string;
  login?: boolean;
}

const EmptyList: React.FC<EmptyListProps> = ({ title, subtitle, login }) => {
  const [showModal, setShowModal] = useState("");
  const router = useRouter();

  const handleClick = () => {
    if (!login) {
      router.back();
    } else {
      setShowModal("login");
    }
  };

  return (
    <main className="empty-list">
      {showModal && <Auth setShowModal={setShowModal} mode="login" />}
      <div className="empty-list__box">
        <h1 className="empty-list__title">{title}</h1>
        <p className="empty-list__subtitle">{subtitle}</p>
        <Button onClick={handleClick} ariaLabel={login ? "Login" : "Go Back"}>
          {login ? "Login" : "Go Back"}
        </Button>
      </div>
    </main>
  );
};

export default EmptyList;
