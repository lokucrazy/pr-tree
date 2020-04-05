import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Typography, Paper, Box } from '@material-ui/core'
import { buildPullURL } from '../utils'

const RepoViewProps = {
  repo: PropTypes.string.isRequired,
  user: PropTypes.string.isRequired
}

function RepoView(props: PropTypes.InferProps<typeof RepoViewProps>) {
  const { repo, user } = props
  const [prs, setPrs] = React.useState({})

  const getPrs = async () => {
    const url = buildPullURL(user, repo)
    try {
      const resp = await fetch(url)
      if (resp.status == 200) {
        console.log(resp)
        const data = await resp.json()
        console.log(data)
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
    </Box>
  ) : null
}

export default RepoView