export { cn } from "cn";
export function formatBuddhistDateTime(dateString?: string) {
  if (!dateString) return "";

  let date: Date;

  if (
    dateString.includes(":") &&
    !dateString.includes("T") &&
    !dateString.includes("-")
  ) {
    const [hours, minutes] = dateString.split(":");
    date = new Date();
    date.setHours(parseInt(hours, 10), parseInt(minutes, 10), 0, 0);
  } else {
    date = new Date(dateString);
  }

  const formatter = new Intl.DateTimeFormat("th-TH", {
    calendar: "buddhist",
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });

  return formatter.format(date);
}
