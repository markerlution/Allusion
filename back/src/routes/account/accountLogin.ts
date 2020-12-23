import express, { Request, Response } from 'express'
import { CompanyUserModel } from '../../models/company/companyUserModel'
import { getSession } from '../../module/sessionModule'

const router = express.Router()

router.post('/api/login', async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const userModel = await CompanyUserModel.findOne({email: email})

    if(userModel){
        if(userModel.password !== password) {
            return res.status(403).send();
        }

        let sessionModel = await getSession(req, res);
        
        if(sessionModel) {
            await sessionModel.updateOne({users_id: userModel._id});
        }
    }

    res.status(201).send({
        userModel: userModel ? {
            "id": userModel ? userModel._id : null,
            "company_id": userModel ? userModel.company_id : null,
            "email": userModel ? userModel.email : null,
            "type": userModel ? userModel.type : null,
            "status": userModel ? userModel.status : null,
        } : null
    })
})

router.get('/api/logout', async (req: Request, res: Response) => {

    let sessionModel = await getSession(req, res);

    if(sessionModel) {
        await sessionModel.delete();
    }

    res.status(201).send({
        userModel: null
    })
})

export { router as  accountLoginRoutes }
