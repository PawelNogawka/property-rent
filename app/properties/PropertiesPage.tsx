import React from 'react'
import { Listing } from '@prisma/client'
import { SafeUser } from "../types";

import PageHeading from "../components/uiElements/PageHeading";
import Wrapper from "../components/uiElements/Wrapper";
import ListingsList from '../components/listingElements/ListingsList';

interface FavoritesPageProps{
    listings:Listing[]  | [],
    currentUser: SafeUser;
}

const PropertiesPage:React.FC<FavoritesPageProps> = ({listings, currentUser}) => {
    console.log(listings)
  return (
    <main className="listing-page">
      <Wrapper>
      <PageHeading
          title="Your Listings"
          subtitle="Explore your amazing listings."
        />

        <ListingsList currentUser={currentUser} listings={listings} deleteAction />
      </Wrapper>
    </main>
  )
}

export default PropertiesPage;
