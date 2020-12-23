import express, { Request, Response } from 'express'
import { CompanyUserModel } from '../../models/company/companyUserModel'
import { getSession, getSessionUser, getSessionCompany } from '../../module/sessionModule'
import { CompanyModel } from '../../models/companyModel'

const router = express.Router()

router.get('/api/company/user', [], async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)

    if(sessionUser == null || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const companyUsers = await CompanyUserModel.find({'company_id': sessionCompany._id})

    return res.status(200).send({
        companyUsers: companyUsers,
        companyModel: sessionCompany
    })
})

router.post('/api/company/user', async (req: Request, res: Response) => {

    const { email, password } = req.body;

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)

    if(sessionUser == null || sessionUser.type != "COMPANY_ADMIN" || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const userModel = CompanyUserModel.build({ email: email, password: password, status: "ACTIVE", type: "COMPANY_USER", company_id: sessionCompany._id })
    await userModel.save()

    const companyUsers = await CompanyUserModel.find({'company_id': sessionCompany._id})

    return res.status(201).send({
        companyUsers: companyUsers
    })
})

router.delete('/api/company/user/:userId', async (req: Request, res: Response) => {

    const sessionUser = await getSessionUser(req, res)
    const sessionCompany = await getSessionCompany(req, res)
    
    if(sessionUser == null || sessionUser.type != "COMPANY_ADMIN" || sessionCompany == null) {
        return res.status(403).send('error')
    }

    const { userId } = req.params;
    const companyUserModel = await CompanyUserModel.findOne({'_id': userId})

    if(companyUserModel) {
        await companyUserModel.delete();
    }
    
    const companyUsers = await CompanyUserModel.find({'company_id': sessionCompany._id})

    res.status(201).send({
        companyUsers: companyUsers
    })
})

export { router as  companyUserRoutes }
