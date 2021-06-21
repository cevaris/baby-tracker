import { TaskRecord } from "../db/tasksDb";
import { ApiTask } from "../types/api";

export function presentTask(task: TaskRecord): ApiTask {
    return {
        id: task.id,
        description: task.description,
        title: task.title,
        disabled_at: task.disabledAt?.toDate().toISOString(),
        fields: []
    }
}