import {Schema, model, models} from 'mongoose'

const userSchema = new Schema( {
    username: String,
    cin: Number,
    email: String,
    password: String,
    role: String
})

const Users = models.user|| model('user', userSchema)

export default Users