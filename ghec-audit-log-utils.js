const validate = require('validate.js')
const fs = require('fs')
const path = require('path')

function validateInput (program, config) {
  const parsed = {
    cursor: program.cursor || null,
    pretty: program.pretty || false,
    limit: program.limit || null,
    api: program.api || 'v4',
    apiType: program.apiType || 'all',
    token: program.token || config.token,
    org: program.org || config.org,
    outputFile: program.file,
    source: program.source || 'org'
  }

  // Validate correctness
  const tokenRegex = /^[g(p|o|u|s|r)1_]{0,1}[A-Za-z0-9_]+$/
  const base64Regex = /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/
  const orgRegex = /^[a-z\d]+(?:-?[a-z\d]+)*$/i
  const constraints = {
    cursor: {
      type: 'string',
      presence: false,
      format: base64Regex
    },
    pretty: {
      type: 'boolean',
      presence: true
    },
    limit: {
      presence: false,
      numericality: {
        onlyInteger: true,
        greaterThan: 0
      }
    },
    token: {
      type: 'string',
      presence: { allowEmpty: false },
      length: {
        is: 40
      },
      format: tokenRegex
    },
    api: {
      type: 'string',
      presence: { allowEmpty: false },
      length: {
        is: 2
      },
      inclusion: ['v3', 'v4']
    },
    apiType: {
      type: 'string',
      presence: { allowEmpty: false },
      length: {
        is: 3
      },
      inclusion: ['all', 'git', 'web']
    },
    org: {
      type: 'string',
      presence: { allowEmpty: false },
      length: {
        maximum: 39,
        minimum: 1
      },
      format: orgRegex
    },
    outputFile: {
      type: 'string',
      presence: false
    },
    source: {
      type: 'string',
      presence: { allowEmpty: false },
      inclusion: ['org', 'enterprise']
    }
  }

  // Verify validation
  const validation = validate(parsed, constraints)
  if (!validate.isEmpty(validation)) {
    throw new Error(JSON.stringify(validation))
  }

  // Check that we can write into that file
  if (parsed.outputFile) {
    try {
      fs.openSync(parsed.outputFile, 'w')
    } catch (e) {
      throw new Error(`The output file ${parsed.outputFile} cannot be written or the path does not exist. ${e.message}`)
    }
  }
  // Check that if we are in GitHub actions the file is expected to be within the workspace
  if (process.env.GITHUB_ACTIONS) {
    const filePath = path.join(process.env.GITHUB_WORKSPACE, parsed.outputFile)
    const { dir } = path.parse(filePath)

    if (dir.indexOf(process.env.GITHUB_WORKSPACE) < 0) {
      throw new Error(`${parsed.outputFile} is not allowed. The directory should be within ${process.env.GITHUB_WORKSPACE}`)
    }
  }

  return parsed
}

module.exports = {
  validateInput
}
