# Che Plugin Updater

This action allows you to automatically create a pull request to the che-plugin-registry when you release a new version of your VSCode extension. This does this by checking out your new vscode plugin version as well as the che-plugin-registry. The action with then create a new entry in the che-plugin-registry with a new meta.yaml, latest.txt and vscode-extensions.json updated.

### Action inputs

| Name | Description | Default | Required |
| --- | --- | --- | --- |
| `pluginPath` | The publisher/name of the extension in the che-plugin-registry. E.g. redhat/vscode-yaml | `null` | `true`

### Action outputs

The version of the newly created meta.yaml and the name of the vscode extension are exported.

```yml
      - uses: ./
        id: che-plugin-updater
        with:
          pluginPath: redhat/vscode-yaml
      - name: Check outputs
        run: |
          echo "Name: ${{ steps.che-plugin-updater.outputs.name }}"
          echo "Version: ${{ steps.che-plugin-updater.outputs.version }}"
```

# Scenarios

- [Creating a pull request from a remote with committer access](#Creating-a-pull-request-from-a-remote-with-committer-access)
- [Creating a pull request from a remote without committer access](#Creating-a-pull-request-from-a-remote-without-committer-access)

## Creating a pull request from a remote with committer access

With this scenario an Eclipse Che committer can create a branch on the che plugin registry and open a PR directly from that

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: actions/checkout@v2
    with:
      repository: eclipse/che-plugin-registry
      path: che-plugin-registry
  - uses: ./
    id: che-plugin-updater
    with:
      pluginPath: redhat/vscode-yaml
  - name: Create Pull Request
    uses: peter-evans/create-pull-request@v3
    with:
      path: che-plugin-registry
      token: ${{ secrets.PAT }}
      commit-message: Update ${{ steps.che-plugin-updater.outputs.name }} to ${{ steps.che-plugin-updater.outputs.version }}
      signoff: true
      base: master
      branch: ${{ steps.che-plugin-updater.outputs.name }}-${{ steps.che-plugin-updater.outputs.version }}-update
      delete-branch: true
      title: Update ${{ steps.che-plugin-updater.outputs.name }} to ${{ steps.che-plugin-updater.outputs.version }}
      labels: |
        untested
      body: |
        ### What does this PR do?
        This PR updates ${{ steps.che-plugin-updater.outputs.name }} to version ${{ steps.che-plugin-updater.outputs.version }}
        
        ### Screenshot/screencast of this PR
        ### What issues does this PR fix or reference?
        ### How to test this PR?
        ### PR Checklist

        [As the author of this Pull Request I made sure that:](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#pull-request-template-and-its-checklist)

        - [ ] [The Eclipse Contributor Agreement is valid](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#the-eclipse-contributor-agreement-is-valid)
        - [ ] [Code produced is complete](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#code-produced-is-complete)
        - [ ] [Code builds without errors](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#code-builds-without-errors)
        - [ ] [Tests are covering the bugfix](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#tests-are-covering-the-bugfix)
        - [ ] [The repository devfile is up to date and works](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#the-repository-devfile-is-up-to-date-and-works)
        - [ ] [Sections `What issues does this PR fix or reference` and `How to test this PR` completed](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#sections-what-issues-does-this-pr-fix-or-reference-and-how-to-test-this-pr-completed)
        - [ ] [Relevant user documentation updated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#relevant-contributing-documentation-updated)
        - [ ] [Relevant contributing documentation updated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#relevant-contributing-documentation-updated)
        - [ ] [CI/CD changes implemented, documented and communicated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#cicd-changes-implemented-documented-and-communicated)

        ### Reviewers

        Reviewers, please comment how you tested the PR when approving it.
```

## Creating a pull request from a remote without committer access

This scenario becomes relevant when you are not an Eclipse Che commiter and do not have the rights to push/create branches on the che plugin registry. In this case you can push to a fork. Before using this update the push-to-fork with the location of your fork on github.

```yaml
steps:
  - uses: actions/checkout@v2
  - uses: actions/checkout@v2
    with:
      repository: eclipse/che-plugin-registry
      path: che-plugin-registry
  - uses: ./
    id: che-plugin-updater
    with:
      pluginPath: redhat/vscode-yaml
  - name: Create Pull Request
    uses: peter-evans/create-pull-request@v3
    with:
      path: che-plugin-registry
      push-to-fork: ${your fork}/che-plugin-registry
      token: ${{ secrets.PAT }}
      commit-message: Update ${{ steps.che-plugin-updater.outputs.name }} to ${{ steps.che-plugin-updater.outputs.version }}
      signoff: true
      base: master
      branch: ${{ steps.che-plugin-updater.outputs.name }}-${{ steps.che-plugin-updater.outputs.version }}-update
      delete-branch: true
      title: Update ${{ steps.che-plugin-updater.outputs.name }} to ${{ steps.che-plugin-updater.outputs.version }}
      labels: |
        untested
      body: |
        ### What does this PR do?
        This PR updates ${{ steps.che-plugin-updater.outputs.name }} to version ${{ steps.che-plugin-updater.outputs.version }}
        
        ### Screenshot/screencast of this PR
        ### What issues does this PR fix or reference?
        ### How to test this PR?
        ### PR Checklist

        [As the author of this Pull Request I made sure that:](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#pull-request-template-and-its-checklist)

        - [ ] [The Eclipse Contributor Agreement is valid](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#the-eclipse-contributor-agreement-is-valid)
        - [ ] [Code produced is complete](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#code-produced-is-complete)
        - [ ] [Code builds without errors](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#code-builds-without-errors)
        - [ ] [Tests are covering the bugfix](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#tests-are-covering-the-bugfix)
        - [ ] [The repository devfile is up to date and works](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#the-repository-devfile-is-up-to-date-and-works)
        - [ ] [Sections `What issues does this PR fix or reference` and `How to test this PR` completed](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#sections-what-issues-does-this-pr-fix-or-reference-and-how-to-test-this-pr-completed)
        - [ ] [Relevant user documentation updated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#relevant-contributing-documentation-updated)
        - [ ] [Relevant contributing documentation updated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#relevant-contributing-documentation-updated)
        - [ ] [CI/CD changes implemented, documented and communicated](https://github.com/eclipse/che/blob/master/CONTRIBUTING.md#cicd-changes-implemented-documented-and-communicated)

        ### Reviewers

        Reviewers, please comment how you tested the PR when approving it.
```

# Developing

To learn how to develop this github action please look in the [docs/](docs/) folder

# License

The documentation in this project is released under the [MIT License](LICENSE)
