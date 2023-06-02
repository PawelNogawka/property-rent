"use client";

import { useState, useEffect } from "react";
import { useFavorites } from "@/app/hooks/useFavorites";
import { AiFillHeart } from "@react-icons/all-files/ai/AiFillHeart";

import "./HeartButton.scss";
import { SafeUser } from "@/app/types";

interface HeartButtonProps {
  listingId: string;
  currentUser: SafeUser | null;
  setShowLoginModal: (show: string) => void;
}

const HeartButton: React.FC<HeartButtonProps> = ({
  listingId,
  currentUser,
  setShowLoginModal,
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);

  const { favorite, isLoading } = useFavorites();

  const isLiked = currentUser?.favoriteIds.includes(listingId);

  useEffect(() => {
    if (isLiked) {
      setAlreadyLiked(true);
    }
  }, []);

  const handleButtonClick = async (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!currentUser) {
      setShowLoginModal("login");
      return;
    }

    if (alreadyLiked) {
      setAlreadyLiked(false);
    } else {
      setAlreadyLiked(true);
    }

    await favorite(listingId, currentUser);
  };

  return (
    <button
      onClick={handleButtonClick}
      className={`${"heart-button"} ${
        alreadyLiked ? " heart-button--liked" : null
      }`}
      aria-label={isLiked ? "Remove from favorites" : "Add to favorites"}
      disabled={isLoading}
    >
      <AiFillHeart />
    </button>
  );
};

export default HeartButton;
