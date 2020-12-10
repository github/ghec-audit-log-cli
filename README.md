# CLI for the Audit Log using GHEC

This CLI made in node helps on querying the audit log. It can query the full
audit providing all the data the API can serve, or, given a cursor, it can 
provide the newest entries from that specific moment.

You can build an sh script on top of this one to store the data or query it.

## CLI arguments
This script can take the following arguments:
```
> node ghec-audit-log-cli.js "--help"

Usage: audit-log-ghec-cli [options]

Options:
  -v, --version            Output the current version
  -t, --token <string>     the token to access the API (mandatory)
  -o, --org <string>       the organization we want to extract the audit log from
  -cfg, --config <string>  location for the config yaml file. Default ".ghec-audit-log" (default: "./.ghec-audit-log")
  -p, --pretty             prints the json data in a readable format (default: false)
  -l, --limit              a maximum limit on the number of items retrieved
  -f, --file               the name of the file where you want to output the result
  -c, --cursor <string>    if provided, this cursor will be used to query the newest entries from the cursor provided. If not present,
                the result will contain all the audit log from the org
  -h, --help               display help for command

```

Optionally, you can create a file called `.ghec-audit-log` that supports
the token and organization, and omit the parameters while running the script.

```yaml
org: org-name
token: xxxxxxxxxxxxxxxx
```

## Running the CLI

Execute the command using node or npm.

### npm
```shell script
$ npm run start -- --pretty
```

### node
```shell script
$ node audit-log-ghec-cli --pretty
```

## Installing as CLI

Optionally you can install the script as a CLI and run it from the command line. To install it run:
```shell script
$ git clone https://github.com/droidpl/ghec-audit-log-cli
$ cd ghec-audit-log-cli
$ npm link
```

Then you can execute the script as a CLI using:
```shell script
$ ghec-audit-log-cli -v
```

## Forwarding the log using GitHub Actions

One of the most common uses of the CLI is to forward the log using GitHub actions. You can
use as an starter workflow the [one provided in this repository](workflows/node-workflow.yml)
and integrate it with your favorite service.

This workflow:
- Runs periodically
- Grabs any existing cursor as the last item grabbed from the log 
- Grabs the latest changes from the audit log
- Forwards those changes to a service
- Commits the latest cursor for the next call 

## How to use
- Clone the *audit-log-cli* repository to your Organization
- Set the **Action** to run on Cron
- Create the **GitHub Secrets** needed to authenticate
- Enjoy the logs

## Secret Values
You will need to create the following **Github Secrets** To allow the tool to work:
- **AUDIT_LOG_TOKEN**
  - This is a [GitHub Personal Access Token](https://docs.github.com/en/free-pro-team@latest/github/authenticating-to-github/creating-a-personal-access-token) used to authenticate to your Organization
  - **Note:** The token must have the *admin:org* set to be able to pull information
- **ORG_NAME**
  - Name of the **GitHub** Organization to poll the audit log
- **WEBHOOK_URL**
  - URL to a service where the generated *json* information is piped

### Notes
- Modify the polling workflow to run on a cron, instead of push

## Disclaimer

1. This CLI provides all the events that the GitHub API offers through the [GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql/overview/schema-previews#audit-log). This is
a subset of all the events that you can see through the UI.
2. This tool will be deprecated when GitHub adds a forwarding behavior on GHEC.
