import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import ParallaxBackground from "@/components/ParallaxBackground";
import { LanguageProvider } from "@/contexts/LanguageContext";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Home from "@/pages/Home";
import Events from "@/pages/Events";
import EventDetails from "@/pages/EventDetails";
import MyTickets from "@/pages/MyTickets";
import Payment from "@/pages/Payment";
import About from "@/pages/About";
import NotFound from "@/pages/not-found";
import HowToSell from "./pages/HowToSell";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/events" component={Events} />
      <Route path="/how-to-sell" component={HowToSell} />
      <Route path="/events/:id" component={EventDetails} />
      <Route path="/my-tickets" component={MyTickets} />
      <Route path="/payment/:id" component={Payment} />
      <Route path="/about" component={About} />
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <LanguageProvider>
          <div className="dark">
            <ParallaxBackground>
              <div className="flex flex-col min-h-screen">
                <Navigation />
                <main className="flex-1">
                  <Router />
                </main>
                <Footer />
              </div>
            </ParallaxBackground>
          </div>
        </LanguageProvider>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
