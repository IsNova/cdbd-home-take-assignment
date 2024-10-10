import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function objectToFormData(item: object) {
  const formData = new FormData();

  for (let [key, val] of Object.entries(item)) {
    formData.append(key, val);
  }

  return formData;
}
