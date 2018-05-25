import * as path from 'path';
import { generateTheme, IColorSet } from 'failcoder-vscode-generator';

const themeName = 'Failcoder Theme';

const colorSet: IColorSet = {
  type: 'dark',
  base: {
    background: '#26292C',
    foreground: '#C6C9CC',
    accent: '#BDD4EE',
    comments: '#46494C',
    strings: '#95C797',
    parameters: '#F57C00',
    variables: '#F0C674',
    numbers: '#76FF03',
    booleans: '#76FF03',
    functions: '#41b3ff',
    keywords: '#8EB2FF',
    objects: '#EF5350',
    properties: '#BFD3F0',
    modules: '#18FFFF',
    identifiers: '#dbb867',
    references: '#DD2C00',
    modifiers: '#9966ff',
    storage: '#886dff',
    tag: '#ffbf48',
    errors: '#E92E2E'
  },
};

generateTheme(themeName, colorSet, path.join(__dirname, 'theme.json'));
