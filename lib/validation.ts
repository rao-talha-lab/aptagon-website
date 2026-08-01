import {email, z} from "zod";

// Get in Touch Schema
export const contactSchema= z.object({
    name:z.string().min(2, "Name must be at least 2 characters"),
    email:z.string().email("Invalid email address"),
    subject:z.string().optional().default("No Project Type Selected"),
    message:z.string().min(5, "Message must be at least 5 characters")
});

//Reach US Schema

export const reachUsSchema = z.object({
    user_first_name: z.string().min(1, "First name is required"),
    user_last_name: z.string().min(1, "Last name is required"),
    user_email: z.string().email("Invalid email address"),
    user_phone: z.string().min(5, "Phone number is required"),
    subject: z.string().min(2, "Subject is required"),
    message: z.string().min(5, "Message must be at least 5 characters"),
  });

  // Schedule Call Schema
  export const scheduleCallSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    date: z.string().min(1, "Date selection is required"),
    time: z.string().min(1, "Time slot selection is required"),
  });

  export type ContactInput = z.infer<typeof contactSchema>;
  export type ReachUsInput = z.infer<typeof reachUsSchema>;
  export type ScheduleCallInput = z.infer<typeof scheduleCallSchema>;


