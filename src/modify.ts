import * as fs from 'fs'

function modifyPreviousMetaYAML(newMetaYAML: string, latestVersion: string, nextVersion: string): string {
  var reg = new RegExp(latestVersion, 'g');
  var newMetaYAML = newMetaYAML.replace(reg, nextVersion);

  var datetime = new Date();
  const todaysDate = datetime.toISOString().slice(0,10);
  var newMetaYAML = newMetaYAML.replace(/firstPublicationDate: .*/, `firstPublicationDate: "${todaysDate}"`);
  return newMetaYAML;
}

export function writeNewMetaYAML(latestVersion: string, nextVersion: string): void {
  const newMetaYAML = fs.readFileSync(`${nextVersion}/meta.yaml`, 'utf-8');
  const modifiedMetaYAML = modifyPreviousMetaYAML(newMetaYAML, latestVersion, nextVersion)
  fs.writeFileSync(`${nextVersion}/meta.yaml`, modifiedMetaYAML, 'utf-8');
}
