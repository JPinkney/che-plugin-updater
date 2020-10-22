import * as core from '@actions/core'

export interface Inputs {
    pluginPath: string;
    token: string;
}

export function validateInputs(): Inputs {
    const pluginPath = core.getInput('pluginPath')
    if (!pluginPath) {
      throw new Error("pluginPath not found")
    }
    const token = core.getInput('token')
    if (!token) {
        throw new Error('token not found')
    }
    return {
        pluginPath,
        token
    }
}