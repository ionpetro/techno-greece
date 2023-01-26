export const prepareEvents = (events) => {
  const preparedEvents = {};

  events.forEach((event) => {
    if (Object.hasOwn(preparedEvents, event.date)) {
      preparedEvents[event.date] = [...preparedEvents[event.date], event];
    } else {
      preparedEvents[event.date] = [event];
    }
  });

  return preparedEvents;
};
