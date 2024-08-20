import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardFooter
} from "@/components/ui/card"
import SignOut from "@/components/auth/SignOut";
import { checkAuth } from "@/lib/auth/utils";
import { getTranslations } from 'next-intl/server';

export default async function SignOutPage() {
  await checkAuth();
  const strings = await getTranslations("SignOutPage")

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 grid-cols-3">
      <div className="lg:col-span-1 md:col-span-3 sm:col-span-3">
        <Card
          className="overflow-hidden" x-chunk="dashboard-05-chunk-4"
        >
          <CardHeader className="flex flex-row items-start bg-muted/50">
            <div className="grid gap-0.5">
              <CardTitle className="group flex items-center gap-2 text-lg">
                {strings("title")}
              </CardTitle>
            </div>
          </CardHeader>
          <CardContent className="p-6 text-sm">
            <span className="text-muted-foreground">
              {strings("message")}
            </span>
          </CardContent>
          <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
            <div className="ml-auto mr-0 w-auto">
              <SignOut />
            </div>
          </CardFooter>
        </Card>
      </div>
    </main>
  );
}