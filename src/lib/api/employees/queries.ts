import { db } from "@/lib/db/index";
import { getUserAuth } from "@/lib/auth/utils";
import { type EmployeeId, employeeIdSchema } from "@/lib/db/schema/employees";

export const getEmployees = async () => {
  const { session } = await getUserAuth();
  const e = await db.employee.findMany({ where: { userId: session?.user.id! } });
  return { employees: e };
};

export const getAllEmployees = async () => {
  const e = await db.employee.findMany();
  return { employees: e };
};

export const getMyEmployee = async () => {
  const { session } = await getUserAuth();
  const e = await db.employee.findFirst({ where: { userId: session?.user.id! } });
  return { employee: e };
};

export const getEmployeeById = async (id: EmployeeId) => {
  const { session } = await getUserAuth();
  const { id: employeeId } = employeeIdSchema.parse({ id });
  const e = await db.employee.findFirst({
    where: { id: employeeId, userId: session?.user.id! }
  });
  return { employee: e };
};

export const getBestPaid = async () => {
  const e = await db.employee.findMany({
    take: 10,
    orderBy: [
      {
        salary: 'desc',
      }
    ],
  });
  const aggregations = await db.employee.aggregate({
    take: 10,
    orderBy: [
      {
        salary: 'desc',
      }
    ],
    _avg: {
      salary: true,
    },
  })

  return {
    employees: e,
    salaryAverage: aggregations._avg.salary
  };
};