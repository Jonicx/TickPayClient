interface FooterProps {
  className?: string;
}

export default function Footer({ className = '' }: FooterProps) {
  return (
    <footer className={`bg-background/90 backdrop-blur-sm border-t border-border mt-auto ${className}`}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="text-center">
          <p className="text-sm text-muted-foreground" data-testid="text-copyright">
            © TickPay
          </p>
        </div>
      </div>
    </footer>
  );
}