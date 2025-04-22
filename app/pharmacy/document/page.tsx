
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import { Metadata } from "next";
import dynamic from "next/dynamic";

const DocumentVerification = dynamic(() => import('@/components/pharmacy/document/DocumentVerification'));

export const metadata: Metadata = {
    title: "Document - Financials Web App",
};

export default async function Document() {
    return (
        <PharmacyLayout>
            <DocumentVerification />
        </PharmacyLayout>
    );
}