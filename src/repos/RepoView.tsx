import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Typography, Box, Paper } from '@material-ui/core'
import { buildPullURL } from '../utils'
import { PullRequest } from '../models'

const RepoViewProps = {
  repo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired,
  api: PropTypes.string.isRequired,
}

function RepoView(props: PropTypes.InferProps<typeof RepoViewProps>) {
  const { repo, user, api } = props
  const [prs, setPrs] = React.useState(Array<PullRequest>())

  const getPrs = async () => {
    const url = buildPullURL(api, user, repo)
    try {
      const resp = await fetch(url)
      if (resp.status == 200) {
        console.log(resp)
        const data = await resp.json()
        setPrs(data)
      } else {
        console.log(resp)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (repo) {
      console.log('getting prs...')
      getPrs()
    }
  }, [repo])

  return repo ? (
    <Box mt={2}>
      <Typography variant="h6">{repo}</Typography>
      <Box my={2}>
        {prs.map((pr) => (
          <Box my={2} key={pr.id}>
          <Paper elevation={3}>
            {pr.id}
          </Paper>
          </Box>
        ))}
      </Box>
    </Box>
  ) : null
}

export default RepoView