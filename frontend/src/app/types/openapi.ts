/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
  "/tasks": {
    get: operations["listTasks"];
    post: operations["createPets"];
  };
  "/pets/{petId}": {
    get: operations["showPetById"];
  };
}

export interface components {
  schemas: {
    Task: {
      id: string;
      title: string;
      description: string;
      disabled_at?: string;
      fields: components["schemas"]["TaskField"][];
    };
    TaskFieldValue: {
      name?: string;
      value?: string;
    };
    TaskRecord: {
      id: string;
      task_id: string;
      user_id: string;
      completed_at?: string;
      field_values?: components["schemas"]["TaskFieldValue"][];
    };
    TaskField: {
      id?: string;
      name?: string;
      description?: string;
      is_required?: boolean;
      type?: "checkbox" | "input" | "number" | "textarea";
    };
    User: {
      id?: string;
      name?: string;
    };
    Pet: {
      id: number;
      name: string;
      birthday: string;
      tag?: string;
    };
    Pets: components["schemas"]["Pet"][];
    Error: {
      code: number;
      message: string;
    };
  };
}

export interface operations {
  listTasks: {
    parameters: {
      query: {
        /** How many items to return at one time (max 100) */
        date: string;
      };
    };
    responses: {
      /** A paged array of pets */
      200: {
        headers: {
          /** A link to the next page of responses */
          "x-next"?: string;
        };
        content: {
          "application/json": components["schemas"]["Pets"];
        };
      };
      /** unexpected error */
      default: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  createPets: {
    responses: {
      /** Null response */
      201: unknown;
      /** unexpected error */
      default: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
  showPetById: {
    parameters: {
      path: {
        /** The id of the pet to retrieve */
        petId: string;
      };
    };
    responses: {
      /** Expected response to a valid request */
      200: {
        content: {
          "application/json": components["schemas"]["Pet"];
        };
      };
      /** unexpected error */
      default: {
        content: {
          "application/json": components["schemas"]["Error"];
        };
      };
    };
  };
}

export interface external {}
