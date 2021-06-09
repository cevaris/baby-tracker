import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};


export enum CacheControlScope {
  Public = 'PUBLIC',
  Private = 'PRIVATE'
}


export type KeyValue = {
  __typename?: 'KeyValue';
  key?: Maybe<Scalars['String']>;
  value?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  hello?: Maybe<Scalars['String']>;
  getTasks?: Maybe<Array<Maybe<Task>>>;
};

export type Task = {
  __typename?: 'Task';
  id?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  fields?: Maybe<Array<Maybe<TaskField>>>;
  disabled_at?: Maybe<Scalars['Date']>;
};

export type TaskField = {
  __typename?: 'TaskField';
  name?: Maybe<Scalars['String']>;
  description?: Maybe<Scalars['String']>;
  is_required?: Maybe<Scalars['Boolean']>;
  field_type?: Maybe<TaskFieldType>;
};

export enum TaskFieldType {
  Number = 'number',
  Input = 'input',
  Textarea = 'textarea',
  Checkbox = 'checkbox'
}

export type TaskRecord = {
  __typename?: 'TaskRecord';
  id?: Maybe<Scalars['String']>;
  task_id?: Maybe<Task>;
  completed_at?: Maybe<Scalars['Date']>;
  field_values?: Maybe<Array<Maybe<KeyValue>>>;
};




export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}, TContext = {}> = (obj: T, context: TContext, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  CacheControlScope: CacheControlScope;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  KeyValue: ResolverTypeWrapper<KeyValue>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Query: ResolverTypeWrapper<{}>;
  Task: ResolverTypeWrapper<Task>;
  TaskField: ResolverTypeWrapper<TaskField>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  TaskFieldType: TaskFieldType;
  TaskRecord: ResolverTypeWrapper<TaskRecord>;
  Upload: ResolverTypeWrapper<Scalars['Upload']>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Date: Scalars['Date'];
  KeyValue: KeyValue;
  String: Scalars['String'];
  Query: {};
  Task: Task;
  TaskField: TaskField;
  Boolean: Scalars['Boolean'];
  TaskRecord: TaskRecord;
  Upload: Scalars['Upload'];
  Int: Scalars['Int'];
};

export type CacheControlDirectiveArgs = {   maxAge?: Maybe<Scalars['Int']>;
  scope?: Maybe<CacheControlScope>; };

export type CacheControlDirectiveResolver<Result, Parent, ContextType = any, Args = CacheControlDirectiveArgs> = DirectiveResolverFn<Result, Parent, ContextType, Args>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export type KeyValueResolvers<ContextType = any, ParentType extends ResolversParentTypes['KeyValue'] = ResolversParentTypes['KeyValue']> = {
  key?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = {
  hello?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  getTasks?: Resolver<Maybe<Array<Maybe<ResolversTypes['Task']>>>, ParentType, ContextType>;
};

export type TaskResolvers<ContextType = any, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  title?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  fields?: Resolver<Maybe<Array<Maybe<ResolversTypes['TaskField']>>>, ParentType, ContextType>;
  disabled_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskFieldResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskField'] = ResolversParentTypes['TaskField']> = {
  name?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  is_required?: Resolver<Maybe<ResolversTypes['Boolean']>, ParentType, ContextType>;
  field_type?: Resolver<Maybe<ResolversTypes['TaskFieldType']>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export type TaskRecordResolvers<ContextType = any, ParentType extends ResolversParentTypes['TaskRecord'] = ResolversParentTypes['TaskRecord']> = {
  id?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  task_id?: Resolver<Maybe<ResolversTypes['Task']>, ParentType, ContextType>;
  completed_at?: Resolver<Maybe<ResolversTypes['Date']>, ParentType, ContextType>;
  field_values?: Resolver<Maybe<Array<Maybe<ResolversTypes['KeyValue']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType, ContextType>;
};

export interface UploadScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Upload'], any> {
  name: 'Upload';
}

export type Resolvers<ContextType = any> = {
  Date?: GraphQLScalarType;
  KeyValue?: KeyValueResolvers<ContextType>;
  Query?: QueryResolvers<ContextType>;
  Task?: TaskResolvers<ContextType>;
  TaskField?: TaskFieldResolvers<ContextType>;
  TaskRecord?: TaskRecordResolvers<ContextType>;
  Upload?: GraphQLScalarType;
};


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
export type DirectiveResolvers<ContextType = any> = {
  cacheControl?: CacheControlDirectiveResolver<any, any, ContextType>;
};


/**
 * @deprecated
 * Use "DirectiveResolvers" root object instead. If you wish to get "IDirectiveResolvers", add "typesPrefix: I" to your config.
 */
export type IDirectiveResolvers<ContextType = any> = DirectiveResolvers<ContextType>;