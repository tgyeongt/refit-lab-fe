import { useRouter } from "next/router";
import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";

export const ReservationCompleteModal = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (dialogRef.current) {
      dialogRef.current.showModal();
    }
  }, [dialogRef]);

  return createPortal(
    <dialog
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center "
    >
      {children}
    </dialog>,
    document.body
  );
};
