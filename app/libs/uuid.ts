const UUID_FMT_ = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx";

export const uuidv4 = () => {
  const chars = UUID_FMT_.split("");
  for (let i = 0, len = chars.length; i < len; i++) {
    switch (chars[i]) {
      case "x":
        chars[i] = Math.floor(Math.random() * 16).toString(16);
        break;
      case "y":
        chars[i] = (Math.floor(Math.random() * 4) + 8).toString(16);
        break;
    }
  }
  return chars.join("");
};
