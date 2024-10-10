import { z } from "zod";

export const menuSchema = z.object({
  menuId: z.string().min(4).nullable(),
  depth: z.string().min(2).nullable(),
  parent: z.string().min(2).nullable(),
  name: z.string().min(2).max(20),
});

export type MenuInput = z.infer<typeof menuSchema | any>;
