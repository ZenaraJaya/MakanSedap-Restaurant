import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin Dashboard | MakanSedap",
  description: "Restaurant Management System",
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section>{children}</section>;
}