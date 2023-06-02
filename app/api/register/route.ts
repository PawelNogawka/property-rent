import bcrypt from "bcrypt";
import prisma from "../../libs/prismadb";
import { NextResponse } from "next/server";
import Joi from "joi";

const schema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  confirmedPassword: Joi.string()
    .valid(Joi.ref("password"))
    .required()
    .messages({
      "any.only": "Passwords must have the same value.",
    }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const { error, value } = schema.validate(body);

    if (error) {
      return NextResponse.json(
        { message: error.details[0].message },
        { status: 400 }
      );
    } else {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (existingUser) {
        return NextResponse.json(
          { message: "User with given email address already exists" },
          { status: 409 }
        );
      }

      const hashedPassword = await bcrypt.hash(body.password, 12);

      const user = await prisma.user.create({
        data: {
          email: body.email,
          name: body.name,
          hashedPassword,
        },
      });

      return NextResponse.json(user);
    }
  } catch (error) {
    console.log("Wystąpił błąd:", error);
    return NextResponse.json(
      { message: "A server error has occurred, try again later." },
      { status: 500 }
    );
  }
}
