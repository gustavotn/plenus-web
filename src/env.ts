import { z } from 'zod'

const envSchema = z.object({
  MODE: z.enum(['production', 'development', 'test']),
  VITE_API_URL: z.string(),
  VITE_WS_URL: z.string().optional(),
})

export const env = envSchema.parse(import.meta.env)
