"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { CheckCircle, XCircle, Smartphone, Play } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface OpenAppButtonProps {
  deepLinkUrl: string;
  storeUrlAndroid: string;
  storeUrlIOS: string;
}

export function OpenAppButton({
  deepLinkUrl,
  storeUrlAndroid,
  storeUrlIOS,
}: OpenAppButtonProps) {
  const handleOpenApp = () => {
    const start = Date.now();
    window.location.href = deepLinkUrl;
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        if (isIOS) {
          window.location.href = storeUrlIOS;
        } else {
          window.location.href = storeUrlAndroid;
        }
      }
    }, 250);
  };

  return (
    <Button size="lg" className="w-full" onClick={handleOpenApp}>
      <Smartphone className="mr-2 h-5 w-5" />
      Open BikinStiker App
    </Button>
  );
}
