import express, { request, response }  from "express";
import { pool } from "./mysql";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'

const app = express()

app.use(express.json())

//cadastro
app.post('/user/sign-up', (request, response) => {
    const { name, email, password } = request.body

    hash(password, 10, (error, hash) => {
        if (error) {
            return response.status(500).json(error)
        }

        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'INSERT INTO users (user_id, name, email, password) VALUES (?,?,?,?)',
                [uuidv4(),name, email, hash],
                (error:any, result:any, fields:any) => {
                    connection.release()
                    if (error) {
                        return response.status(400).json(error)
                    }
                    response.status(200).json({success: true})
                }
            )
        })

    })
})

//login
app.post('/user/sign-in', (request, response) => { 
    const { email, password } = request.body

    pool.getConnection((err: any, connection: any) => {
        connection.query(
            'SELECT * FROM users WHERE email = ?',
            [email],
            (error:any, results:any, fields:any) => {
                connection.release()
                if (error) {
                    return response.status(400).json({error: "Erro na sua autenticação"})
                }

                compare(password, results[0].password, (err, result) => {
                    if (err) {
                        return response.status(400).json({error: "Erro na sua autenticação"})
                    }

                    if (results) {
                        //JWT JSON WEB TOKEN
                        const token = sign({
                            id: results[0].user_id,
                            email: results[0].email
                        }, "segredo", {expiresIn:"1d"})
                        
                        console.log(token)

                        return response.status(200).json({token: token})

                    }
                })
            }
        )
    })
})


app.listen(4000)