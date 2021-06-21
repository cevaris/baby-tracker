import { firebaseDb } from "./firebaseClient";
import { TasksDbFirestore } from "./tasksDb";

export const TasksDb = new TasksDbFirestore(firebaseDb);