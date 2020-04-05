import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RepoList from './repos/RepoList'
import AddUser from './AddUser'
import { createMuiTheme, ThemeProvider, CssBaseline } from '@material-ui/core'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#555'
    }
  }
})

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <RepoList />
      <AddUser />
    </ThemeProvider>
  )
}

ReactDOM.render(App(), document.getElementById('root'))