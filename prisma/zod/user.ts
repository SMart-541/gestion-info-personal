import * as z from "zod"
import { CompleteAccount, relatedAccountSchema, CompleteSession, relatedSessionSchema, CompleteEmployee, relatedEmployeeSchema } from "./index"

export const userSchema = z.object({
  id: z.string(),
  name: z.string().nullish(),
  email: z.string().nullish(),
  hashedPassword: z.string().nullish(),
  emailVerified: z.date().nullish(),
  image: z.string().nullish(),
})

export interface CompleteUser extends z.infer<typeof userSchema> {
  accounts: CompleteAccount[]
  sessions: CompleteSession[]
  employees: CompleteEmployee[]
}

/**
 * relatedUserSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedUserSchema: z.ZodSchema<CompleteUser> = z.lazy(() => userSchema.extend({
  accounts: relatedAccountSchema.array(),
  sessions: relatedSessionSchema.array(),
  employees: relatedEmployeeSchema.array(),
}))
