import * as core from '@actions/core'
import { validateInputs } from './validate'
import { createNewMetaYAML } from './create';
import { writeNewMetaYAML } from './modify';

async function run(): Promise<void> {
  try {
    // Check Inputs
    const inputs = validateInputs();

    // Create
    process.chdir(`che-plugin-registry/v3/plugins/${inputs.pluginPath}`)
    const version = createNewMetaYAML()

    // Modify
    writeNewMetaYAML(version.latest, version.next)
  } catch (error) {
    core.setFailed(error.message)
  }
}

run()
