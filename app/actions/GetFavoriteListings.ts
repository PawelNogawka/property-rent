import prisma from "../libs/prismadb";
import getCurrentUser from "./GetCurrentUser";

export default async function getFavoriteListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    return listings;
  } catch (error: any) {
    return null;
  }
}
