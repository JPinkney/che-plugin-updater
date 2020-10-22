import * as fs from 'fs'
import * as path from 'path'

export interface Version {
    next: string;
    latest: string;
}

export function createNewMetaYAML(): Version {
    const latest = fs.readFileSync('latest.txt', 'utf-8')
    const packageJSON = fs.readFileSync(path.join('..', '..', '..', '..', 'package.json'), 'utf-8');
    const parsedPackageJSON = JSON.parse(packageJSON)
    const next = parsedPackageJSON.version
    console.log(next);

    // Create the newest version
    fs.mkdirSync(next)

    // Copy the meta.yaml
    fs.copyFileSync(`${latest}/meta.yaml`, `${next}/meta.yaml`)

    return {
        latest,
        next
    }
}
