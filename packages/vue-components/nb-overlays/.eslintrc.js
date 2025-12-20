/* eslint-env node */
require('@rushstack/eslint-patch/modern-module-resolution')

export default {
  root: true,
  env: {
    node: true,
    browser: true,
    es6: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
    ecmaVersion: 'latest',
  },
  rules: {
    "@typescript-eslint/no-unused-vars": ['error', { 'argsIgnorePattern': '^_' }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unsafe-function-type": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-this-alias": "off",
    "@typescript-eslint/no-inferrable-types": "error", // Opcional: Para evitar a atribuição de tipos desnecessários
    "@typescript-eslint/explicit-function-return-type": "off", // Garante que funções tenham tipo de retorno explícito
    "@typescript-eslint/typedef": "error",
    /*@typescript-eslint/typedef': [
      "error",
      {
        "arrayDestructuring": true,
        "objectDestructuring": true,
        "memberVariableDeclaration": true,
        "parameter": true,
        "propertyDeclaration": true
      }
    ]*/ "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "array-element-newline": ["error", "consistent"],
    "array-bracket-newline": ["error", "consistent"],
    "object-curly-newline": "off",
    quotes: [
      "error",
      "single",
      {
        avoidEscape: true,
      },
    ],
    "no-unused-vars": [
      "error",
      {
        vars: "all",
        varsIgnorePattern: "css",
        args: "all",
      },
    ],
    "no-use-before-define": [
      "error",
      {
        functions: false,
        classes: true,
        variables: false,
      },
    ],
    "no-var": "error",
    "prefer-const": "error",
    eqeqeq: [
      "error",
      "always",
      {
        null: "ignore",
      },
    ],
    "no-array-constructor": "error",
    "no-new-object": "error",
    "no-bitwise": "error",
    "no-redeclare": "error",
    "no-proto": "error",
    "no-invalid-regexp": "error",
    "no-warning-comments": [
      "off",
      {
        terms: ["todo", "fixme"],
        location: "anywhere",
      },
    ],
    "space-before-function-paren": [
      "error",
      {
        anonymous: "always",
        named: "always",
        asyncArrow: "always",
      },
    ],
    "no-new": "off",
    "no-implied-eval": "off",
    "handle-callback-err": "off",
    "no-extend-native": "off",
    semi: "off",
    indent: ["error", 2, { SwitchCase: 1 }],
    'no-tabs': "error",
    'vue/no-v-html': 'off',
    "vue/no-parsing-error": [
      "error",
      {
        "abrupt-closing-of-empty-comment": true,
        "absence-of-digits-in-numeric-character-reference": true,
        "cdata-in-html-content": true,
        "character-reference-outside-unicode-range": true,
        "control-character-in-input-stream": true,
        "control-character-reference": true,
        "eof-before-tag-name": true,
        "eof-in-cdata": true,
        "eof-in-comment": true,
        "eof-in-tag": true,
        "incorrectly-closed-comment": true,
        "incorrectly-opened-comment": true,
        "invalid-first-character-of-tag-name": true,
        "missing-attribute-value": true,
        "missing-end-tag-name": true,
        "missing-semicolon-after-character-reference": true,
        "missing-whitespace-between-attributes": true,
        "nested-comment": true,
        "noncharacter-character-reference": true,
        "noncharacter-in-input-stream": true,
        "null-character-reference": true,
        "surrogate-character-reference": true,
        "surrogate-in-input-stream": true,
        "unexpected-character-in-attribute-name": true,
        "unexpected-character-in-unquoted-attribute-value": true,
        "unexpected-equals-sign-before-attribute-name": true,
        "unexpected-null-character": true,
        "unexpected-question-mark-instead-of-tag-name": true,
        "unexpected-solidus-in-tag": true,
        "unknown-named-character-reference": true,
        "end-tag-with-attributes": true,
        "duplicate-attribute": true,
        "end-tag-with-trailing-solidus": true,
        "non-void-html-element-start-tag-with-trailing-solidus": false,
        "x-invalid-end-tag": true,
        "x-invalid-namespace": true,
      },
    ],
    "vue/order-in-components": [
      "error",
      {
        order: [
          "el",
          "name",
          "key",
          "parent",
          "functional",
          ["delimiters", "comments"],
          ["components", "directives", "filters"],
          "extends",
          "mixins",
          ["provide", "inject"],
          "ROUTER_GUARDS",
          "layout",
          "middleware",
          "validate",
          "scrollToTop",
          "transition",
          "loading",
          "inheritAttrs",
          "model",
          "emits",
          ["props", "propsData"],
          "setup",
          "asyncData",
          "data",
          "fetch",
          "head",
          "computed",
          "watch",
          "watchQuery",
          "LIFECYCLE_HOOKS",
          "methods",
          ["template", "render"],
          "renderError",
        ],
      },
    ],
    "vue/v-on-event-hyphenation": [
      "error",
      "always",
      {
        autofix: true,
        ignore: [],
      },
    ],
    "vue/require-default-prop": "off",
    "vue/component-tags-order": [
      "error",
      {
        order: [["script", "template"], "style"],
      },
    ],
    "vue/component-name-in-template-casing": ["error", "PascalCase"],
    "vue/valid-v-slot": [
      "error",
      {
        allowModifiers: true,
      },
    ],
    "vue/html-self-closing": [
      "error",
      {
        html: {
          void: "always",
          normal: "never",
          component: "always",
        },
        svg: "always",
        math: "always",
      },
    ],
    "vue/html-closing-bracket-newline": [
      "error",
      {
        singleline: "never",
        multiline: "always",
      },
    ],
    "vue/multi-word-component-names": [
      "error",
      {
        ignores: multiWordComponentNameIgnore,
      },
    ],
    "vue/script-indent": [
      "error",
      2,
      {
        baseIndent: 0,
        switchCase: 1,
      },
    ],
    "vue/html-indent": [
      "error",
      2,
      {
        attribute: 1,
        baseIndent: 1,
        closeBracket: 0,
        alignAttributesVertically: true,
        ignores: ["pre", "textarea", "span"],
      },
    ],
    "vue/mustache-interpolation-spacing": ["error", "always"],
    "vue/singleline-html-element-content-newline": [
      "error",
      {
        ignoreWhenNoAttributes: true,
        ignoreWhenEmpty: true,
        ignores: ["pre", 'h1', 'p', ...INLINE_ELEMENTS],
      },
    ],
    "vue/multiline-html-element-content-newline": [
      "error",
      {
        ignoreWhenEmpty: true,
        ignores: ["pre", ...INLINE_ELEMENTS],
        allowEmptyLines: false,
      },
    ],
    "vue/max-attributes-per-line": "off",
    /*"vue/max-attributes-per-line": [
      "error",
      {
        singleline: 1,
        multiline: 1,
      },
    ],*/
  },
  overrides: [
    {
      files: [
        '**/__tests__/*.{j,t}s?(x)',
        '**/tests/unit/**/*.spec.{j,t}s?(x)',
        '*.vue',
      ],
      env: {
        jest: true,
      },
      rules: {
        indent: 'off',
      },
    },
  ],
};

