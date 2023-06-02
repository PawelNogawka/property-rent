"use client";

import { useState } from "react";

import { Listing } from "@prisma/client";
import { SafeUser } from "@/app/types";
import Auth from "../modals/Auth";

import ListingItem from "./ListingItem";

interface ListingsListProps {
  listings: Listing[];
  currentUser: SafeUser | null;
  deleteAction?: boolean;
}

const ListingsList: React.FC<ListingsListProps> = ({
  listings,
  currentUser,
  deleteAction
}) => {
  const [showLoginModal, setShowLoginModal] = useState("");

  return (
    <>
      {showLoginModal && <Auth mode="login" setShowModal={setShowLoginModal} />}
      <ul className="listing-list">
        {listings.map((listing) => (
          <ListingItem
            key={listing.id}
            data={listing}
            currentUser={currentUser}
            setShowLoginModal={setShowLoginModal}
            deleteAction={deleteAction ? true : false}
          />
        ))}
      </ul>
    </>
  );
};

export default ListingsList;
