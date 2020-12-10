// --- model objects
const sponsorsListing = `{
    createdAt
    fullDescription
    id
    shortDescription
    slug
}`

const userStatus = `{
    createdAt
    emoji
    expiresAt
    id
    indicatesLimitedAvailability
    message
    updatedAt
}`

const user = `{
    anyPinnableItems
    avatarUrl
    bio
    company
    createdAt
    databaseId
    email
    id
    isBountyHunter
    isCampusExpert
    isDeveloperProgramMember
    isEmployee
    isHireable
    isSiteAdmin
    isViewer
    location
    login
    name
    pinnedItemsRemaining
    projectsResourcePath
    projectsUrl
    resourcePath
    sponsorsListing ${sponsorsListing}
    status ${userStatus}
    updatedAt
    url
    viewerCanChangePinnedItems
    viewerCanCreateProjects
    viewerCanFollow
    viewerIsFollowing
    websiteUrl
}`

const bot = `{
    createdAt
    databaseId
    id
    login
    resourcePath
    updatedAt
    url
}`

const orgIdentityProvider = `{
    digestMethod
    id
    idpCertificate
    issuer
    signatureMethod
    ssoUrl
}`

const organization = `{
    anyPinnableItems
    avatarUrl
    createdAt
    databaseId
    description
    email
    id
    location
    login
    name
    newTeamResourcePath
    newTeamUrl
    organizationBillingEmail
    pinnedItemsRemaining
    projectsResourcePath
    projectsUrl
    requiresTwoFactorAuthentication
    resourcePath
    samlIdentityProvider ${orgIdentityProvider}
    sponsorsListing ${sponsorsListing}
    teamsResourcePath
    teamsUrl
    updatedAt
    url
    viewerCanAdminister
    viewerCanChangePinnedItems
    viewerCanCreateProjects
    viewerCanCreateRepositories
    viewerCanCreateTeams
    viewerIsAMember
    websiteUrl
}`

const team = `{
    avatarUrl
    combinedSlug
    createdAt
    description
    discussionsResourcePath
    discussionsUrl
    editTeamResourcePath
    editTeamUrl
    id
    membersResourcePath
    membersUrl
    name
    newTeamResourcePath
    newTeamUrl
    privacy
    repositoriesResourcePath
    repositoriesUrl
    resourcePath
    slug
    teamsResourcePath
    teamsUrl
    updatedAt
    url
    viewerCanAdminister
    viewerCanSubscribe
    viewerSubscription
}`

const codeOfConduct = `{
    body
    id
    key
    name
    resourcePath
    url
}`

const gitObjectId = `{
    abbreviatedOid
    commitResourcePath
    commitUrl
    id
}`

const ref = `{
    id
    name
    prefix
    target ${gitObjectId}
}`

const fundingLink = `{
    platform
    url
}`

const licenseRule = `{
    description
    key
    label
}`

const license = `{
    body
    conditions ${licenseRule}
    description
    featured
    hidden
    id
    implementation
    key
    limitations ${licenseRule}
    name
    nickname
    permissions ${licenseRule}
    pseudoLicense
    spdxId
    url
}`

const repositoryOwner = `{
    __typename
    login
}`

const language = `{
    color
    id
    name
}`

const repository = `{
    codeOfConduct ${codeOfConduct}
    createdAt
    databaseId
    defaultBranchRef ${ref}
    deleteBranchOnMerge
    description
    diskUsage
    forkCount
    fundingLinks ${fundingLink}
    hasIssuesEnabled
    hasProjectsEnabled
    hasWikiEnabled
    homepageUrl
    id
    isArchived
    isDisabled
    isFork
    isLocked
    isMirror
    isPrivate
    isTemplate
    licenseInfo ${license}
    lockReason
    mergeCommitAllowed
    mirrorUrl
    name
    nameWithOwner
    openGraphImageUrl
    owner ${repositoryOwner}
    primaryLanguage ${language}
    projectsResourcePath
    projectsUrl
    pushedAt
    rebaseMergeAllowed
    resourcePath
    squashMergeAllowed
    sshUrl
    tempCloneToken
    updatedAt
    url
    usesCustomOpenGraphImage
    viewerCanAdminister
    viewerCanCreateProjects
    viewerCanSubscribe
    viewerCanUpdateTopics
    viewerHasStarred
    viewerPermission
    viewerSubscription
}`

