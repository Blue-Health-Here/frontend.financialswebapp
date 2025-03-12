
import PharmacyLayout from "@/components/layouts/PharmacyLayout";
import DocumentVerify from "@/components/pharmacy/document/DocumentVerification";

import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Document - Financials Web App",
};

export default async function Document() {
    return (
        <PharmacyLayout>
            <DocumentVerify />
        </PharmacyLayout>
    );
}