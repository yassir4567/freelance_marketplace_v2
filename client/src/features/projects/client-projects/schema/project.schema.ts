import { z } from "zod";

export const publishProjectSchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, { error: "Title must be at least 5 characters" })
    .max(200, { error: "Title must be at most 200 characters" }),
  description: z
    .string()
    .trim()
    .min(300, { error: "Description must be at least 300 characters" })
    .max(3000, { error: "Description must be at most 3000 characters" }),
  experienceLevel: z.enum(["junior", "mid-level", "senior"], {
    error: "Please select an experience level",
  }),
  size: z.enum(["small", "medium", "large"], {
    error: "Please select the project size",
  }),
  duration: z.enum(
    ["less_than_1_month", "1_to_3_month", "3_to_6_month", "more_than_6_month"],
    { error: "Please select the estimated duration" },
  ),
  budget: z
    .string()
    .trim()
    .min(1, { error: "Budget is required" })
    .regex(/^\d+(\.\d{1,2})?$/, {
      error: "Invalid budget format",
    })
    .refine((value) => Number(value) >= 20, {
      error: "Budget should be at least 20$",
    }),
  category_id: z.number({ error: "Please select a category" }), 
  skills: z
    .array(z.number(), { error: "Skills must be a valid list" })
    .min(1, { error: "You must select at least one skill" }),
});

export type PublishProjectFormInput = z.input<typeof publishProjectSchema>;

export type PublishProjectFormOutput = z.output<typeof publishProjectSchema>;
