import * as core from '@actions/core'
import * as path from 'path'
import { validateInputs } from './validate'
import { copyMetaYAML, getLastestMetaYAMLVersion, getNextVersion } from './create';
import { updateLatestTxt, updateVSCodeExtensionsJSON } from './update';
import { createNewMetaYAML, writeNewMetaYAML } from './modify';

/**
 * Main function that is ran when the github action is started
 */
async function run(): Promise<void> {
  try {

    const inputs = validateInputs();

    const next = getNextVersion();
    process.chdir(path.join('che-plugin-registry', 'v3', 'plugins', inputs.pluginPath))
    const latest = getLastestMetaYAMLVersion()
    copyMetaYAML(latest, next)
    const newMetadata = createNewMetaYAML(latest, next)
    writeNewMetaYAML(newMetadata)
    updateLatestTxt(next)
    updateVSCodeExtensionsJSON(newMetadata)

    core.setOutput('name', newMetadata.name)
    core.setOutput('version', next)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
