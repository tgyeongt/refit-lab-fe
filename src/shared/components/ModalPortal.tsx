import { createPortal } from "react-dom";
import { ReactNode } from "react";

interface ModalPortalProps {
  children: ReactNode;
}

export default function ModalPortal({ children }: ModalPortalProps) {
  const modalRoot = document.getElementById("modal-root") as HTMLElement;

  if (!modalRoot) return null;

  return createPortal(children, modalRoot);
}
