export const formatDate = (date) => {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  const formattedDate = new Date(date)
    .toLocaleDateString("en-US", options)
    .split(",");
  return { weekday: formattedDate[0], month: formattedDate[1] };
};
