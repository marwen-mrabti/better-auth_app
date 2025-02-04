import { Button } from "@/_components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/_components/ui/form";
import { Input } from "@/_components/ui/input";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
  email: z.string().email({ message: "please provide a valid email address" }),
});

type Props = {
  disabled: boolean;
  isPending: boolean;
  onSubmit: (values: z.infer<typeof formSchema>, reset: () => void) => void;
};

export default function MagicLinkLogin({
  disabled,
  isPending,
  onSubmit,
}: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values, form.reset))}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center justify-between gap-2">
                <FormLabel>Email</FormLabel>
                <FormDescription>
                  we will send you a login link to this email
                </FormDescription>
              </div>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  {...field}
                  className={cn(
                    "focus:[:user-invalid]:ring-destructive focus:ring focus:invalid:text-red-700 focus:[:user-valid]:ring-green-400",
                  )}
                  disabled={disabled}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button
          type="submit"
          disabled={disabled}
          className="flex w-full items-center disabled:cursor-not-allowed disabled:opacity-70"
        >
          <span>Send me a magic link</span>
          {isPending && (
            <span className="border-t-accent border-muted-foreground size-6 animate-spin rounded-full border-2 bg-transparent" />
          )}
        </Button>
      </form>
    </Form>
  );
}
