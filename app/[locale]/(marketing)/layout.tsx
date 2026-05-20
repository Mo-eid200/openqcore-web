import Header from "./components/Header";
import Footer from "./components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 w-full noise">
        {children}
      </main>

      <Footer />
    </div>
  );
}