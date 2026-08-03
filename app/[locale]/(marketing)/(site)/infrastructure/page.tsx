import { redirect } from "@/i18n/navigation";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export default async function InfrastructureRedirectPage({ params }: PageProps) {
  const { locale } = await params;

  redirect({
    href: "/platform/infrastructure",
    locale,
  });
}