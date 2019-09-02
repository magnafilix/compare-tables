import React, { Component } from 'react'
import { css } from '@emotion/core'
import ClipLoader from 'react-spinners/ClipLoader'
import { Grid } from '@material-ui/core'

const override = css`
    display: block;
    margin: 0 auto;
    border-color: white;
`

class Loader extends Component {
  render() {
    const { loading } = this.props

    return (
      <Grid>
        <ClipLoader
          css={override}
          sizeUnit={'px'}
          size={150}
          color={'#123abc'}
          loading={loading}
        />
      </Grid>
    )
  }
}

export default Loader