const actor = `{
    __typename
    ... on Bot ${bot}
    ... on Organization ${organization}
    ... on User ${user}
}`

const actorLocation = `{
    city
    country
    countryCode
    region
    regionCode
}`

const restoreOrganization = `{
    organization ${organization}
    organizationName
    organizationResourcePath
    organizationUrl
}`

const restoreRepository = `{
    repository ${repository}
    repositoryName
    repositoryResourcePath
    repositoryUrl
}`

const restoreTeam = `{
    team ${team}
    teamName
    teamResourcePath
    teamUrl
}`

const restoreMembership = `{
    ... on OrgRestoreMemberMembershipOrganizationAuditEntryData ${restoreOrganization}
    ... on OrgRestoreMemberMembershipRepositoryAuditEntryData ${restoreRepository}
    ... on OrgRestoreMemberMembershipTeamAuditEntryData ${restoreTeam}
}`

const topic = `{
    id
    name
    viewerHasStarred
}`

// --- Start of generic audit entries
const nodeEntryData = `... on Node {
    id
}`

const auditEntry = `... on AuditEntry {
    action
    actor ${actor}
    actorIp
    actorLocation ${actorLocation}
    actorLogin
    actorResourcePath
    actorUrl
    createdAt
    operationType
    user ${user}
    userLogin
    userResourcePath
    userUrl    
}`

const organizationAuditEntryData = `... on OrganizationAuditEntryData {
    # organization {organization}
    organizationName
    organizationResourcePath
    organizationUrl
}`

const repositoruAuditEntryData = `... on RepositoryAuditEntryData {
    # repository {repository}
    repositoryName
    repositoryResourcePath
    repositoryUrl
}`

const topicAuditEntryData = `... on TopicAuditEntryData {
    topic ${topic}
    topicName
}`

const enterpriseAuditEntryData = `... on EnterpriseAuditEntryData {
    enterpriseResourcePath
    enterpriseSlug
    enterpriseUrl
}`

const teamAuditEntryData = `... on TeamAuditEntryData {
    team ${team}
    teamName
    teamResourcePath
    teamUrl
}`

// --- Start of specific audit entries
const oauthApplicationCreateAuditEntry = `... on OauthApplicationCreateAuditEntry {
    applicationUrl
    callbackUrl
    oauthApplicationResourcePath
    oauthApplicationUrl
    rateLimit
    state
}`

const orgAddBillingManagerAuditEntry = `... on OrgAddBillingManagerAuditEntry {
    invitationEmail
}`

const orgAddMemberAuditEntry = `... on OrgAddMemberAuditEntry {
    permission
}`

const orgBlockUserAuditEntry = `... on OrgBlockUserAuditEntry {
    blockedUserName
    blockedUserResourcePath
    blockedUserUrl
}`

const orgCreateAuditEntry = `... on OrgCreateAuditEntry {
    billingPlan
}`

const orgDisableSamlAuditEntry = `... on OrgDisableSamlAuditEntry {
    digestMethodUrl
    issuerUrl
    signatureMethodUrl
    singleSignOnUrl
}`

const orgEnableSamlAuditEntry = `... on OrgEnableSamlAuditEntry {
    digestMethodUrl
    issuerUrl
    signatureMethodUrl
    singleSignOnUrl
}`

const orgInviteMemberAuditEntry = `... on OrgInviteMemberAuditEntry {
    email
}`

