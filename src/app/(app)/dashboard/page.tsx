import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { getAllEmployeesAction } from '@/lib/actions/employees';
import { getTranslations } from 'next-intl/server';
import MyData from "./MyData";
import EmployeesTable from './EmployeesTable';

export default async function Home() {
  const strings = await getTranslations("EmployeesPage")
  const employees = await getAllEmployeesAction()

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 grid-cols-3">
      <div className="lg:col-span-2 md:col-span-3 sm:col-span-3">
        <Card>
          <CardHeader className="px-6">
            <CardTitle>{strings("title")}</CardTitle>
          </CardHeader>
          <CardContent>
            <EmployeesTable employees={employees} />
          </CardContent>
        </Card>
      </div>
      <MyData />
    </main>
  );
}