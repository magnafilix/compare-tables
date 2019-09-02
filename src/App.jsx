import React, { Component } from 'react'
import {
  Grid,
  Typography,
  withStyles
} from '@material-ui/core'
import { MuiThemeProvider } from '@material-ui/core'
import theme from './theme'

import Loader from './components/Loader'
import SnackBar from './components/SnackBar'
import SelectInput from './components/SelectInput'
import Table from './components/Table'
import SimpleButton from './components/SimpleButton'

import { fetchAllPlannings, deletePlanning } from './utils/api'

const styles = theme => ({
  layout: {
    minHeight: 'calc(100vh - 60px)',
    padding: '30px',
    display: 'flex',
    flexDirection: 'column',
    fontSize: 'calc(10px + 2vmin)',
    background: 'linear-gradient(90deg, #bd9f5a, #ffffff)',
    color: 'white'
  },
  centerAll: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  row: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    marginBottom: '35px'
  },
  spaceBetween: {
    justifyContent: 'space-between'
  },
  notifier: {
    textAlign: 'center',
    marginTop: '15%'
  }
})

const selectNames = {
  plan: { showName: 'Plan your data', objName: 'plan' },
  demand: { showName: 'Demand scenario', objName: 'demand' },
  supply: { showName: 'Supply scenario', objName: 'supply' }
}

class App extends Component {
  state = {
    loading: true,
    snackBarActive: false,
    errorMessage: '',
    plannings: [],
    plan: '',
    demand: '',
    supply: ''
  }

  componentDidMount = () => this._fetchAllPlannings()

  _fetchAllPlannings = () => fetchAllPlannings()
    .then(res => {
      const { data } = res
      if (data.length === 0)
        return this.setState({ loading: false })

      this.setState({ plannings: data, loading: false })
      this.handleChange(selectNames.plan.objName)({ target: { value: data[0]._id } })
    })
    .catch(err => this.setState({
      errorMessage: err.message || 'Error on fetching tables data',
      snackBarActive: true,
      loading: false
    }))

  handleChange = name => event => {
    const { value } = event.target

    if (this.state[name] === value)
      return

    if (name === 'plan')
      return this.setState({ [name]: value, demand: '', supply: '' })

    this.setState({ [name]: value })
  }

  handleCloseSnackBar = () => this.setState({ snackBarActive: false, errorMessage: '' })

  _deletePlanning = id => async () => {
    await this.setState({ loading: true, plan: '', demand: '', supply: '' })
    deletePlanning(id)
      .then(res => {
        const { status } = res
        if (status === 204) this._fetchAllPlannings()
      })
      .catch(err => this.setState({
        errorMessage: err.message || 'Error on deleting planning',
        snackBarActive: true,
        loading: false
      }))
  }

  render() {
    const {
      loading,
      snackBarActive,
      errorMessage,
      plannings,
      plan,
      demand,
      supply
    } = this.state
    const { classes } = this.props

    const plans = plannings.map(({ _id, planningName }) => ({ id: _id, name: planningName }))

    const {
      planningName: name,
      planningDemand: demands,
      planningSupply: supplies
    } = plan && plannings.find(({ _id }) => _id === plan)

    const {
      planningLevels: PLD
    } = demand && demands && demands.find(({ tableName }) => tableName === demand)

    const {
      planningLevels: PLS
    } = supply && supplies && supplies.find(({ tableName }) => tableName === supply)

    const centerLoader = loading ? classes.centerAll : ''

    return (
      <MuiThemeProvider theme={theme}>
        <Grid className={`${classes.layout} ${centerLoader}`}>
          {
            loading
              ? <Loader loading={loading} />
              : (
                <Grid>
                  <Grid className={`${classes.row} ${classes.spaceBetween}`}>
                    <SelectInput
                      inputName={selectNames.plan.showName}
                      field={selectNames.plan.objName}
                      handleChange={this.handleChange}
                      labelWidth={105}
                      value={plan}
                      data={plans}
                    />
                    {
                      plan
                        ? <SimpleButton name={'Delete'} onClick={this._deletePlanning(plan)} />
                        : null
                    }
                  </Grid>
                  <Grid className={classes.row}>
                    <SelectInput
                      inputName={selectNames.demand.showName}
                      field={selectNames.demand.objName}
                      handleChange={this.handleChange}
                      labelWidth={127}
                      value={demand}
                      data={demands}
                    />
                    <SelectInput
                      inputName={selectNames.supply.showName}
                      field={selectNames.supply.objName}
                      handleChange={this.handleChange}
                      labelWidth={115}
                      value={supply}
                      data={supplies}
                    />
                  </Grid>
                  {
                    PLD && PLS
                      ? (
                        <Table
                          PLD={PLD}
                          PLS={PLS}
                          name={name}
                        />
                      )
                      : (
                        <Typography variant="h5" className={classes.notifier}>
                          For start planning, please select demand and supply scenarios
                        </Typography>
                      )
                  }
                </Grid>
              )
          }
          <SnackBar
            handleClose={this.handleCloseSnackBar}
            message={errorMessage}
            open={snackBarActive}
          />
        </Grid>
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(App)
