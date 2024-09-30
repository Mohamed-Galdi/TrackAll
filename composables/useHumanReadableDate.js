import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

export const useHumanReadableDate = (date) => {
  return computed(() => {
    return date ? dayjs(date).fromNow() : "";
  });
};
