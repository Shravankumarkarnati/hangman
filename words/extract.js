const fs = require("fs");

const load = async () => {
  const file = await require("./wordsapi_sample.json");
  const allWords = await JSON.parse(JSON.stringify(file));
  const words = Object.keys(allWords);
  const consider = await words.filter((cur) => {
    if (cur.length > 6 && cur.length < 10) {
      if (!parseInt(cur)) return cur;
    }
  });
  const newConsider = consider.filter((cur) => allWords[cur].frequency > 2);
  const finalObject = {};
  newConsider.map((cur) => {
    let meaning = allWords[cur];
    finalObject[cur] = meaning;
  });
  const final = {};
  Object.keys(finalObject).filter((cur) => {
    if (finalObject[cur].definitions) {
      const def = finalObject[cur].definitions[0].definition;
      final[cur] = def;
    }
  });
  console.log(Object.keys(final).length);
  fs.writeFile("words.json", JSON.stringify(final), (err) => {
    if (err) throw err;
  });
  console.log("done");
};

load();
