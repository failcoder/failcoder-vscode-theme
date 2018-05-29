import { IColorSet, IThemeGenerator, IBaseColorSet } from './interfaces';
import { darken, lighten } from './color';

export interface IVscodeJsonThemeSetting {
  name: string;
  scope: string;
  settings: {
    foreground?: string
    fontStyle?: string
  };
}

export type ColorFetcher = (colorSet: IColorSet) => string;
export type ColorGenerator = (color: string) => any;

export interface IRuleGenerator {
  color: ColorFetcher;
  generate: ColorGenerator;
}

const enum FontStyle {
  NONE = 0,
  ITALIC = 1 << 0,
  BOLD = 1 << 1,
  UNDERLINE = 1 << 2
}

function getGlobalSettingGenerator(name: string): ColorGenerator {
  return (color: string) => {
    if (!color) {
      return undefined;
    }
    const result: any = {};
    result[name] = color;
    return result;
  };
}

function getSimpleColorGenerator(name: string, scope: string, fontStyle: number = FontStyle.NONE): ColorGenerator {
  return (color: string) => {
    let colorRule: IVscodeJsonThemeSetting = {
      'name': name,
      'scope': scope,
      'settings': {
        'foreground': color
      }
    };
    let fontStyles: string[] = [];
    if (fontStyle & FontStyle.ITALIC) {
      fontStyles.push('italic');
    }
    if (fontStyle & FontStyle.BOLD) {
      fontStyles.push('bold');
    }
    if (fontStyle & FontStyle.UNDERLINE) {
      fontStyles.push('underline');
    }
    if (fontStyles.length > 0) {
      colorRule.settings.fontStyle = fontStyles.join(' ');
    }
    return colorRule;
  };
}

export const globalRules: IRuleGenerator[] = [
  { color: s => s.base.background,     generate: getGlobalSettingGenerator('background') },
  { color: s => s.base.foreground,     generate: getGlobalSettingGenerator('foreground') }
];

