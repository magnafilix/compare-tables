import React, { Component } from 'react'
import { Grid, Modal, Typography, withStyles } from '@material-ui/core'

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    width: '80%',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  }
})

class SimpleModal extends Component {
  render() {
    const { open = false, handleClose, classes } = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Grid className={classes.paper}>
          <Typography variant='h4'>
            Modal
        </Typography>
        </Grid>
      </Modal>
    )
  }
}

export default withStyles(styles)(SimpleModal)