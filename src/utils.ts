export function buildRepoURL(baseUrl: string,user: string, repo: string): string {
  if (!baseUrl || !user || !repo) return ''
  const found = repo.match(/([A-Za-z0-9-_]+)(?:\/([A-Za-z0-9-_]+))?/)
  const [, match1, match2] = found ?? ['', '', '']
  if (match1 && match2) {
    return `${baseUrl}/repos/${match1}/${match2}`
  } else if (match1 && !match2) {
    return `${baseUrl}/repos/${user}/${match1}`
  } else {
    return ''
  }
}

export function buildPullURL(baseUrl: string, user: string, repo: string) {
  if (!baseUrl || !user || !repo) return ''
  const found = repo.match(/([A-Za-z0-9-_]+)(?:\/([A-Za-z0-9-_]+))?/)
  const [, match1, match2] = found ?? ['', '', '']
  if (match1 && match2) {
    return `${baseUrl}/repos/${match1}/${match2}/pulls`
  } else if (match1 && !match2) {
    return `${baseUrl}/repos/${user}/${match1}/pulls`
  } else {
    return ''
  }
}