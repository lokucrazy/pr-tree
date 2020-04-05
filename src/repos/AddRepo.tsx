import * as React from 'react'
import { TextField, Button } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add';
import * as PropTypes from 'prop-types'
import { makeStyles } from '@material-ui/styles';
import { buildRepoURL } from '../utils';

const useStyles = makeStyles({
  addRepo: {
    marginLeft: '5px',
    marginTop: '12px'
  }
})

const AddRepoProps = {
  addRepo: PropTypes.func.isRequired,
  user: PropTypes.string.isRequired
}

function AddRepo(props: PropTypes.InferProps<typeof AddRepoProps>) {
  const { addRepo, user } = props
  if (!user) return null
  const classnames = useStyles()
  const [repo, setRepo] = React.useState('')
  const [repos, setRepos] = React.useState(Array<String>())
  const [error, setError] = React.useState(false)
  const handleClick = React.useCallback(async () => {
    if (repo) {
      const url = buildRepoURL(user, repo)
      if (!url) {
        setError(true)
        return
      }
      try {
        const resp = await fetch(url)
        const [, match1, match2] = url.match(/https:\/\/api.github.com\/repos\/([A-Za-z0-9-_]+)(?:\/([A-Za-z0-9-_]+))/) ?? ['','','']
        if (resp.status == 200) {
          addRepo((user === match1 && match2) || (user !== match1 && repo))
          setRepo('')
        } else {
          setError(true)
        }
      } catch (error) {
        console.error(error)
      }
    }
  }, [repos, repo, setRepo, setRepos])

  return (
    <>
      <TextField 
        error={error} 
        helperText={error ? 'Could not find repo' : ''} 
        label="Add Repo" value={repo} 
        onChange={(event) => setRepo(event.target.value)}
      />
      <Button className={classnames.addRepo} color="primary" variant="contained" onClick={handleClick} ><AddIcon /></Button>
    </>
  )
}

export default AddRepo