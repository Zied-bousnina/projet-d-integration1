import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { useQuery } from 'react-query'
import Layout from '../../components/Layout'
import { getDemandes } from '../../lib/helper'
import { VscAccount } from "react-icons/vsc";
import Tooltip from '@mui/material/Tooltip'

const ConsultDemandePFE = () => {

  const {data, isLoading, isError} = useQuery('demandes', getDemandes)

  const session =useSession()

  if(isLoading)return <div>Is Loading ...</div>
  if(isError)return <div>Error</div>
  const dataFiltrer = data.find(e=>{e.id_prof ===session.data.user.email})
  console.table(dataFiltrer)
  console.table(session.data.user.email)
 data.map(e=>{
  console.log(e)
 })


  return (
    <Layout>
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
                Prenom Etudiant 2
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Nom Etudiant 2
              </th>

              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Prenom Etudiant 2
              </th>
              <th scope="col" class="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                Show
              </th>

            </tr>
          </thead>
          <tbody>
          {
            data && data.map((e,i)=>(

            <tr class="bg-gray-100 border-b">
              <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {i+1}</td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {e.parcour}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {e.nom}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {e.prenom}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {e.nom2}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                {e.prenom2}
              </td>
              <td class="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
               <Tooltip title={`${e.nom} ${e.nom2.length>0 ? '& '+e.nom2:'' }`}>
               <Link href={`show/${e._id}`}>
               <VscAccount color='rgb(157 192 251)' size={'1em'}/>
               </Link>
               </Tooltip>
              </td>
            </tr>

            ))
          }
          </tbody>
        </table>
      </div>
    </div>
  </div>
</div>

    </Layout>
  )
}

export default ConsultDemandePFE