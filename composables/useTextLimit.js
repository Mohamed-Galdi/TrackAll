export const useTextLimit = (text, limit = 20) => {
  return text.length > limit ? text.substring(0, limit) + "..." : text;
};
