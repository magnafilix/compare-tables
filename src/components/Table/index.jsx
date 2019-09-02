import React, { Component, Fragment } from 'react'
import {
  Grid,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  withStyles
} from '@material-ui/core'
import SimpleSelectInput from '../SimpleSelectInput'
import SimpleSwitch from '../SimpleSwitch'

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
  },
  lightGoldenBgk: {
    backgroundColor: 'lightgoldenrodyellow'
  },
  alignRight: {
    textAlign: 'right',
    color: 'rgba(0, 0, 0, 0.54)'
  },
  switchWrapper: {
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-end',
    marginTop: 10
  }
})

class SimpleTable extends Component {
  state = {
    levelName: '',
    levelNames: [],
    planningYears: [],
    hintEnabled: false
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

  handleSwitchChange = name => event => this.setState({ [name]: event.target.checked })

  render() {
    const { levelName, levelNames, planningYears, hintEnabled } = this.state
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
      <Grid>
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
              {
                hintEnabled && pldSet && pldSet.length && plsSet && plsSet.length
                  ? (
                    <Fragment>
                      <TableRow>
                        <TableCell className={classes.alignRight}>Demand</TableCell>
                        {
                          pldSet.map((pld, i) => <TableCell key={`${pld}&${i}`}>{pld}</TableCell>)
                        }
                      </TableRow>
                      <TableRow>
                        <TableCell className={classes.alignRight}>Supply</TableCell>
                        {
                          plsSet.map((pld, i) => <TableCell key={`${pld}&${i}`}>{pld}</TableCell>)
                        }
                      </TableRow>
                    </Fragment>
                  )
                  : null
              }
              <TableRow className={classes.lightGoldenBgk}>
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
        <Grid className={classes.switchWrapper}>
          <SimpleSwitch
            handleChange={this.handleSwitchChange}
            checked={hintEnabled}
            name={'hintEnabled'}
          />
        </Grid>
      </Grid>
    )
  }
}

export default withStyles(styles)(SimpleTable)