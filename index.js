"use strict";
exports.__esModule = true;
var path = require("path");
var failcoder_vscode_generator_1 = require("failcoder-vscode-generator");
var themeName = 'Failcoder Theme';
var colors = {
    lightwhite: '#efefef',
    white: '#d3d3d3',
    lightgray: '#afa3a3',
    gray: '#616161',
    darkgray: '#3C3F42',
    black: '#2d2d2d',
    background: '#26292C',
    backgroundaccent: '#36393C',
    backgroundtext: '#46494C',
    red: '#E92E2E',
    pink: '#fa7c82',
    peach: '#ff8757',
    parchment: '#E8CF7F',
    lightorange: '#f0c674',
    orange: '#ff9900',
    darkorange: '#fb5109',
    bloodorange: '#ff4225',
    rust: '#c44f01',
    bronze: '#C56900',
    brown: '#BE8C3E',
    lightyellow: '#e0bf48',
    yellow: '#ffdf0f',
    cream: '#dbb867',
    lightgreen: '#acd088',
    green: '#94ef1d',
    lime: '#aeff00',
    darkgreen: '#d9f656',
    mint: '#99cc99',
    cyan: '#8abeb7',
    blue: '#8eb2ff',
    darkblue: '#1481ff',
    ice: '#41b3ff',
    lightblue: '#bdd4ee',
    indigo: '#3300ff',
    purple: '#886dff',
    lightpurple: '#9966ff',
    fuschia: '#ff4180',
    magenta: '#ff4fDf'
};
var colorSet = {
    type: 'dark',
    base: {
        background: colors.background,
        foreground: colors.white,
        primary: colors.cream,
        secondary: colors.blue,
        tertiary: colors.mint,
        quaternary: colors.purple
    },
    syntax: {
        general: colors.white,
        boolean: colors.lime,
        "function": colors.ice,
        functionCall: colors.blue,
        modules: colors.yellow,
        identifier: colors.cream,
        keyword: colors.blue,
        reference: colors.orange,
        variable: colors.lightorange,
        parameter: colors.pink,
        support: colors.bloodorange,
        number: colors.lime,
        storage: colors.purple,
        string: '#ccffff',
        comment: colors.backgroundtext,
        "class": colors.lightorange,
        classMember: colors.ice,
        type: colors.lightpurple,
        modifier: colors.lightpurple,
        cssClass: colors.lightyellow,
        cssId: colors.orange,
        cssTag: colors.yellow,
        htmlTag: '#80ffaa',
        htmlBracket: '#009999',
        markdownQuote: colors.lightblue
    }
};
failcoder_vscode_generator_1.generateTheme(themeName, colorSet, path.join(__dirname, 'theme.json'));