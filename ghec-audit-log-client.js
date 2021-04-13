const hash = require('json-hash')
const { allEntriesQuery } = require('./ghec-audit-log-queries')

async function requestV4Entries (octokit, org, limit, cursor) {
  let entries = []
  const variables = {
    org: org,
    page: null
  }

  let hasNextPage = true
  let firstPageCursorId = null
  let foundCursor = false
  const hasLimit = limit || false
  let limitReached = false
  while (hasNextPage && !foundCursor && !limitReached) {
    const data = await octokit.graphql(allEntriesQuery, variables)
    let newEntries = data.organization.auditLog.nodes

    // Cursor check
    if (cursor != null) {
      const index = newEntries.findIndex((elem) => elem.id === cursor)
      if (index !== -1) {
        newEntries = newEntries.slice(0, index)
        foundCursor = true
      }
    }

    entries = entries.concat(newEntries)
    hasNextPage = data.organization.auditLog.pageInfo.hasNextPage
    variables.page = data.organization.auditLog.pageInfo.endCursor

    // Check limit
    if (hasLimit) {
      if (entries.length >= limit) {
        entries = entries.slice(0, limit)
      }
      limitReached = true
    }

    // Store last cursor request
    if (!firstPageCursorId && newEntries.length !== 0) {
      firstPageCursorId = newEntries[0].id
    }
  }
  return { data: entries, newestCursorId: firstPageCursorId }
}

// In this case we are not using the cursors from the header Link as identifies the page and the last element, but wouldn't
// be reliable if pagination, limit and size changes. To avoid that we are using the findHashedEntry method and we are hashing
// each of the elements separately so we can find them in a more reliable way
async function requestV3Entries (octokit, entity, limit, cursor, apiType, auditLogSource = 'org') {
  let entries = []
  const hasLimit = limit || false
  let foundCursor = false
  let foundLimit = false
  let endpoint = ''
  let options = {}

  // Hardcoded org endpoints. We need to add the enterprise endpoints
  switch (auditLogSource) {
    case 'enterprise':
      endpoint = '/enterprises/{enterprise}/audit-log'
      options = { enterprise: entity }
      break
    default:
      endpoint = '/orgs/{org}/audit-log'
      options = { org: entity }
  }
  for await (const { data } of octokit.paginate.iterator(`GET ${endpoint}?include=${apiType}&per_page=${Math.min(100, limit)}`, options)) {
    let newEntries = data

    // If we find the entry in the current request, we should add the remaining and stop
    if (cursor != null) {
      const index = findHashedEntry(cursor, data)
      if (index !== -1) {
        newEntries = data.slice(0, index)
        foundCursor = true
      }
    }

    // Concat the previous entries and the new ones
    entries = entries.concat(newEntries)

    // Limit has been found
    if (hasLimit) {
      if (entries.length >= limit) {
        entries = entries.slice(0, limit)
      }
      foundLimit = true
    }

    // Stop going through the iterator if either we reached limit or found the cursor
    if (foundLimit || foundCursor) break
  }

  // Calculate the newest element that was provided
  let lastCursor = null
  if (entries.length > 0) {
    lastCursor = generateHashAudit(entries[0])
  }

  // Provide the data
  return { data: entries, newestCursorId: lastCursor }
}

function generateHashAudit (entry) {
  const hashed = hash.digest(entry)
  return Buffer.from(hashed).toString('base64')
}

function findHashedEntry (cursor, entries) {
  return entries.findIndex((elem) => generateHashAudit(elem) === cursor)
}

module.exports = {
  requestV4Entries,
  requestV3Entries
}
