import { Button } from "@/_components/ui/button";
import Image from "next/image";

type SocialLoginButtonProps = {
  provider: "github" | "google";
  disabled: boolean;
  isPending: boolean;
  onClick: (provider: "github" | "google") => void;
};

export const SocialLoginButton = ({
  provider,
  disabled,
  isPending,
  onClick,
}: SocialLoginButtonProps) => (
  <Button
    variant="outline"
    className="flex w-full items-center disabled:cursor-not-allowed disabled:opacity-80"
    onClick={() => onClick(provider)}
    disabled={disabled}
  >
    <Image
      src={`./${provider}.svg`}
      alt={`${provider} logo`}
      width={40}
      height={40}
      className="size-6"
    />
    <span className="">
      Login with {provider.charAt(0).toUpperCase() + provider.slice(1)}
    </span>
    {isPending && (
      <span className="border-t-accent border-muted-foreground size-6 animate-spin rounded-full border-2 bg-transparent" />
    )}
  </Button>
);
