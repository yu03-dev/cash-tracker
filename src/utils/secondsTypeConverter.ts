import { SecondsType } from "../types";

export const secondsTypeConverter = (time: SecondsType) => {
  const millisec = time._seconds * 1000 + time._nanoseconds / 1e6;
  const dateObject = new Date(millisec);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  const formattedString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  return formattedString;
};
