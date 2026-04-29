"use client";

import { useCallback } from "react";

// For now, this is a mock implementation that just returns the English string.
// In the future, this can be hooked up to next-intl or a custom dictionary context.
export function useTranslation() {
  const t = useCallback((key: string) => {
    // Return the key directly as it's expected to be the English string itself for now.
    return key;
  }, []);

  return { t };
}
