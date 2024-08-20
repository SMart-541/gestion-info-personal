"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Employee } from "@/lib/db/schema/employees";
import { DataTable } from "@/components/Datatable/DataTable";
import { Button } from "@/components/ui/button"
import { useTranslations, useFormatter } from 'next-intl';
import { ArrowUpDown, ArrowUp, ArrowDown } from "lucide-react"

export default async function EmployeesTable({ employees }: any) {
  const formatter = useFormatter()
  const strings = useTranslations("EmployeesPage")

  const columns: ColumnDef<Employee>[] = [
    {
      accessorKey: "fullname",
      header: ({ column }) => {
        return sortingButton(column, strings('fullname'))
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "docnumber",
      header: ({ column }) => {
        return sortingButton(column, strings('docnumber'))
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "phone",
      header: ({ column }) => {
        return sortingButton(column, strings('phone'))
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "address",
      header: ({ column }) => {
        return sortingButton(column, strings('address'))
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "salary",
      header: ({ column }) => {
        return sortingButton(column, strings('salary'))
      },
      cell: ({ row }) => {
        const salary = Number(row.getValue("salary"))
        const formatted = formatter.number(salary, { minimumFractionDigits: 2 });
        return <div>{formatted}</div>
      },
      filterFn: 'includesString',
    },
    {
      accessorKey: "updatedAt",
      header: ({ column }) => {
        return sortingButton(column, strings('updatedAt'))
      },
      cell: ({ row }) => {
        const date = new Date(row.getValue("updatedAt"))
        const formatted = formatter.dateTime(date, {
          year: 'numeric',
          month: 'numeric',
          day: 'numeric'
        })
        return <div>{formatted}</div>
      },
    },
  ]

  return <DataTable columns={columns} data={employees} />;
}

function sortingButton(column: any, columnName: any) {
  return (
    <Button
      variant="ghost"
      onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      className="px-2"
    >
      {columnName}

      {column.getIsSorted() === "asc" &&
        <ArrowUp className="ml-2 h-4 w-4" />
      }

      {column.getIsSorted() === "desc" &&
        <ArrowDown className="ml-2 h-4 w-4" />
      }

      {column.getIsSorted() === false &&
        <ArrowUpDown className="ml-2 h-4 w-4" />
      }
    </Button>
  )
}