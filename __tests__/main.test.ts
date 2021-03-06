import { modifyPreviousMetaYAML } from '../src/modify'

test('Modify meta.yaml', async () => {
  jest.spyOn(Date.prototype, 'toISOString').mockReturnValue('2020-10-20T00:00:00.000Z');
  const metaYAML = `
  apiVersion: v2
  publisher: redhat
  name: vscode-yaml
  version: 0.8.0
  type: VS Code extension
  displayName: YAML
  title: YAML Language Support by Red Hat, with built-in Kubernetes support
  description: Provides comprehensive YAML Language support to Visual Studio Code, via the yaml-language-server, with built-in Kubernetes support.
  icon: https://raw.githubusercontent.com/redhat-developer/vscode-yaml/0.8.0/icon/icon128.png
  repository: https://github.com/redhat-developer/vscode-yaml
  category: Language
  firstPublicationDate: "2020-05-22"
  spec:
    containers:
      - image: "quay.io/eclipse/che-sidecar-node:12-026416c"
        name: vscode-yaml
        memoryLimit: "256Mi"
    extensions:
      - https://download.jboss.org/jbosstools/vscode/3rdparty/vscode-yaml/vscode-yaml-0.8.0.vsix`;
  
  const expectedMetaYAML = `
  apiVersion: v2
  publisher: redhat
  name: vscode-yaml
  version: 0.11.1
  type: VS Code extension
  displayName: YAML
  title: YAML Language Support by Red Hat, with built-in Kubernetes support
  description: Provides comprehensive YAML Language support to Visual Studio Code, via the yaml-language-server, with built-in Kubernetes support.
  icon: https://raw.githubusercontent.com/redhat-developer/vscode-yaml/0.11.1/icon/icon128.png
  repository: https://github.com/redhat-developer/vscode-yaml
  category: Language
  firstPublicationDate: "2020-10-20"
  spec:
    containers:
      - image: "quay.io/eclipse/che-sidecar-node:12-026416c"
        name: vscode-yaml
        memoryLimit: "256Mi"
    extensions:
      - https://download.jboss.org/jbosstools/vscode/3rdparty/vscode-yaml/vscode-yaml-0.11.1.vsix`;
  const latestVersion = "0.8.0";
  const nextVersion = "0.11.1";
  const modifiedPlugin = modifyPreviousMetaYAML(metaYAML, latestVersion, nextVersion)
  expect(modifiedPlugin).toStrictEqual(expectedMetaYAML)
})
