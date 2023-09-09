import { SecondsType } from "../types";

// modeで表示内容を分ける
// わかりにくいから後でリファクタリング
export const TimeConverter = (time: SecondsType, mode: "day" | "seconds") => {
  const millisec = time._seconds * 1000 + time._nanoseconds / 1e6;
  const dateObject = new Date(millisec);
  const year = dateObject.getFullYear();
  const month = String(dateObject.getMonth() + 1).padStart(2, "0");
  const day = String(dateObject.getDate()).padStart(2, "0");
  const hours = String(dateObject.getHours()).padStart(2, "0");
  const minutes = String(dateObject.getMinutes()).padStart(2, "0");
  const seconds = String(dateObject.getSeconds()).padStart(2, "0");

  let formattedString: string;
  if (mode === "seconds") {
    formattedString = `${year}/${month}/${day} ${hours}:${minutes}:${seconds}`;
  } else if (mode === "day") {
    formattedString = `${year}/${month}/${day}`;
  } else {
    return;
  }
  return formattedString;
};
