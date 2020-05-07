const auditEntry = `
    ... on AuditEntry {
        actorLogin
        actorUrl
    }
`;

const ghecAuditLogEntries = `
    __typename
    ${auditEntry}
`;

module.exports = ghecAuditLogEntries;