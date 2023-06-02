import getCurrentUser from "@/app/actions/GetCurrentUser";
import getReservations from "@/app/actions/GetReservations";

import GuestsPage from "./GuestPage";
import EmptyList from "../components/uiElements/EmptyList";

export const metadata = {
  title: "Guest Reservations",
  description: "View bookings made by other users on your properties.",
};

export default async function UserGuestsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyList
        title="Login Required"
        subtitle="Please log in to view bookings made by other users on your properties."
        login
      />
    );



  const authorId = currentUser?.id;
  const reservations = await getReservations({ authorId });

  
  
  if (reservations?.length === 0 || !reservations)
    return (
      <EmptyList
        title="No Properties"
        subtitle="No one has booked an property yet."
      />
    );

  return <GuestsPage reservations={reservations} currentUser={currentUser} />;
}
