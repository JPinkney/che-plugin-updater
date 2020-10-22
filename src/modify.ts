import * as fs from 'fs'
import * as YAML from 'yaml'

export interface MetaYAMLMetadata {
  name: string;
  repository: string;
  version: string;
  yaml: string;
}

/**
 * Update the vscode-extensions.json file with the newest version
 * @param newMetaYAML The meta YAML that you are going to be modifying.
 *  It will be the contents of the previous latest version of the plugin in the che plugin registry
 * @param latestVersion The latest version available in the che plugin registry
 * @param nextVersion The next version that will be available on the che plugin registry
 */
export function modifyPreviousMetaYAML(newMetaYAML: string, latestVersion: string, nextVersion: string): string {
  var reg = new RegExp(latestVersion, 'g');
  newMetaYAML = newMetaYAML.replace(reg, nextVersion);

  var datetime = new Date();
  const todaysDate = datetime.toISOString().slice(0,10);
  newMetaYAML = newMetaYAML.replace(/firstPublicationDate: .*/, `firstPublicationDate: "${todaysDate}"`);
  return newMetaYAML;
}

/**
 * Update the vscode-extensions.json file with the newest version
 * @param latestVersion The latest version available in the che plugin registry
 * @param nextVersion The next version that will be available on the che plugin registry
 */
export function createNewMetaYAML(latestVersion: string, nextVersion: string): MetaYAMLMetadata {
  const newMetaYAML = fs.readFileSync(`${nextVersion}/meta.yaml`, 'utf-8');
  const modifiedMetaYAML = modifyPreviousMetaYAML(newMetaYAML, latestVersion, nextVersion)
  const parsedMeta = YAML.parse(modifiedMetaYAML)
  return {
    name: parsedMeta.name,
    repository: parsedMeta.repository,
    version: parsedMeta.version,
    yaml: modifiedMetaYAML
  }
}

/**
 * Update the vscode-extensions.json file with the newest version
 * @param metaMetadata Object containing the new meta YAML version and new YAML contents
 */
export function writeNewMetaYAML(metaMetadata: MetaYAMLMetadata) {
  fs.writeFileSync(`${metaMetadata.version}/meta.yaml`, metaMetadata.yaml, 'utf-8');
}
