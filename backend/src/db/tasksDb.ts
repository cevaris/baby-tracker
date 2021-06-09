export class TasksDb {
    private db: FirebaseFirestore.Firestore;
    constructor(db: FirebaseFirestore.Firestore) {
        this.db = db;
    }

    async get() {
        const tasks = await this.db.collection('tasks').get();
        return tasks.docs.map(v => v.data())
    }
}