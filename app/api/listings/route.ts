import { NextResponse } from "next/server";

import prisma from "../../libs/prismadb";

import getCurrentUser from "@/app/actions/GetCurrentUser";

import Joi from "joi";

const schema = Joi.object({
    category: Joi.string().required(),
    location: Joi.object({
      flag: Joi.string().required(),
      label: Joi.string().required(),
      latlng: Joi.array().items(Joi.number()).required(),
      region: Joi.string().required(),
      value: Joi.string().required(),
    }).required(),
    bathrooms: Joi.number().required(),
    rooms: Joi.number().required(),
    guests: Joi.number().required(),
    image: Joi.string().required(),
    title: Joi.string().min(5).required(),
    description: Joi.string().min(5).required(),
    price: Joi.number().required(),
  });
  

export async function POST(request: Request) {

  try {
    const body = await request.json();

    const { error } = schema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    } else {
      const currentUser = await getCurrentUser();

      if (!currentUser) {
        return NextResponse.json(
          { message: "Unauthorized: User not authenticated" },
          { status: 401 }
        );
      }

      const listing = await prisma.listing.create({
        data: {
          category: body.category,
          title: body.title,
          description: body.description,
          imageSrc: body.image,
          roomCount: body.rooms,
          bathroomCount: body.bathrooms,
          guessCount: body.guests,
          locationValue: body.location.value,
          userId: currentUser.id,
          price: body.price,
        },
      });

      return NextResponse.json(listing);
    }
  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
