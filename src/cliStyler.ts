import { getStylerConfig } from "./helpers.js";
import { RESET } from "./constants.js";
import { StylerConfig, CLIStylerType, InitialStyler } from "./types.js";

class CLIStyler {
  public inputs: string[];

  constructor(...inputs: string[]) {
    this.inputs = inputs;
  }
}

const stylerConfig: StylerConfig = getStylerConfig();

const initialStyler: InitialStyler = {
  _chainedStyles: "",

  _paddingLeft: "",

  _paddingTop: "",

  _gap: "",

  _chainStyles(styleSequence: string) {
    this._chainedStyles = this._chainedStyles
      ? `${this._chainedStyles}${styleSequence}`
      : styleSequence;
  },

  inputs: [],

  render() {
    let resultText = this.inputs.join(this._gap);

    if (resultText.includes(RESET)) {
      resultText = resultText.replaceAll(
        RESET,
        `${RESET}${this._chainedStyles}`,
      );
    }

    return `${this._paddingTop}${this._paddingLeft}${this._chainedStyles}${resultText}${this._chainedStyles ? RESET : ""}`;
  },

  print() {
    console.log(this.render());
  },

  paddingLeft(numberOfSpaces: number) {
    this._paddingLeft = " ".repeat(numberOfSpaces);

    return this;
  },

  paddingTop(numberOfLines: number) {
    this._paddingTop = "\n".repeat(numberOfLines);

    return this;
  },

  gap(numberOfSpaces: number) {
    this._gap = " ".repeat(numberOfSpaces);

    return this;
  },

  toString() {
    return this.render();
  },
};

const baseStyler = stylerConfig.reduce(
  (resultStyler, [styleName, styleSequence]: StylerConfig[0]) => {
    Object.defineProperty(resultStyler, styleName, {
      get() {
        this._chainStyles(styleSequence);

        return this;
      },
    });

    return resultStyler;
  },
  { ...initialStyler },
) as CLIStylerType;

Object.setPrototypeOf(CLIStyler.prototype, baseStyler);

const cliStyler = (...messages: string[]) =>
  new CLIStyler(...messages) as CLIStylerType;

export { cliStyler };
