#! /usr/bin/env node
const YAML = require('yaml');
const fs = require('fs');
const {graphql} = require('@octokit/graphql');
const {requestNewestEntries, requestAllEntries} = require('./ghce-audit-log-client');

//---- Obtain configuration
const { program } = require('commander');
program.version('1.0.0',  '-v, --version', 'Output the current version')
    .option('-t, --token <string>', 'the token to access the API (mandatory)')
    .option('-o, --org <string>', 'the organization we want to extract the audit log from')
    .option('-cfg, --config <string>', 'location for the config yaml file. Default ".ghec-audit-log"', './.ghec-audit-log')
    .option('-p, --pretty', 'prints the json data in a readable format', false)
    .option('-c, --cursor <string>', 'if provided, this cursor will be used to query the newest entries from the cursor provided. If not present,\n' +
        '              the result will contain all the audit log from the org');

program.parse(process.argv);

const configLocation = program.cfg || './.ghec-audit-log';
const config = YAML.parse(fs.readFileSync(configLocation, 'utf8'));

const cursor = program.cursor || null;
const pretty = program.pretty || false;
const token = program.token || config.token;
const org = program.org || config.org;

//TODO idea: maybe add support for other formats like PUTVAL to forward the data in an easier way

//---- Run validation
if (!token) {
    throw new Error("Token must be provided in the configuration or as a --token argument");
}
if (!org) {
    throw new Error("Organization must be provided in the configuration or as a --org argument");
}

//---- Helper function
/**
 * Function containing all the queries
 */
async function queryAuditLog() {
    // Select the query to run
    let queryRunner;
    if (cursor) {
        queryRunner = () => requestNewestEntries(graphqlWithAuth, org, cursor);
    } else {
        queryRunner = () => requestAllEntries(graphqlWithAuth, org);
    }

    // Run the query and store the most recent cursor
    let {data, newestCursor} = await queryRunner();
    let entries = data;
    if(newestCursor) fs.writeFileSync('.last-cursor-update', newestCursor);

    // Return the data
    if (pretty) {
        return JSON.stringify(entries, null, 4);
    } else {
        return JSON.stringify(entries);
    }
}


//---- Execute the request and print the result
const graphqlWithAuth = graphql.defaults({
    headers: {
        authorization: `token ${token}`,
    },
});
queryAuditLog()
    .then((data) => console.log(data))
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });