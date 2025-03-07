import { Button } from "@/components/ui/button";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "404 - Financials Web App",
};
export default function NotFoundPage() {
    return (
        <div className="flex h-screen items-center justify-center bg-gradient-to-br from-primary to-black animate-gradientBackground">
            <div className="text-center">
                <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
                <p className="text-2xl text-themeLight mt-4">Oops! Page not found</p>
                <p className="text-themeLight mt-2">The page you are looking for doesn’t exist.</p>
                <Link href="/">
                    <Button className="mt-6 px-12 font-semibold rounded-full bg-white hover:text-white hover:bg-primary transition">
                        Go Back
                    </Button>
                </Link>
            </div>
        </div>
    );
}