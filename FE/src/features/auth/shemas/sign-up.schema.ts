import z from "zod";

export const signUpFormSchema = z.object({
  userName: z.string().min(2, "Username must be at least 2 characters"),
  email: z.email("Enter a valid email address"),
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type SignUpFormValues = z.infer<typeof signUpFormSchema>;
