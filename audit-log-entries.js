const auditEntry = `
    ... on AuditEntry {
        actorLogin
        actorUrl
    }
`;

const auditLogEntries = `
    __typename
    ${auditEntry}
`;

module.exports = auditLogEntries;