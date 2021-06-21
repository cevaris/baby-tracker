import { components } from './openapi';
export type UUID = string;

export type ApiPet = components['schemas']['Pet'];
export type ApiPets = components['schemas']['Pets'];

export type ApiError = components['schemas']['Error'];
export type ApiTask = components['schemas']['Task'];
export type ApiTaskLog = components['schemas']['TaskLog'];
export type ApiTaskFieldValue = components['schemas']['TaskFieldValue'];
export type ApiTaskField = components['schemas']['TaskField'];