import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import Home from "@/pages/Home";
import NotFound from "@/pages/not-found";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
      <Toaster />
    </div>
  );
}

export default App;
