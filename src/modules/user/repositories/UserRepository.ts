import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Request, Response } from "express-serve-static-core";

class UserRepositorie {
    create(request: Request, response: Response) {
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
                        response.status(200).json({message: 'Usuário criado com sucesso'})
                    }
                )
            })

        })
    }

    login(request: Request, response: Response) {
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

                        if (result) {
                            //JWT JSON WEB TOKEN
                            const token = sign({
                                id: results[0].user_id,
                                email: results[0].email
                            }, process.env.SECRET as string, {expiresIn:"1d"})
                            
                            console.log(token)

                            return response.status(200).json({token: token, message: 'Autenticado com sucesso'})

                        }
                    })
                }
            )
        })
    }

    delete(request: Request, response: Response) {
        // const { user_id } = request.body

        pool.getConnection((err: any, connection: any) => {
            connection.query(
                'DELETE FROM `users` WHERE `users`.`user_id` = f88b6ea7-6c21-4ac2-808c-fc06e17cf6d2',
                // [user_id],
                (error:any, results:any, fields:any) => {
                    connection.release()
                    if (error) {
                        return response.status(400).json({error: error})
                    }
                    return response.status(200).json({menssage: "Conta e videos deletada com sucesso"})
                }
            )
        })
    }
}

export { UserRepositorie }