const orgOauthAppAccessApprovedAuditEntry = `... on OrgOauthAppAccessApprovedAuditEntry {
    oauthApplicationName
    oauthApplicationResourcePath
    oauthApplicationUrl
}`

const orgOauthAppAccessDeniedAuditEntry = `... on OrgOauthAppAccessDeniedAuditEntry {
    oauthApplicationName
    oauthApplicationResourcePath
    oauthApplicationUrl
}`

const orgOauthAppAccessRequestedAuditEntry = `... on OrgOauthAppAccessRequestedAuditEntry {
    oauthApplicationName
    oauthApplicationResourcePath
    oauthApplicationUrl
}`

const orgRemoveBillingManagerAuditEntry = `... on OrgRemoveBillingManagerAuditEntry {
    reason
}`

const orgRemoveMemberAuditEntry = `... on OrgRemoveMemberAuditEntry {
    membershipTypes
    reason
}`

const orgRemoveOutsideCollaboratorAuditEntry = `... on OrgRemoveOutsideCollaboratorAuditEntry {
    membershipTypes
    reason
}`

const orgRestoreMemberAuditEntry = `... on OrgRestoreMemberAuditEntry {
    restoredCustomEmailRoutingsCount
    restoredIssueAssignmentsCount
    restoredMemberships ${restoreMembership}
    restoredMembershipsCount
    restoredRepositoriesCount
    restoredRepositoryStarsCount
    restoredRepositoryWatchesCount
}`

const orgUnblockUserAuditEntry = `... on OrgUnblockUserAuditEntry {
    blockedUserName
    blockedUserResourcePath
    blockedUserUrl
}`

const orgUpdateDefaultRepositoryPermissionAuditEntry = `... on OrgUpdateDefaultRepositoryPermissionAuditEntry {
    permission
    permissionWas
}`

const orgUpdateMemberAuditEntry = `... on OrgUpdateMemberAuditEntry {
    permission
    permissionWas
}`

const orgUpdateMemberRepositoryCreationPermissionAuditEntry = `... on OrgUpdateMemberRepositoryCreationPermissionAuditEntry {
    canCreateRepositories
    visibility
}`

const orgUpdateMemberRepositoryInvitationPermissionAuditEntry = `... on OrgUpdateMemberRepositoryInvitationPermissionAuditEntry {
    canInviteOutsideCollaboratorsToRepositories
}`

const repoAccessAuditEntry = `... on RepoAccessAuditEntry {
    visibility
}`

const repoAddMemberAuditEntry = `... on RepoAddMemberAuditEntry {
    visibility
}`

const repoArchivedAuditEntry = `... on RepoArchivedAuditEntry {
    visibility
}`

const repoChangeMergeSettingAuditEntry = `... on RepoChangeMergeSettingAuditEntry {
    isEnabled
    mergeType
}`

const repoCreateAuditEntry = `... on RepoCreateAuditEntry {
    forkParentName
    forkSourceName
    visibility
}`

const repoDestroyAuditEntry = `... on RepoDestroyAuditEntry {
    visibility
}`

const repoRemoveMemberAuditEntry = `... on RepoRemoveMemberAuditEntry {
    visibility
}`

const teamAddMemberAuditEntry = `... on TeamAddMemberAuditEntry {
    isLdapMapped
}`

const teamAddRepositoryAuditEntry = `... on TeamAddRepositoryAuditEntry {
    isLdapMapped
}`

const teamChangeParentTeamAuditEntry = `... on TeamChangeParentTeamAuditEntry {
    isLdapMapped
    parentTeam ${team}
    parentTeamName
    parentTeamNameWas
    parentTeamResourcePath
    parentTeamUrl
    parentTeamWas ${team}
    parentTeamWasResourcePath
    parentTeamWasUrl
}`

const teamRemoveMemberAuditEntry = `... on TeamRemoveMemberAuditEntry {
    isLdapMapped
}`

