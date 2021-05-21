// task field name => value
export type TaskFieldValues = { [key: string]: string; };

export type UUID = string;

export type TaskField = {
    name: string
    description: string
    is_required: boolean
    type: 'number' | 'input' | 'textarea' | 'checkbox'
}

export type Task = {
    id: UUID
    title: string
    description: string
    fields: Array<TaskField>
    disabled_at?: Date
}

export type TaskRecord = {
    id: UUID
    task_id: UUID
    completed_at: Date
    // name => value
    field_values: TaskFieldValues
}