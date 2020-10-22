import * as fs from 'fs'
import * as path from 'path';
import { MetaYAMLMetadata } from './modify';

/**
 * Update the latest.txt with the newest version
 * @param next The newest version that is currently being added
 */
export function updateLatestTxt(next: string): void {
    fs.writeFileSync('latest.txt', next)
}

/**
 * Update the vscode-extensions.json file with the newest version
 * @param pluginMetadata The plugin metadata of the newly created meta.yaml
 */
export function updateVSCodeExtensionsJSON(pluginMetadata: MetaYAMLMetadata): void {
    const vscodeJSONPath = path.join('..', '..', '..', '..', 'vscode-extensions.json');
    const vscodeExtensionsJSON = fs.readFileSync(vscodeJSONPath, 'utf-8')
    const parsedJSON = JSON.parse(vscodeExtensionsJSON);
    for (const index in parsedJSON.extensions) {
        if (parsedJSON.extensions[index].repository === pluginMetadata.repository) {
            parsedJSON.extensions[index].revision = pluginMetadata.version
        }
    }
    fs.writeFileSync(vscodeJSONPath, JSON.stringify(parsedJSON, null, 2) + '\n')
}
