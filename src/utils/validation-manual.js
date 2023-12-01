export const addNewNewsValidation = (bodies) => {
  let data = [];

  Object.getOwnPropertyNames(bodies).forEach((key) => {
    if (key.includes("sub_title") || key.includes("content")) {
      const index = parseInt(key.at(-1)) - 1;

      if (!data[index]) {
        data[index] = [];
      }
      data[index] = key.includes("sub")
        ? [bodies[key], ...data[index]]
        : [...data[index], bodies[key]];
    }
  });

  data = data.map((d) => {
    d = {
      sub_title: d[0],
      content: d[1],
    };
    return d;
  });

  return data;
};

// const result = addNewNewsValidation({
//   nama: "wirawan",
//   kelas: "H",
//   sub_title1: "asdf",
//   content1: "asdf",
//   sub_title2: "asdf2",
//   content2: "asdf2",
//   sub_title3: "asdf3",
//   content3: "asdf3",
// });
// console.log(result);
