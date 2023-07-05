import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../prisma";
import { parseable } from "../helper";
import { encryptPassword } from "../auth-utils";

const usersRouter = Router();

usersRouter.get(
  "/",
  validateRequest({
    query: z
      .object({
        nameHas: z.string(),
      })
      .strict()
      .partial(),
  }),
  async (req, res) => {
    const nameHas = req.query.nameHas as string;
    const users = await prisma.user.findMany({
      where: {
        fullName: {
          contains: nameHas,
        },
      },
    });
    res.send(users);
  }
);

// show endpoint Prisma
usersRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const user = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!user) {
    return res.status(404).send("No Content Boy!");
  }
  res.send(user);
});

//show endpoint delete

usersRouter.delete("/:id", async (req, res) => {
  const id = parseable.parse(req.params.id);
  const deleted = await Promise.resolve()
    .then(() =>
      prisma.user.delete({
        where: {
          id,
        },
      })
    )
    .catch(() => null);
  if (deleted === null) {
    return res.status(404).send({ error: "User not found" });
  }
  return res.status(200).send("Great Success!");
});

usersRouter.post(
  "/",
  validateRequest({
    body: z.object({
      fullName: z.string({
        errorMap: (err) => ({
          message: "name is required and must be a string",
        }),
      }),
      userType: z.string(),
      username: z.string(),
      password: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const hashedPassword = await encryptPassword(req.body.password);
      const newUser = await prisma.user.create({
        data: {
          ...req.body,
          password: hashedPassword,
        },
      });
      res.status(201).send(newUser);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

usersRouter.patch(
  "/:id",
  validateRequest({
    body: z.object({
      fullName: z
        .string({
          errorMap: (err) => ({
            message: "fullName must be a string",
          }),
        })
        .optional(),
      userType: z.string().optional(),
      username: z.string().optional(),
      password: z.string().optional(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;
    const body = req.body;

    try {
      const updateUser = await prisma.user.update({
        where: {
          id,
        },
        data: body,
      });
      res.status(201).send(updateUser);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

export { usersRouter };
