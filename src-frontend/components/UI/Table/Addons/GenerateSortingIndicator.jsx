export const GenerateSortingIndicator = (column) => {
  return column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : "";
};
