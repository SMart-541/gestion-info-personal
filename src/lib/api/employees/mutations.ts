import { db } from "@/lib/db/index";
import {
  EmployeeId,
  NewEmployeeParams,
  UpdateEmployeeParams,
  updateEmployeeSchema,
  insertEmployeeSchema,
  employeeIdSchema
} from "@/lib/db/schema/employees";
import { getUserAuth } from "@/lib/auth/utils";

export const createEmployee = async (employee: NewEmployeeParams) => {
  const { session } = await getUserAuth();
  const newEmployee = insertEmployeeSchema.parse({ ...employee, userId: session?.user.id! });
  try {
    const e = await db.employee.create({ data: newEmployee });
    return { employee: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const updateEmployee = async (id: EmployeeId, employee: UpdateEmployeeParams) => {
  const { session } = await getUserAuth();
  const { id: employeeId } = employeeIdSchema.parse({ id });
  const newEmployee = updateEmployeeSchema.parse({ ...employee, userId: session?.user.id! });
  try {
    const e = await db.employee.update({ where: { id: employeeId }, data: newEmployee })
    return { employee: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};

export const deleteEmployee = async (id: EmployeeId) => {
  const { id: employeeId } = employeeIdSchema.parse({ id });
  try {
    const e = await db.employee.delete({ where: { id: employeeId } })
    return { employee: e };
  } catch (err) {
    const message = (err as Error).message ?? "Error, please try again";
    console.error(message);
    throw { error: message };
  }
};