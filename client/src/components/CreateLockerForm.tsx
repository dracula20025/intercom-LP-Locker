import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertLockerSchema } from "@shared/schema";
import { useCreateLocker } from "@/hooks/use-lockers";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2, Lock } from "lucide-react";
import { z } from "zod";

// Extend schema for form validation
const formSchema = insertLockerSchema.extend({
  unlockDate: z.date({
    required_error: "Unlock date is required",
  }),
});

type FormData = z.infer<typeof formSchema>;

export function CreateLockerForm() {
  const createLocker = useCreateLocker();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      tokenAddress: "",
      tokenName: "",
      amount: "",
      ownerAddress: "",
    },
  });

  const onSubmit = (data: FormData) => {
    createLocker.mutate(data, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <Card className="glass-card border-white/5 bg-black/40 backdrop-blur-xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Lock className="h-6 w-6 text-primary" />
          Create Token Locker
        </CardTitle>
        <CardDescription className="text-muted-foreground/80">
          Lock your tokens securely for a specified period.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="tokenAddress"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Address</FormLabel>
                    <FormControl>
                      <Input placeholder="0x..." className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tokenName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Token Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Bitcoin" className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Amount to Lock</FormLabel>
                    <FormControl>
                      <Input placeholder="0.00" className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="unlockDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Unlock Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal bg-background/50 border-white/10 hover:bg-background/70 hover:text-primary",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date()
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="ownerAddress"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Owner Address</FormLabel>
                  <FormControl>
                    <Input placeholder="0x..." className="bg-background/50 border-white/10 focus:border-primary/50 transition-colors" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              disabled={createLocker.isPending}
              className="w-full h-12 text-base font-semibold primary-gradient shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300"
            >
              {createLocker.isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating Locker...
                </>
              ) : (
                "Create Token Locker"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
