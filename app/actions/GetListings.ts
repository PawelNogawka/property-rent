import prisma from "../libs/prismadb";



export default async function getListings(search?: string | null, category?: string | null) {
  try {
    let listings;

    if (category) {
      category =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      listings = await prisma.listing.findMany({
        where: {
          category: category,
        },
      });
    } else if (search) {
      listings = await prisma.listing.findMany({
        where: {
          OR: [
            { title: { contains: search, mode: "insensitive" } },
            { description: { contains: search, mode: "insensitive" } },
            { locationValue: { contains: search, mode: "insensitive" } },
          ],
        },
      });
    } else {
      listings = await prisma.listing.findMany();
    }

    return listings;
  } catch (error: any) {
    console.error(error);
    return null;
  }
}
