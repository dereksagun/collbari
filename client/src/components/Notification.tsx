import { Alert, Snackbar } from "@mui/material";

const Notification = ({open, setOpen, notification, severity}: {
  open: boolean, 
  setOpen: React.Dispatch<React.SetStateAction<boolean>>, 
  notification: string,
  severity: 'success' | 'error'
}) => {

  return (
    <Snackbar
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}
      open={open}
      autoHideDuration={5000}
      onClose={() => setOpen(false)}>
      <Alert
        severity={severity}
        onClose={() => setOpen(false)}
        variant='filled'
        sx={{ width: '100%' }}
      >
      {notification}
      </Alert>
    </Snackbar>
  )
}

export default Notification