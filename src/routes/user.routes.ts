import { Router } from "express";
import { UserRepositorie } from "../modules/user/repositories/UserRepository";

const userRoutes = Router()

const userRepository = new UserRepositorie()


userRoutes.post('/sign-up', (request, response) => {
    userRepository.create(request, response)
})

userRoutes.post('/sign-in', (request, response) => { 
    userRepository.login(request, response) //padrao senha 123
})

export { userRoutes }