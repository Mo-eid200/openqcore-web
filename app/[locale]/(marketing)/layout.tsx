import Header from "./components/Header";
import Footer from "./components/Footer";
import PageTransition from "./components/PageTransition";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full noise">
        <PageTransition>{children}</PageTransition>
      </main>

      <Footer />
    </div>
  );
}