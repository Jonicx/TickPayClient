import Footer from '../Footer';

export default function FooterExample() {
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <div className="flex-1 p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Content Area
        </h2>
        <p className="text-muted-foreground">
          This demonstrates the footer component at the bottom of the page.
        </p>
      </div>
      <Footer />
    </div>
  );
}