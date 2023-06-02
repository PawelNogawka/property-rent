import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "@/app/actions/GetCurrentUser";

interface IParams {
  listingId?: string;
}


export async function DELETE(request: Request, { params }: { params: IParams }) {

    try {
      const { listingId } = params;
      const currentUser = await getCurrentUser();
  
  
      if (!listingId || typeof listingId !== "string") {
        return NextResponse.json(
          { message: "Invalid or missing listing ID" },
          { status: 400 }
        );
      }
  
      if (!currentUser) {
        return NextResponse.json(
          { message: "Unauthorized: User not authenticated" },
          { status: 401 }
        );
      }
  
  
  
      const removedListing  = await prisma.listing.deleteMany({
        where: {
          id: listingId,
          userId:currentUser.id
        },
       
      });
  
      return NextResponse.json(removedListing);
    } catch (error) {
      console.log("Wystąpił błąd:", error);
      return NextResponse.json(
        { message: "A server error has occurred, try again later." },
        { status: 500 }
      );
    }
  }