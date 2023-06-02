import React from "react";
import { Listing } from "@prisma/client";
import { SafeUser } from "../types";

import ListingItem from "../components/listingElements/ListingItem";
import PageHeading from "../components/uiElements/PageHeading";
import Wrapper from "../components/uiElements/Wrapper";
import ListingsList from "../components/listingElements/ListingsList";

interface FavoritesPageProps {
  listings: Listing[];
  currentUser: SafeUser;
}

const FavoritesPage: React.FC<FavoritesPageProps> = ({
  listings,
  currentUser,
}) => {

  return (
    <main className="listing-page">
      <Wrapper>
        <PageHeading
          title="Favorite Listings"
          subtitle="Explore your favorite accommodations"
        />

        <ListingsList currentUser={currentUser} listings={listings}  />
      </Wrapper>
    </main>
  );
};

export default FavoritesPage;
