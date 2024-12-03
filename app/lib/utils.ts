import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import createTransformer from "tailwind-group-variant";

export const tw = createTransformer({ separatorChar: " " });
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
