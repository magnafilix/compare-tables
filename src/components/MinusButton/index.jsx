import React, { Component } from 'react'
import { Fab, withStyles } from '@material-ui/core'
import { Remove } from '@material-ui/icons'

const styles = theme => ({
  scale: {
    transform: 'scale(.5)'
  }
})

class MinusButton extends Component {
  render() {
    const { classes, onClick, className = '' } = this.props

    return (
      <Fab
        color="primary"
        aria-label="add"
        className={`${classes.scale} ${className}`}
        onClick={onClick}>
        <Remove />
      </Fab>
    )
  }
}

export default withStyles(styles)(MinusButton)