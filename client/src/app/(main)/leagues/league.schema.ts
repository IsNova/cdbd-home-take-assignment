import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png"];

export const leagueSchema = z.object({
  name: z.string().min(4),
  description: z.string().min(8).optional(),
  logo: z
    .custom<FileList>()
    .refine((files) => files?.length == 1, "Logo is required.")
    .refine(
      (files) => files?.[0]?.size <= MAX_FILE_SIZE,
      `Max file size is 5MB.`,
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, and .png files are accepted.",
    ),
});

export type LeagueInput = z.infer<typeof leagueSchema>;
