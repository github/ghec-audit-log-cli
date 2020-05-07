const {allEntriesQuery, newEntriesQuery} = require('./audit-log-queries');

async function requestAllEntries(requestExecutor, org){
  let entries = [];
  let variables = {
    "org": org,
    "page":  null,
  };

  let hasNextPage = true;
  // while(hasNextPage) {
    const data = await requestExecutor(allEntriesQuery, variables);
    entries = entries.concat(data.organization.auditLog.nodes);
    hasNextPage = data.organization.auditLog.pageInfo.hasNextPage;
    variables.page = data.organization.auditLog.pageInfo.endCursor;
  // }
  return entries;
}

async function requestNewestEntries(requestExecutor, org, cursor) {
  let entries = [];
  let variables = {
    "login": org,
    "page":  cursor,
  };

  let hasNextPage = true;
  // while(hasNextPage) {
    const data = await requestExecutor(newEntriesQuery, variables);
    entries = entries.concat(data.organization.auditLog.nodes);
    hasNextPage = data.organization.auditLog.pageInfo.hasNextPage;
    variables.page = data.organization.auditLog.pageInfo.startCursor;
  // }
  return {data: entries, cursor: variables.page};
}

module.exports  = {
  requestNewestEntries,
  requestAllEntries
};