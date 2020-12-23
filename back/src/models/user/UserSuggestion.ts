import mongoose from 'mongoose';

interface IUserSuggestionModel {
    suggestion: string;
    status: string;
    user_id: string;
    company_id: string;
    rating: number;
}

interface userSuggestionModelModelInterface extends mongoose.Model<UserSuggestionModelDoc> {
    build(attr:IUserSuggestionModel): UserSuggestionModelDoc
}

interface UserSuggestionModelDoc extends mongoose.Document {
    suggestion: string;
    status: string;
    user_id: string;
    company_id: string;
    rating: number;
}

const userSuggestionModelSchema = new mongoose.Schema({
    suggestion: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    }
})

userSuggestionModelSchema.statics.build = (attr: IUserSuggestionModel) => {
    return new UserSuggestionModel(attr)
}

const UserSuggestionModel = mongoose.model<UserSuggestionModelDoc, userSuggestionModelModelInterface>('UserSuggestionModel', userSuggestionModelSchema)

export { UserSuggestionModel as UserSuggestionModel }
