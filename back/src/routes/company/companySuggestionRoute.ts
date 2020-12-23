import express, { Request, Response } from 'express'
import { CompanyUserModel } from '../../models/company/companyUserModel'
import { CompanyModel } from '../../models/companyModel'
import { SessionModel } from '../../models/sessionModel'
import { UserSuggestionModel } from '../../models/user/UserSuggestion'
import { getSession, getSessionUser, getSessionCompany } from '../../module/sessionModule'

const router = express.Router()

router.get('/api/company/suggestions', [], async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)

    if(sessionUser == null || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const userSuggestions = await UserSuggestionModel.find({'company_id': sessionCompany._id})

    return res.status(200).send({
        userSuggestions: userSuggestions
    })
})

router.put('/api/company/suggestions/:suggestionId/rating/:rating', [], async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)
    
    if(sessionUser == null || sessionUser.type != "COMPANY_ADMIN" || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const { suggestionId, rating } = req.params;
    console.log(parseInt(rating));
    const companyUserSuggestionModel = await UserSuggestionModel.findOne({'_id': suggestionId})

    if(companyUserSuggestionModel) {
        await companyUserSuggestionModel.updateOne({rating: parseInt(rating)});
    }
    
    const userSuggestions = await UserSuggestionModel.find({'company_id': sessionCompany._id})

    res.status(201).send({
        userSuggestions: userSuggestions
    })
})

router.delete('/api/company/suggestions/:suggestionId', async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)
    
    if(sessionUser == null || sessionUser.type != "COMPANY_ADMIN" || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const { suggestionId } = req.params;
    const companyUserSuggestionModel = await UserSuggestionModel.findOne({'_id': suggestionId})

    if(companyUserSuggestionModel) {
        await companyUserSuggestionModel.delete();
    }
    
    const userSuggestions = await UserSuggestionModel.find({'company_id': sessionCompany._id})

    res.status(201).send({
        userSuggestions: userSuggestions
    })
})

// For debugging
router.get('/api/admin', [], async (req: Request, res: Response) => {
    const companyUsers = await CompanyUserModel.find()
    const companies = await CompanyModel.find()
    const session = await SessionModel.find()
    const userSuggestion = await UserSuggestionModel.find()
    
    return res.status(201).send('<pre>' + JSON.stringify({
        companyUsers: companyUsers,
        companies: companies,
        userSuggestion: userSuggestion,
        session: session
    },null, 2) + '</pre>')
})

export { router as  companySuggestionRoutes }
