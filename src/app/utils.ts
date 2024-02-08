import * as palette from "./colors";

export const assignPaletteData = (type: string) => {
  let colorPalette: string[];
  switch (type.toUpperCase()) {
    case "COLLABORATING":
      colorPalette = palette.colorCollaborating;
      break;
    case "BEING":
      colorPalette = palette.colorBeing;
      break;
    case "ACTING":
      colorPalette = palette.colorActing;
      break;
    case "THINKING":
      colorPalette = palette.colorThinking;
      break;
    default:
      colorPalette = palette.colorRelating;
      break;
  }
  return colorPalette;
};

export const assignColorsToData = (data: any) => {
  data.children.forEach((child: any, i: number) => {
    let colorPalette: string[] = assignPaletteData(child.name);
    assignColorPalette(child, colorPalette);
  });
  return data;
};

export function assignColorPalette(data: any, color: string[]) {
  data.color = color[0];
  if (data.children) {
    data.children.map((child: any) => {
      if (child.score > 69) {
        child.color = color[0];
      } else if (child.score <= 69 && child.score > 60) {
        child.color = color[1];
      } else {
        child.color = color[2];
      }
    });
  }
}
