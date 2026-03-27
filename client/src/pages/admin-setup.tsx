import { useState } from "react";
import { useLocation } from "wouter";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { Shield, Lock, User, Mail, UserCircle, Eye, EyeOff, ArrowRight, Key } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";

const adminSetupSchema = z.object({
  username: z.string().min(3, "Username must be at least 3 characters"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  secret: z.string().min(1, "Secret key is required"),
  email: z.string().email().optional().or(z.literal("")),
  firstName: z.string().optional(),
  lastName: z.string().optional(),
});

type AdminSetupData = z.infer<typeof adminSetupSchema>;

export default function AdminSetupPage() {
  const { adminSetup } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<AdminSetupData>({
    resolver: zodResolver(adminSetupSchema),
    defaultValues: { username: "", password: "", secret: "", email: "", firstName: "", lastName: "" },
  });

  const onSubmit = async (data: AdminSetupData) => {
    setIsLoading(true);
    try {
      await adminSetup(data);
      toast({ title: "Admin Created", description: "Your admin account has been set up successfully!" });
      navigate("/admin-dashboard");
    } catch (err: any) {
      toast({ title: "Setup Failed", description: err.message, variant: "destructive" });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <div className="w-full max-w-md space-y-6">
        <div className="text-center space-y-2">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="p-2.5 rounded-md bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>
          </div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Admin System Setup
          </h1>
          <p className="text-sm text-muted-foreground">
            Create a privileged administrator account
          </p>
        </div>

        <Card className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="secret"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Secret Key</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Key className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input {...field} type="password" placeholder="Enter system secret key" className="pl-9" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="h-px bg-border my-4" />

              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Username</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input {...field} placeholder="Choose admin username" className="pl-9" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Password</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                          {...field}
                          type={showPassword ? "text" : "password"}
                          placeholder="Min 6 characters"
                          className="pl-9 pr-9"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground"
                        >
                          {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Admin Email (Optional)</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input {...field} type="email" placeholder="admin@example.com" className="pl-9" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className="grid grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="firstName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>First Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="First" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="lastName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Last Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Last" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90" disabled={isLoading}>
                {isLoading ? "Setting up..." : "Complete Admin Setup"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </Form>
        </Card>

        <p className="text-center text-sm text-muted-foreground">
          Go back to{" "}
          <button
            onClick={() => navigate("/login")}
            className="text-primary hover:underline font-medium"
          >
            Sign in
          </button>
        </p>
      </div>
    </div>
  );
}
