import React, { Component, Fragment } from 'react'
import { Grid, TextField, withStyles, Typography } from '@material-ui/core'
import PlusButton from '../PlusButton'
import MinusButton from '../MinusButton'
import SimpleButton from '../SimpleButton'

const styles = theme => ({
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
    marginTop: 0
  },
  innerLayout: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  tableLike: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 15
  },
  column: {
    width: '50%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center'
  },
  lightYellow: {
    '& div': {
      backgroundColor: 'lightyellow'
    },
    '& label': {
      zIndex: 999
    }
  },
  ligthYellowClass: {
    backgroundColor: 'lightyellow',
    color: theme.palette.primary[500],
    '&:hover': {
      color: 'white'
    }
  },
  bottomBorder: {
    width: '50%',
    borderBottom: '2px solid',
    marginTop: 10
  },
  marginTop: {
    margin: '35 0 35 0'
  }
})

class PlanningBuilder extends Component {
  state = {
    planningYears: 0,
    tablesCount: 1,
    levelsCount: 0
  }

  handleChange = name => event => {
    const { planningYears } = this.props
    if (name === 'planningYears' && planningYears.some(year => year[0] === Number(event.target.value)))
      return

    if (event.target.value < 0) return

    this.setState({ [name]: event.target.value })
  }

  _handleChange = (name, value) => value > -1 && this.setState({ [name]: value })

  isDisabled = () => Object.values(this.state).some(v => v === '0' || v === '' || v === 0)

  createArrayByNum = num => [...Array(Number(num)).keys()]

  mapKeyName = key => {
    const regex = /_/g
    if (key.match(regex).length === 1) return 'tableName'
    if (key.match(regex).length === 3) return 'levelName'
    if (key.match(regex).length === 5) return `FTE${key.substr(key.lastIndexOf('_'))}`
  }

  mapStateToPlanningTable = () => {
    const { planningYears } = this.state

    const newPlanning = {
      planningName: `Planning for ${planningYears} years`,
      planningDemand: [],
      planningSupply: []
    }

    const dArr = []
    const sArr = []

    Object
      .keys(this.state)
      .forEach(key => {
        if (key.includes('d_'))
          return dArr.push({ [this.mapKeyName(key)]: this.state[key] })
        if (key.includes('s_'))
          return sArr.push({ [this.mapKeyName(key)]: this.state[key] })
      })

    let dObj = { tableName: '', planningLevels: [] }
    let lObj = { tableName: '', planningLevels: [] }

    for (let i = 0; i < dArr.length; i++) {
      if (dArr[i].tableName) {
        dObj.tableName = dArr[i].tableName
        continue
      }

      if (dArr[i].levelName) {
        dObj.planningLevels.push({ levelName: dArr[i].levelName })
        continue
      }

      dObj.planningLevels[dObj.planningLevels.length - 1][Object.keys(dArr[i])[0]] = Number(Object.values(dArr[i])[0])

      if (dArr[i + 1] && dArr[i + 1].tableName) {
        newPlanning.planningDemand.push(dObj)
        dObj = { tableName: '', planningLevels: [] }
      }

      if (!dArr[i + 1]) newPlanning.planningDemand.push(dObj)
    }

    for (let i = 0; i < sArr.length; i++) {
      if (sArr[i].tableName) {
        lObj.tableName = sArr[i].tableName
        continue
      }

      if (sArr[i].levelName) {
        lObj.planningLevels.push({ levelName: sArr[i].levelName })
        continue
      }

      lObj.planningLevels[lObj.planningLevels.length - 1][Object.keys(sArr[i])[0]] = Number(Object.values(sArr[i])[0])

      if (sArr[i + 1] && sArr[i + 1].tableName) {
        newPlanning.planningSupply.push(lObj)
        lObj = { tableName: '', planningLevels: [] }
      }

      if (!sArr[i + 1]) newPlanning.planningSupply.push(lObj)
    }
  }

