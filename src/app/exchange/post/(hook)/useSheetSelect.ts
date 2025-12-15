import { useState, useEffect } from "react";
import { useExchangeSelectStore } from "@/shared/stores/useExchangeSelectStore";

export function useSheetSelect(
  onConfirmValue: (sheet: string, value: string) => void
) {
  const {
    openSheet,
    open,
    close,
    setCategory,
    setCondition,
    setSize,
    setWantCategory,
    category,
    condition,
    size,
    wantCategory,
  } = useExchangeSelectStore();

  const [tempValue, setTempValue] = useState("");

  useEffect(() => {
    if (openSheet === "category") setTempValue(category);
    if (openSheet === "condition") setTempValue(condition);
    if (openSheet === "size") setTempValue(size);
    if (openSheet === "wantCategory") setTempValue(wantCategory);
  }, [openSheet]);

  const confirm = () => {
    if (!openSheet) return;

    if (openSheet === "category") setCategory(tempValue);
    if (openSheet === "condition") setCondition(tempValue);
    if (openSheet === "size") setSize(tempValue);
    if (openSheet === "wantCategory") setWantCategory(tempValue);

    onConfirmValue(openSheet, tempValue);

    close();
  };

  return {
    openSheet,
    open,
    tempValue,
    setTempValue,
    confirm,
    close,
    disabled: !tempValue,
  };
}
