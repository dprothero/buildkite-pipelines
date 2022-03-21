import {stringify, validate, Pipeline, CommandStep} from '@jameslnewell/buildkite-pipeline'

const pipeline = new Pipeline({
  steps: [
    CommandStep.builder().command('echo "test"')
  ]
})

const object = pipeline.build()
const errors = !validate(object)
if (errors) {
  throw errors
}

console.log(JSON.stringify(object, null, 2))
console.log()
console.log(stringify(object))