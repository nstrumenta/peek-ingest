import { $, argv, fs, path } from "zx";

console.log(argv);
const { infile, outfile } = argv;
if (!infile) {
  throw new Error("--infile argument missing");
}

const { base, dir, name } = path.parse(infile);

console.log(infile, path.parse(infile));

const output = { duration: 0, creationTime: 0 };
$.log = (entry) => {
  const extractDuration = (message: string) => {
    const regex = /Duration: (\d{2})\:(\d{2})\:(\d{2})\.(\d{2})/gm;
    const matches = regex.exec(String(message));
    if (matches != null) {
      const h = Number(matches[1]);
      const m = Number(matches[2]);
      const s = Number(matches[3]);
      const decis = Number(matches[4]);
      output.duration = (h * 3600 + m * 60 + s) * 1000 + decis + 10;
    }
  };
  const extractCreationTime = (message: string) => {
    if (message.includes("creation_time")) {
      const creationTimeString = message.split(": ")[1];
      const creationTime = new Date(creationTimeString).getTime();
      if (output.creationTime === 0) output.creationTime = creationTime;
      if (output.creationTime !== creationTime) {
        console.log("multiple creation times", creationTime, message);
      }
    }
  };
  switch (entry.kind) {
    case "stdout":
      entry.data
        .toString("utf-8")
        .split(/\r?\n/)
        .forEach((line) => {
          extractDuration(line);
          extractCreationTime(line);
        });
      break;
  }
};

void (async function () {
  await $`docker run --rm -it -v ${dir}:/video linuxserver/ffmpeg -i /video/${base}`;
  console.log(output);
  if (outfile) {
    await fs.writeFile(outfile, JSON.stringify(output));
  }
})();
