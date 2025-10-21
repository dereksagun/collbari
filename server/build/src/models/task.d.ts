import mongoose from 'mongoose';
declare const TaskModel: mongoose.Model<{
    title: string;
    description: string;
    completed?: boolean | null;
}, {}, {}, {}, mongoose.Document<unknown, {}, {
    title: string;
    description: string;
    completed?: boolean | null;
}, {}, {
    toJSON: {
        transform: (_doc: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, ret: mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) => {
            id: string;
            title: string;
            description: string;
            completed: boolean | null | undefined;
        };
    };
}> & {
    title: string;
    description: string;
    completed?: boolean | null;
} & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}, mongoose.Schema<any, mongoose.Model<any, any, any, any, any, any>, {}, {}, {}, {}, {
    toJSON: {
        transform: (_doc: mongoose.Document<unknown, {}, mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }, ret: mongoose.FlatRecord<{
            title: string;
            description: string;
            completed?: boolean | null;
        }> & {
            _id: mongoose.Types.ObjectId;
        } & {
            __v: number;
        }) => {
            id: string;
            title: string;
            description: string;
            completed: boolean | null | undefined;
        };
    };
}, {
    title: string;
    description: string;
    completed?: boolean | null;
}, mongoose.Document<unknown, {}, mongoose.FlatRecord<{
    title: string;
    description: string;
    completed?: boolean | null;
}>, {}, mongoose.ResolveSchemaOptions<mongoose.DefaultSchemaOptions>> & mongoose.FlatRecord<{
    title: string;
    description: string;
    completed?: boolean | null;
}> & {
    _id: mongoose.Types.ObjectId;
} & {
    __v: number;
}>>;
export default TaskModel;
//# sourceMappingURL=task.d.ts.map