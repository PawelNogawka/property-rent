import React from "react";
import { Listing } from "@prisma/client";
import { SafeUser } from "../../types";

import ListingItem from "../listingElements/ListingItem";
import PageHeading from "../uiElements/PageHeading";
import Wrapper from "../uiElements/Wrapper";
import ListingsList from "../listingElements/ListingsList";

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
