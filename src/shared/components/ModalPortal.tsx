"use client";

import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot =
    typeof window !== "undefined"
      ? (document.getElementById("modal-root") as HTMLElement | null)
      : null;

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
