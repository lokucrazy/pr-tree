import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import AddRepo from './AddRepo'
import RepoView from './RepoView'
import { Typography, Box, IconButton, Button } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import UserApiContext from '../UserApiContext'
import RemoveIcon from '@material-ui/icons/Remove';

const useStyles = makeStyles({
  paper: {
    width: '100%',
    '& p': {
      transition: 'font-size 0.5s',
    },
    '&:hover p': {
      fontSize: '20px',
    },
  },
})

function RepoList() {
  const userApiContext = React.useContext(UserApiContext)
  const classnames = useStyles()
  const [repos, setRepos] = React.useState(sessionStorage.getItem('github-repos')?.split(',') ?? Array<String>())
  const [repo, setRepo] = React.useState('')
  const handleChange = (newRepo: string) => {
    setRepos([...repos, newRepo])
  }
  const user = userApiContext.user ?? ''
  
  const saveRepos = () => {
    sessionStorage.setItem('github-repos', repos.toString())
  }

  const removeRepos = (index: number) => {
    if (repo == repos[index]) setRepo('') 
    setRepos(repos.filter((_, repoIndex: number) => index !== repoIndex))
  }

  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Container>
          <Box py={1} clone><Typography variant="h5">Repos for {user}</Typography></Box>
          <AddRepo user={user ?? ''} addRepo={handleChange} />
          <Box my={1}>
            <Button size="small" variant="outlined" onClick={() => saveRepos()}>Save Repo List</Button>
          </Box>
          <Box my={2}>
            {repos.map((repo: string, index: number) => (
              <Box my={2} key={repo} clone>
                <Paper className={classnames.paper} onClick={() => setRepo(repo)} color="dark" elevation={2} square>
                  <Box px={1} display="inline" clone>
                    <IconButton size="small" onClick={(event) => { event.stopPropagation(); removeRepos(index) }}><RemoveIcon /></IconButton>
                  </Box>
                  <Box pl={1} display="inline" clone>
                    <Typography>{repo}</Typography>
                  </Box>
                </Paper>
              </Box>
            ))}
          </Box>
        </Container>
      </Grid>
      <Grid item xs={10}>
        <RepoView user={user ?? ''} repo={repo}/>
      </Grid>
    </Grid>
  )
}

export default RepoList