import { NextResponse } from "next/server";
import prisma from "../../libs/prismadb";
import getCurrentUser from "@/app/actions/GetCurrentUser";
import Joi from "joi";

interface CreateReservationBody {
  listingId: string;
  startDate: Date;
  endDate: Date;
  totalPrice: number;
}

const createReservationSchema = Joi.object<CreateReservationBody>({
  listingId: Joi.string().required(),
  startDate: Joi.date().iso().required(),
  endDate: Joi.date().iso().min(Joi.ref("startDate")).required(),
  totalPrice: Joi.number().positive().required(),
});
export async function POST(request: Request) {
  const body = await request.json();

  const { error } = createReservationSchema.validate(body);
  if (error) {
    return NextResponse.json(
      { message: error.details[0].message },
      { status: 400 }
    );
  }

  const currentUser = await getCurrentUser();
  if (!currentUser) {
    return NextResponse.json(
      { message: "Unauthorized: User not authenticated" },
      { status: 401 }
    );
  }

  const { listingId, startDate, endDate, totalPrice } = body;

  const existingReservation = await prisma.reservation.findFirst({
    where: {
      listingId,
      startDate: {
        lte: endDate,
      },
      endDate: {
        gte: startDate,
      },
    },
  });

  if (existingReservation) {
    return NextResponse.json(
      { message: "There is already a reservation for the specified dates" },
      { status: 400 }
    );
  }

  const reservation = await prisma.reservation.create({
    data: {
      userId: currentUser.id,
      listingId,
      startDate,
      endDate,
      totalPrice,
    },
  });

  try {
    return NextResponse.json(reservation);
  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
