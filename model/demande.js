import {Schema, model, models} from 'mongoose'

const demandeSchema = new Schema( {
    cin:Number,
    cin2:Number,
    id_etud: String,
    id_prof:String,
    nom: String,
    nom2: String,
    parcour: String,
    prenom: String,
    prenom2: String,
    commentaire: String,
    ok: Boolean

})

const Demande = models.demande|| model('demande', demandeSchema)

export default Demande