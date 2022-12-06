import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react'
import { useQuery, useMutation } from 'react-query';
import Layout from '../../../components/Layout'
import { getDemande, updateDemande } from '../../../lib/helper';

// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TextareaAutosize } from '@mui/material';
import { Tooltip } from '@mui/material';
import Link from 'next/link';
import  { GrValidate } from '@react-icons/all-files/gr/GrValidate';import { VscError } from 'react-icons/vsc';

import Box from '@mui/joy/Box';
import IconButton from '@mui/joy/IconButton';
import Textarea from '@mui/joy/Textarea';
import Typography from '@mui/joy/Typography';

import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import SendIcon from '@mui/icons-material/Send';
import Stack from '@mui/material/Stack';
import { useFormik } from 'formik';
const useShowDemande = () => {

  const router = useRouter()
  console.log(router.query.id);

  const {data, isLoading, isError, error} = useQuery(['demandes',router.query.id],()=> getDemande(router.query.id))
  // console.log("-------------------------------------------------------------------------------------------------")

  if(isLoading)  console.log("loading")
  if(isError)  console.log("Error")
  const [toggle, settoggle] = useState(data && data.ok)
  const [status, setstatus] = useState(data&& data.ok? "true": "false")
  console.log(data && data)
  const UpdateMutation = useMutation((newData)=>updateDemande(data && data._id, newData), {
    onSuccess: async(data)=>{
      console.log('data updated')
      console.log(data)

    },


  })
  console.log()


  const handleAccept= async ()=>{
    console.log("accepter")
    settoggle(true)
    setstatus("true")
    await UpdateMutation.mutate({ok:true})

  }

  const handleRefus= async()=>{
    settoggle(false)
    console.log("Refus")

    setstatus("false")
    await UpdateMutation.mutate({ok:false})


  }

  const [text, setText] = useState('');
  const addEmoji = (emoji) => () => setText(`${text}${emoji}`);
  const formik = useFormik({
    initialValues: {
      commentaire:text

    },

    onSubmit,
  })
  async function onSubmit(values) {
    await UpdateMutation.mutate({ok:false, commentaire:text})


  }
  return (
    <Layout>
    <Head>
      <title>Show {data}</title>
    </Head>

    <div class="flex flex-col">
  <div class="overflow-x-auto sm:-mx-6 lg:-mx-8">
    <div class="py-2 inline-block min-w-full sm:px-6 lg:px-8">
      <div class="overflow-hidden">
        <table class="min-w-full">
          <thead class="bg-white border-b">
            <tr>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                #
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Parcour
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                nom Etudiant 1
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Prenom Etudiant 1
              </th>
             {data&& data.nom2 ? <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nom Etudiant 2
              </th>: null}

              {data&& data.nom2 ?<th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Prenom Etudiant 2
              </th>:null}

              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Accept /refus
                </th>
                <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                status
                </th>

            </tr>
          </thead>
          <tbody>


            <tr class="bg-gray-100 border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> #</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data&& data.parcour}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data&& data.nom}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data&& data.prenom}
              </td>
             {data && data.nom2? <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data&& data.nom2}
              </td>: null}
              {data && data.prenom2 ?<td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {data&& data.prenom2}
              </td>: null}

              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
              {!toggle? <Tooltip title={`accepter`}>
               <a  onClick={()=>handleAccept()} >
               <GrValidate color='blue' value={{ color:'blue', size: '50px' }}  size={'2em'}/>
               </a>
               </Tooltip>:
               <Tooltip title={`Refus`}>
               <a  onClick={()=>handleRefus()} >
               <VscError color='red' value={{ color:'red', size: '50px' }}  size={'2em'}/>
               </a>
               </Tooltip>


               }
              </td>
              <td>
                {status}
              </td>


            </tr>



          </tbody>
        </table>
        <form onSubmit={formik.handleSubmit}>
        <Textarea
      placeholder="Type in here…"
      value={text}
      onChange={(event) => setText(event.target.value)}
      minRows={2}
      maxRows={4}
      startDecorator={
        <Box sx={{ display: 'flex', gap: 0.5 }}>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('👍')}>
            👍
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('🏖')}>
            🏖
          </IconButton>
          <IconButton variant="outlined" color="neutral" onClick={addEmoji('😍')}>
            😍
          </IconButton>
        </Box>
      }
      endDecorator={
        <Typography level="body3" sx={{ ml: 'auto' }}>
          {text.length} character(s)
        </Typography>
      }
      sx={{ minWidth: 300 }}
    />
     <Stack direction="row" spacing={4}>

    <Button variant="text" type='submit'  startIcon={<SendIcon />}>
  Send
</Button>
     </Stack>

        </form>
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default useShowDemande