import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs))
}

export function isNativeApp() {
    if (typeof window === "undefined") return false
    return window.Capacitor?.isNative ?? false
}