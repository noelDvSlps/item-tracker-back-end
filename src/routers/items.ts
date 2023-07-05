import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../prisma";
import { authMiddleware } from "../auth-utils";
import { parseable } from "../helper";

const itemsRouter = Router();

// items
itemsRouter.get(
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
    const items = await prisma.item.findMany({
      where: {
        name: {
          contains: nameHas,
        },
      },
    });
    res.send(items);
  }
);

// show endpoint Prisma
itemsRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const item = await prisma.item.findUnique({
    where: {
      id,
    },
  });
  if (!item) {
    return res.status(404).send("No Content Boy!");
  }
  res.send(item);
});

//show endpoint delete

itemsRouter.delete("/:id", authMiddleware, async (req, res) => {
  const id = parseable.parse(req.params.id);
  const deleted = await Promise.resolve()
    .then(() =>
      prisma.item.delete({
        where: {
          id,
        },
      })
    )
    .catch((e) => {
      console.log(e);
    });
  if (deleted === null) {
    return res.status(404).send({ error: "Item not found" });
  }

  return res.status(200).send("Great Success!");
});

itemsRouter.post(
  "/",

  validateRequest({
    body: z.object({
      image: z.string().optional(),
      imagePublicId: z.string().optional(),
      name: z.string(),
      description: z.string(),
      status: z.string(),
      user_Id: z.number().nullable(),
    }),
  }),
  async (req, res) => {
    // console.log(req.body);
    try {
      const newItem = await prisma.item.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).send(newItem);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

itemsRouter.patch(
  "/:id",

  validateRequest({
    body: z.object({
      image: z.string().optional(),
      imagePublicId: z.string().optional(),
      name: z.string().optional(),
      description: z.string().optional(),
      status: z.string().optional(),
      user_Id: z.number().optional(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;
    const body = req.body;

    try {
      const updateItem = await prisma.item.update({
        where: {
          id,
        },
        data: body,
      });
      res.status(201).send(updateItem);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

export { itemsRouter };
