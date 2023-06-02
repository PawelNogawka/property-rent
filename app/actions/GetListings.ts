import prisma from "../libs/prismadb";

export interface IListingParams {
  category?: string;
  search?: string;
}

export default async function getListings(params: IListingParams) {
  try {
    let { category, search } = params;

    console.log(category);
    console.log(search);
    let listings;

    if (category) {
      category =
        category.charAt(0).toUpperCase() + category.slice(1).toLowerCase();
      console.log(category);
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
