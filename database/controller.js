import Demande from '../model/demande'
import Users from '../model/users'


// ........ USER ......................................................................................................................
// get : http://localhost:3000/api/Users
export async function getUsers(req, res){
    try {
        const users = await Users.find({})

        if(!users) return res.status(404).json({error: "Data Not Found"})
        res.status(200).json(users)

    } catch (error) {
        res.status(404).json({error: " Error while fetching data"})
    }

}

// get : http://localhost:3000/api/Users/1
export async function getUser(req, res) {
    try {

        const {userId} = req.query;
        if(userId) {
            const user = await Users.findById(userId);
            res.status(200).json(user)
        }
        res.status(404).status({error:' user not selected'})


    } catch (error) {
        return res.status(404).json({error:'error while search user '})
    }
}

// post : http://localhost:3000/api/Users
export async function postUser(req, res) {

    try {


    const {username, email, password, cin} = req.body;
    console.log(req.body.username)


    // check dublicated Users
    const checkexisting = await Users.findOne({email})
    if(checkexisting) return res.status(422).json({message: 'User Already Exists...!'})

    // hash password
    Users.create({username, email, cin, password, role:"user"}, function(err, data){
        if(err) return res.status(404).json({err});
        res.status(201).json({status: true, user:data})
    })
    } catch (error) {
        return res.status(404).json({error})
    }

}

// put : http://localhost:3000/api/Users/?userId=1
export async function putUser(req, res) {
    try {
        const {userId} = req.query;
        const formData = req.body;
        if(userId && formData){
          const user =  await Users.findByIdAndUpdate(userId, formData);
            res.status(200).json(user)
        }
        res.status(404).json({error: "User Not Selected"})


    } catch (error) {
        return res.status(404).json({error: "Error While Updating the data...!"})

    }

}

// DELETE : http://localhost:3000/api/Users/?userId=1
export async function deleteUser(req, res) {
    try {
        const {userId} = req.query;
        // const formData = req.body;
        if(userId){
          const user =  await Users.findByIdAndDelete(userId);
            res.status(200).json(user)
        }
        res.status(404).json({error: "User Not Selected"})


    } catch (error) {
        return res.status(404).json({error: "Error While Updating the data...!"})

    }

}

// .......End USER.......................................................................................................................

// ....... Demande.......................................................................................................................

// get : http://localhost:3000/api/demandes
export async function getdemandes(req, res){
    try {
        const demandes = await Demande.find({})

        if(!demandes) return res.status(404).json({error: "Data Not Found"})
        res.status(200).json(demandes)

    } catch (error) {
        res.status(404).json({error: " Error while fetching data"})
    }

}

// get : http://localhost:3000/api/demandes/1
export async function getdemande(req, res) {
    try {

        const {demandeId} = req.query;
        if(demandeId) {
            const demande = await Demande.findById(demandeId);
            res.status(200).json(demande)
        }
        res.status(404).status({error:' demande not selected'})


    } catch (error) {
        return res.status(404).json({error:'error while search demande '})
    }
}

// post : http://localhost:3000/api/demandes
export async function postdemande(req, res) {

    try {


    const {cin, cin2, id_etud, id_prof, nom, nom2, prenom, prenom2, parcour, commentaire, ok} = req.body;
    // console.log(req.body.demandename)


    // check dublicated demandes
    const checkexisting = await Demande.findOne({id_etud})
    if(checkexisting) return res.status(422).json({message: 'demande Already Exists...!'})

    // hash password
    Demande.create({cin, cin2, id_etud, id_prof, nom, nom2, prenom, prenom2, parcour, commentaire, ok:false}, function(err, data){
        if(err) return res.status(404).json({err});
        res.status(201).json({status: true, demande:data})
    })
    } catch (error) {
        return res.status(404).json({error})
    }

}

// put : http://localhost:3000/api/demandes/?demandeId=1
export async function putdemande(req, res) {
    try {
        const {demandeId} = req.query;
        const formData = req.body;
        if(demandeId && formData){
          const demande =  await Demande.findByIdAndUpdate(demandeId, formData);
            res.status(200).json(demande)
        }
        res.status(404).json({error: "demande Not Selected"})


    } catch (error) {
        return res.status(404).json({error: "Error While Updating the data...!"})

    }

}

// DELETE : http://localhost:3000/api/demandes/?demandeId=1
export async function deletedemande(req, res) {
    try {
        const {demandeId} = req.query;
        // const formData = req.body;
        if(demandeId){
          const demande =  await Demande.findByIdAndDelete(demandeId);
            res.status(200).json(demande)
        }
        res.status(404).json({error: "demande Not Selected"})


    } catch (error) {
        return res.status(404).json({error: "Error While Updating the data...!"})

    }

}



