"use client";

import { useState, useTransition } from "react";
import { signOut } from "@/app/actions";
import AuthModal from "./AuthModal";
import { Button } from "@/components/ui/button";
import { LogIn, LogOut, Loader2 } from "lucide-react";

export default function AuthButton({ user }) {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleSignOut = (e) => {
    e.preventDefault();
    startTransition(async () => {
      await signOut();
    });
  };

  if (user) {
    return (
      <form onSubmit={handleSignOut}>
        <Button variant="ghost" size="sm" type="submit" className="gap-2" disabled={isPending}>
          {isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut className="w-4 h-4" />
          )}
          {isPending ? "Signing Out..." : "Sign Out"}
        </Button>
      </form>
    );
  }

  return (
    <>
      <Button
        onClick={() => setShowAuthModal(true)}
        variant="default"
        size="sm"
        className="bg-primary hover:opacity-90 gap-2"
      >
        <LogIn className="w-4 h-4" />
        Sign In
      </Button>

      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
      />
    </>
  );
}
