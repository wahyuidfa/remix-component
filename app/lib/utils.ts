import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import createTransformer from "tailwind-group-variant";

export const tw = createTransformer({ separatorChar: " " });
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface WrapperProps {
  if: boolean;
  with: (children: React.ReactNode) => JSX.Element;
  children: React.ReactNode;
}

export const Wrap: React.FC<WrapperProps> = ({
  if: condition,
  with: wrapper,
  children,
}) => {
  return condition ? wrapper(children) : children;
};

