export const usenullOrEmpty = (param) => {
  if (param === null) {
    return "Unknown";
  } else if (param === "") {
    return "Unknown";
  } else {
    return param;
  }
};
//CHecks if value is null or ""
