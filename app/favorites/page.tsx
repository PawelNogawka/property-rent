import getCurrentUser from "@/app/actions/GetCurrentUser";
import getFavoriteListings from "../actions/GetFavoriteListings";

import FavoritesPage from "../components/pagesElements/FavoritesPage";
import EmptyList from "../components/uiElements/EmptyList";

export const metadata = {
  title: 'Favorite Listings',
  description: 'Browse your favorite listings and properties.',
};


export default async function UserGuestsPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser)
    return (
      <EmptyList
      title="Login Required"
      subtitle="Please log in to view your favorite properties."
      login
    />
    );

  const listings = await getFavoriteListings();

  if (listings?.length === 0 || !listings)
    return (
      <EmptyList
      title="No Favorites"
      subtitle="You haven't added any properties to your favorites yet."
    />
    );

  return <FavoritesPage listings={listings} currentUser={currentUser} />;
}
