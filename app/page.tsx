import HeroSection from "@/components/HeroSection";

export default async function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between md:p-24">
      <HeroSection />
    </main>
  );
}
