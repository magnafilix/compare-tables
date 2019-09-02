import React, { Component } from 'react'
import {
  FormControl,
  MenuItem,
  Select,
  withStyles
} from '@material-ui/core'

const styles = theme => ({
  selectInsiedTr: {
    width: '75%',
    position: 'absolute',
    top: '7px'
  },
  fontSize: {
    fontSize: '14px'
  }
})

class SimpleSelectInput extends Component {
  render() {
    const { data = [], name, value, handleChange, classes } = this.props

    return (
      <FormControl className={classes.selectInsiedTr}>
        <Select
          value={value}
          onChange={handleChange}
          className={classes.fontSize}
          inputProps={{
            name: name,
            id: `simple-${name}`
          }}
        >
          {
            data.map((title, index) => {
              return (
                <MenuItem key={`${title}&${index}`} value={title}>
                  {title}
                </MenuItem>
              )
            })
          }
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(styles)(SimpleSelectInput)