const teamRemoveRepositoryAuditEntry = `... on TeamRemoveRepositoryAuditEntry {
    isLdapMapped
}`

const ghecAuditLogEntries = `
    __typename
    
    ${nodeEntryData}
    ${auditEntry}
    ${enterpriseAuditEntryData}
    ${organizationAuditEntryData}
    ${repositoruAuditEntryData}
    ${topicAuditEntryData}
    ${teamAuditEntryData}
    
    ${oauthApplicationCreateAuditEntry}
    ${orgAddBillingManagerAuditEntry}
    ${orgAddMemberAuditEntry}
    ${orgBlockUserAuditEntry}
    ${orgCreateAuditEntry}
    ${orgDisableSamlAuditEntry}
    ${orgEnableSamlAuditEntry}
    ${orgInviteMemberAuditEntry}
    ${orgOauthAppAccessApprovedAuditEntry}
    ${orgOauthAppAccessDeniedAuditEntry}
    ${orgOauthAppAccessRequestedAuditEntry}
    ${orgRemoveBillingManagerAuditEntry}
    ${orgRemoveMemberAuditEntry}
    ${orgRemoveOutsideCollaboratorAuditEntry}
    ${orgRestoreMemberAuditEntry}
    ${orgUnblockUserAuditEntry}
    ${orgUpdateDefaultRepositoryPermissionAuditEntry}
    ${orgUpdateMemberAuditEntry}
    ${orgUpdateMemberRepositoryCreationPermissionAuditEntry}
    ${orgUpdateMemberRepositoryInvitationPermissionAuditEntry}
    ${repoAccessAuditEntry}
    ${repoAddMemberAuditEntry}
    ${repoArchivedAuditEntry}
    ${repoChangeMergeSettingAuditEntry}
    ${repoCreateAuditEntry}
    ${repoDestroyAuditEntry}
    ${repoRemoveMemberAuditEntry}
    ${teamAddMemberAuditEntry}
    ${teamAddRepositoryAuditEntry}
    ${teamChangeParentTeamAuditEntry}
    ${teamRemoveMemberAuditEntry}
    ${teamRemoveRepositoryAuditEntry}
`

