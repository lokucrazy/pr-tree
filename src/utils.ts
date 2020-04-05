export function buildRepoURL(user: string, repo: string): string {
  if (!user || !repo) return ''
  const found = repo.match(/([A-Za-z0-9-_]+)(?:\/([A-Za-z0-9-_]+))?/)
  const [, match1, match2] = found ?? ['', '', '']
  let url = 'https://api.github.com/repos/'
  if (match1 && match2) {
    url += `${match1}/${match2}`
  } else if (match1 && !match2) {
    url += `${user}/${match1}`
  } else {
    return ''
  }
  return url
}

export function buildPullURL(user: string, repo: string) {
  if (!user || !repo) return ''
  const found = repo.match(/([A-Za-z0-9-_]+)(?:\/([A-Za-z0-9-_]+))?/)
  const [, match1, match2] = found ?? ['', '', '']
  let url = 'https://api.github.com/repos/'
  if (match1 && match2) {
    url += `${match1}/${match2}/pulls`
  } else if (match1 && !match2) {
    url += `${user}/${match1}/pulls`
  } else {
    return ''
  }
  return url
}