"use client";

import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Smartphone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const PLAY_STORE_URL =
  process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
  "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";
const APP_STORE_URL =
  process.env.NEXT_PUBLIC_IOS_APP_URL ?? "#";

export default function ShareClaimedPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] = useState<string>("");
  const searchParams = useSearchParams();

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  const status = searchParams.get("status");
  const credits = searchParams.get("credits");
  const shareError = searchParams.get("share_error");
  const isSuccess = status === "ok" && !shareError;
  const deepLinkUrl = id
    ? `bikinstiker://share-claimed/${id}?${searchParams.toString()}`
    : "";

  const handleOpenApp = () => {
    if (!deepLinkUrl) return;
    const start = Date.now();
    window.location.href = deepLinkUrl;
    setTimeout(() => {
      if (Date.now() - start < 1500) {
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        window.location.href = isIOS ? APP_STORE_URL : PLAY_STORE_URL;
      }
    }, 250);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            {isSuccess ? (
              <CheckCircle className="h-8 w-8 text-primary" />
            ) : (
              <XCircle className="h-8 w-8 text-destructive" />
            )}
          </div>
          <CardTitle className="text-2xl">
            {isSuccess ? "Sticker Shared!" : "Something went wrong"}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isSuccess ? (
            <p className="text-center text-lg">
              You earned{" "}
              <span className="font-bold text-primary">{credits ?? "0"}</span>{" "}
              credits!
            </p>
          ) : (
            <p className="text-center text-muted-foreground">
              {shareError ?? "Please try again later."}
            </p>
          )}

          <Button
            size="lg"
            className="w-full"
            onClick={handleOpenApp}
            disabled={!deepLinkUrl}
          >
            <Smartphone className="mr-2 h-5 w-5" />
            Open BikinStiker
          </Button>

          <div className="flex gap-3">
            <Button variant="outline" className="flex-1" render={<Link href={PLAY_STORE_URL} target="_blank" rel="noopener noreferrer" />}>
              Android
            </Button>
            <Button variant="outline" className="flex-1" render={<Link href={APP_STORE_URL} target="_blank" rel="noopener noreferrer" />}>
              iOS
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
