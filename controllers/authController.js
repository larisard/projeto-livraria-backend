import db from "../db.js";
import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";


export async function signup(req,res){
    const user = req.body
    try {
        const verifyUser =  await db.query(`SELECT * FROM users WHERE name = $1`, [user.name])
        if(verifyUser.rowCount>0){
           return res.status(409).send("user already in use")
            
        }
        const passwordHash = bcrypt.hashSync(user.password, 10);
        await db.query(`INSERT INTO users (name, password) VALUES ($1, $2)`,
        [user.name, passwordHash])
         res.sendStatus(201)
    
    } catch (error) {
        console.log(error)
        res.sendStatus(500)
        return
    }
   
}

export async function signin(req,res){
  const user = req.body
  try {
    const verifyUser = await db.query(`SELECT * FROM users WHERE name = $1`,[user.name])
    if (verifyUser.rowCount==0){
        return res.status(401).send("user not found")
    }
    const token = uuid();
   if(!(bcrypt.compareSync(user.password, verifyUser.rows[0].password))){
    return res.status(401).send("invalid password")
   }
   const userInfo = {token,
    name: verifyUser.rows[0].name
  }
   res.status(200).send(userInfo)
    
  } catch (error) {
    console.log(error)
    res.sendStatus(500)
    return
  }
}