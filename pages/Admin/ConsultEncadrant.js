import React from 'react'
import Layout from '../../components/Layout'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const ConsultEncadrant = () => {
  return (
    <Layout>

<Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">en cours de traitement ...</Alert>
    </Stack>
    </Layout>
  )
}

export default ConsultEncadrant