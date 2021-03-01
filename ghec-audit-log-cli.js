#! /usr/bin/env node
const YAML = require('yaml')
const fs = require('fs')
const { graphql } = require('@octokit/graphql')
const { requestEntries } = require('./ghec-audit-log-client')
const { validateInput } = require('./ghec-audit-log-utils')

// Obtain configuration
const { program } = require('commander')
program.version('1.0.0', '-v, --version', 'Output the current version')
  .option('-t, --token <string>', 'the token to access the API (mandatory)')
  .option('-o, --org <string>', 'the organization we want to extract the audit log from')
  .option('-cfg, --config <string>', 'location for the config yaml file. Default ".ghec-audit-log"', './.ghec-audit-log')
  .option('-p, --pretty', 'prints the json data in a readable format', false)
  .option('-l, --limit <number>', 'a maximum limit on the number of items retrieved')
  .option('-f, --file <string>', 'the output file where the result should be printed')
  .option('-a, --api <string>, the verion of GitHub API to call', 'v4')
  .option('-c, --cursor <string>', 'if provided, this cursor will be used to query the newest entries from the cursor provided. If not present, the result will contain all the audit log from the org')

program.parse(process.argv)

const configLocation = program.cfg || './.ghec-audit-log'
let config = {}
try {
  config = YAML.parse(fs.readFileSync(configLocation, 'utf8'))
} catch (e) {
  console.log(`${configLocation} file missing. Path parameters will apply`)
}

// TODO idea: maybe add support for other formats like PUTVAL to forward the data in an easier way
const { cursor, pretty, limit, token, org, outputFile } = validateInput(program, config)

/**
 * Function containing all the queries
 */
async function queryAuditLog () {
  // Select the query to run
  let queryRunner
  if (cursor) {
    if (api == 'v4') {
      // API v4 call with cursor
      queryRunner = () => requestEntries(graphqlWithAuth, org, limit, cursor)
    } else {
      // API v3 call with cursor
      queryRunner = () => requestEntries(v3WithAuth, org, limit, cursor)
    }
  } else {
    if (api == 'v4') {
      // api v4 without cursor
      queryRunner = () => requestEntries(graphqlWithAuth, org, limit)
    } else {
      // API v3 without cursor
      queryRunner = () => requestEntries(v3WithAuth, org, limit)
    }
  }

  // Run the query and store the most recent cursor
  const { data, newestCursorId } = await queryRunner()
  const entries = data
  if (newestCursorId) fs.writeFileSync('.last-cursor-update', newestCursorId)

  // Return the data
  if (pretty === true) {
    return JSON.stringify(entries, null, 4)
  } else {
    return JSON.stringify(entries)
  }
}

// Execute the request and print the result
const v3WithAuth = graphql.defaults({
  headers: {
    authorization: `token ${token}`
  }
})
queryAuditLog()
  .then((data) => {
    if (outputFile) {
      fs.writeFileSync(outputFile, data)
    } else {
      console.log(data)
    }
  })
  .catch((err) => {
    console.error(err)
    process.exit(1)
  })

  // Execute the request and print the result
  const graphqlWithAuth = graphql.defaults({
    headers: {
      authorization: `token ${token}`
    }
  })
  queryAuditLog()
    .then((data) => {
      if (outputFile) {
        fs.writeFileSync(outputFile, data)
      } else {
        console.log(data)
      }
    })
    .catch((err) => {
      console.error(err)
      process.exit(1)
    })
