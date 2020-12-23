import mongoose from 'mongoose';

interface ICompanyUserModel {
    email: string;
    password: string;
    status: string;
    type: string;
    company_id?: string;
}

interface companyUserModelModelInterface extends mongoose.Model<CompanyUserModelDoc> {
    build(attr:ICompanyUserModel): CompanyUserModelDoc
}

interface CompanyUserModelDoc extends mongoose.Document {
    email: string;
    password: string;
    status: string;
    type: string;
    company_id?: string;
}

const companyUserModelSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        required: false
    }
})

companyUserModelSchema.statics.build = (attr: ICompanyUserModel) => {
    return new CompanyUserModel(attr)
}

const CompanyUserModel = mongoose.model<CompanyUserModelDoc, companyUserModelModelInterface>('CompanyUserModel', companyUserModelSchema)

export { CompanyUserModel as CompanyUserModel }
