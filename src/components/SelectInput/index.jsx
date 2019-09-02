import React, { Component } from 'react'
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  OutlinedInput,
  withStyles
} from '@material-ui/core'

const styles = theme => ({
  formControl: {
    [theme.breakpoints.down('xs')]: {
      marginRight: '8%',
      minWidth: 165
    },
    [theme.breakpoints.up('sm')]: {
      marginRight: '20%',
      minWidth: 225
    }
  }
})

class SelectInput extends Component {
  toHtmlInputNameFormat = name => name.split(' ').join('-').toLowerCase()

  render() {
    const {
      data = [],
      handleChange,
      field,
      value,
      inputName,
      classes,
      labelWidth
    } = this.props

    return (
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel htmlFor={`select-${this.toHtmlInputNameFormat(inputName)}`}>
          {inputName}
        </InputLabel>
        <Select
          value={value}
          onChange={handleChange(field)}
          input={
            <OutlinedInput
              labelWidth={labelWidth}
              name={this.toHtmlInputNameFormat(inputName)}
            />
          }
        >
          {
            field === 'plan'
              ? data
                .map(({ id, name }) => <MenuItem key={id} value={id}>{name}</MenuItem>)
              : data
                .map(({ tableName: name }) => <MenuItem key={name} value={name}>{name}</MenuItem>)
          }
        </Select>
      </FormControl>
    )
  }
}

export default withStyles(styles)(SelectInput)