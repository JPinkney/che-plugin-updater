import * as fs from 'fs'

/**
 * Get the next version from the plugins updated package.json
 * @returns the next version
 */
export function getNextVersion(): string {
    const packageJSON = fs.readFileSync('package.json', 'utf-8');
    const parsedPackageJSON = JSON.parse(packageJSON)
    return parsedPackageJSON.version
}

/**
 * Get the latest Meta.yaml version from latest.txt
 * @returns the current latest version in the che plugin registry
 */
export function getLastestMetaYAMLVersion(): string {
    return fs.readFileSync('latest.txt', 'utf-8').trim()
}

/**
 * Create the directory where the new meta.yaml file will live and copy the
 * current latest one in the registry to the new directory
 * @param latest The latest version listed in the che plugin registry
 * @param next   The next version taken from the plugins updated package.json
 */
export function copyMetaYAML(latest: string, next: string): void {
    // Create the newest version
    fs.mkdirSync(next)

    // Copy the meta.yaml
    fs.copyFileSync(`${latest.toString().trim()}/meta.yaml`, `${next}/meta.yaml`)
}
