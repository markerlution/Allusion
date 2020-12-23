import express, { Request, Response } from 'express'
import { json } from 'body-parser'
import { companySuggestionRoutes } from './routes/company/companySuggestionRoute'
import { companyUserRoutes } from './routes/company/companyUserRoute'
import { accountLoginRoutes } from './routes/account/accountLogin'
import { accountRegisterRoutes } from './routes/account/accountRegister'
import { userSuggestionRoutes } from './routes/user/userSuggestion'
import mongoose from 'mongoose'

const app = express()
require('dotenv').config()

app.use(json())

app.use(function(req: Request, res: Response, next) {
    res.header("Access-Control-Allow-Origin", process.env.WEB_URL); 
    res.header("Access-Control-Allow-Headers", "Allusion, Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, OPTIONS");
    next();
});

app.use(companySuggestionRoutes)
app.use(companyUserRoutes)
app.use(accountRegisterRoutes)
app.use(accountLoginRoutes)
app.use(userSuggestionRoutes)

mongoose.connect(process.env.DB_URL ?? '', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, () => {
    console.log('connected to database')
})

app.listen(process.env.API_PORT, () => {
    console.log('server is listening on port ' + process.env.API_PORT)
})
