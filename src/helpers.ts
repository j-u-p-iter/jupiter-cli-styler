import type { ColorIds, ColorsConfig, StylerConfig, Entries } from "./types.js";
import { StyledSubject } from "./types.js";
import { colorIds } from "./constants.js";

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
