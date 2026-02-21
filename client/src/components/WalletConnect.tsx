import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Wallet } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export function WalletConnect() {
  const [address, setAddress] = useState<string | null>(null);
  const { toast } = useToast();

  const handleConnect = () => {
    if (address) {
      setAddress(null);
      toast({
        title: "Wallet Disconnected",
        description: "Your wallet has been disconnected.",
      });
    } else {
      // Simulate connection delay
      setTimeout(() => {
        setAddress("0x7a58...8f9");
        toast({
          title: "Wallet Connected",
          description: "Connected to 0x7a58...8f9",
        });
      }, 500);
    }
  };

  return (
    <Button
      variant={address ? "outline" : "default"}
      onClick={handleConnect}
      className={`
        gap-2 font-medium transition-all duration-300
        ${address 
          ? "border-primary/50 text-primary hover:bg-primary/10 hover:border-primary" 
          : "primary-gradient text-white shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:-translate-y-0.5"
        }
      `}
    >
      <Wallet className="h-4 w-4" />
      {address ? address : "Connect Wallet"}
    </Button>
  );
}
