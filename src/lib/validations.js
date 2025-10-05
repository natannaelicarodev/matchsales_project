import { z } from 'zod'

export const createUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços'),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .min(1, 'Email é obrigatório'),
  
  city: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
})

export const updateUserSchema = z.object({
  name: z
    .string()
    .min(2, 'Nome deve ter pelo menos 2 caracteres')
    .max(50, 'Nome deve ter no máximo 50 caracteres')
    .regex(/^[a-zA-ZÀ-ÿ\s]+$/, 'Nome deve conter apenas letras e espaços')
    .optional(),
  
  email: z
    .string()
    .email('Email deve ter um formato válido')
    .min(1, 'Email é obrigatório'),
  
  city: z
    .string()
    .optional()
    .or(z.literal(''))
    .transform(val => val === '' ? undefined : val),
})