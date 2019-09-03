import React, { Component } from 'react'
import { Fab, withStyles } from '@material-ui/core'
import { Add } from '@material-ui/icons'

const styles = theme => ({
  scale: {
    transform: 'scale(.5)'
  }
})

class PlusButton extends Component {
  render() {
    const { classes, onClick, className = '' } = this.props

    return (
      <Fab
        color="primary"
        aria-label="add"
        className={`${classes.scale} ${className}`}
        onClick={onClick}>
        <Add />
      </Fab>
    )
  }
}

export default withStyles(styles)(PlusButton)