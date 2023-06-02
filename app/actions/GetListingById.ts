import prisma from "../libs/prismadb";

export default async function getListingById(listingId: string) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    return listing;
  } catch (error: any) {
    return null;
  }
}
