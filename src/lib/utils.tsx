import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { format, formatDistanceToNowStrict } from "date-fns";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/**
 * Formats a date as 'dd, Mon, YYYY'
 * @param date A Date object, ISO string, or timestamp
 * @returns Formatted date string (e.g. '21, Apr, 2025')
 */
export const formatDate = (date: Date | string | number): string => {
  if (!date) return "";

  const dateObj = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  // Get day with leading zero if needed
  const day = String(dateObj.getDate()).padStart(2, "0");

  // Get month abbreviation
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const month = months[dateObj.getMonth()];

  // Get full year
  const year = dateObj.getFullYear();

  return `${day} ${month}, ${year}`;
};

/**
 * Formats time as 'HH:MM' in 24-hour format
 * @param date A Date object, ISO string, or timestamp
 * @returns Formatted time string (e.g. '14:30')
 */
export const formatTime = (date: Date | string | number): string => {
  if (!date) return "";

  const dateObj = new Date(date);

  // Check if the date is valid
  if (isNaN(dateObj.getTime())) {
    return "";
  }

  // Get hours and minutes with leading zeros if needed
  const hours = String(dateObj.getHours()).padStart(2, "0");
  const minutes = String(dateObj.getMinutes()).padStart(2, "0");

  return `${hours}:${minutes}`;
};

/**
 * Formats a date and time as 'dd, Mon, YYYY HH:MM'
 * @param date A Date object, ISO string, or timestamp
 * @returns Formatted date and time string (e.g. '21, Apr, 2025 14:30')
 */
export const formatDateTime = (date: Date | string | number): string => {
  const formattedDate = formatDate(date);
  const formattedTime = formatTime(date);

  if (!formattedDate || !formattedTime) return "";

  return `${formattedDate} ${formattedTime}`;
};

/**
 * Formats a date and time in relative terms. eg.'5 days ago'
 * @param date A Date object, ISO string, or timestamp
 * @returns Formatted relative date/time string (e.g. '5 days ago')
 */
export function formatRelativeDate(date: Date | string): string {
  const d = typeof date === "string" ? new Date(date) : date;
  const delta = Date.now() - d.getTime();
  if (delta < 5_000) return "Just now";
  if (isNaN(d.getTime())) return "";
  if (delta < 2 * 24 * 60 * 60 * 1000 && delta >= 24 * 60 * 60 * 1000) {
    return "Yesterday";
  }
  return formatDistanceToNowStrict(d, { addSuffix: true });
}

/**
 * Formats a date as 'yyyy-MM-dd'
 * @param date A Date object, ISO string, or timestamp
 * @returns Formatted date string (e.g. '2025-04-25')
 */
export const formatFormDate = (
  date?: number | Date | string | null,
  dateFormat = "yyyy-MM-dd",
) => {
  if (date) return String(format(new Date(date), dateFormat));
  return "N/A";
};

/**
 * Converts SNAKE_CASE to a human-readable label.
 * Example: "HOME_VISIT" → "Home Visit"
 */
export const formatSnakeCase = (str: string): string => {
  if (!str) return str;

  return str
    .toLowerCase()
    .split("_")
    .map(
      (word) => word.charAt(0).toUpperCase() + word.slice(1), // Capitalize each word
    )
    .join(" ");
};

export const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .join("");

/**
 * Converts text to a uppercase.
 * Example: "home visit" → "Home Visit"
 */
export const capitalize = (string = "") => {
  return string.replace(/\b\w/g, (char) => char.toUpperCase());
};
