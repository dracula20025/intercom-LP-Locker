import { WalletConnect } from "@/components/WalletConnect";
import { CreateLockerForm } from "@/components/CreateLockerForm";
import { LockerList } from "@/components/LockerList";
import { Shield, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-[#0a0a0c] to-black">
      {/* Decorative background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-primary/5 blur-[120px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-600/5 blur-[120px]" />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/5 bg-background/60 backdrop-blur-md">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-primary/10 rounded-xl">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h1 className="text-xl font-bold font-display tracking-tight text-white">
              Token<span className="text-primary">Locker</span>
            </h1>
          </div>
          <WalletConnect />
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 relative z-10">
        <div className="max-w-4xl mx-auto space-y-16">
          <section className="text-center space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted-foreground mb-6">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Secure & Decentralized Token Locking</span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold font-display text-transparent bg-clip-text bg-gradient-to-br from-white via-white/90 to-white/50 pb-2">
                Secure Your Liquidity
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto mt-4 leading-relaxed">
                The most trusted platform to lock your tokens and liquidity. 
                Build trust with your community by securing your assets with our audited smart contracts.
              </p>
            </motion.div>
          </section>

          <section>
            <CreateLockerForm />
          </section>

          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold font-display">Active Lockers</h3>
              <div className="px-3 py-1 bg-white/5 rounded-full text-xs font-medium text-muted-foreground border border-white/10">
                Live Data
              </div>
            </div>
            <LockerList />
          </section>
        </div>
      </main>

      <footer className="border-t border-white/5 mt-20 bg-black/20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
            <p>© 2024 TokenLocker. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-primary transition-colors">Terms</a>
              <a href="#" className="hover:text-primary transition-colors">Privacy</a>
              <a href="#" className="hover:text-primary transition-colors">Docs</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
