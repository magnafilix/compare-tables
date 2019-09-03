import React, { Component } from 'react'
import { Button } from '@material-ui/core'

class SimpleButton extends Component {
  render() {
    const { name, onClick, className, disabled = false } = this.props

    return (
      <Button
        variant="outlined"
        className={className}
        onClick={onClick}
        disabled={disabled}>
        {name}
      </Button>
    )
  }
}

export default SimpleButton