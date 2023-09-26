import { pool } from "../../../mysql";
import { v4 as uuidv4 } from "uuid";
import { hash, compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { Request, Response } from "express-serve-static-core";

class VideoRepository {
    create(request: Request, response: Response) {
        const { name, email, password } = request.body
        //3:22
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
    }

}

export { VideoRepository }