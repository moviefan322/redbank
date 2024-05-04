export const formatTime = (rawDate: string) => {
  let date = rawDate;
  // if ends in 00, remove 00
  if (date.startsWith("00")) {
    if (date.endsWith("00")) {
      return "12 AM";
    } else {
      return date.replace("00", "12") + " AM";
    }
  }
  if (date.endsWith("00")) {
    date = date.slice(0, -3);
  }
  // if starts with 0, remove zero and return with AM
  if (date.startsWith("0")) {
    return `${date.slice(1)} AM`;
  }
  //if starts with 10, 11 return with AM
  if (date.startsWith("10") || date.startsWith("11")) {
    return `${date} AM`;
  }
  //if starts with 12 return with PM
  if (date.startsWith("12")) {
    return `${date} PM`;
  }
  //if starts with 13-23, replace first two digits with subtract 12 and return with PM
  if (parseInt(date) >= 13 && parseInt(date) <= 23) {
    return `${parseInt(date) - 12}${date.slice(2)} PM`;
  }
  //if 00, replace 00 with 12 and add AM
  if (date === "00") {
    return `${date.replace("00", "12")} AM`;
  }
};
