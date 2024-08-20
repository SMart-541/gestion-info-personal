"use client";

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
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useToast } from "@/components/ui/use-toast"
import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Loader2 } from "lucide-react"
import { useTranslations } from 'next-intl';

export function CreateAccountDialog() {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)
    const [open, setOpen] = useState(false)
    const strings = useTranslations("CreateAccountDialog")
    const validationStrings = useTranslations("DialogValidations")

    const formSchema = z.object({
        fullname: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(2, {
            message: validationStrings("fullnameMinValidation"),
        }),
        email: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).email({
            message: validationStrings("emailValidation"),
        }),
        password: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).min(8, {
            message: validationStrings("passwordValidation"),
        }),
        repassword: z.string({
            required_error: validationStrings("mandatoryValidation")
        })
    }).refine((data) => data.password === data.repassword, {
        message: validationStrings("repasswordValidation"),
        path: ["repassword"]
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        const res = await fetch("/api/register", {
            method: "POST",
            body: JSON.stringify({ values }),
            headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (res.status === 200) {
            toast({
                title: strings("success"),
                description: strings("accountCreated"),
            })
            setOpen(false);
        } else {
            //Handle errors
            toast({
                title: strings("error"),
                description: response.error,
                variant: "destructive",
            })
        }
        setLoading(false)
    }

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <a className="underline cursor-pointer">
                    {strings("title")}
                </a>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                        <DialogHeader>
                            <DialogTitle>{strings("title")}</DialogTitle>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <FormField
                                control={form.control}
                                name="fullname"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{strings("fullname")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="text"
                                                placeholder={strings("fullname")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{strings("email")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="text"
                                                placeholder={strings("email")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{strings("password")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="password"
                                                placeholder={strings("password")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="repassword"
                                render={({ field }) => (
                                    <FormItem className="grid grid-cols-4 items-center gap-1">
                                        <FormLabel className="text-right">{strings("repassword")}</FormLabel>
                                        <FormControl className="col-span-3">
                                            <Input {...field}
                                                type="password"
                                                placeholder={strings("repassword")} />
                                        </FormControl>
                                        <FormMessage className="col-start-2 col-span-3" />
                                    </FormItem>
                                )}
                            />
                            <DialogDescription>
                                {strings("termsConditionsLabel")}{" "}
                                <a className="underline cursor-pointer">
                                    {strings("termsConditions")}
                                </a>
                            </DialogDescription>
                        </div>
                        <DialogFooter>
                            <Button type="submit" disabled={isLoading}>
                                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {strings("createAccount")}
                            </Button>
                        </DialogFooter>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    )
}