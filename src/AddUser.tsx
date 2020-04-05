import * as React from 'react'
import { Dialog, DialogTitle, TextField, Button, DialogContent, DialogActions } from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'

function AddUser() {
  const [user, setUser] = React.useState(sessionStorage.getItem('github-user'))
  const [openDialog, setOpenDialog] = React.useState(false)
  const [error, setError] = React.useState(false)

  const addUser = async () => {
    try {
      const resp = await fetch(`https://api.github.com/users/${user}`)
      if (resp.status === 200) {
        sessionStorage.setItem('github-user', user ?? '')
        setOpenDialog(false)
      } else {
        setError(true)
      }
    } catch (error) {
      console.error(error)
    }
  }

  React.useEffect(() => {
    if (!user) {
      setOpenDialog(true)
    }
  })

  return (
    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
      <DialogTitle>Add Github User</DialogTitle>
      <DialogContent>
        <TextField 
          error={error} 
          helperText={error ? 'User Not Found' : null} 
          label="User" 
          onChange={(event) => { setUser(event.target.value); setError(false)}} 
          onKeyPress={(event) => event.key === 'Enter' && addUser()}
          margin="dense" 
          autoFocus 
          fullWidth 
        />
      </DialogContent>
      <DialogActions>
        <Button color="primary" onClick={() => addUser()} ><AddIcon /></Button>
      </DialogActions>
    </Dialog>
  )
}

export default AddUser