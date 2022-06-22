# @jameslnewell/buildkite-pipelines

![checks](https://github.com/jameslnewell/buildkite-pipelines/actions/workflows/checks.yml/badge.svg) ![release](https://github.com/jameslnewell/buildkite-pipelines/actions/workflows/release.yml/badge.svg)


Generate buildkite pipelines with code.

## Installation

NPM:
```bash
npm install @jameslnewell/buildkite-pipelines
```

Yarn:
```bash
yarn add --dev @jameslnewell/buildkite-pipelines
```

## Usage

Define your pipeline in code.

`./buildkite/pipeline.js`
```ts
const {Pipeline, CommandStep} = require('@jameslnewell/buildkite-pipelines');

module.exports = Pipeline.builder()
  .steps([
    CommandStep.builder()
      .label('👋 Greeting')
      .command('echo "Hello World!"')
  ])

```

Generate and upload your pipeline in a Buildkite step.

`./buildkite/pipeline.yml`
```yaml
steps:
  - commands:
      - buildkite-pipelines .buildkite/pipeline.js | buildkite-agent pipeline upload
    plugins:
      - docker#v3.11.0:
          image: jameslnewell/buildkite-pipelines
```

### Transpiling Typescript

Define your pipeline in code.

`./buildkite/pipeline.ts`
```ts
import {Pipeline, CommandStep} from '@jameslnewell/buildkite-pipelines';

export default Pipeline.builder()
  .steps([
    CommandStep.builder()
      .label('👋 Greeting')
      .command('echo "Hello World!"')
  ])

```

Generate and upload your pipeline in a Buildkite step.

`./buildkite/pipeline.yml`
```yaml
steps:
  - commands:
      - yarn global add ts-node
      - buildkite-pipelines .buildkite/pipeline.ts -r ts-node/register | buildkite-agent pipeline upload
    plugins:
      - docker#v3.11.0:
          image: jameslnewell/buildkite-pipelines
```


## Why?

This library is a very thin wrapper around [Buildkite's `yaml` syntax for defining a pipeline](https://buildkite.com/docs/pipelines/defining-steps). As such the value of this library is unlikely to be realised for simple one-file pipelines. 

Consider using this library when:

- you're dynamically generating the pipeline and you require a programming language
- your pipeline is split across multiple `yaml` files and you're unable to use `yaml` anchors and aliases for composition across them
- you can't possibly live without typings

## Related projects

- https://hasura.io/blog/what-we-learnt-by-migrating-from-circleci-to-buildkite/


### Development

1. Setup a pipeline - use the command for setting up a docker agent [here](https://buildkite.com/organizations/jameslnewell/agents?return_to_pipeline=buildkite-pipelines&welcome=true#setup-docker)
