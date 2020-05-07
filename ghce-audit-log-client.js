const {allEntriesQuery, newEntriesQuery} = require('./ghec-audit-log-queries');

async function requestAllEntries(requestExecutor, org){
  let entries = [];
  let variables = {
    "org": org,
    "page":  null,
  };

  let firstPageCursor = null;
  let hasNextPage = true;
  // while(hasNextPage) {
    const data = await requestExecutor(allEntriesQuery, variables);
    entries = entries.concat(data.organization.auditLog.nodes);
    hasNextPage = data.organization.auditLog.pageInfo.hasNextPage;
    variables.page = data.organization.auditLog.pageInfo.endCursor;
    if(!firstPageCursor) firstPageCursor = data.organization.auditLog.pageInfo.startCursor
  // }
  return {data: entries, newestCursor: firstPageCursor};
}

async function requestNewestEntries(requestExecutor, org, cursor) {
  let entries = [];
  let variables = {
    "org": org,
    "page":  cursor,
  };

  let hasPreviousPage = true;
  while(hasPreviousPage) {
    const data = await requestExecutor(newEntriesQuery, variables);
    entries = entries.concat(data.organization.auditLog.nodes);
    hasPreviousPage = data.organization.auditLog.pageInfo.hasPreviousPage;
    variables.page = data.organization.auditLog.pageInfo.startCursor;
  }
  return {data: entries, newestCursor: variables.page};
}

module.exports  = {
  requestNewestEntries,
  requestAllEntries
};