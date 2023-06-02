import getCurrentUser from "@/app/actions/GetCurrentUser";
import getReservations from "@/app/actions/GetReservations";
import EmptyList from "../components/uiElements/EmptyList";

import ReservationPage from "../components/pagesElements/ReservationPage";

export default async function UserReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)    return <EmptyList title="You must login first" subtitle="Click the button below and login" login/>

  const userId = currentUser?.id;
  const reservations = await getReservations({ userId });

  if (reservations?.length === 0)
    return <EmptyList title="You have not booked any apartment yet" subtitle=""/>

  return <ReservationPage reservations={reservations} currentUser={currentUser} />
}