export const tokenRules: IRuleGenerator[] = [
  { color: s => s.syntax.general,      generate: getSimpleColorGenerator('General', 'meta.tag, meta.block, meta.definition.variable, meta.embedded, punctuation.separator') },
  { color: s => s.syntax.brackets,     generate: getSimpleColorGenerator('Brackets', 'punctuation.definition.block, punctuation.definition.binding-pattern, punctuation.definition.parameters, punctuation.section.embedded, meta.brace', FontStyle.BOLD) },
  { color: s => s.syntax.string,       generate: getSimpleColorGenerator('String', 'string') },
  { color: s => s.syntax.boolean,      generate: getSimpleColorGenerator('Boolean', 'constant.language.boolean', FontStyle.ITALIC) },
  { color: s => s.syntax.number,       generate: getSimpleColorGenerator('Number', 'constant.numeric') },
  { color: s => s.syntax.reference,    generate: getSimpleColorGenerator('Elevated', 'variable.language.this, support.type.object, support.variable, constant.language, support.constant') },
  { color: s => s.syntax.variable,     generate: getSimpleColorGenerator('Variable', 'meta.import, support.variable.property, variable.other.readwrite.alias') },
  { color: s => s.syntax.property,     generate: getSimpleColorGenerator('Property', 'support.variable.property, variable.other.property, variable.other.object.property') },
  { color: s => s.syntax.identifier,   generate: getSimpleColorGenerator('Identifier', 'support.class') },
  { color: s => s.syntax.keyword,      generate: getSimpleColorGenerator('Keyword', 'keyword.control, meta.function-call entity.name.function') },
  { color: s => s.syntax.parameter,    generate: getSimpleColorGenerator('Parameter', 'variable.parameter') },
  { color: s => s.syntax.storage,      generate: getSimpleColorGenerator('Storage', 'meta.var.expr storage.type, storage.type.class, storage.type.function, keyword.control.flow, keyword.operator.new') },
  { color: s => s.syntax.modules,      generate: getSimpleColorGenerator('Modules', 'entity.name.type.module, support.module, support.node, entity.other.inherited-class', FontStyle.BOLD | FontStyle.ITALIC) },
  { color: s => s.syntax.comment,      generate: getSimpleColorGenerator('Comment', 'comment', FontStyle.ITALIC) },
  { color: s => s.syntax.class,        generate: getSimpleColorGenerator('Class', 'new.expr entity.name.type, entity.name.type.class', FontStyle.BOLD) },
  { color: s => s.syntax.classMember,  generate: getSimpleColorGenerator('Class member', 'meta.method.declaration, variable.language.super, meta.definition.method, meta.definition.property variable.object.property') },
  { color: s => s.syntax.function,     generate: getSimpleColorGenerator('Function', 'meta.definition.variable entity.name.function') },
  { color: s => s.syntax.keyword,      generate: getSimpleColorGenerator('Template expression', 'template.expression.begin, template.expression.end') },
  { color: s => s.syntax.modifier,     generate: getSimpleColorGenerator('Modifier', 'modifier, storage.modifier, support.type') },
  /**
   * JSON
   */
  { color: s => s.syntax.identifier,   generate: getSimpleColorGenerator('JSON key', 'source.json meta.object-literal.key, meta.object-literal.key string, support.type.property-name.json') },
  { color: s => s.syntax.keyword,      generate: getSimpleColorGenerator('JSON constant', 'constant.language.json') },
  /**
   * CSS
   */
  { color: s => s.syntax.cssClass,     generate: getSimpleColorGenerator('CSS class', 'entity.other.attribute-name.class') },
  { color: s => s.syntax.cssId,        generate: getSimpleColorGenerator('CSS ID', 'entity.other.attribute-name.id') },
  { color: s => s.syntax.cssTag,       generate: getSimpleColorGenerator('CSS tag', 'source.css entity.name.tag') },
  /**
   * HTML
   */
  { color: s => s.syntax.htmlBracket,  generate: getSimpleColorGenerator('HTML bracket', 'punctuation.definition.tag') },
  { color: s => s.syntax.htmlTag,      generate: getSimpleColorGenerator('HTML tag', 'entity.name.tag, entity.other.attribute-name, meta.tag.attributes, support.class.component') },
  /**
   * Ini
   */
  { color: s => s.syntax.identifier,   generate: getSimpleColorGenerator('INI property name', 'keyword.other.definition.ini') },
  { color: s => s.syntax.keyword,      generate: getSimpleColorGenerator('INI section title', 'entity.name.section.group-title.ini') },
  /**
   * C#
   */
  { color: s => s.syntax.class,        generate: getSimpleColorGenerator('C# class',         'source.cs meta.class.identifier storage.type', FontStyle.UNDERLINE) },
  { color: s => s.syntax.classMember,  generate: getSimpleColorGenerator('C# class method',  'source.cs meta.method.identifier entity.name.function') },
  { color: s => s.syntax.function,     generate: getSimpleColorGenerator('C# function call', 'source.cs meta.method-call meta.method, source.cs entity.name.function') },
  { color: s => s.syntax.modifier,     generate: getSimpleColorGenerator('C# type',          'source.cs storage.type') },
  { color: s => s.syntax.modifier,     generate: getSimpleColorGenerator('C# return type',   'source.cs meta.method.return-type') },
  { color: s => s.syntax.comment,      generate: getSimpleColorGenerator('C# preprocessor',  'source.cs meta.preprocessor') },
  { color: s => s.syntax.general,      generate: getSimpleColorGenerator('C# namespace',     'source.cs entity.name.type.namespace') },
  /**
   * Markdown
   */
  { color: s => s.syntax.keyword,       generate: getSimpleColorGenerator('Markdown heading', 'markup.heading') },
  { color: s => s.syntax.identifier,    generate: getSimpleColorGenerator('Markdown link text', 'text.html.markdown meta.link.inline, meta.link.reference') },
  { color: s => s.syntax.markdownQuote, generate: getSimpleColorGenerator('Markdown block quote', 'text.html.markdown markup.quote') },
  { color: s => s.syntax.general,       generate: getSimpleColorGenerator('Markdown list item', 'text.html.markdown beginning.punctuation.definition.list') },
  { color: s => s.syntax.identifier,    generate: getSimpleColorGenerator('Markdown italic', 'markup.italic', FontStyle.ITALIC) },
  { color: s => s.syntax.identifier,    generate: getSimpleColorGenerator('Markdown bold', 'markup.bold', FontStyle.BOLD) },
  { color: s => s.syntax.identifier,    generate: getSimpleColorGenerator('Markdown bold italic', 'markup.bold markup.italic, markup.italic markup.bold', FontStyle.BOLD | FontStyle.ITALIC) },
  /**
   * Misc
   */
  { color: s => s.syntax.identifier,   generate: getSimpleColorGenerator('YAML key', 'entity.name.tag.yaml') },
  { color: s => s.syntax.general,      generate: getSimpleColorGenerator('Variable fix', 'meta.object-literal.key') }
];
