export const currencyFormatter = (
  number,
  currency = "USD",
  localization = "en-us"
) => {
  const currencyFormatted = new Intl.NumberFormat(localization, {
    style: "currency",
    currency: currency,
  }).format(number);

  return currencyFormatted;
};
