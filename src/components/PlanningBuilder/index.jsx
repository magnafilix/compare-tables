import React, { Component, Fragment } from 'react'
import { Grid, TextField, withStyles, Typography } from '@material-ui/core'
import PlusButton from '../PlusButton'
import MinusButton from '../MinusButton'

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
  }
})

class PlanningBuilder extends Component {
  state = {
    planningYears: 0,
    tablesCount: 1,
    levelsCount: 1
  }

  handleChange = name => event => {
    const { planningYears } = this.props
    if (name === 'planningYears' && planningYears.some(year => year[0] === Number(event.target.value)))
      return

    if (event.target.value < 0) return

    this.setState({ [name]: event.target.value })
  }

  _handleChange = (name, value) => value > -1 && this.setState({ [name]: value })

  render() {
    const { classes } = this.props
    const {
      planningYears,
      tablesCount,
      levelsCount
    } = this.state

    const tablesYearsArr = [...Array(Number(planningYears)).keys()]
    const tablesCountArr = [...Array(Number(tablesCount)).keys()]
    const levelsCountArr = [...Array(Number(levelsCount)).keys()]
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
                          value={this.state[`d_l_${level + 1}_${table + 1}`]}
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
                              value={this.state[`d_${currentYear + year}_l_${level + 1}_${table + 1}`]}
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
                          value={this.state[`s_l_${level + 1}_${table + 1}`]}
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
                              value={this.state[`s_${currentYear + year}_${table + 1}`]}
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
      </Grid>
    )
  }
}

export default withStyles(styles)(PlanningBuilder)