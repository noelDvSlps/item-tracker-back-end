import { Router } from "express";
import { z } from "zod";
import { validateRequest } from "zod-express-middleware";
import { prisma } from "../prisma";
import { parseable } from "../helper";

const itemsHistoryRouter = Router();

// History

itemsHistoryRouter.get("/", async (req, res) => {
  const history = await prisma.history.findMany();
  res.send(history);
});

// show endpoint Prisma
itemsHistoryRouter.get("/:id", async (req, res) => {
  const id = +req.params.id;
  const history = await prisma.history.findUnique({
    where: {
      id,
    },
  });
  if (!history) {
    return res.status(404).send("No Content Boy!");
  }
  res.send(history);
});

//show endpoint delete

itemsHistoryRouter.delete("/:id", async (req, res) => {
  // const id = +req.params.id;
  const id = parseable.parse(req.params.id);
  const deleted = await Promise.resolve()
    .then(() =>
      prisma.history.delete({
        where: {
          id,
        },
      })
    )
    .catch(() => null);
  if (deleted === null) {
    return res.status(404).send({ error: "Item not found" });
  }
  return res.status(200).send("Great Success!");
});

itemsHistoryRouter.post(
  "/",
  validateRequest({
    body: z.object({
      user_Id: z.number(),
      transaction: z.string(),
      item_Id: z.number(),
      timeStamp: z.string(),
    }),
  }),
  async (req, res) => {
    try {
      const newHistory = await prisma.history.create({
        data: {
          ...req.body,
        },
      });
      res.status(201).send(newHistory);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

itemsHistoryRouter.patch(
  "/:id",
  validateRequest({
    body: z.object({
      user_Id: z.number().optional(),
      transaction: z.string().optional(),
      item_Id: z.number().optional(),
      timeStamp: z.date().optional(),
    }),
  }),
  async (req, res) => {
    const id = +req.params.id;
    const body = req.body;

    try {
      const updateHistory = await prisma.history.update({
        where: {
          id,
        },
        data: body,
      });
      res.status(201).send(updateHistory);
    } catch (e) {
      console.log(e);
      res.status(500);
    }
  }
);

export { itemsHistoryRouter };
