import prisma from "../libs/prismadb";
import getCurrentUser from "./GetCurrentUser";

export default async function getUserListings() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const listings = await prisma.listing.findMany({
      where: {
        userId: currentUser.id,
      },
    });

    return listings;
  } catch (error: any) {
    return null;
  }
}
