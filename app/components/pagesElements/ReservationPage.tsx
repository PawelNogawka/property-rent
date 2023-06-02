'use client'

import {useState} from "react";

import { Listing, Reservation} from "@prisma/client";

import ListingItem from "../listingElements/ListingItem";
import PageHeading from "../uiElements/PageHeading";
import Wrapper from "../uiElements/Wrapper";
import Auth from "../modals/Auth";

import "./ReservationPage.scss";
import { SafeUser } from "../../types";


interface ReservationPageProps {
  reservations?: (Reservation & { listing: Listing })[] | null;
  currentUser: SafeUser
}

const ReservationPage: React.FC<ReservationPageProps> = ({ reservations, currentUser }) => {
  const [showModal, setShowModal] = useState("");

  if (!reservations || reservations.length === 0) {
    return <div className="center">Nie masz żadnych rezerwacji.</div>;
  }

  return (
    <main className="reservation-page">
      {showModal && <Auth mode="login" setShowModal={setShowModal} />}
      <Wrapper>
        <PageHeading
          title="My reservations"
          subtitle="Explore your booked accommodations"
        />
        <ul className="listing-list">
          {reservations.map(reservation =>(
            <ListingItem key={reservation.id} data={reservation.listing} currentUser={currentUser} reservation={reservation} setShowLoginModal={setShowModal}/>
          ))}
        </ul>
      </Wrapper>
    </main>
  );
};

export default ReservationPage;