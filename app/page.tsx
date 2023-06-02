import getListings from "./actions/GetListings";

import getCurrentUser from "./actions/GetCurrentUser";
import ListingsList from "./components/listingElements/ListingsList";
import Wrapper from "./components/uiElements/Wrapper";
import PageHeading from "./components/uiElements/PageHeading";
import EmptyList from "./components/uiElements/EmptyList";

export const metadata = {
  title: "Explore listings you like",
  description: "Browse and View property details",
};

const Home = async ({ searchParams }: any) => {
  let listings = null;

  if (searchParams?.category) {
    listings = await getListings(null,searchParams.category);
  } else if (searchParams?.search) {
    listings = await getListings(searchParams.search, null);
  } else {
    listings = await getListings();
  }

  const currentUser = await getCurrentUser();

  if (!listings?.length || !listings)
    return (
      <EmptyList
        title="No results"
        subtitle="There are no properties to display at the moment."
      />
    );

  return (
    <main className="main-page">
      <Wrapper>
        {searchParams?.category && (
          <PageHeading
            title={`Results by '${searchParams.category}' category`}
            subtitle="Browse listings in the selected category"
          />
        )}
        {searchParams?.search && (
          <PageHeading
            title={`Results by '${searchParams.search}' query`}
            subtitle="Browse listings matching the search query"
          />
        )}
        <ListingsList currentUser={currentUser} listings={listings} />
      </Wrapper>
    </main>
  );
};

export default Home;
