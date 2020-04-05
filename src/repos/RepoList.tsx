import * as React from 'react'
import Grid from '@material-ui/core/Grid'
import Container from '@material-ui/core/Container'
import Paper from '@material-ui/core/Paper'
import AddRepo from './AddRepo'
import RepoView from './RepoView'
import { Typography, Box } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'

const useStyles = makeStyles({
  paper: {
    '& > p': {
      transition: 'font-size 0.5s',
      '&:hover': {
        fontSize: '20px'
      }
    }
  }
})

function RepoList() {
  const classnames = useStyles()
  const [repos, setRepos] = React.useState(Array<String>())
  const [repo, setRepo] = React.useState('')
  const handleChange = (newRepo: string) => {
    setRepos([...repos, newRepo])
  }
  const user = sessionStorage.getItem('github-user')
  
  React.useEffect(() => {
    setRepos(sessionStorage.getItem('repos')?.split(',') ?? [])
  }, [])


  return (
    <Grid container spacing={2}>
      <Grid item xs={2}>
        <Container>
          <Box py={1} clone><Typography variant="h5">Repos for {user}</Typography></Box>
          <AddRepo user={user ?? ''} addRepo={handleChange} />
          <Box my={2}>
            {repos.map((repo: string) => (
              <Box my={2} key={repo} clone>
                <Paper className={classnames.paper} onClick={() => setRepo(repo)} color="dark" elevation={2} square>
                  <Box pl={1} clone><Typography>{repo}</Typography></Box>
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