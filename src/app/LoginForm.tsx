"use client";

import Link from "next/link"
import { Button } from "@/components/ui/button"
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
import { Separator } from "@/components/ui/separator"
import { Input } from "@/components/ui/input"
import { signIn } from "next-auth/react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import { useForm } from "react-hook-form"
import { CreateAccountDialog } from "./CreateAccountDialog"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Loader2 } from "lucide-react"
import { useTranslations } from 'next-intl';

enum LoadType {
    credentials,
    google,
    github,
    none
}

const formSchema = z.object({
    email: z.string({
        required_error: "Este campo es obligatorio"
    }).email({
        message: "Por favor ingrese un email válido.",
    }),
    password: z.string({
        required_error: "Este campo es obligatorio"
    }).min(8, {
        message: "La contraseña debe contener al menos 8 caracteres.",
    }),
})

export function LoginForm() {
    const strings = useTranslations('LoginPage');
    const { toast } = useToast()
    const searchParams = useSearchParams()
    const [loadType, setLoadType] = useState(LoadType.none)

    useEffect(() => {
        const error = searchParams.get('error')
        if (error != null) {
            toast({
                title: "Error:",
                description: strings(error),
                variant: "destructive",
            })
        }
    }, [])

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        setLoadType(LoadType.credentials)
        const options = {
            callbackUrl: "/dashboard",
            email: values.email,
            password: values.password
        }
        signIn("credentials", options)
    }

    function signIntoGoogle() {
        setLoadType(LoadType.google)
        signIn("google", { callbackUrl: "/dashboard" })
    }

    function signIntoGithub() {
        setLoadType(LoadType.github)
        signIn("github", { callbackUrl: "/dashboard" })
    }

    return (
        <Card className="mx-auto max-w-sm">
            <CardHeader>
                <CardTitle className="text-2xl">{strings('title')}</CardTitle>
                <CardDescription>
                    {strings('subtitle')}
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
                                        <FormLabel>{strings('email')}</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                type="email"
                                                placeholder={strings('email')} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="password"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>{strings('password')}</FormLabel>
                                        <FormControl>
                                            <Input {...field}
                                                type="password"
                                                placeholder={strings('password')} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <Link href="/forgot-password" className="underline text-sm text-end cursor-pointer">{strings('forgotPassword')}</Link>
                            <Button type="submit" className="w-full" disabled={loadType != LoadType.none}>
                                {loadType == LoadType.credentials && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {strings('signIn')}
                            </Button>
                            <div className="grid grid-cols-5 items-center text-sm">
                                <Separator className="col-span-2" />
                                <div className="px-2 col-span-1 text-center">{strings('or')}</div>
                                <Separator className="col-span-2" />
                            </div>
                            <Button type="button" variant="outline" className="w-full" disabled={loadType != LoadType.none} onClick={() => signIntoGoogle()}>
                                {loadType == LoadType.google && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {strings('withGoogle')}
                            </Button>
                            <Button type="button" variant="outline" className="w-full" disabled={loadType != LoadType.none} onClick={() => signIntoGithub()}>
                                {loadType == LoadType.github && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                {strings('withGithub')}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="mt-4 text-center text-sm">
                    {strings('noAccount')}{" "}
                    <CreateAccountDialog />
                </div>
            </CardContent>
        </Card>
    )
}