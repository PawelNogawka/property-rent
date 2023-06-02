import { NextResponse } from "next/server";
import prisma from "../../../libs/prismadb";
import getCurrentUser from "@/app/actions/GetCurrentUser";

interface IParams {
  reservationId?: string;
}

export async function DELETE(
  request: Request,
  { params }: { params: IParams }
) {
  const { reservationId } = params;
  const currentUser = await getCurrentUser();

  if (!reservationId || typeof reservationId !== "string") {
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

  const reservation = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservation);
}
