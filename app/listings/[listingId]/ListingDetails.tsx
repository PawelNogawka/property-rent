"use client";

import { useState } from "react";
import Wrapper from "@/app/components/uiElements/Wrapper";
import { Listing, User, Reservation } from "@prisma/client";
import { SafeUser } from "@/app/types";

import ListingHeader from "./sections/ListingHeader";
import ListingMap from "./sections/ListingMap";
import ListingReservation from "./sections/ListingReservation";
import Auth from "@/app/components/modals/Auth";

import "./ListingDetails.scss";

interface ListingDetailsProps {
  listing: Listing & {
    user: User;
  };
  currentUser: SafeUser | null;
  reservations?: Reservation[] | null;
}

const ListingDetails: React.FC<ListingDetailsProps> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const [showLoginModal, setShowLoginModal] = useState("");
  return (
    <main className="listing-details">
      {showLoginModal && <Auth mode="login" setShowModal={setShowLoginModal} />}
      <Wrapper>
        <div className="listing-details__container">
          <div className="listing-details__left">
            <ListingHeader
              listing={listing}
              currentUser={currentUser}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
          <div className="listing-details__right">
            <ListingMap locationValue={listing.locationValue} />
            <ListingReservation
              price={listing.price}
              listingId={listing.id}
              currentUser={currentUser}
              reservations={reservations}
              setShowLoginModal={setShowLoginModal}
            />
          </div>
        </div>
      </Wrapper>
    </main>
  );
};

export default ListingDetails;
