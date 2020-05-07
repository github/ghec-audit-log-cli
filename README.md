## CLI for the Audit Log using GHEC

This CLI made in node helps on querying the audit log. It can query the full
audit providing all the data the API can serve, or, given a cursor, it can 
provide the newest entries from that specific moment.

You can build an sh script on top of this one to store the data or query it.

### CLI arguments
This script can take the following arguments:
```
Arguments
    --token: the token to access the API (mandatory)
    --org: the organization we want to extract the audit log from (mandatory)
    --pretty: prints the json data in a readable format. Default: false
    --cfg: location for the config yaml file. Default '.ghec-audit-log'
    --cursor: if provided, this cursor will be used to query the newest entries from the cursor provided. If not present,
              the result will contain all the audit log from the org.
```

Optionally, you can create a file called `.ghec-audit-log` that supports
the token and organization, and omit the parameters while running the script.

```yaml
org: org-name
token: xxxxxxxxxxxxxxxx
```

### Running the CLI

Execute the command using node or npm.

#### npm
```shell script
npm run start -- --pretty
```

### node
```shell script
node audit-log-ghec-cli --pretty
```