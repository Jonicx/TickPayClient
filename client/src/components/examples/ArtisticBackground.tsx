import ArtisticBackground from '../ArtisticBackground';

export default function ArtisticBackgroundExample() {
  return (
    <ArtisticBackground>
      <div className="p-8">
        <h1 className="text-4xl font-bold text-foreground mb-4">TickPay</h1>
        <p className="text-muted-foreground">
          This shows the artistic background with blurred shapes and gradients.
        </p>
      </div>
    </ArtisticBackground>
  );
}