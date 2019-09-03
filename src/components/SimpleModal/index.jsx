import React, { Component } from 'react'
import { Grid, Modal, withStyles } from '@material-ui/core'
import PlanningBuiler from '../PlanningBuilder'

const styles = theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  paper: {
    position: 'absolute',
    width: '80%',
    height: '80%',
    overflowY: 'scroll',
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    display: 'flex',
    justifyContent: 'center',
    '&:focus': {
      outline: 0
    }
  }
})

class SimpleModal extends Component {
  render() {
    const {
      open = false,
      handleClose,
      classes,
      planningYears,
      createPlanning
    } = this.props

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={handleClose}
        className={classes.modal}
      >
        <Grid className={classes.paper}>
          <PlanningBuiler
            createPlanning={createPlanning}
            planningYears={planningYears}
          />
        </Grid>
      </Modal>
    )
  }
}

export default withStyles(styles)(SimpleModal)