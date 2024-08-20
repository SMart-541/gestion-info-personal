"use client"

import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useEffect, useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { updateEmployeeAction } from "@/lib/actions/employees"
import { UpdateEmployeeParams } from "@/lib/db/schema/employees"
import { useTranslations } from "next-intl"

export function UpdateEmployeeDialog({ employee }: any) {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const string = useTranslations("UpdateEmployeeDialog")
    const validationStrings = useTranslations("DialogValidations")

    const formSchema = z.object({
        fullname: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(2, {
            message: validationStrings("fullnameMinValidation")
        }),
        docnumber: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(1, {
            message: validationStrings("docnumberValidation")
        }),
        phone: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(5, {
            message: validationStrings("phoneValidation")
        }),
        address: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(1, {
            message: validationStrings("addressValidation")
        }),
        salary: z.coerce
            .number({
                required_error: validationStrings("mandatoryValidation"),
                invalid_type_error: validationStrings("mandatoryValidation")
            }).positive({
                message: validationStrings("positiveValidation")
            }),
    })

    var form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema)
    })

    useEffect(() => {
        if (employee != null) {
            form.setValue("fullname", employee.fullname)
            form.setValue("docnumber", employee.docnumber)
            form.setValue("phone", employee.phone)
            form.setValue("address", employee.address)
            form.setValue("salary", employee.salary)
        }
    }, [])

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        const params: UpdateEmployeeParams = {
            fullname: values.fullname,
            docnumber: values.docnumber,
            phone: values.phone,
            address: values.address,
            salary: values.salary,
            id: employee != null ? employee.id : "0"
        }
        const res = await updateEmployeeAction(params)
        if (res) {
            toast({
                title: string("error"),
                description: res,
                variant: "destructive",
            })
        } else {
            toast({
                title: string("success"),
                description: string("dataUpdated"),
            })
            setOpen(false)
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="outline" className="h-6">
                    {string("update")}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{string("title")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{string("fullname")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="text"
                                                placeholder={string("fullname")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="docnumber"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{string("docnumber")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="text"
                                                placeholder={string("docnumber")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="phone"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{string("phone")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="number"
                                                placeholder={string("phone")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="address"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{string("address")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="text"
                                                placeholder={string("address")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="salary"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{string("salary")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="number"
                                                placeholder={string("salary")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {string("update")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}