import express, { Request, Response } from 'express'
import { SessionModel } from '../models/sessionModel'
import { CompanyModel } from '../models/companyModel'
import { CompanyUserModel } from '../models/company/companyUserModel'

export async function getSession(req: Request, res: Response) {
    let sessionId = req.headers['allusion'] as string;

    if(sessionId) {
        let sessioModel = await SessionModel.findOne({'session_id': sessionId})
        if (!sessioModel) {
            sessioModel = SessionModel.build({ session_id: sessionId, users_id: '' })
            await sessioModel.save()
        }
        return sessioModel;
    }
    
    return null;
};

export async function getSessionUser(req: Request, res: Response) {
    let session = await getSession(req, res)

    if(session != null && session.users_id.length > 0) {
        return await CompanyUserModel.findOne({'_id': session.users_id})
    }

    return null;
};

export async function getSessionCompany(req: Request, res: Response) {
    let session = await getSessionUser(req, res)
    if(session != null && session.company_id != null && session.company_id.length > 0) {
        return await CompanyModel.findOne({'_id': session.company_id})
    }

    return null;
};