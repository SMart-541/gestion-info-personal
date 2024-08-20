import { LoginForm } from "./LoginForm";
import { getTranslations } from 'next-intl/server';

export default async function LandingPage() {
  const strings = await getTranslations("LoginPage")

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <section className="w-full py-6 sm:py-12 md:py-24 lg:py-32 xl:py-48">
          <LoginForm />
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