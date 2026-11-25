import z from "zod";

export const createUpdateProfileSchema = (hasExistingAvatar: boolean) => {
  return z.object({
    firstName: z.string().min(2, {
      error: "First name must be at least two characters",
    }),
    lastName: z.string().min(2, {
      error: "Last name must be at least two characters",
    }),
    country: z.string().min(3, {
      message: "Country must be at least three characters",
    }),
    city: z.string().min(3, {
      message: "City must be at least three characters",
    }),
    phone: z.string().min(1, {
      message: "Phone number is required",
    }),
    avatar: z
      .file()
      .max(3 * 1024 * 1024, {
        message: "Maximum file size is 2MB",
      })
      .mime(["image/jpeg", "image/png", "image/webp"], {
        message: "Invalid image Mime type",
      })
      .nullable()
      .refine((avatar) => avatar !== null || hasExistingAvatar, {
        message: "Avatar is required",
      }),
  });
};
