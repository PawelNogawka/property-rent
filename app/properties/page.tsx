import getCurrentUser from "@/app/actions/GetCurrentUser";
import getUserListings from "../actions/GetUserListings";

import ProperiesPage from "../components/pagesElements/PropertiesPage";
import EmptyList from "../components/uiElements/EmptyList";

export const metadata = {
  title: "Your properties",
  description: "Browse the aproperties you have published.",
};

export default async function UserReservationPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyList
        title="Login Required"
        subtitle="Please log in to see the apartments you have published."
        login
      />
    );

  const listings = await getUserListings();

  if (listings?.length === 0 || !listings)
    return (
      <EmptyList
        title="No Properties"
        subtitle="You haven't published any property yet"
      />
    );

  return <ProperiesPage listings={listings} currentUser={currentUser} />;
}
