// task field name => value
export type TaskFieldValues = { [key: string]: string; };

export type UUID4 = string;

export type TaskField = {
    name: string
    text: string
    type: 'number' | 'input' | 'textarea'
}

export type Task = {
    id: UUID4
    title: string
    description: string
    fields: Array<TaskField>
    disabledAt?: Date
}

export type TaskRecord = {
    id: UUID4
    taskId: UUID4
    completedAt: Date
    // key/id => value
    fieldValues: TaskFieldValues
}