import { z } from "zod";

export const teamSchema = z.object({
  menuId: z.string().min(4).optional(),
  depth: z.string().min(2).optional(),
  parent: z.string().min(2).max(20),
  name: z.string().min(2).max(20),
});

export type TeamInput = z.infer<typeof teamSchema>;
