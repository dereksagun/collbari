import mongoose from 'mongoose';
declare const ColumnModel: mongoose.Model<{
    name: string;
    taskIds: string[];
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    name: string;
    taskIds: string[];
}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            name: string;
            taskIds: string[];
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            name: string;
            taskIds: string[];
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
    name: string;
    taskIds: string[];
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        virtuals: true;
        versionKey: false;
        transform: (_: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            name: string;
            taskIds: string[];
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            name: string;
            taskIds: string[];
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
    name: string;
    taskIds: string[];
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    name: string;
    taskIds: string[];
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    name: string;
    taskIds: string[];
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default ColumnModel;
//# sourceMappingURL=column.d.ts.map