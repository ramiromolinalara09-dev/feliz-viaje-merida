"use client";

import type { ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { WHATSAPP_LINK_WITH_MESSAGE } from "@/lib/constants";
import { trackConversion } from "@/lib/conversion";

type Props = {
  href?: string;
  children?: ReactNode;
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?:
    | "default"
    | "secondary"
    | "outline"
    | "ghost"
    | "destructive"
    | "link";
};

/**
 * Client wrapper around `<Button render={<a/>}>` that fires
 * trackConversion("whatsapp_click") on click. Use inside server components
 * where you can't add an onClick directly.
 */
export function TrackedWhatsAppButton({
  href = WHATSAPP_LINK_WITH_MESSAGE,
  children,
  className,
  size,
  variant,
}: Props) {
  return (
    <Button
      render={
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackConversion("whatsapp_click")}
        />
      }
      size={size}
      variant={variant}
      className={className}
    >
      {children}
    </Button>
  );
}
