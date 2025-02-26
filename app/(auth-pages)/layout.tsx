import AuthLayout from "@/components/layouts/AuthLayout";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthLayout>
      {children}
    </AuthLayout>
  );
}
