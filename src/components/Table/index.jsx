import React, { Component } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core'
import SimpleSelectInput from '../SimpleSelectInput'

const styles = theme => ({
  root: {
    width: '100%',
    marginTop: theme.spacing(3),
    overflowX: 'auto'
  },
  table: {
    minWidth: 650
  },
  relative: {
    position: 'relative'
  }
})

class SimpleTable extends Component {
  state = {
    levelName: '',
    levelNames: [],
    planningYears: []
  }

  componentDidMount = () => {
    const { PLD, name } = this.props

    const levelNames = PLD.map(({ levelName }) => levelName)
    let years = name.match(/\d+/g).map(Number)[0]
    let thisYear = new Date().getFullYear()

    const planningYears = []

    while (years) {
      planningYears.push(`FTE ${thisYear}`)
      years--
      thisYear++
    }

    this.setState({ levelName: levelNames[0], levelNames, planningYears })
  }

  handleSelectChange = event => this.setState({ levelName: event.target.value })

  render() {
    const { levelName, levelNames, planningYears } = this.state
    const {
      classes,
      PLD, PLS
    } = this.props

    const pldLevelObj = levelName && PLD.find(({ levelName: LN }) => LN === levelName)
    const plsLevelObj = levelName && PLS.find(({ levelName: LN }) => LN === levelName)

    const pldSet = Object.values(pldLevelObj).filter(val => Number.isInteger(val))
    const plsSet = Object.values(plsLevelObj).filter(val => Number.isInteger(val))

    const setsDiff = []

    for (let i = 0; i < Math.min(pldSet.length, plsSet.length); i++) {
      setsDiff.push(pldSet[i] - plsSet[i])
    }

    return (
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Planning level</TableCell>
              {
                planningYears.map((year, index) => <TableCell key={`${year}&${index}`}>{year}</TableCell>)
              }
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell className={classes.relative}>
                <SimpleSelectInput
                  handleChange={this.handleSelectChange}
                  name='table-select'
                  value={levelName}
                  data={levelNames}
                />
              </TableCell>
              {
                setsDiff.map((num, i) => <TableCell key={`${num}&${i}`}>{num}</TableCell>)
              }
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    )
  }
}

export default withStyles(styles)(SimpleTable)