import { Router } from "express";
import { UserRepositorie } from "../modules/user/repositories/UserRepository";
import { autentication } from "../middleware/autentication";

const userRoutes = Router()

const userRepository = new UserRepositorie()


userRoutes.post('/sign-up', (request, response) => {
    userRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => { 
    userRepository.login(request, response) //padrao senha 123
})

userRoutes.delete('/delete', (request, response) => { 
    userRepository.delete(request, response) //padrao senha 123
})

userRoutes.post('/update-name', (request, response) => { 
    userRepository.updateName(request, response) //padrao senha 123
})

export { userRoutes }