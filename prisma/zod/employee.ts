import * as z from "zod"
import { CompleteUser, relatedUserSchema } from "./index"

export const employeeSchema = z.object({
  id: z.string(),
  docnumber: z.string(),
  fullname: z.string(),
  phone: z.string(),
  address: z.string(),
  salary: z.number().int(),
  userId: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
})

export interface CompleteEmployee extends z.infer<typeof employeeSchema> {
  user: CompleteUser
}

/**
 * relatedEmployeeSchema contains all relations on your model in addition to the scalars
 *
 * NOTE: Lazy required in case of potential circular dependencies within schema
 */
export const relatedEmployeeSchema: z.ZodSchema<CompleteEmployee> = z.lazy(() => employeeSchema.extend({
  user: relatedUserSchema,
}))
