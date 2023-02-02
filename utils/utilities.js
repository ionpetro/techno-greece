const transformDate = (date) => {
  let options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  if (date) {
    return new Date(date)
      .toLocaleTimeString("en-us", options)
      .split(",")
      .join("");
  }
  return null;
};

export const isThreeDaysAgo = (d) => {
  const date = new Date(d).getTime();
  const threeDaysAgo = new Date().getTime() - 3 * (1000 * 60 * 60 * 24);
  return date < threeDaysAgo;
};
