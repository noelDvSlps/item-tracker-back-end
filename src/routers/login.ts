import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../prisma";
import {
  createTokenForUser,
  createUnsecuredUserInformation,
} from "../auth-utils";
import bcrypt from "bcrypt";

const loginRouter = Router();

loginRouter.post(
  "/",
  validateRequest({
    body: z.object({
      password: z.string(),
      username: z.string(),
    }),
  }),
  async (req, res) => {
    const password = req.body.password as string;
    const username = req.body.username as string;

    const user = await prisma.user.findUnique({
      where: {
        username: username,
      },
    });

    if (!user) {
      return res.status(404).send({ message: "Username not found" });
    }

    const isPasswordCorrect = user
      ? await bcrypt.compare(password, user.password)
      : false;

    if (!isPasswordCorrect) {
      return res.status(401).send({ message: "Invalid Credentials" });
    }

    const userInformation = createUnsecuredUserInformation(user);
    const token = createTokenForUser(user);
    return res.status(200).json({ token, userInformation });
  }
);

export { loginRouter };
