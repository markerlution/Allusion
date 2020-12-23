import mongoose from 'mongoose';

interface ISessionModel {
    session_id: string;
    users_id: string;
}

interface sessionModelModelInterface extends mongoose.Model<SessionModelDoc> {
    build(attr:ISessionModel): SessionModelDoc
}

interface SessionModelDoc extends mongoose.Document {
    session_id: string;
    users_id: string;
}

const sessionModelSchema = new mongoose.Schema({
    session_id: {
        type: String,
        required: true
    },
    users_id: {
        type: String,
        required: false
    }
})

sessionModelSchema.statics.build = (attr: ISessionModel) => {
    return new SessionModel(attr)
}

const SessionModel = mongoose.model<SessionModelDoc, sessionModelModelInterface>('SessionModel', sessionModelSchema)

export { SessionModel as SessionModel }
