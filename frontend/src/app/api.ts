export type TaskFieldValues = { [key: string]: string; };

export type TaskField = {
    id: string
    text: string
    type: 'number' | 'input' | 'textarea'
}

export type Task = {
    id: string
    title: string
    description: string
    fields: Array<TaskField>
    disabledAt?: Date
}

export type TaskRecord = {
    taskId: string
    // key/id => value
    fieldValues: TaskFieldValues
    completedAt: Date
}