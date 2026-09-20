"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { CheckCircle, XCircle, Smartphone } from "lucide-react";

const PLAY_STORE_URL =
   process.env.NEXT_PUBLIC_APP_DOWNLOAD_URL ??
   "https://play.google.com/store/apps/details?id=com.alamaby.bikin_stiker";
const IOS_URL = process.env.NEXT_PUBLIC_IOS_APP_URL ?? "";
const hasIosUrl = IOS_URL !== "" && IOS_URL !== "#";

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
        if (isIOS && hasIosUrl) {
          window.location.href = IOS_URL;
        } else {
          window.location.href = PLAY_STORE_URL;
        }
      }
    }, 250);
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-primary/5 to-background p-4">
      <div className="flex w-full max-w-md flex-col rounded-xl border border-card-line bg-card text-sm shadow-2xs">
        <div className="p-6 text-center">
          <div className="mx-auto mb-4 flex size-16 items-center justify-center rounded-full bg-primary/10">
            {isSuccess ? (
              <CheckCircle className="size-8 shrink-0 text-primary" />
            ) : (
              <XCircle className="size-8 shrink-0 text-destructive" />
            )}
          </div>
          <h1 className="text-2xl font-semibold text-foreground">
            {isSuccess ? "Sticker Shared!" : "Something went wrong"}
          </h1>
        </div>
        <div className="space-y-4 px-6 pb-6">
          {isSuccess ? (
            <p className="text-center text-lg text-foreground">
              You earned{" "}
              <span className="font-bold text-primary">{credits ?? "0"}</span>{" "}
              credits!
            </p>
          ) : (
            <p className="text-center text-muted-foreground">
              {shareError ?? "Please try again later."}
            </p>
          )}

          <button
            type="button"
            onClick={handleOpenApp}
            disabled={!deepLinkUrl}
            className="inline-flex w-full items-center justify-center gap-x-2 rounded-lg border border-transparent bg-primary px-4 py-3 text-sm font-medium text-primary-foreground hover:bg-primary-hover focus:bg-primary-focus focus:outline-hidden disabled:pointer-events-none disabled:opacity-50"
          >
            <Smartphone className="size-5 shrink-0" />
            Open BikinStiker
          </button>

          <div className="flex gap-3">
            <a
              href={PLAY_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-layer-line bg-layer px-4 py-2.5 text-sm font-medium text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus focus:outline-hidden"
            >
              Android
            </a>
            {hasIosUrl ? (
              <a
                href={IOS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-x-2 rounded-lg border border-layer-line bg-layer px-4 py-2.5 text-sm font-medium text-layer-foreground shadow-2xs hover:bg-layer-hover focus:bg-layer-focus focus:outline-hidden"
              >
                iOS
              </a>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
