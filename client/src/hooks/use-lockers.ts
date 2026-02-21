import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { LockerInput, LockerResponse } from "@shared/routes";

export function useLockers() {
  return useQuery({
    queryKey: [api.lockers.list.path],
    queryFn: async () => {
      const res = await fetch(api.lockers.list.path);
      if (!res.ok) throw new Error("Failed to fetch lockers");
      return api.lockers.list.responses[200].parse(await res.json());
    },
  });
}

export function useLocker(id: number) {
  return useQuery({
    queryKey: [api.lockers.get.path, id],
    queryFn: async () => {
      const url = buildUrl(api.lockers.get.path, { id });
      const res = await fetch(url);
      if (!res.ok) {
        if (res.status === 404) return null;
        throw new Error("Failed to fetch locker");
      }
      return api.lockers.get.responses[200].parse(await res.json());
    },
  });
}

export function useCreateLocker() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: LockerInput) => {
      const res = await fetch(api.lockers.create.path, {
        method: api.lockers.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || "Failed to create locker");
      }
      
      return api.lockers.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.lockers.list.path] });
      toast({
        title: "Success",
        description: "Token locker created successfully",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