  render() {
    const { classes } = this.props
    const {
      planningYears,
      tablesCount,
      levelsCount
    } = this.state

    const tablesYearsArr = this.createArrayByNum(planningYears)
    const tablesCountArr = this.createArrayByNum(tablesCount)
    const levelsCountArr = this.createArrayByNum(levelsCount)
    const currentYear = new Date().getFullYear()

    return (
      <Grid className={classes.innerLayout}>
        <TextField
          id="planning-years"
          label="Planning years"
          className={classes.textField}
          value={planningYears}
          onChange={this.handleChange('planningYears')}
          margin="normal"
          type="number"
        />
        <Grid>
          <MinusButton onClick={() => this._handleChange('tablesCount', Number(tablesCount) - 1)} />
          <PlusButton onClick={() => this._handleChange('tablesCount', Number(tablesCount) + 1)} />
        </Grid>
        <Grid>
          <MinusButton
            className={classes.ligthYellowClass}
            onClick={() => this._handleChange('levelsCount', Number(levelsCount) - 1)}
          />
          <PlusButton
            className={classes.ligthYellowClass}
            onClick={() => this._handleChange('levelsCount', Number(levelsCount) + 1)}
          />
        </Grid>
        <Grid className={classes.tableLike}>
          <Grid className={classes.column}>
            <Typography>Demand</Typography>
            {
              tablesCountArr.map((table, index) => (
                <Fragment key={`${table}&${index}`}>
                  <TextField
                    id="demand-table-name"
                    label="Table name"
                    className={classes.textField}
                    value={this.state[`d_${table + 1}`]}
                    onChange={this.handleChange(`d_${table + 1}`)}
                    margin="normal"
                  />
                  {
                    levelsCountArr.map((level, index) => (
                      <Fragment key={`${level}&${index}`}>
                        <TextField
                          id="demand-table-level"
                          label="Level name"
                          className={`${classes.textField} ${classes.lightYellow}`}
                          value={this.state[`d_${table + 1}_l_${level + 1}`]}
                          onChange={this.handleChange(`d_${table + 1}_l_${level + 1}`)}
                          margin="normal"
                        />
                        {
                          tablesYearsArr.map((year, index) => (
                            <TextField
                              key={`${year}&${index}`}
                              id={`demand-table-${currentYear + year}`}
                              label={currentYear + year}
                              className={classes.textField}
                              value={this.state[`d_${table + 1}_l_${level + 1}_y_${currentYear + year}`]}
                              onChange={this.handleChange(`d_${table + 1}_l_${level + 1}_y_${currentYear + year}`)}
                              margin="normal"
                              type="number"
                            />
                          ))
                        }
                      </Fragment>
                    ))
                  }
                  <Grid className={classes.bottomBorder} />
                </Fragment>
              ))
            }
          </Grid>
          <Grid className={classes.column}>
            <Typography>Supply</Typography>
            {
              tablesCountArr.map((table, index) => (
                <Fragment key={`${table}&${index}`}>
                  <TextField
                    id="supply-table-name"
                    label="Table name"
                    className={classes.textField}
                    value={this.state[`s_${table + 1}`]}
                    onChange={this.handleChange(`s_${table + 1}`)}
                    margin="normal"
                  />
                  {
                    levelsCountArr.map((level, index) => (
                      <Fragment key={`${level}&${index}`}>
                        <TextField
                          id="supply-table-level"
                          label="Level name"
                          className={`${classes.textField} ${classes.lightYellow}`}
                          value={this.state[`s_${table + 1}_l_${level + 1}`]}
                          onChange={this.handleChange(`s_${table + 1}_l_${level + 1}`)}
                          margin="normal"
                        />
                        {
                          tablesYearsArr.map((year, index) => (
                            <TextField
                              key={`${year}&${index}`}
                              id={`supply-table-${currentYear + year}`}
                              label={currentYear + year}
                              className={classes.textField}
                              value={this.state[`s_${table + 1}_l_${level + 1}_y_${currentYear + year}`]}
                              onChange={this.handleChange(`s_${table + 1}_l_${level + 1}_y_${currentYear + year}`)}
                              margin="normal"
                              type="number"
                            />
                          ))
                        }
                      </Fragment>
                    ))
                  }
                  <Grid className={classes.bottomBorder} />
                </Fragment>
              ))
            }
          </Grid>
        </Grid>
        <SimpleButton
          name='Save'
          className={`${classes.button} ${classes.marginTop}`}
          onClick={() => this.mapStateToPlanningTable()}
          disabled={this.isDisabled()}
        />
      </Grid>
    )
  }
}

export default withStyles(styles)(PlanningBuilder)