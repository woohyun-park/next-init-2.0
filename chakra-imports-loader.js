// eslint-disable-next-line @typescript-eslint/no-var-requires
const matcher = require('./chakra-imports-matcher');

function replaceImportStatementsFromString(str, matcher) {
  const imports = getImportsFromString(str);
  const chakraImports = imports['@chakra-ui/react'];
  const newImportStatement = getNewImportStatement(chakraImports, matcher);

  const toReplaceRegex = /import\s*{[^}]+}\s*from\s*'@chakra-ui\/react';/g;
  const toReplace = str.match(toReplaceRegex);

  return str.replace(toReplace, newImportStatement);
}

function getImportsFromString(str) {
  const importRegex = /import\s*{([\w\s,]+)}\s*from\s*'([^']+)';/g;

  let match;
  const imports = {};

  while ((match = importRegex.exec(str))) {
    const [, importedItems, module] = match;
    const items = importedItems.split(',').map((item) => item.trim());
    imports[module] = items;
  }
  return imports;
}

function getNewImportStatement(imports, matcher) {
  if (!imports) return;
  let result = '';

  [...imports].forEach((target) => {
    if (!target) return;
    const newPath = matcher[target.split(' ')[0]];
    const newImport = `import { ${target} } from '@chakra-ui/${newPath}';\n`;
    result += newImport;
  });
  return result;
}

module.exports = function chakraImportsLoader(content) {
  return replaceImportStatementsFromString(content, matcher);
};
