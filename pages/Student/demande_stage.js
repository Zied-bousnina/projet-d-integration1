import React, { useEffect, useState } from 'react'


import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Layout from '../../components/Layout';
import { useSession } from 'next-auth/react';
import { useFormik } from 'formik';

import {c_chargeValidate} from '../../lib/validate'

const usePosts= () =>{
  const [data, setData] = useState([])
  const [isLoading, setLoading] = useState(false)
  const session =useSession()



  const formik = useFormik({
    initialValues: {

      nom:'',
      prenom:'',
      id_prof:'',
      parcour:'',
       cin: '',
       nom2:'',
       prenom2:'',
       cin2:''


    },
    validate: c_chargeValidate,
    onSubmit,
  })

  async function onSubmit(values) {
    const options = {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({...values, id_etud: session.data.user.email, commentaire:"", ok:false})
    }
    console.log(options)

    await fetch('http://localhost:3000/api/auth/addDemandeDeStage', options)
      .then(res=> res.json())
      .then((data)=>{
        alert("Demande created")
        // if(data) router.push('/login')
      })
  }
  useEffect(() => {
    setLoading(true)

    const fetchData = async () => {
      const res = await fetch('http://localhost:3000/api/auth/fetchAdmin');
      const datat = await res.json();
      setData(datat)
    }
    fetchData().catch(console.error)

  }, [])

  const [showhide, setShowhide]= useState("no");

const handleshow= e=>{
  const getshow= e.target.value;
  setShowhide(getshow);
}

  const d = data.user
  const zied = d
  // console.log(zied)
  // const [IsAdmin, setIsAdmin] = useState(false)

  const prof =zied&& zied.filter(e=> e.role ==="prof")
  // console.log(Users&&Users[0])

  // console.log(prof)
  return (
    <Layout>
   <form onSubmit={formik.handleSubmit}
      class="py-6 px-9"
      action="#"

    >
      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Nom
        </label>
        <input
         {...formik.getFieldProps('nom')}
          type="text"
          name="nom"
          id="name"
          placeholder="ben foulen "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>

      <div class="mb-6 pt-4">
      <div class="mb-5">
        <label
          for="prenom"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         prénom
        </label>
        <input
        {...formik.getFieldProps('prenom')}
          type="text"
          name="prenom"
          id="prenom"
          placeholder="foulen  "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="cin"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Cin
        </label>
        <input
        {...formik.getFieldProps('cin')}
          type="number"
          name="cin"
          id="cin"
          placeholder="01234567 "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
      <input type="radio" name="r" id="" value="no" checked={ showhide==='no' } onClick={ handleshow } />Monome
      <br></br>
      <input type="radio" name="r" id="" value="yes" onClick={ handleshow } />Binome

      {
                    showhide==='yes' && (
                      <div>
                      <hr/>

                      <div class="mb-5">
        <label
          for="email"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Nom Etudiant 2
        </label>
        <input
        {...formik.getFieldProps('nom2')}
          type="text"
          name="nom2"
          id="name2"
          placeholder="ben foulen "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />

      </div>
      <div class="mb-5">
        <label
          for="prenom"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         prénom
        </label>
        <input
        {...formik.getFieldProps('prenom2')}
          type="text"
          name="prenom2"
          id="prenom2"
          placeholder="foulen  "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <div class="mb-5">
        <label
          for="cin"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
         Cin
        </label>
        <input
        {...formik.getFieldProps('cin2')}
          type="number"
          name="cin2"
          id="cin2"
          placeholder="01234567 "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>
      <hr />
                      </div>


                    )

                    }


      </div>





        <div class="mb-8">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">List des profs</label>
<select {...formik.getFieldProps('id_prof')} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
 {
  prof && prof.map(e=>(
    <option key={e._id} value={e.email}> {e.name} </option>

  ))
 }
</select>

        </div>
        <div className="mb-8">
        <label for="countries" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Parcours</label>
<select {...formik.getFieldProps('parcour')} id="countries" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
 <option value="dsi">DSI</option>
 <option value="rsi">RSI</option>
 <option value="sem">SEM</option>
</select>

        </div>




      </div>

      <div>
      <button
          class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Envoyer demande
        </button>
        <button disabled={true}
          class="hover:shadow-form disabled    w-full my-5 rounded-md bg-[#7b78b8] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Imprimer cachier de charge
        </button>
      </div>
    </form>


  </Layout>

  )
}

export default usePosts;