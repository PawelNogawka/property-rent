"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { differenceInDays, eachDayOfInterval } from "date-fns";

import { SafeUser } from "@/app/types";
import { Reservation } from "@prisma/client";

import { useCreate } from "@/app/hooks/useCreate";

import Auth from "@/app/components/modals/Auth";
import Calendar from "@/app/components/listingElements/Calendar";
import Button from "@/app/components/formElements/Button";

import "./ListingReservation.scss";

interface ListingReservationProps {
  price: number;
  listingId: string;
  currentUser: SafeUser | null;
  reservations?: Reservation[] | null;
  setShowLoginModal:(show:string) => void
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  listingId,
  currentUser,
  reservations,
 setShowLoginModal
}) => {
  const [dateRange, setDateRange] = useState({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const [totalPrice, setTotalPrice] = useState(price);

  const router = useRouter();

  const { create, isLoading, error } = useCreate();

  useEffect(() => {
    const days = differenceInDays(dateRange.endDate, dateRange.startDate);
    const newTotalPrice = days ? (days + 1) * price : price;

    setTotalPrice(newTotalPrice);
  }, [dateRange, price]);

  const disabledDates = () => {
    if (reservations?.length == 0) return [];
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: reservation.startDate,
        end: reservation.endDate,
      });

      dates = [...dates, ...range];
    });

    return dates;
  };

  const disabledDateList = disabledDates();

  const handleFormSubmit = async (e: any) => {
    e.preventDefault();
    if (!currentUser) {
      setShowLoginModal("login");
      return;
    }

    if (
      !currentUser ||
      totalPrice <= 0 ||
      !dateRange.startDate ||
      !dateRange.endDate
    ) {
      return;
    }

    const newReservation = {
      startDate: dateRange.startDate,
      endDate: dateRange.endDate,
      totalPrice,
      listingId,
    };

    const url = "/api/reservations";

    await create(url, newReservation);

    router.push("/reservations");
  };

  return (


      <section className="listing-reservation">
        <div className="listing-reservation__price">
          <span className="listing-reservation__price-amount">{`$ ${price}`}</span>
          <span className="listing-reservation__price-period">/ night</span>
        </div>
        <form onSubmit={handleFormSubmit}>
          <Calendar
            setDateRange={setDateRange}
            dateRange={dateRange}
            disabledDateList={disabledDateList}
          />
          <div className="listing-reservation__btn-box">
            <Button disabled={isLoading} type="submit" ariaLabel="Reservation">
              {!isLoading ? "Reservation" : "Pending..."}
            </Button>
          </div>
        </form>

        <div className="listing-reservation__summary">
          <span className="listing-reservation__summary-total">
            Total price:
          </span>
          <b className="listing-reservation__summary-price">{`$ ${totalPrice}`}</b>
        </div>
      </section>

  );
};

export default ListingReservation;
