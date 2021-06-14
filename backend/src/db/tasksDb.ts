import * as graphql from '../generated/graphql';
import { ApiPet } from '../types/api';

export class TasksDb {
    private db: FirebaseFirestore.Firestore;
    constructor(db: FirebaseFirestore.Firestore) {
        this.db = db;
    }

    async get() {
        const pet: ApiPet = {
            id: 1, name: 'billy', birthday: new Date().toISOString()
        };

        const task: graphql.Task = { title: 'blah' };
        const tasks = await this.db.collection('tasks').get();
        return tasks.docs.map(v => v.data())
    }
}