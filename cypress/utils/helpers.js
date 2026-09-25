import { format, parseISO } from "date-fns";

export function formatDateForModal(date) {
  const parsedDate = date instanceof Date ? date : parseISO(date);
  return format(parsedDate, "dd MMMM,yyyy");
}
