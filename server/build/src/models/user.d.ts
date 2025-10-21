import mongoose from 'mongoose';
declare const UserModel: mongoose.Model<{
    email: string;
    username: string;
    passwordHash?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    email: string;
    username: string;
    passwordHash?: string | null;
}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            email: string;
            username: string;
            passwordHash?: string | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            email: string;
            username: string;
            passwordHash?: string | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, ret: any) => any;
        toObject: {
            virtuals: boolean;
        };
    };
}> & {
    email: string;
    username: string;
    passwordHash?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            email: string;
            username: string;
            passwordHash?: string | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            email: string;
            username: string;
            passwordHash?: string | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, ret: any) => any;
        toObject: {
            virtuals: boolean;
        };
    };
}, {
    email: string;
    username: string;
    passwordHash?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    email: string;
    username: string;
    passwordHash?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    email: string;
    username: string;
    passwordHash?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default UserModel;
//# sourceMappingURL=user.d.ts.map