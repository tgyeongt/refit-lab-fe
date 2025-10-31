"use client";

import { useEffect } from "react";
import { useHeaderStore } from "../stores/headerStore";

interface HeaderConfig {
  title?: string;
  showBack?: boolean;
  showMenu?: boolean;
}

export default function useHeader(config: HeaderConfig) {
  const { setHeader } = useHeaderStore();

  useEffect(() => {
    setHeader(config);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.title, config.showBack, config.showMenu, setHeader]);
}
