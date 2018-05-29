import { IColorSet, IBaseColorSet } from './interfaces';

export function lighten(color: string, amount: number): string {
  const MAX = 255;
  let r = parseInt(color.substr(1, 2), 16);
  let g = parseInt(color.substr(3, 2), 16);
  let b = parseInt(color.substr(5, 2), 16);
  r = Math.min(Math.floor(r + (r * amount)), MAX);
  g = Math.min(Math.floor(g + (g * amount)), MAX);
  b = Math.min(Math.floor(b + (b * amount)), MAX);
  let rs = r.toString(16);
  if (rs.length === 1) {
    rs = '0' + rs;
  }
  let gs = g.toString(16);
  if (gs.length === 1) {
    gs = '0' + gs;
  }
  let bs = b.toString(16);
  if (bs.length === 1) {
    bs = '0' + bs;
  }
  return `#${rs}${gs}${bs}`;
}

export function darken(color: string, amount: number): string {
  return lighten(color, -amount);
}

export function addAlpha(color: string, alpha: number): string {
  if (color.length !== 7) {
    throw new Error('addAlpha only supports adding to #rrggbb format colors');
  }
  let alphaHex = Math.round(alpha * 255).toString(16);
  if (alphaHex.length === 1) {
    alphaHex = '0' + alphaHex;
  }
  return color + alphaHex;
}

export function generateFallbackColorSet(s: IBaseColorSet, type: 'light' | 'dark'): IColorSet {
  return {
    type,
    base: {
      background: null,
      foreground: null,
      accent: null,
      comments: null,
      strings: null,
      parameters: null,
      variables: null,
      numbers: null,
      booleans: null,
      functions: null,
      keywords: null,
      objects: null,
      properties: null,
      modules: null,
      identifiers: null,
      references: null,
      modifiers: null,
      storage: null,
      tag: null,
      errors: null
    },
    syntax: {
      general: (type === 'light' ? darken : lighten)(s.foreground, 0.1),
      brackets: (type === 'light' ? lighten : darken)(s.accent, 0.2),
      comment: s.comments? s.comments: (type === 'light' ? darken : lighten)(s.background, 0.2),
      string: s.strings,
      parameter: s.parameters,
      variable: s.variables,
      number: s.numbers,
      boolean: s.booleans,
      function: s.functions,
      property: s.properties,
      keyword: s.keywords,
      class: s.objects,
      classMember: (type === 'light' ? darken : lighten)(s.objects, 0.5),
      modules: s.modules,
      identifier: s.identifiers,
      reference: s.references,
      storage: s.storage,
      modifier: s.modifiers,
      cssClass: s.properties,
      cssId: s.references,
      cssTag: s.tag,
      htmlTag: s.tag,
      htmlBracket: darken(s.tag, 0.5),
      markdownQuote: s.strings
    },
    ui: {
      cursor: null,
      invisibles: (type === 'light' ? darken : lighten)(s.background, 0.2),
      guide: (type === 'light' ? darken : lighten)(s.background, 0.2),
      lineHighlight: null,
      findMatchHighlight: null,
      currentFindMatchHighlight: null,
      findRangeHighlight: null,
      rangeHighlight: null,
      selectionHighlight: null,
      selection: null,
      wordHighlight: null,
      wordHighlightStrong: null,
      activeLinkForeground: null
    },
    terminal: {
      black: null,
      red: null,
      green: null,
      yellow: null,
      blue: null,
      magenta: null,
      cyan: null,
      white: null,
      brightBlack: null,
      brightRed: null,
      brightGreen: null,
      brightYellow: null,
      brightBlue: null,
      brightMagenta: null,
      brightCyan: null,
      brightWhite: null
    }
  };
}
