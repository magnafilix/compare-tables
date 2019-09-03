import React, { Component } from 'react'
import { Button } from '@material-ui/core'

class SimpleButton extends Component {
  render() {
    const { name, onClick, className } = this.props

    return (
      <Button
        variant="outlined"
        className={className}
        onClick={onClick}>
        {name}
      </Button>
    )
  }
}

export default SimpleButton