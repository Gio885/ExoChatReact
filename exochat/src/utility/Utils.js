const { DateTime } = require("luxon");

export function formattaData(data) {
  return DateTime.fromISO(data).toFormat("HH:mm dd MMM yy");
}