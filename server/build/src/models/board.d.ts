import mongoose from 'mongoose';
declare const BoardModel: mongoose.Model<{
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            title: string;
            columnIds: string[];
            sharedWith: string[];
            owner?: string | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            title: string;
            columnIds: string[];
            sharedWith: string[];
            owner?: string | null;
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
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            title: string;
            columnIds: string[];
            sharedWith: string[];
            owner?: string | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            title: string;
            columnIds: string[];
            sharedWith: string[];
            owner?: string | null;
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
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    title: string;
    columnIds: string[];
    sharedWith: string[];
    owner?: string | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default BoardModel;
//# sourceMappingURL=board.d.ts.map