import { Server } from "http";
import { app } from "./app";
import { firebaseDb } from "./db/firebaseClient";
import { TasksDb } from "./db/tasksDb";

const port = process.env.PORT || 3000;
const server: Server = app.listen(
    process.env.PORT || 3000,
    () => {
        console.log(`Server is running port=${port}`);

        new TasksDb(firebaseDb).get().then(console.log);
    }
);
