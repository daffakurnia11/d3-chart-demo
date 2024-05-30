import * as palette from "./colors";

export const assignSankeyColor = (data: any) => {
  const colorPalette = [
    {
      category: "Environmental Impacts",
      color: "#85D45E",
    },
    {
      category: "Societal Impacts",
      color: "#37B6FE",
    },
    {
      category: "Governance Impacts",
      color: "#FB6724",
    },
    {
      category: "Evolution",
      color: ["#959595", "#7ED957", "#C11F1F"],
    },
    {
      category: "Priority",
      color: ["#1AA7EE", "#FF914D", "#B8B8B8"],
    },
    {
      category: "SDG",
      color: [
        "#E5243B", // SDG 1
        "#DDA83A", // SDG 2
        "#4C9F38", // SDG 3
        "#C5192D", // SDG 4
        "#FF3A21", // SDG 5
        "#26BDE2", // SDG 6
        "#FCC30B", // SDG 7
        "#A21942", // SDG 8
        "#FD6925", // SDG 9
        "#DD1367", // SDG 10
        "#FD9D24", // SDG 11
        "#BF8B2E", // SDG 12
        "#3F7E44", // SDG 13
        "#0A97D9", // SDG 14
        "#56C02B", // SDG 15
        "#00689D", // SDG 16
        "#19486A", // SDG 17
      ],
    },
    {
      category: "Being",
      color: "#D4B88C",
    },
    {
      category: "Thinking",
      color: "#E585A1",
    },
    {
      category: "Relating",
      color: "#E84139",
    },
    {
      category: "Collaborating",
      color: "#FF6821",
    },
    {
      category: "Acting",
      color: "#661A30",
    },
  ];
  const getColor = (category: string, name: string) => {
    const colorData = colorPalette.find(
      (value) => value.category === category
    )?.color;
    if (colorData) {
      switch (category) {
        case "Evolution":
          switch (name) {
            case "Well":
              return colorData[0];
            case "Average":
              return colorData[1];
            case "Poorly":
              return colorData[2];
          }
        case "Priority":
          switch (name) {
            case "High":
              return colorData[0];
            case "Medium":
              return colorData[1];
            case "Low":
              return colorData[2];
          }
        case "SDG":
          return colorData[Number(name.split(" ")[1]) - 1];
        default:
          return colorData;
      }
    }
  };

  return {
    ...data,
    nodes: data.nodes.map((node: any) => {
      return { ...node, color: getColor(node.category, node.name) };
    }),
  };
};

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
