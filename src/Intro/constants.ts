// Change any of these to update your video live.
import { continueRender, delayRender, staticFile } from "remotion";

const waitForFonts = delayRender();
const font1 = new FontFace(
  `OpenDyslexic`,
  `url('${staticFile("OpenDyslexic-Regular.otf")}') format('opentype')`
);
const font2 = new FontFace(
  `MoreSugar`,
  `url('${staticFile("MoreSugar-Regular.otf")}') format('opentype')`
);

Promise.all([font1.load(), font2.load()])
  .then(() => {
    document.fonts.add(font1);
    document.fonts.add(font2);
    continueRender(waitForFonts);
  })
  .catch((err) => console.log("Error loading fonts", err));


export const COLOR_1 = '#86A8E7';
export const COLOR_2 = '#91EAE4';

export const FONT_FAMILY = 'SF Pro Text, Helvetica, Arial, sans-serif';
export const OPENDYSLEXIC = 'OpenDyslexic';
export const MORESUGAR = 'MoreSugar';
