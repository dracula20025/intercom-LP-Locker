import { useLockers } from "@/hooks/use-lockers";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Clock, ShieldCheck, Coins, User } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { motion } from "framer-motion";

export function LockerList() {
  const { data: lockers, isLoading, error } = useLockers();

  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <Card key={i} className="glass-card h-[280px]">
            <CardHeader>
              <Skeleton className="h-6 w-3/4 bg-white/5" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full bg-white/5" />
              <Skeleton className="h-4 w-2/3 bg-white/5" />
              <Skeleton className="h-4 w-1/2 bg-white/5" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12 text-muted-foreground bg-red-500/5 rounded-xl border border-red-500/10">
        Failed to load lockers. Please try again later.
      </div>
    );
  }

  if (!lockers?.length) {
    return (
      <div className="text-center py-24 glass-card rounded-xl border-dashed border-2 border-white/10">
        <ShieldCheck className="mx-auto h-12 w-12 text-muted-foreground/50 mb-4" />
        <h3 className="text-lg font-medium text-foreground">No Lockers Found</h3>
        <p className="text-muted-foreground mt-2">Create your first token locker to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {lockers.map((locker, index) => (
        <motion.div
          key={locker.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <Card className="glass-card border-white/5 bg-black/40 hover:border-primary/50 transition-all duration-300 group hover:-translate-y-1 hover:shadow-2xl hover:shadow-primary/10">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <CardTitle className="text-xl font-bold truncate pr-4 text-gradient">
                {locker.tokenName}
              </CardTitle>
              <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20 group-hover:bg-primary group-hover:text-white transition-colors">
                Locked
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <Coins className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Amount</span>
                  <span className="text-foreground font-medium">{locker.amount}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Unlocks On</span>
                  <span className="text-foreground font-medium">{format(new Date(locker.unlockDate), "PPP")}</span>
                </div>
              </div>

              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="p-2 rounded-lg bg-white/5 group-hover:bg-primary/10 transition-colors">
                  <User className="h-4 w-4 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-muted-foreground/70 uppercase tracking-wider font-medium">Owner</span>
                  <span className="text-foreground font-medium truncate w-32 font-mono">
                    {locker.ownerAddress.slice(0, 6)}...{locker.ownerAddress.slice(-4)}
                  </span>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-white/5">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Token Contract</span>
                  <span className="font-mono text-primary/80">
                    {locker.tokenAddress.slice(0, 6)}...{locker.tokenAddress.slice(-4)}
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
