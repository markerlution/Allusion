import express, { Request, Response } from 'express'
import { CompanyModel } from '../../models/companyModel'
import { CompanyUserModel } from '../../models/company/companyUserModel'
import { getSession } from '../../module/sessionModule'

const router = express.Router()

router.post('/api/register', async (req: Request, res: Response) => {
    const { company_name, email, password } = req.body;

    const userModel = CompanyUserModel.build({ email: email, password: password, status: "ACTIVE", type: "COMPANY_ADMIN", company_id: '' })
    await userModel.save()

    const companyModel = CompanyModel.build({ company_name: company_name, users_id: userModel._id })
    await companyModel.save()

    await userModel.updateOne({company_id: companyModel._id});

    if(userModel){
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

export { router as accountRegisterRoutes }
