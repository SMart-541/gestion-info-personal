import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { getMyEmployeeAction } from "@/lib/actions/employees";
import { UpdateEmployeeDialog } from "./UpdateEmployeeDialog";
import { getFormatter, getTranslations } from 'next-intl/server';

export default async function MyData() {
    const formatter = await getFormatter()
    const strings = await getTranslations("EmployeesPage")
    const employee = await getMyEmployeeAction() as any

    function formatDate(date: Date) {
        return formatter.dateTime(date, {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        })
    }

    return (
        <div className="lg:col-span-1 md:col-span-3 sm:col-span-3">
            <Card
                className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
            >
                {employee &&
                    <CardHeader className="flex flex-row items-start bg-muted/50">
                        <div className="grid gap-0.5">
                            <CardTitle className="group flex items-center gap-2 text-lg">
                                {employee.fullname}
                            </CardTitle>
                        </div>
                    </CardHeader>
                }
                {employee &&
                    <CardContent className="p-6 text-sm">
                        <div className="grid gap-3">
                            <ul className="grid gap-3">
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {strings("docnumber")}
                                    </span>
                                    <span className="text-right">{employee.docnumber}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {strings("phone")}
                                    </span>
                                    <span className="text-right">{employee.phone}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {strings("address")}
                                    </span>
                                    <span className="text-right">{employee.address}</span>
                                </li>
                                <li className="flex items-center justify-between">
                                    <span className="text-muted-foreground">
                                        {strings("salary")}
                                    </span>
                                    <span className="text-right">{employee.salary}</span>
                                </li>
                            </ul>
                        </div>
                    </CardContent>
                }
                <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
                    {employee ?
                        <div className="text-xs text-muted-foreground">
                            {strings("lastUpdatedAt")}<time dateTime="2023-11-23">{formatDate(employee.updatedAt)}</time>
                        </div>
                        :
                        <div className="text-xs text-muted-foreground">
                            {strings("noData")}
                        </div>
                    }
                    <div className="ml-auto mr-0 w-auto">
                        <UpdateEmployeeDialog employee={employee} />
                    </div>
                </CardFooter>
            </Card>
        </div>
    );
}