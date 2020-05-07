const auditLogEntries = require('./ghec-audit-log-entries');

const allEntriesQuery = `
query($org: String!, $page: String) {
  organization(login: $org) {
    auditLog(first: 100, after: $page){
      pageInfo {
        startCursor
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
    auditLog(last: 100, before: $page){
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