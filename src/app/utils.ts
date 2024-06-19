import * as palette from "./colors";

export const modifySankeyData = (data: any) => {
  const colorPalette = [
    {
      category: "Environmental Impacts",
      color: "#85D45E",
      layer: 0,
    },
    {
      category: "Societal Impacts",
      color: "#37B6FE",
      layer: 0,
    },
    {
      category: "Governance Impacts",
      color: "#FB6724",
      layer: 0,
    },
    {
      category: "Evolution",
      layer: 1,
      color: [
        {
          name: "Satisfactorily",
          color: "#959595",
        },
        {
          name: "Poorly",
          color: "#7ED957",
        },
        {
          name: "Don't know",
          color: "#C11F1F",
        },
      ],
    },
    {
      category: "Priority",
      layer: 2,
      color: [
        {
          name: "High",
          color: "#1AA7EE",
        },
        {
          name: "Medium",
          color: "#FF914D",
        },
        {
          name: "Low",
          color: "#B8B8B8",
        },
      ],
    },
    {
      category: "SDG",
      layer: 3,
      color: [
        {
          name: "No Poverty",
          color: "#E5243B",
        },
        {
          name: "Zero Hunger",
          color: "#DDA83A",
        },
        {
          name: "Good Health and Well-being",
          color: "#4C9F38",
        },
        {
          name: "Quality Education",
          color: "#C5192D",
        },
        {
          name: "Gender Equality",
          color: "#FF3A21",
        },
        {
          name: "Clean Water and Sanitation",
          color: "#26BDE2",
        },
        {
          name: "Affordable and Clean Energy",
          color: "#FCC30B",
        },
        {
          name: "Decent Work and Economic Growth",
          color: "#A21942",
        },
        {
          name: "Industry, Innovation and Infrastructure",
          color: "#FD6925",
        },
        {
          name: "Reduced Inequalities",
          color: "#DD1367",
        },
        {
          name: "Sustainable Cities and Communities",
          color: "#FD9D24",
        },
        {
          name: "Responsible Consumption and Production",
          color: "#BF8B2E",
        },
        {
          name: "Climate Action",
          color: "#3F7E44",
        },
        {
          name: "Life Below Water",
          color: "#0A97D9",
        },
        {
          name: "Life on Land",
          color: "#56C02B",
        },
        {
          name: "Peace, Justice and Strong Institutions",
          color: "#00689D",
        },
        {
          name: "Partnerships for the Goals",
          color: "#19486A",
        },
      ],
    },
    {
      category: "Being",
      color: "#D4B88C",
      layer: 4,
    },
    {
      category: "Thinking",
      color: "#E585A1",
      layer: 4,
    },
    {
      category: "Relating",
      color: "#E84139",
      layer: 4,
    },
    {
      category: "Collaborating",
      color: "#FF6821",
      layer: 4,
    },
    {
      category: "Acting",
      color: "#661A30",
      layer: 4,
    },
  ];
  const getColor = (category: string, name: string) => {
    const colorData = colorPalette.find(
      (value) => value.category === category
    )?.color;
    if (colorData) {
      switch (category) {
        case "Evolution":
          return (colorData as any).find((data: any) => data.name === name)
            ?.color;
        case "Priority":
          return (colorData as any).find((data: any) => data.name === name)
            ?.color;
        case "SDG":
          return (colorData as any).find((data: any) => data.name === name)
            ?.color;
        default:
          return colorData;
      }
    }
  };

  const getLayer = (category: string) => {
    const layerData = colorPalette.find(
      (value) => value.category === category
    )?.layer;
    return layerData;
  };

  return {
    ...data,
    nodes: data.nodes.map((node: any) => {
      return {
        ...node,
        color: getColor(node.category, node.name),
        layer: getLayer(node.category),
      };
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
