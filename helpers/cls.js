export const cls = {
  log: (data, data1 = " Data: ") => {
    if (typeof data1 !== "string") {
      console.log(
        `%c ${data} `,
        "font-size: large; background: grey; color: white"
      );
      console.log(data1);
    } else {
      console.log(
        `%c ${data} `,
        "font-size: large; background: #eee; color: black"
      );
    }
  },
};
