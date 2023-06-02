"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

import { format } from "date-fns";

import useCountries from "@/app/hooks/useCountries";
import { useDelete } from "@/app/hooks/useDelete";
import { SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";

import { VscLocation } from "@react-icons/all-files/vsc/VscLocation";

import HeartButton from "./HeartButton";
import Button from "../formElements/Button";

import "./ListingItem.scss";

interface ListingItemProps {
  data: Listing;
  currentUser: SafeUser | null;
  reservation?: Reservation;
  deleteAction?: boolean;
  setShowLoginModal: (show: string) => void;
}

const ListingItem: React.FC<ListingItemProps> = ({
  data,
  currentUser,
  reservation,
  deleteAction,
  setShowLoginModal,
}) => {
  const { locationValue, title, price, id, imageSrc } = data;

  const { getCountryByValue } = useCountries();
  const location = getCountryByValue(locationValue);

  const { deleteReservation, isLoading } = useDelete();

  const selectedCountry = location.find(
    (country) => country.value === locationValue
  );



  const handleDeleteReservation = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault()
    if (reservation) {
      const url = "/api/reservations";
      await deleteReservation(url, reservation.id);
    }
  };

  const handleDeleteListing = async (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault()
    if (deleteAction) {
      const url = "/api/listings";
      await deleteReservation(url, data.id);
    }
  };

  const renderPrice = () => {
    if (reservation) {
      return (
        <span className="listing__price-amount">
          $ {reservation.totalPrice}
        </span>
      );
    }
    return (
      <>
        <span className="listing__price-amount">$ {price}</span>
        <span className="listing__price-period"> / night</span>
      </>
    );
  };

  const renderReservationDate = () => {
    if (reservation) {
      return (
        <time className="listing__reservation">
          {format(reservation.startDate, "PP")} -{" "}
          {format(reservation.endDate, "PP")}
        </time>
      );
    }
    return null;
  };

  const renderLocation = () => {
    if (selectedCountry) {
      return `${selectedCountry.label}, ${selectedCountry.region}`;
    }
    return "Unknown";
  };

  const renderActionButton = () => {
    if (reservation) {
      return (
        <Button
          disabled={isLoading}
          onClick={handleDeleteReservation}
          ariaLabel="Cancel reservation"
        >
          {!isLoading ? "cancel reservation" : "loading..."}
        </Button>
      );
    }
    if (deleteAction) {
      return (
        <Button
          disabled={isLoading}
          onClick={handleDeleteListing}
          ariaLabel="Delete listing"
        >
          {!isLoading ? "delete listing" : "loading..."}
        </Button>
      );
    }

    return null;
  };

  return (
    <li  className="listing">
      <HeartButton
        listingId={id}
        currentUser={currentUser}
        setShowLoginModal={setShowLoginModal}
      />
      <Link href={`/listings/${id}`} className="listing__link">
        <div className="listing__top">
          <Image alt="title" src={imageSrc} width={270} height={270} />
        </div>
        <div className="listing__bottom">
          <div>
            <h3 className="listing__tite">{title}</h3>
            <div className="listing__price">{renderPrice()}</div>
            {renderReservationDate()}
            <div className="listing__location">
              <VscLocation />
              {renderLocation()}
            </div>
          </div>
          {renderActionButton()}
        </div>
      </Link>
    </li>
  );
};

export default ListingItem;
