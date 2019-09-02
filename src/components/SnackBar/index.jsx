import React, { Component } from 'react'
import { IconButton, Snackbar } from '@material-ui/core'

import CloseIcon from '@material-ui/icons/Close'

class SimpleSnackbar extends Component {
  render() {
    const { open, handleClose, message } = this.props

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
        open={open}
        autoHideDuration={3500}
        onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id'
        }}
        message={<span id="message-id">{message}</span>}
        action={[
          <IconButton
            key="close"
            aria-label="close"
            onClick={handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    )
  }
}

export default SimpleSnackbar