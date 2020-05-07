const auditLogEntries = require('./audit-log-entries');

const allEntriesQuery = `
query($org: String!, $page: String) {
  organization(login: $org) {
    auditLog(first: 1, after: $page){
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ${auditLogEntries}        
      }
    }
  }
}`;

const newEntriesQuery = `
query($org: String!, $page: String!) {
  organization(login: $org) {
    auditLog(last: 1, before: $page){
      pageInfo {
        startCursor
        hasNextPage
      }
      nodes {
        ${auditLogEntries}        
      }
    }
  }
}`;

module.exports = {
    allEntriesQuery,
    newEntriesQuery
};