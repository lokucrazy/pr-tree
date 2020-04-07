import * as React from 'react'
import * as ReactDOM from 'react-dom'
import RepoList from './repos/RepoList'
import Settings from './Settings'
import { createMuiTheme, ThemeProvider, CssBaseline, Button } from '@material-ui/core'
import SettingsIcon from '@material-ui/icons/Settings';
import UserApiContext from './UserApiContext'

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#fff'
    },
    secondary: {
      main: '#777'
    }
  }
})

function App() {
  const [user, setUser] = React.useState(sessionStorage.getItem('github-user'))
  const [api, setApi] = React.useState(sessionStorage.getItem('github-api'))
  const [openSettings, setOpenSettings] = React.useState(false)
  const userApiContext = { 
    user: user,
    api: api,
    setItems: (newUser: string, newApi: string) => {
      sessionStorage.setItem('github-user', newUser)
      sessionStorage.setItem('github-api', newApi)
      setUser(newUser)
      setApi(api)
    }
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <UserApiContext.Provider value={userApiContext}>
        <CssBaseline />
        <Button onClick={() => setOpenSettings(true)} color="secondary"><SettingsIcon /></Button>
        <RepoList />
        <Settings open={openSettings} setOpen={setOpenSettings} />
      </UserApiContext.Provider>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))