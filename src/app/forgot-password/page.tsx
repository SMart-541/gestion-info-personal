"use client";

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useTranslations } from "next-intl";

export default function ResetPasswordPage() {
    const { toast } = useToast()
    const [isLoading, setLoading] = useState(false)
    const strings = useTranslations("LoginPage")
    const validationStrings = useTranslations("DialogValidations")

    const formSchema = z.object({
        email: z.string({
            required_error: validationStrings("mandatoryValidation")
        }).email({
            message: validationStrings("emailValidation")
        }),
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoading(true)

        const res = await fetch("/api/reset-password?email=" + values.email, {
            method: "GET",
            headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (res.status === 200) {
            toast({
                title: strings("success"),
                description: strings("linkSent"),
            })
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
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
                    <Card className="mx-auto max-w-sm">
                        <CardHeader>
                            <CardTitle className="text-2xl">{strings("forgotPassword")}</CardTitle>
                            <CardDescription>
                                {strings("forgotPassSubtitle")}
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form {...form}>
                                <form onSubmit={form.handleSubmit(handleSubmit)}>
                                    <div className="grid gap-4">
                                        <FormField
                                            control={form.control}
                                            name="email"
                                            render={({ field }) => (
                                                <FormItem>
                                                    <FormLabel>{strings("email")}</FormLabel>
                                                    <FormControl>
                                                        <Input {...field}
                                                            type="email"
                                                            placeholder={strings("email")} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <Button type="submit" className="w-full" disabled={isLoading}>
                                            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                            {strings("sendLink")}
                                        </Button>
                                    </div>
                                </form>
                            </Form>
                        </CardContent>
                    </Card>
                </section>
            </main>
            <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full shrink-0 items-center px-4 md:px-6 border-t">
                <p className="text-xs text-neutral-500 dark:text-neutral-400">
                    {strings("footerNote")}
                </p>
            </footer>
        </div>
    );
}