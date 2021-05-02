// task field name => value
export type TaskFieldValues = { [key: string]: string; };

export type UUID = string;

export type TaskField = {
    name: string
    text: string
    type: 'number' | 'input' | 'textarea'
}

export type Task = {
    id: UUID
    title: string
    description: string
    fields: Array<TaskField>
    disabledAt?: Date
}

export type TaskRecord = {
    id: UUID
    taskId: UUID
    completedAt: Date
    // key/id => value
    fieldValues: TaskFieldValues
}