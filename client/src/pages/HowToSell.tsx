import { useState, useEffect } from "react";
import StarParticleBackground from "@/components/StarParticleBackground";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import {
  Settings,
  Megaphone,
  Calendar,
  BarChart,
  Scan,
  Repeat,
  CalendarDays,
  Users,
  TrendingUp,
  Clock,
  PhoneCall,
  Plus,
  Loader2,
  ChevronDown,
  Save,
} from "lucide-react";
import type {
  CalculatorSettings,
  InsertCalculatorSettings,
} from "@shared/schema";

export default function HowToSell() {
  const { t } = useLanguage();
  const { toast } = useToast();

  // Calculator state
  const [guests, setGuests] = useState(100);
  const [ticketPrice, setTicketPrice] = useState(50000);
  const [orderSize, setOrderSize] = useState(2);
  const [commissionPayer, setCommissionPayer] = useState("organizer");
  const [bookingPayer, setBookingPayer] = useState("guests");

  // Admin settings state
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [adminVat, setAdminVat] = useState("");
  const [adminCommission, setAdminCommission] = useState("");
  const [adminBookingFee, setAdminBookingFee] = useState("");

  // Fetch calculator settings from API
  const {
    data: settings,
    isLoading: settingsLoading,
    error: settingsError,
  } = useQuery<CalculatorSettings>({
    queryKey: ["/api/calculator-settings"],
    queryFn: async () => {
      const response = await fetch("/api/calculator-settings");
      if (!response.ok) {
        throw new Error("Failed to fetch calculator settings");
      }
      return response.json();
    },
  });

  // Update admin form values when settings load
  useEffect(() => {
    if (settings) {
      setAdminVat(settings.vatPercentage);
      setAdminCommission(settings.commissionPercentage);
      setAdminBookingFee(settings.bookingFeeAmount);
    }
  }, [settings]);

  // Update calculator settings mutation
  const updateSettingsMutation = useMutation<
    CalculatorSettings,
    Error,
    InsertCalculatorSettings
  >({
    mutationFn: async (newSettings) => {
      const response = await fetch("/api/calculator-settings", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newSettings),
      });

      if (!response.ok) {
        throw new Error("Failed to update calculator settings");
      }

      return response.json();
    },
    onSuccess: () => {
      // Invalidate and refetch calculator settings
      queryClient.invalidateQueries({ queryKey: ["/api/calculator-settings"] });
      toast({
        title: "Settings Updated",
        description: "Calculator settings have been updated successfully.",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: `Failed to update settings: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  // Convert backend string decimals to numbers
  // Backend stores percentages as string decimals (e.g., "18.00")
  // Backend stores booking fee as string decimal (e.g., "7.50") in TZS
  // Keep everything in TZS major units for consistency
  const vatPercentage = settings ? parseFloat(settings.vatPercentage) : 18.0;
  const commissionPercentage = settings
    ? parseFloat(settings.commissionPercentage)
    : 4.9;
  const bookingFeeAmount = settings
    ? parseFloat(settings.bookingFeeAmount)
    : 7.5;

  // Calculate values
  const totalTickets = guests;
  const grossRevenue = totalTickets * ticketPrice;
  const commissionFee = (grossRevenue * commissionPercentage) / 100;
  const totalBookingFees = (totalTickets / orderSize) * bookingFeeAmount;
  const vat =
    ((commissionPayer === "organizer" ? commissionFee : 0) +
      (bookingPayer === "organizer" ? totalBookingFees : 0)) *
    (vatPercentage / 100);

  const organizerCosts =
    (commissionPayer === "organizer" ? commissionFee : 0) +
    (bookingPayer === "organizer" ? totalBookingFees : 0) +
    vat;

  const finalAmount = grossRevenue - organizerCosts;
  const guestsPayPerOrder = bookingPayer === "guests" ? bookingFeeAmount : 0;

  // Handle admin settings form
  const handleSaveSettings = () => {
    const newSettings: InsertCalculatorSettings = {
      vatPercentage: adminVat,
      commissionPercentage: adminCommission,
      bookingFeeAmount: adminBookingFee,
    };

    updateSettingsMutation.mutate(newSettings);
  };


  const features = [
    {
      icon: CalendarDays,
      title: t("sell.features.reservedSeating"),
      description: t("sell.features.reservedSeatingDesc"),
    },
    {
      icon: Scan,
      title: t("sell.features.ticketScanning"),
      description: t("sell.features.ticketScanningDesc"),
    },
    {
      icon: Repeat,
      title: t("sell.features.recurringEvents"),
      description: t("sell.features.recurringEventsDesc"),
    },
    {
      icon: BarChart,
      title: t("sell.features.analytics"),
      description: t("sell.features.analyticsDesc"),
    },
  ];

  const steps = [
    {
      icon: Settings,
      title: t("sell.setupTitle"),
      description: t("sell.setupDesc"),
    },
    {
      icon: Megaphone,
      title: t("sell.promoteTitle"),
      description: t("sell.promoteDesc"),
    },
    {
      icon: Calendar,
      title: t("sell.executeTitle"),
      description: t("sell.executeDesc"),
    },
    {
      icon: BarChart,
      title: t("sell.analyticsTitle"),
      description: t("sell.analyticsDesc"),
    },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Enhanced Star Particle Background */}
      <StarParticleBackground />
      {/* Hero Section */}
      <section className="relative py-20 px-4 md:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <Badge
              variant="outline"
              className="text-primary border-primary/20 bg-primary/5"
              data-testid="badge-organizers"
            >
              {t("sell.tagline")}
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {t("sell.title")}{" "}
              <span className="text-primary">{t("sell.titleHighlight")}</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {t("sell.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
              <Button
                size="lg"
                className="text-lg px-8"
                data-testid="button-request-call"
              >
                <PhoneCall className="mr-2 h-5 w-5" />
                {t("sell.requestCall")}
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8"
                data-testid="button-create-event"
              >
                <Plus className="mr-2 h-5 w-5" />
                {t("sell.createEvent")}
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="relative py-16 px-4 md:px-6 lg:px-8 bg-muted/5 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 mx-auto bg-primary/10 rounded-full flex items-center justify-center">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Calculator Section */}
      <section className="relative py-16 px-4 md:px-6 lg:px-8 z-10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Calculator Description */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4">
                  {t("sell.calculatorTitle")}
                </h2>
                <p className="text-muted-foreground text-lg leading-relaxed">
                  {t("sell.calculatorDesc")}
                </p>
              </div>

              {/* Admin Configuration Section */}
              <Card className="border-2 border-primary/20">
                <Collapsible open={isAdminOpen} onOpenChange={setIsAdminOpen}>
                  <CollapsibleTrigger asChild>
                    <CardHeader className="cursor-pointer hover-elevate">
                      <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5 text-primary" />
                          Admin Configuration
                        </div>
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${isAdminOpen ? "rotate-180" : ""}`}
                        />
                      </CardTitle>
                      <CardDescription>
                        Configure calculator settings that apply instantly
                      </CardDescription>
                    </CardHeader>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <CardContent className="space-y-4">
                      {settingsLoading ? (
                        <div className="space-y-4">
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                          <Skeleton className="h-16 w-full" />
                        </div>
                      ) : (
                        <>
                          <div className="grid grid-cols-1 gap-4">
                            <div className="space-y-2">
                              <Label
                                htmlFor="admin-vat"
                                data-testid="label-admin-vat"
                              >
                                VAT/Tax Percentage (%)
                              </Label>
                              <Input
                                id="admin-vat"
                                type="number"
                                value={adminVat}
                                onChange={(e) => setAdminVat(e.target.value)}
                                min="0"
                                max="100"
                                step="0.01"
                                placeholder="18.00"
                                data-testid="input-admin-vat"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="admin-commission"
                                data-testid="label-admin-commission"
                              >
                                Commission Percentage (%)
                              </Label>
                              <Input
                                id="admin-commission"
                                type="number"
                                value={adminCommission}
                                onChange={(e) =>
                                  setAdminCommission(e.target.value)
                                }
                                min="0"
                                max="100"
                                step="0.01"
                                placeholder="4.90"
                                data-testid="input-admin-commission"
                              />
                            </div>

                            <div className="space-y-2">
                              <Label
                                htmlFor="admin-booking-fee"
                                data-testid="label-admin-booking-fee"
                              >
                                Booking Fee per Order ({t("common.currency")})
                              </Label>
                              <Input
                                id="admin-booking-fee"
                                type="number"
                                value={adminBookingFee}
                                onChange={(e) =>
                                  setAdminBookingFee(e.target.value)
                                }
                                min="0"
                                step="0.50"
                                placeholder="7.50"
                                data-testid="input-admin-booking-fee"
                              />
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button
                              onClick={handleSaveSettings}
                              disabled={updateSettingsMutation.isPending}
                              className="flex-1"
                              data-testid="button-save-settings"
                            >
                              {updateSettingsMutation.isPending ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                              ) : (
                                <Save className="mr-2 h-4 w-4" />
                              )}
                              {updateSettingsMutation.isPending
                                ? "Saving..."
                                : "Save Settings"}
                            </Button>
                          </div>
                        </>
                      )}
                    </CardContent>
                  </CollapsibleContent>
                </Collapsible>
              </Card>
            </div>

            {/* Calculator Widget */}
            <Card className="shadow-lg" data-testid="card-calculator">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {settingsLoading ? (
                    <Loader2 className="h-5 w-5 text-primary animate-spin" />
                  ) : (
                    <TrendingUp className="h-5 w-5 text-primary" />
                  )}
                  {t("sell.calculatorTitle")}
                </CardTitle>
                <CardDescription>
                  {settingsError ? (
                    <span className="text-destructive">
                      Failed to load settings. Using defaults.
                    </span>
                  ) : (
                    t("sell.calculatorDesc")
                  )}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Input Controls */}
                <div className="grid grid-cols-1 gap-4">
                  {settingsLoading ? (
                    <>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-40" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-36" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label htmlFor="guests" data-testid="label-guests">
                          {t("sell.calculator.guests")}
                        </Label>
                        <Input
                          id="guests"
                          type="number"
                          value={guests}
                          onChange={(e) => setGuests(Number(e.target.value))}
                          min="1"
                          data-testid="input-guests"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="ticketPrice"
                          data-testid="label-ticket-price"
                        >
                          {t("sell.calculator.ticketPrice")} (
                          {t("common.currency")})
                        </Label>
                        <Input
                          id="ticketPrice"
                          type="number"
                          value={ticketPrice}
                          onChange={(e) =>
                            setTicketPrice(Number(e.target.value))
                          }
                          min="0"
                          step="1000"
                          data-testid="input-ticket-price"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label
                          htmlFor="orderSize"
                          data-testid="label-order-size"
                        >
                          {t("sell.calculator.orderSize")} (
                          {t("sell.calculator.tickets")})
                        </Label>
                        <Input
                          id="orderSize"
                          type="number"
                          value={orderSize}
                          onChange={(e) => setOrderSize(Number(e.target.value))}
                          min="1"
                          data-testid="input-order-size"
                        />
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                {/* Fee Configuration */}
                <div className="space-y-4">
                  {settingsLoading ? (
                    <>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-48" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-52" />
                        <Skeleton className="h-10 w-full" />
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="space-y-2">
                        <Label data-testid="label-commission-fee">
                          {t("sell.calculator.commissionFee")} (
                          {commissionPercentage.toFixed(1)}%)
                        </Label>
                        <Select
                          value={commissionPayer}
                          onValueChange={setCommissionPayer}
                        >
                          <SelectTrigger data-testid="select-commission-payer">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="organizer"
                              data-testid="option-organizer-pays"
                            >
                              {t("sell.calculator.organizerPays")}
                            </SelectItem>
                            <SelectItem
                              value="guests"
                              data-testid="option-guests-pay"
                            >
                              {t("sell.calculator.guestsPay")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2">
                        <Label data-testid="label-booking-fee">
                          {t("sell.calculator.bookingFee")} (
                          {bookingFeeAmount.toLocaleString()}{" "}
                          {t("common.currency")} {t("sell.calculator.perOrder")}
                          )
                        </Label>
                        <Select
                          value={bookingPayer}
                          onValueChange={setBookingPayer}
                        >
                          <SelectTrigger data-testid="select-booking-payer">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem
                              value="organizer"
                              data-testid="option-organizer-pays-booking"
                            >
                              {t("sell.calculator.organizerPays")}
                            </SelectItem>
                            <SelectItem
                              value="guests"
                              data-testid="option-guests-pay-booking"
                            >
                              {t("sell.calculator.guestsPay")}
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </>
                  )}
                </div>

                <Separator />

                {/* Results */}
                <div className="space-y-4">
                  {settingsLoading ? (
                    <>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-32" />
                          <Skeleton className="h-6 w-24" />
                        </div>
                        <div className="space-y-2">
                          <Skeleton className="h-4 w-24" />
                          <Skeleton className="h-6 w-32" />
                        </div>
                      </div>
                      <div className="bg-primary/5 p-4 rounded-lg">
                        <div className="text-center space-y-2">
                          <Skeleton className="h-4 w-28 mx-auto" />
                          <Skeleton className="h-8 w-40 mx-auto" />
                          <Skeleton className="h-3 w-20 mx-auto" />
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            {t("sell.calculator.guestsPayPerOrder")}
                          </p>
                          <p
                            className="font-semibold"
                            data-testid="text-guests-pay-per-order"
                          >
                            {guestsPayPerOrder.toLocaleString()}{" "}
                            {t("common.currency")}
                          </p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-muted-foreground">
                            {t("sell.calculator.turnover")}
                          </p>
                          <p
                            className="font-semibold"
                            data-testid="text-turnover"
                          >
                            {grossRevenue.toLocaleString()}{" "}
                            {t("common.currency")}
                          </p>
                        </div>
                      </div>

                      <div className="bg-primary/5 p-4 rounded-lg">
                        <div className="text-center">
                          <p className="text-sm text-muted-foreground mb-1">
                            {t("sell.calculator.youReceive")}
                          </p>
                          <p
                            className="text-2xl font-bold text-primary"
                            data-testid="text-final-amount"
                          >
                            {finalAmount.toLocaleString()}{" "}
                            {t("common.currency")}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {t("sell.calculator.inclVat")}
                          </p>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8 bg-muted/5">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="hover-elevate">
                <CardHeader>
                  <CardTitle className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <feature.icon className="h-5 w-5 text-primary" />
                    </div>
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 md:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("sell.title")} {" "}
            <span className="text-primary">{t("sell.titleHighlight")}</span>
          </h2>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="text-lg px-8"
              data-testid="button-request-call-bottom"
            >
              <PhoneCall className="mr-2 h-5 w-5" />
              {t("sell.requestCall")}
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8"
              data-testid="button-create-event-bottom"
            >
              <Plus className="mr-2 h-5 w-5" />
              {t("sell.createEvent")}
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
