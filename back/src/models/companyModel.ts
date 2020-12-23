import mongoose from 'mongoose';

interface ICompanyModel {
    company_name: string;
    users_id: string;
}

interface companyModelModelInterface extends mongoose.Model<CompanyModelDoc> {
    build(attr:ICompanyModel): CompanyModelDoc
}

interface CompanyModelDoc extends mongoose.Document {
    company_name: string;
    users_id: string;
}

const companyModelSchema = new mongoose.Schema({
    company_name: {
        type: String,
        required: true
    },
    users_id: {
        type: String,
        required: true
    }
})

companyModelSchema.statics.build = (attr: ICompanyModel) => {
    return new CompanyModel(attr)
}

const CompanyModel = mongoose.model<CompanyModelDoc, companyModelModelInterface>('CompanyModel', companyModelSchema)

export { CompanyModel as CompanyModel }
