import * as core from '@actions/core'
import { getLastestMetaYAMLVersion } from './create';
import { updateLatestTxt, updateVSCodeExtensionsJSON } from './update';
import { createNewMetaYAML, writeNewMetaYAML } from './modify';
import * as github from '@actions/github';

/**
 * Main function that is ran when the github action is started
 */
async function run(): Promise<void> {
  try {

    const myToken = core.getInput('myToken');

    const octokit = github.getOctokit(myToken)
    
    const extensionsJSON = require('./vscode-extensions.json')
    for (const ext of extensionsJSON.extensions) {
      // Check the repository to see if it has a newer tag
      const repository = ext.repository;
      const tags = octokit.repos.listTags({
        owner: "a",
        repo: repository
      });
      /**
       * [
          {
            "name": "v0.1",
            "commit": {
              "sha": "c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc",
              "url": "https://api.github.com/repos/octocat/Hello-World/commits/c5b97d5ae6c19d5c5df71a34c7fbeeda2479ccbc"
            },
            "zipball_url": "https://github.com/octocat/Hello-World/zipball/v0.1",
            "tarball_url": "https://github.com/octocat/Hello-World/tarball/v0.1"
          }
        ]
       */
      // test to see if the revision matches name
      // if it fails then test to see if the revision matches commit.sha
    }



    const latest = getLastestMetaYAMLVersion()
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
