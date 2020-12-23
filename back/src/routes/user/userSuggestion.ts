import express, { Request, Response } from 'express'
import { UserSuggestionModel } from '../../models/user/UserSuggestion'
import { getSessionUser, getSessionCompany } from '../../module/sessionModule'

const router = express.Router()

router.get('/api/user/suggestion', [], async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)

    if(sessionUser == null || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const userSuggestions = await UserSuggestionModel.find({'user_id': sessionUser._id})

    return res.status(200).send({
        userSuggestions: userSuggestions
    })
})

router.post('/api/user/suggestion', async (req: Request, res: Response) => {

    const { suggestion } = req.body;

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)

    if(sessionUser == null || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const userSuggestionModel = UserSuggestionModel.build({ user_id: sessionUser._id, status: "ACTIVE", suggestion: suggestion, company_id: sessionCompany._id, rating: 0 })
    await userSuggestionModel.save()

    const userSuggestions = await UserSuggestionModel.find({'user_id': sessionUser._id})
 
    return res.status(201).send({
        userSuggestions: userSuggestions
    })
})

export { router as  userSuggestionRoutes }
