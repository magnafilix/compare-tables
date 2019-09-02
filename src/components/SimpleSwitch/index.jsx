import React, { Component } from 'react'
import { Switch } from '@material-ui/core'

class SimpleSwitch extends Component {
  render() {
    const { checked = false, name, handleChange } = this.props

    return (
      <Switch
        color="default"
        checked={checked}
        onChange={handleChange(name)}
      />
    )
  }
}

export default SimpleSwitch