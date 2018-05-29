export interface IThemeGenerator {
  generateTheme(name: string, colorSet: IColorSet): string;
}

export interface IBaseColorSet  {
  background: string;
  foreground: string;
  accent: string;
  comments: string;
  strings: string;
  parameters: string;
  variables: string;
  numbers: string;
  booleans: string;
  functions: string;
  keywords: string;
  objects: string;
  properties: string;
  modules: string;
  identifiers: string;
  references: string;
  modifiers: string;
  storage: string;
  tag: string;
  errors: string;
}

export interface IColorSet {
  type: 'light' | 'dark';
  base: IBaseColorSet;
  syntax?: {
      general?: string;
      brackets?: string;
      boolean?: string;
      function?: string;
      modules?: string;
      identifier?: string;
      keyword?: string;
      number?: string;
      reference?: string;
      variable?: string;
      parameter?: string;
      property?: string;
      storage?: string;
      string?: string;
      comment?: string;
      class?: string;
      classVariable?: string;
      classMember?: string;
      modifier?: string;
      cssClass?: string;
      cssId?: string;
      cssTag?: string;
      htmlTag?: string;
      htmlBracket?: string;
      markdownQuote?: string;
  };
  ui?: {
    /** The color of the editor cursor/caret */
    cursor?: string;
    /** Visible whitespace (editor.renderWhitespace) */
    invisibles?: string;
    /** Indent guide */
    guide?: string;
    /** Line highlight, this will remove the line borders in favor of a solid highlight */
    lineHighlight?: string;

    findMatchHighlight?: string;
    currentFindMatchHighlight?: string;
    findRangeHighlight?: string;
    /** Highlights the line(s) of the current find match, this also applies to things like find symbol */
    rangeHighlight?: string;
    /** Highlights strings that match the current selection, excluding the selection itself */
    selectionHighlight?: string;

    selection?: string;
    wordHighlight?: string;
    wordHighlightStrong?: string;
    activeLinkForeground?: string;
  };
  terminal?: {
    black?: string;
    red?: string;
    green?: string;
    yellow?: string;
    blue?: string;
    magenta?: string;
    cyan?: string;
    white?: string;
    brightBlack?: string;
    brightRed?: string;
    brightGreen?: string;
    brightYellow?: string;
    brightBlue?: string;
    brightMagenta?: string;
    brightCyan?: string;
    brightWhite?: string;
  };
  overrides?: { [key: string]: string };
}
