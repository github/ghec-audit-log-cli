const auditLogEntries = require('./ghec-audit-log-entries')

const allEntriesQuery = `
query($org: String!, $page: String) {
  organization(login: $org) {
    auditLog(first: 100, after: $page){
      pageInfo {
        endCursor
        hasNextPage
      }
      nodes {
        ${auditLogEntries}        
      }
    }
  }
}`

module.exports = {
  allEntriesQuery
}
