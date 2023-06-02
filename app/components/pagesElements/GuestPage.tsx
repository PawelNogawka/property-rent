"use client";

import { useState } from "react";

import { Listing, Reservation } from "@prisma/client";

import ListingItem from "../listingElements/ListingItem";
import PageHeading from "../uiElements/PageHeading";
import Wrapper from "../uiElements/Wrapper";
import Auth from "../modals/Auth";

import { SafeUser } from "../../types";

interface ReservationPageProps {
  reservations: (Reservation & { listing: Listing })[];
  currentUser: SafeUser;
}

const GuestsPage: React.FC<ReservationPageProps> = ({
  reservations,
  currentUser,
}) => {
  const [showModal, setShowModal] = useState("");

  return (
    <main className="listing-page">
      {showModal && <Auth mode="login" setShowModal={setShowModal} />}
      <Wrapper>
        <PageHeading
          title="Guest Reservations"
          subtitle="Explore accommodations booked by others"
        />

        <ul className="listing-list">
          {reservations.map((reservation) => (
            <ListingItem
              key={reservation.id}
              data={reservation.listing}
              currentUser={currentUser}
              reservation={reservation}
              setShowLoginModal={setShowModal}
            />
          ))}
        </ul>
      </Wrapper>
    </main>
  );
};

export default GuestsPage;
