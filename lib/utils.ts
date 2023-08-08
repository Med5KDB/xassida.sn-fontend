import { APIResponse, Xassida } from "@/types"
import clipboardCopy from "clipboard-copy"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function unslugify(text: string) {
  return text?.replaceAll("_", " ")
}

export function flattenResult(data: any[] | undefined) {
  if (!data) return []
  const results: any = []
  data.forEach((res) => results.push(res.results))
  return results.flat()
}

export function isFavorite(favorites: Xassida[], id: number) {
  const index = favorites.findIndex((fav) => fav.id === id)
  return index == -1 ? false : true
}

export function copyText(text: string[]) {
  const toCopy = text.join("\n")
  try {
    let ret = navigator.clipboard.writeText(toCopy)
    return ret
  } catch (e) {
    // otherwise fallback to use clipboardCopy library
    return clipboardCopy(toCopy)
  }
}

export const milliSecondsToSeconds = (milliSeconds: number): number =>
  milliSeconds / 1000
export const secondsToMilliSeconds = (seconds: number): number => seconds * 1000

export const secondsFormatter = (seconds: number) => {
  if (!seconds || Number.isNaN(seconds)) {
    return ""
  }
  return new Date(seconds * 1000).toLocaleTimeString("fr", {
    timeZone: "Etc/UTC",
    hour12: false,
    minute: "2-digit",
    second: "2-digit",
    ...(seconds >= 3600 && { hour: "2-digit" }), // only include hours if the duration is more than 60 minutes
  })
}
