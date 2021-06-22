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

export interface TaskFieldValue {
    name: string
    value: string
}

export interface TaskLogRecord {
    id: string
    taskId: string
    userId: string // TODO
    completedAt: firestore.Timestamp
    fieldValues: Array<TaskFieldValue>
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

    async getTaskLogs(taskId: string, day: Date): Promise<Array<TaskLogRecord>> {
        const nextDay = new Date(new Date(day).getTime() + 60 * 60 * 24 * 1000);
        console.log(taskId, day, nextDay);

        const scan = await this.db.collection('taskLogs').get();
        console.log('taskLog list', scan.docs.map(d => {
            const t = d.data() as TaskLogRecord;
            console.log(t.completedAt.toDate().toISOString());
            return t;
        }));

        const logs = await this.db.collection('taskLogs')
            .where('taskId', '==', taskId)
            .where('completedAt', '>=', day)
            .where('completedAt', '<', nextDay)
            .get();

        const response = logs.docs.map(d => d.data() as TaskLogRecord);

        console.log('response', response);
        return response;
    }

}