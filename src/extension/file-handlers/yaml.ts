import { updateProperty, getDeclarations, getRules, removeProperty } from './utils';
import { FileHandler, EditableBlock, SupportedFiletypes } from './types';
const yaml = require('js-yaml');

function wrapWithDummySelector(declaraions: string) {
  return `.dummy{${declaraions}}`;
}

export function getPaths(data: any) {
  const res: any = Object.keys(data) // get all object properties as an array
    .map(function(k: any) {
      // iterate and generate new array with custom element
      let obj: any = {
        // create an object to return
        pathSelector: k,
      };
      for (var key in data[k]) // iterate over object property
        if (data[k].hasOwnProperty(key))
          // check the object has the property
          obj[key] = data[k][key]; // add property to the newly generated object
      return obj; // return the object
    });

  return res;
}

export function getEditableBlocks(content: string, languageId: SupportedFiletypes) {
  const jsStlyeYaml = yaml.safeLoad(content);
  const pathBlocks = getPaths(jsStlyeYaml.paths);

  const results: EditableBlock[] = [];

  pathBlocks.forEach(({ cssString, location }) => {
    getRules(cssString).forEach(rule => {
      const declarations = getDeclarations(rule);
      results.push({
        selector: rule.selector,
        declarations,
        source: location,
        rule,
      });
    });
  });
  return results;
}

const StyledComponentsInspector: FileHandler = {
  getEditableBlocks(fileContent: string, languageId: SupportedFiletypes) {
    return getEditableBlocks(fileContent, languageId);
  },
  updateProperty(activeBlock: EditableBlock, prop: string, value: string) {
    let updatedCSS = updateProperty(activeBlock.rule, prop, value);
    updatedCSS = updatedCSS.substr(7, updatedCSS.length); // removes .dummy{
    updatedCSS = updatedCSS.substr(0, updatedCSS.length - 1); // removes }
    updatedCSS = `\`${updatedCSS}\``; // ads the `` back
    return updatedCSS;
  },
  removeProperty(activeBlock: EditableBlock, prop: string) {
    let updatedCSS = removeProperty(activeBlock.rule, prop);
    updatedCSS = updatedCSS.substr(7, updatedCSS.length); // removes .dummy{
    updatedCSS = updatedCSS.substr(0, updatedCSS.length - 1); // removes }
    updatedCSS = `\`${updatedCSS}\``; // ads the `` back
    return updatedCSS;
  },
};
export default StyledComponentsInspector;
