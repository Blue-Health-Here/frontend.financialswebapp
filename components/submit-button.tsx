"use client";

import { Button } from "@/components/ui/button";
import { type ComponentProps } from "react";
import { useFormStatus } from "react-dom";

type Props = ComponentProps<typeof Button> & {
  pendingText?: string;
};

export function SubmitButton({
  children,
  pendingText = "Submitting...",
  className = "",
  ...props
}: Props) {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" aria-disabled={pending} {...props} className={`font-semibold text-xs md:text-sm ${className}`} >
      {pending ? pendingText : children}
    </Button>
  );
}
