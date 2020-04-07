import * as React from 'react'
import * as PropTypes from 'prop-types'
import { Dialog, DialogTitle, TextField, Button, DialogContent, DialogActions } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import UserApiContext from './UserApiContext'

const SettingsProps = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired
}

function Settings(props: PropTypes.InferProps<typeof SettingsProps>) {
  const { open, setOpen } = props
  const userApiContext = React.useContext(UserApiContext)
  const [user, setUser] = React.useState(userApiContext.user ?? '')
  const [api, setApi] = React.useState(userApiContext.api ?? '')
  const [userError, setUserError] = React.useState(false)
  const [apiError, setApiError] = React.useState(false)
  const apiRegex = /https:\/\/api.github(.[a-z0-9-_]+)?.com/

  const validate = (): boolean => {
    if (!api) { setApiError(true); }
    if (!user) { setUserError(true); }
    if (!api || !user) return false
    if (!api.match(apiRegex)) {
      setApiError(true)
      return false
    }
    return true
  }

  const setContext = async () => {
    if (!validate()) return
    try {
      const gitResp = await fetch(api)
      console.log({ api, gitResp })
      if (gitResp.status === 200) {
        const userResp = await fetch(`${api}/users/${user}`)
        console.log(userResp)
        if (userResp.status === 200) {
          userApiContext.setItems(user, api)
          setOpen(false)
        } else {
          setUserError(true)
        }
      } else {
        setApiError(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (!user || !api) {
      setOpen(true)
    }
  })

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
      <DialogTitle>Add Github User</DialogTitle>
      <DialogContent>
        <TextField 
          error={userError} 
          helperText={userError ? 'User Not Found' : null} 
          label="User" 
          value={user}
          onChange={(event) => { setUser(event.target.value); setUserError(false)}} 
          onKeyPress={(event) => event.key === 'Enter' && setContext()}
          margin="dense" 
          autoFocus 
          fullWidth 
        />
        <TextField 
          error={apiError} 
          helperText={apiError ? 'API Not Found' : null} 
          label="API" 
          value={api}
          onChange={(event) => {
            const match = event.target.value.match(apiRegex)
            if (match?.length) {
              const [fullWord] = match
              setApi(fullWord)
            } else {
              setApi(event.target.value);
            }
            setApiError(false)
          }} 
          onKeyPress={(event) => event.key === 'Enter' && setContext()}
          margin="dense" 
          autoFocus 
          fullWidth 
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => setContext()} ><AddIcon /></Button>
      </DialogActions>
    </Dialog>
  )
}

export default Settings