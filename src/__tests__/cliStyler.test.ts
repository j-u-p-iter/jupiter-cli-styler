import { FormatTextApiMethod } from "../types.js";
import { cliStyler } from "../cliStyler.js";

describe("cliStyler", () => {
  it.each<{
    colorName: FormatTextApiMethod;
    expectedColorId: number;
  }>([
    {
      colorName: "black",
      expectedColorId: 30,
    },
    {
      colorName: "red",
      expectedColorId: 31,
    },
    {
      colorName: "green",
      expectedColorId: 32,
    },
    {
      colorName: "yellow",
      expectedColorId: 33,
    },
    {
      colorName: "blue",
      expectedColorId: 34,
    },
    {
      colorName: "magenta",
      expectedColorId: 35,
    },
    {
      colorName: "cyan",
      expectedColorId: 36,
    },
    {
      colorName: "white",
      expectedColorId: 37,
    },
  ])(
    "sets up $colorName text color properly",
    ({ colorName, expectedColorId }) => {
      expect(cliStyler("some text")[colorName].render()).toBe(
        `\u001b[${expectedColorId}msome text\u001b[0m`,
      );
    },
  );

  it.each<{
    colorName: FormatTextApiMethod;
    expectedColorId: number;
  }>([
    {
      colorName: "bgBlack",
      expectedColorId: 40,
    },
    {
      colorName: "bgRed",
      expectedColorId: 41,
    },
    {
      colorName: "bgGreen",
      expectedColorId: 42,
    },
    {
      colorName: "bgYellow",
      expectedColorId: 43,
    },
    {
      colorName: "bgBlue",
      expectedColorId: 44,
    },
    {
      colorName: "bgMagenta",
      expectedColorId: 45,
    },
    {
      colorName: "bgCyan",
      expectedColorId: 46,
    },
    {
      colorName: "bgWhite",
      expectedColorId: 47,
    },
  ])(
    "sets up $colorName background color properly",
    ({ colorName, expectedColorId }) => {
      expect(cliStyler("some text")[colorName].render()).toBe(
        `\u001b[${expectedColorId}msome text\u001b[0m`,
      );
    },
  );

  it("applies colors automatically when colored messages are used as part of a string", () => {
    expect(`${cliStyler("one").red}, ${cliStyler("two").bgBlue}`).toBe(
      "\u001b[31mone\u001b[0m, \u001b[44mtwo\u001b[0m",
    );
  });

  it("chains colors properly", () => {
    expect(cliStyler("some message").red.bgBlue.render()).toBe(
      "\u001b[31m\u001b[44msome message\u001b[0m",
    );
  });

  it("adds gaps between messages", () => {
    expect(
      cliStyler("some message", "one more message", "and one more message")
        .gap(2)
        .render(),
    ).toBe("some message  one more message  and one more message");
  });

  it("adds left padding before the message", () => {
    expect(cliStyler("some message").paddingLeft(5).render()).toBe(
      "     some message",
    );
  });

  it("adds empty lines before the message", () => {
    expect(cliStyler("some message").paddingTop(2).render()).toBe(
      "\n\nsome message",
    );
  });
});
