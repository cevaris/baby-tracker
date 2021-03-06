import { TaskLogRecord } from "../db/tasksDb";
import { ApiTaskLog } from "../types/api";

export function presentTaskLog(log: TaskLogRecord): ApiTaskLog {
    return {
        id: log.id,
        completed_at: log.completedAt?.toDate().toISOString(),
        task_id: log.taskId,
        user_id: log.userId,
        // fallback to [] if fields field is undefined.
        field_values: (log.fieldValues || []).map(fv => {
            return {
                name: fv.name,
                value: fv.value
            }
        })
    }
}