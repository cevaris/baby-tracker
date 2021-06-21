import { firestore } from "firebase-admin";

export type TaskFieldRecord = {
    name: string
    description: string
    type: string
    isRequired: boolean
}

export type TaskRecord = {
    title: string
    description: string
    id: string
    fields: Array<TaskFieldRecord>
    disabledAt?: firestore.Timestamp
}

interface TaskLogRecord {
}

export class TasksDbFirestore {
    private db: FirebaseFirestore.Firestore;
    constructor(db: FirebaseFirestore.Firestore) {
        this.db = db;
    }

    async getTasks(): Promise<Array<TaskRecord>> {
        const tasks = await this.db.collection('tasks').get();
        return tasks.docs.map(v => {
            const record = v.data() as TaskRecord;

            if (record) {
                return record;
            } else {
                throw Error('no Tasks found')
            }
        });
    }

    async getTask(id: string): Promise<TaskRecord> {
        const task = await this.db.collection('tasks').doc(id).get();
        const record = task.data() as TaskRecord;

        if (record) {
            return record;
        } else {
            throw Error('no Tasks found')
        }
    }
}