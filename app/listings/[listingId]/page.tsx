
import getCurrentUser from "@/app/actions/GetCurrentUser";
import getListingById from "@/app/actions/GetListingById";
import getReservations from "@/app/actions/GetReservations";

import ListingDetails from "./ListingDetails";
import EmptyList from "@/app/components/uiElements/EmptyList";

interface IParams {
  listingId: string;
}

export const metadata = {
  title: "Property details",
  description: "View property details",
};

export default async function ListingPage({ params }: { params: IParams }) {
  const { listingId } = params;

  const currentUser = await getCurrentUser();
  const listing = await getListingById(listingId);
  const reservations = await getReservations(params);

  if (!listing) {
    return (
      <EmptyList
        title="No property found by ID"
        subtitle="It seems that such an property does not exist."
      />
    );
  }

  return (
    <ListingDetails
      listing={listing}
      currentUser={currentUser}
      reservations={reservations}
    />
  );
}
