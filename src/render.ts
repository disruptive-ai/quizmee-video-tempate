import { getCompositions, renderMedia } from "@remotion/renderer";
import { bundle } from "@remotion/bundler";
import { data } from "./dataset";

const compositionId = "myComposition";

const start = async () => {
  const bundleLocation = await bundle({
    entryPoint: "./src/index.ts",
  });
 
  const allCompositions = await getCompositions(bundleLocation);
 
  const composition = allCompositions.find((c) => c.id === compositionId);
 
  if (!composition) {
    throw new Error(`No composition with the ID ${compositionId} found.`);
  }
 
  for (const entry of data) {
    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation: `out/${entry.title}.mp4`,
      inputProps: entry,
    });
  }
};
 
start()
  .then(() => {
    console.log("Rendered all videos");
  })
  .catch((err) => {
    console.log("Error occurred:", err);
  });