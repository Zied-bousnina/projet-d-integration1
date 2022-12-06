import { useFormik } from 'formik'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Layout from '../../components/Layout'
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
const AddEncadrant = () => {

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
    validate:

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
  return (
    <Layout>
    <Stack sx={{ width: '100%' }} spacing={2}>
      <Alert severity="warning">en cours de traitement ...</Alert>
    </Stack>

    <div>AddEncadrant</div>
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
         Email
        </label>
        <input
        {...formik.getFieldProps('email')}
          type="email"
          name="email"
          id="cin"
          placeholder="foulen@prof.tn "
          class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        />
      </div>










      </div>

      <div>
      <button
          class="hover:shadow-form w-full rounded-md bg-[#6A64F1] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Ajouter Prof
        </button>
        {/* <button disabled={true}
          class="hover:shadow-form disabled    w-full my-5 rounded-md bg-[#7b78b8] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Imprimer cachier de charge
        </button> */}
      </div>
    </form>

    </Layout>
  )
}

export default AddEncadrant