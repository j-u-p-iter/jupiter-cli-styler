import type { ColorIds, ColorsConfig, StylerConfig, Entries } from "./types.js";
import { StyledSubject } from "./types.js";

export const colorIds: ColorIds = {
  text: {
    black: 30,
    red: 31,
    green: 32,
    yellow: 33,
    blue: 34,
    magenta: 35,
    cyan: 36,
    white: 37,
  },

  background: {
    black: 40,
    red: 41,
    green: 42,
    yellow: 43,
    blue: 44,
    magenta: 45,
    cyan: 46,
    white: 47,
  },
};

export const getStylerConfig = (): StylerConfig => {
  const result = (Object.entries(colorIds) as Entries<ColorIds>)
    .map(([styledSubject, colorsConfig]) => {
      return (Object.entries(colorsConfig) as Entries<ColorsConfig>).map(
        ([styleName, colorId]) => {
          const styleNamePrefix =
            styledSubject === StyledSubject.Text ? "" : "bg";
          const baseStyleName =
            styledSubject === StyledSubject.Text
              ? styleName
              : styleName[0]!.toUpperCase() + styleName.substring(1);

          const resultStyleName = `${styleNamePrefix}${baseStyleName}`;
          const styleSequence = `\u001b[${colorId}m`;

          return [resultStyleName, styleSequence];
        },
      );
    })
    .flat() as StylerConfig;

  return result;
};
