// src/lib/utils.js

import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// The `cn` function combines class names with conditional logic and merges Tailwind CSS classes.
export function cn(...inputs) {
  return twMerge(clsx(inputs));
}
