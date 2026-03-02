export const dateFormatter = (
  date,
  format = {
    day: "numeric",
    month: "numeric",
    year: "numeric",
  },
  localization = "default"
) => {
  const dateFormatted = new Intl.DateTimeFormat(localization, format).format(
    new Date(date)
  );

  return dateFormatted;
};
