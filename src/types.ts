export type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

enum Color {
  Black = "black",
  Red = "red",
  Green = "green",
  Yellow = "yellow",
  Blue = "blue",
  Magenta = "magenta",
  Cyan = "cyan",
  White = "white",
}

export type ColorsConfig = {
  [key in Color]: number;
};

export enum StyledSubject {
  Text = "text",
  Background = "background",
}

export type ColorIds = {
  [key in StyledSubject]: ColorsConfig;
};

export type StylerConfig = [string, string][];

export type StylerFormatTextApi = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "bgBlack",
  "bgRed",
  "bgGreen",
  "bgYellow",
  "bgBlue",
  "bgMagenta",
  "bgCyan",
  "bgWhite",
];

export type FormatTextApiMethod = StylerFormatTextApi[number];

export type BaseStyler = {
  [key in FormatTextApiMethod]: (() => CLIStylerType) & CLIStylerType;
};

export type CLIStylerType = InitialStyler & BaseStyler;

export type InitialStyler = {
  _chainedStyles: string;
  _paddingLeft: string;
  _paddingTop: string;
  _gap: string;
  _chainStyles: (styleSequence: string) => void;

  inputs: string[];
  render: () => string;
  print: () => void;
  paddingLeft: (numberOfSpaces: number) => InitialStyler;
  paddingTop: (numberOfLines: number) => InitialStyler;
  gap: (numberOfSpaces: number) => InitialStyler;
  toString: () => string;
};
