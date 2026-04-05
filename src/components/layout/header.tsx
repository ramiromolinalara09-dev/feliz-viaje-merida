"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, Phone, Mail, Clock, Plane, Package, Ship, BookOpen, Users, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";
import { NAV_LINKS, WHATSAPP_LINK_WITH_MESSAGE, PHONE_DISPLAY, EMAIL, HOURS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const iconMap = {
  Plane,
  Package,
  Ship,
  BookOpen,
  Users,
  Mail,
};

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Top bar - Desktop only */}
      <div className="hidden lg:block bg-secondary text-secondary-foreground">
        <div className="container flex items-center justify-between py-2 text-sm">
          <div className="flex items-center gap-6">
            <a href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, '')}`} className="flex items-center gap-2 hover:text-warning transition-colors">
              <Phone className="h-4 w-4" />
              <span>{PHONE_DISPLAY}</span>
            </a>
            <a href={`mailto:${EMAIL}`} className="flex items-center gap-2 hover:text-warning transition-colors">
              <Mail className="h-4 w-4" />
              <span>{EMAIL}</span>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            <span>{HOURS.online}</span>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="glass border-b border-border/50">
        <div className="container flex h-16 lg:h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <Image src="/logo.png" alt="Feliz Viaje Mérida" width={200} height={64} className="h-12 lg:h-16 w-auto" priority />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((link) => {
              const Icon = iconMap[link.icon as keyof typeof iconMap];
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all",
                    isActive(link.href)
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  )}
                >
                  {Icon && <Icon className="h-4 w-4" />}
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTA Button - Desktop */}
          <div className="hidden lg:flex items-center gap-3">
            <Button render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />} size="lg" className="bg-gradient-primary hover:opacity-90 shadow-medium gap-2">
              <MessageCircle className="h-5 w-5" />
              WhatsApp
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger render={<Button variant="ghost" size="icon" />} className="lg:hidden">
              <Menu className="h-6 w-6" />
              <span className="sr-only">Abrir menú</span>
            </SheetTrigger>
            <SheetContent side="right" className="w-full max-w-sm p-0" showCloseButton={false}>
              <div className="flex flex-col h-full">
                {/* Mobile header */}
                <div className="flex items-center justify-between p-4 border-b">
                  <Image src="/logo.png" alt="Feliz Viaje Mérida" width={140} height={40} className="h-10 w-auto" />
                  <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)}>
                    <X className="h-5 w-5" />
                  </Button>
                </div>

                {/* Mobile nav links */}
                <nav className="flex-1 overflow-y-auto py-4">
                  {NAV_LINKS.map((link) => {
                    const Icon = iconMap[link.icon as keyof typeof iconMap];
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsOpen(false)}
                        className={cn(
                          "flex items-center gap-3 px-6 py-4 text-base font-medium transition-colors",
                          isActive(link.href)
                            ? "bg-primary/10 text-primary border-r-4 border-primary"
                            : "text-foreground hover:bg-muted"
                        )}
                      >
                        {Icon && <Icon className="h-5 w-5" />}
                        {link.label}
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile contact info */}
                <div className="p-4 border-t bg-muted/50 space-y-3">
                  <a href={`tel:${PHONE_DISPLAY.replace(/[^0-9]/g, '')}`} className="flex items-center gap-3 text-sm">
                    <Phone className="h-4 w-4 text-primary" />
                    <span>{PHONE_DISPLAY}</span>
                  </a>
                  <a href={`mailto:${EMAIL}`} className="flex items-center gap-3 text-sm">
                    <Mail className="h-4 w-4 text-primary" />
                    <span>{EMAIL}</span>
                  </a>
                  <div className="flex items-center gap-3 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4" />
                    <span>{HOURS.online}</span>
                  </div>
                </div>

                {/* Mobile CTA */}
                <div className="p-4 border-t">
                  <Button render={<a href={WHATSAPP_LINK_WITH_MESSAGE} target="_blank" rel="noopener noreferrer" />} size="lg" className="w-full bg-gradient-primary gap-2">
                    <MessageCircle className="h-5 w-5" />
                    Enviar WhatsApp
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
