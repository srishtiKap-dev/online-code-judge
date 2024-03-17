import React from "react";

function TimestampConverter(timestamp) {
  const dateIST = new Date(timestamp);
  const options = {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "numeric",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    hour12: false
  };
  const formattedDate = new Intl.DateTimeFormat("en-IN", options).format(
    dateIST
  );

  return (
    <div>
      <p>{formattedDate}</p>
    </div>
  );
}

export default TimestampConverter;
