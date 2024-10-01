import dayjs from "dayjs";

export const useFormattedDate = (date) => {
  return date ? dayjs(date).format("YYYY-MM-DD") : "";
};
