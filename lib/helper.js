const BASE_URL = "http://localhost:3000"

// get all users
export const getUsers = async ()=>{
   const res= await fetch(`${BASE_URL}/api/Users`)
   const json = await res.json()

   return json;
}

// single user
export const getUser = async (id)=>{
    const res= await fetch(`${BASE_URL}/api/Users/${id}`)
    const json = await res.json()
    if(json) return json;

    return {};
 }

 // add User
 export const postUser = async(formData)=>{
    try {
        const Options = {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body:JSON.stringify(formData)

        }

        const res = await fetch(`${BASE_URL}/api/users`, Options)
        const json = await res.json()
        return json;

    } catch (error) {
        return json

    }
     }

     // Update User
export const updateUser = async(userId, formData)=> {

    const Options = {
        method: 'PUT',
        headers : {'Content-Type': 'application/json'},

    }

    const res = await fetch(`${BASE_URL}/api/Users/?userId=${userId}`, Options)
    const json = await res.json()
    return json

}

export const deleteUser= async (userId)=> {
    const Options = {
        method: 'DELETE',
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify(formData)

    }


    const res = await fetch(`${BASE_URL}/api/Users/?userId=${userId}`, Options)
    const json = await res.json()
    return json
}

// get All demandes
 export const getDemandes = async ()=>{
    const res= await fetch(`${BASE_URL}/api/Demandes`)
    const json = await res.json()

    return json;
 }

 // get single demande
 export const getDemande = async (id)=>{
    const res= await fetch(`${BASE_URL}/api/Demandes/${id}`)
    const json = await res.json()

    return json;
 }

 // add demande
 export const postdemande = async(formData)=>{
    try {
        const Options = {
            method: 'POST',
            headers : {'Content-Type': 'application/json'},
            body:JSON.stringify(formData)

        }

        const res = await fetch(`${BASE_URL}/api/Demandes`, Options)
        const json = await res.json()
        return json;

    } catch (error) {
        return json

    }
}

// Update Demande
export async function updateDemande(demandeId, formData) {

    const Options = {
        method: 'PUT',
        headers : {'Content-Type': 'application/json'},
        body:JSON.stringify(formData)

    }

    const res = await fetch(`${BASE_URL}/api/Demandes/?demandeId=${demandeId}`, Options)
    const json = await res.json()
    return json

}
