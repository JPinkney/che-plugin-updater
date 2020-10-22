import * as core from '@actions/core'

export interface Inputs {
    pluginPath: string;
}

/**
 * Check to make sure that all inputs are available
 */
export function validateInputs(): Inputs {
    const pluginPath = core.getInput('pluginPath')
    if (!pluginPath) {
      throw new Error("pluginPath not found")
    }
    return {
        pluginPath
    }
}
