# CLI for the Audit Log using GHEC

This CLI made in node helps on querying the audit log. It can query the full
audit providing all the data the API can serve, or, given a cursor, it can
provide the newest entries from that specific moment.

You can build an sh script on top of this one to store the data or query it.

## CLI arguments

This script can take the following arguments:

```shell
> node ghec-audit-log-cli.js "--help"

Usage: audit-log-ghec-cli [options]

Options:
  -v, --version             Output the current version
  -t, --token <string>      the token to access the API (mandatory)
  -o, --org <string>        the organization we want to extract the audit log from
  -cfg, --config <string>   location for the config yaml file. Default ".ghec-audit-log" (default: "./.ghec-audit-log")
  -p, --pretty              prints the json data in a readable format (default: false)
  -l, --limit <number>      a maximum limit on the number of items retrieved
  -f, --file <string>       the output file where the result should be printed
  -a, --api <string>        the version of GitHub API to call (default: "v4")
  -at, --api-type <string>  Only if -a is v3. API type to bring, either all, web or git (default: "all")
  -c, --cursor <string>     if provided, this cursor will be used to query the newest entries from the cursor provided. If not present, the result will contain all the audit log from the org
  -s, --source              indicate what source to use for the audit logs. Valid options are enterprise or org. Default: "org"
  -h, --help                display help for command

```

Optionally, you can create a file called `.ghec-audit-log` that supports
the **token** and **organization**, and omit the parameters while running the script.

```yaml
org: org-name
token: xxxxxxxxxxxxxxxx
```

### About tokens and scopes

To use this CLI you will need to use a [personal access token (PAT)](https://docs.github.com/en/github/authenticating-to-github/creating-a-personal-access-token) with the correct scopes. The scopes will change depending on what source you are going to use to export the audit logs.

Endpoint source | Needed scopes
--------------- | -------------
Organization    | `read:org`
Enterprise      | `admin:enterprise`

If you are running this utility against a GHEC account, we recommend that you create your PAT with both scopes.

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
use as an starter workflow the ones provided in this repository for [v3](workflows/forward-v3-workflow.yml) or [v4](workflows/forward-v4-workflow.yml)
and integrate it with your favorite service.

This workflow:

- Runs periodically
- Grabs any existing cursor as the last item grabbed from the log
- Grabs the latest changes from the audit log
- Forwards those changes to a service
- Commits the latest cursor for the next call

## Releases

To create a new release of the `ghec-audit-log-cli`:

- Create a new release [in the repository](https://github.com/github/ghec-audit-log-cli/releases/new) using [semantic versioning](https://semver.org/)
- Add the changelog details for the version
- Submit it as a draft until it's ready to be published

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
- **COMMITTER_EMAIL**
  - Email address for one of the primary committers on the repository

### Notes

- Modify the polling workflow to run on a cron, instead of push
- The `Organization` **must** be a part of a **GitHub** Enterprise or the API calls will fail
- The `Personal Access token` **must** be SSO enabled to query the GitHub Organization if it is enabled

## Disclaimer

1. This CLI provides all the events that the GitHub API offers through the [GraphQL API](https://docs.github.com/en/free-pro-team@latest/graphql/overview/schema-previews#audit-log). This is a subset of all the events that you can see through the UI.
2. This tool will be deprecated when GitHub adds a forwarding behavior on GHEC.
