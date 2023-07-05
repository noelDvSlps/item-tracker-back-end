import { z } from "zod";

export const parseable = z
  .string()
  .transform((n) => parseInt(n))
  .pipe(
    z.number({ errorMap: (_err) => ({ message: "not parseable to a number" }) })
  );