// All this types have no additional properties and are covered by EntryData types
// Empty covered by supertypes
// const membersCanDeleteReposClearAuditEntry = `... on MembersCanDeleteReposClearAuditEntry {
// }`;
// const membersCanDeleteReposDisableAuditEntry = `... on MembersCanDeleteReposDisableAuditEntry {
// }`;
// const membersCanDeleteReposEnableAuditEntry = `... on MembersCanDeleteReposEnableAuditEntry {
// }`;
// const orgConfigDisableCollaboratorsOnlyAuditEntry = `... on OrgConfigDisableCollaboratorsOnlyAuditEntry {
// }`;
// const orgConfigEnableCollaboratorsOnlyAuditEntry = `... on OrgConfigEnableCollaboratorsOnlyAuditEntry {
// }`;
// const orgDisableOauthAppRestrictionsAuditEntry = `... on OrgDisableOauthAppRestrictionsAuditEntry {
// }`;
// const orgDisableTwoFactorRequirementAuditEntry = `... on OrgDisableTwoFactorRequirementAuditEntry {
// }`;
// const orgEnableOauthAppRestrictionsAuditEntry = `... on OrgEnableOauthAppRestrictionsAuditEntry {
// }`;
// const orgEnableTwoFactorRequirementAuditEntry = `... on OrgEnableTwoFactorRequirementAuditEntry {
// }`;
// const orgInviteToBusinessAuditEntry = `... on OrgInviteToBusinessAuditEntry {
// }`;
// const privateRepositoryForkingDisableAuditEntry = `... on PrivateRepositoryForkingDisableAuditEntry {
// }`;
// const privateRepositoryForkingEnableAuditEntry = `... on PrivateRepositoryForkingEnableAuditEntry {
// }`;
// const repoAddTopicAuditEntry = `... on RepoAddTopicAuditEntry {
// }`;
// const repoConfigDisableAnonymousGitAccessAuditEntry = `... on RepoConfigDisableAnonymousGitAccessAuditEntry {
// }`;
// const repoConfigDisableCollaboratorsOnlyAuditEntry = `... on RepoConfigDisableCollaboratorsOnlyAuditEntry {
// }`;
// const repoConfigDisableContributorsOnlyAuditEntry = `... on RepoConfigDisableContributorsOnlyAuditEntry {
// }`;
// const repoConfigDisableSockpuppetDisallowedAuditEntry = `... on RepoConfigDisableSockpuppetDisallowedAuditEntry {
// }`;
// const repoConfigEnableAnonymousGitAccessAuditEntry = `... on RepoConfigEnableAnonymousGitAccessAuditEntry {
// }`;
// const repoConfigEnableCollaboratorsOnlyAuditEntry = `... on RepoConfigEnableCollaboratorsOnlyAuditEntry {
// }`;
// const repoConfigEnableContributorsOnlyAuditEntry = `... on RepoConfigEnableContributorsOnlyAuditEntry {
// }`;
// const repoConfigEnableSockpuppetDisallowedAuditEntry = `... on RepoConfigEnableSockpuppetDisallowedAuditEntry {
// }`;
// const repoConfigLockAnonymousGitAccessAuditEntry = `... on RepoConfigLockAnonymousGitAccessAuditEntry {
// }`;
// const repoConfigUnlockAnonymousGitAccessAuditEntry = `... on RepoConfigUnlockAnonymousGitAccessAuditEntry {
// }`;
// const repoRemoveTopicAuditEntry = `... on RepoRemoveTopicAuditEntry {
// }`;
// const repositoryVisibilityChangeDisableAuditEntry = `... on RepositoryVisibilityChangeDisableAuditEntry {
// }`;
// const repositoryVisibilityChangeEnableAuditEntry = `... on RepositoryVisibilityChangeEnableAuditEntry {
// }`;
//
// ${membersCanDeleteReposClearAuditEntry}
// ${membersCanDeleteReposDisableAuditEntry}
// ${membersCanDeleteReposEnableAuditEntry}
// ${orgConfigDisableCollaboratorsOnlyAuditEntry}
// ${orgConfigEnableCollaboratorsOnlyAuditEntry}
// ${orgDisableOauthAppRestrictionsAuditEntry}
// ${orgDisableTwoFactorRequirementAuditEntry}
// ${orgEnableOauthAppRestrictionsAuditEntry}
// ${orgEnableTwoFactorRequirementAuditEntry}
// ${orgInviteToBusinessAuditEntry}
// ${privateRepositoryForkingDisableAuditEntry}
// ${privateRepositoryForkingEnableAuditEntry}
// ${repoAddTopicAuditEntry}
// ${repoConfigDisableAnonymousGitAccessAuditEntry}
// ${repoConfigDisableCollaboratorsOnlyAuditEntry}
// ${repoConfigDisableContributorsOnlyAuditEntry}
// ${repoConfigDisableSockpuppetDisallowedAuditEntry}
// ${repoConfigEnableAnonymousGitAccessAuditEntry}
// ${repoConfigEnableCollaboratorsOnlyAuditEntry}
// ${repoConfigEnableContributorsOnlyAuditEntry}
// ${repoConfigEnableSockpuppetDisallowedAuditEntry}
// ${repoConfigLockAnonymousGitAccessAuditEntry}
// ${repoConfigUnlockAnonymousGitAccessAuditEntry}
// ${repoRemoveTopicAuditEntry}
// ${repositoryVisibilityChangeDisableAuditEntry}
// ${repositoryVisibilityChangeEnableAuditEntry}

module.exports = ghecAuditLogEntries
