import {
    format,
    parseISO,
    isToday,
    isYesterday,
    differenceInMinutes,
    differenceInHours,
    differenceInDays,
    subWeeks,
    subMonths,
    subYears,
    isAfter
} from "date-fns";

export function getRelativeTime(dateTime: string | Date): string {
    const date = typeof dateTime === "string" ? parseISO(dateTime) : dateTime;
    const now = new Date();

    const minutesDiff = differenceInMinutes(now, date);
    const hoursDiff = differenceInHours(now, date);
    const daysDiff = differenceInDays(now, date);

    if (minutesDiff < 1) return "just now";
    if (minutesDiff < 60) return `${minutesDiff} min${minutesDiff > 1 ? "s" : ""} ago`;
    if (hoursDiff < 24) return `${hoursDiff} hour${hoursDiff > 1 ? "s" : ""} ago`;

    if (isYesterday(date)) return "yesterday";
    if (daysDiff < 7) return `${daysDiff} days ago`; // Handles "2 days ago", "3 days ago", etc.

    const lastWeek = subWeeks(now, 1);
    const lastMonth = subMonths(now, 1);
    const lastYear = subYears(now, 1);

    if (isAfter(date, lastWeek)) return "last week";
    if (isAfter(date, lastMonth)) return "last month";
    if (isAfter(date, lastYear)) return "1yr ago";

    return format(date, "yyyy"); // Returns year (e.g., "2024", "2023")
}
