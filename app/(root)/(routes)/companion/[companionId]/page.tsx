import prismadb from "@/lib/prismadb";
import CompanionForm from "./components/companion-form";
import { auth, redirectToSignIn } from "@clerk/nextjs";

interface CompanionIdPageProps {
  params: {
    companionId: string;
  };
}

export default async function CompanionIdPage({
  params,
}: CompanionIdPageProps) {
  const { userId } = auth();

  if (!userId) return redirectToSignIn();

  const companion = await prismadb.companion.findUnique({
    where: {
      userId,
      id: params.companionId,
    },
  });

  const categories = await prismadb.category.findMany();

  return <CompanionForm initialData={companion} categories={categories} />;
}
