import Navigation from '../Navigation';

export default function NavigationExample() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="p-8">
        <h2 className="text-2xl font-semibold text-foreground mb-4">
          Navigation Component
        </h2>
        <p className="text-muted-foreground">
          Responsive navigation with TickPay branding, active states, and mobile menu.
        </p>
      </div>
    </div>
  );
}