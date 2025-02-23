import { z } from 'zod'

export const SignupSchema = z.object({
    name: z
      .string()
      .min(2, { message: 'Name must be at least 2 characters long.' })
      .trim(),
    
    address: z.string().min(1, { message: 'Address is required.' }).trim(),
    
    phone_number: z.string().min(1, { message: 'Phone number is required.' }).trim(),
    
    email: z.string().email('Invalid email').trim(),
    
    password: z
      .string()
      .min(8, { message: 'Password must be at least 8 characters long.' })
      .regex(/[a-zA-Z]/, { message: 'Password must contain at least one letter.' })
      .regex(/[0-9]/, { message: 'Password must contain at least one number.' })
      .regex(/[^a-zA-Z0-9]/, { message: 'Password must contain at least one special character.' })
      .trim(),
    
    password_confirmation: z.string().trim(),
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  });

  export const loginSchema = z.object({
    email: z.string().email('Invalid email').trim(),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .trim(),
  
  })

  export const changePasswordSchema = z.object({
    email: z.string().email('Invalid email').trim(),
    password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long.' })
    .trim(),
    password_confirmation: z.string().trim(),
    token: z.string().trim()
  })
  .refine((data) => data.password === data.password_confirmation, {
    message: 'Passwords do not match.',
    path: ['password_confirmation'],
  });

  export type FormState =
  | {
      errors?: {
        name?: string[];
        email?: string[];
        password?: string[];
        address?: string[];
        phone_number?: string[];
        password_confirmation?: string[];
      };
      message?: string;
    }
  | undefined;