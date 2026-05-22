"use client"

import React, { useEffect, useRef } from "react";

type Props = {
  src: string;
  title?: string;
  height?: string;
};

export default function MicroFrontend({ src, title, height = "400px" }: Props) {
  const ref = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    // Basic sandboxed iframe for microfrontend embedding.
    if (ref.current) {
      ref.current.setAttribute("loading", "lazy");
    }
  }, [src]);

  return (
    <div className="rounded-lg border bg-white p-2 dark:bg-zinc-900">
      {title && <div className="px-2 pb-2 text-sm text-zinc-500">{title}</div>}
      <iframe
        ref={ref}
        src={src}
        title={title || "microfrontend"}
        style={{ width: "100%", height, border: "none" }}
        sandbox="allow-scripts allow-same-origin allow-forms"
      />
    </div>
  );
}
