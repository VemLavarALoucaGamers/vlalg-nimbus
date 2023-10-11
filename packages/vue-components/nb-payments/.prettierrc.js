// DOC: https://prettier.io/
export default {
  "semi": false,                          // Controla se deve ser adicionado um ponto e vírgula no final das instruções.
  "tabWidth": 2,                          // Especifica o número de espaços por tabulação
  "singleQuote": true,                    // Determina se devem ser usadas aspas simples ou duplas para strings.
  "printWidth": 100,                      // Define o número máximo de caracteres por linha antes de quebrar o código em várias linhas.
  "trailingComma": "none",                // Especifica a presença de vírgula no final de listas ou objetos.
  "useTabs": true,                        // Define se o Prettier deve usar espaços ou tabulações para recuo.
  "quoteProps": "as-needed",              // Controla se as propriedades dos objetos devem ser citadas sempre ou apenas quando necessário.
  "jsxSingleQuote": false,                // Define se o Prettier deve usar aspas simples ou duplas para strings em JSX.
  "bracketSameLine": false,               // Put the > of a multi-line HTML (HTML, JSX, Vue, Angular) element at the end of the last line instead of being alone on the next line (does not apply to self closing elements).
  "bracketSpacing": true,                 // Controla se deve haver espaçamento em torno de chaves em objetos literais.
  "arrowParens": "avoid",                 // Define se os parênteses em arrow functions devem ser omitidos quando possível.
  "endOfLine": "auto",                    // Especifica o tipo de quebra de linha a ser usado: "lf" (Unix), "crlf" (Windows) ou "auto" (detecta automaticamente).
  "htmlWhitespaceSensitivity": "css",     // Controla a sensibilidade a espaços em branco em documentos HTML. Pode ser "css" (segue as regras CSS) ou "strict" (sensível a espaços em branco).
  "vueIndentScriptAndStyle": false,       // Permite que o Prettier recue os blocos <script> e <style> em arquivos Vue.
  "singleAttributePerLine": true,         // Enforce single attribute per line in HTML, Vue and JSX.
  "proseWrap": "preserve",                // Define como o Prettier deve formatar texto em parágrafos.
  "overrides": [],                        // Permite a definição de configurações específicas para determinados arquivos ou diretórios.
  "rangeStart": 0,                        // Essa opção permite que você especifique a posição de início para a formatação do Prettier em um arquivo. Ela define o índice de caractere a partir do qual o Prettier começará a formatar o código. Útil quando você deseja formatar apenas uma parte específica do um arquivo, em vez de todo o arquivo.
  "rangeEnd": null,                       // Esta opção determina a posição de término para a formatação do Prettier em um arquivo. Ela define o índice de caractere onde a formatação do Prettier deve parar. Junto com rangeStart, você pode usá-la para limitar a formatação a uma parte específica de um arquivo.
  "requirePragma": false,                 // Quando definida como true, essa opção faz com que o Prettier formate apenas arquivos que contêm um pragma especial no início. O pragma é um comentário que ativa o Prettier. Isso é útil quando você deseja ter controle sobre quais arquivos são formatados.
  "insertPragma": false,                  // Se configurada como true, essa opção faz com que o Prettier insira automaticamente o pragma no início dos arquivos formatados. Isso é útil quando você deseja sinalizar que um arquivo foi formatado pelo Prettier.
  "embeddedLanguageFormatting": "auto",   // Essa opção controla a formatação de partes de código que estão em linguagens incorporadas (como scripts em HTML dentro de um arquivo HTML). Quando definida como "auto", o Prettier tentará formatar automaticamente partes incorporadas, como código JavaScript em um arquivo HTML. Para controlar a formatação de código incorporado em linguagens como HTML, Markdown, etc.
  "spaceBeforeFunctionParen": true,       // preserve os espaços antes dos parênteses de abertura de funções
}
