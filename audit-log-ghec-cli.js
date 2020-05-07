const YAML = require('yaml');
const fs = require('fs');
const {graphql} = require('@octokit/graphql');
const {requestNewestEntries, requestAllEntries} = require('./audit-log-client');

//---- Obtain configuration
const argv = require('minimist')(process.argv.slice(2));

const configLocation = argv.cfg || './.ghec-audit-log';
const config = YAML.parse(fs.readFileSync(configLocation, 'utf8'));

const cursor = argv.cursor || null;
const pretty = argv.pretty || false;
const token = argv.token || config.token;
const org = argv.org || config.org;

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
    // Execute the query
    let entries;
    if (cursor) {
        let {data, cursor} = await requestNewestEntries(graphqlWithAuth, org, cursor);
        entries = data;
        fs.writeFileSync('.last-cursor-update', cursor)
    } else {
        entries = await requestAllEntries(graphqlWithAuth, org);
    }

    let json;
    if (pretty) {
        json = JSON.stringify(entries, null, 4);
    } else {
        json = JSON.stringify(entries);
    }
    return json;
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