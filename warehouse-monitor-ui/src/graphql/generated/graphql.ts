/* eslint-disable */
import { TypedDocumentNode as DocumentNode } from '@graphql-typed-document-node/core';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type AddProductToWarehouseInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type CreateProductInput = {
  isHazardous: Scalars['Boolean']['input'];
  name: Scalars['String']['input'];
  quantity: Scalars['Float']['input'];
  sizePerUnit: Scalars['Float']['input'];
};

export type ExportProductFromWarehouseInput = {
  productId: Scalars['ID']['input'];
  quantity: Scalars['Float']['input'];
  warehouseId: Scalars['ID']['input'];
};

export type Mutation = {
  __typename?: 'Mutation';
  addProductToWarehouse: WarehouseSchema;
  createProduct: ProductSchema;
  exportProductFromWarehouse: WarehouseSchema;
  updateProduct: ProductSchema;
};


export type MutationAddProductToWarehouseArgs = {
  input: AddProductToWarehouseInput;
};


export type MutationCreateProductArgs = {
  input: CreateProductInput;
};


export type MutationExportProductFromWarehouseArgs = {
  input: ExportProductFromWarehouseInput;
};


export type MutationUpdateProductArgs = {
  input: UpdateProductInput;
};

export type ProductSchema = {
  __typename?: 'ProductSchema';
  id: Scalars['ID']['output'];
  isHazardous: Scalars['Boolean']['output'];
  name: Scalars['String']['output'];
  quantity: Scalars['Float']['output'];
  sizePerUnit: Scalars['Float']['output'];
};

export type Query = {
  __typename?: 'Query';
  products: Array<ProductSchema>;
  warehouses: Array<WarehouseSchema>;
};

export type UpdateProductInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type WarehouseProductSchema = {
  __typename?: 'WarehouseProductSchema';
  product?: Maybe<ProductSchema>;
  quantity: Scalars['Float']['output'];
};

export type WarehouseSchema = {
  __typename?: 'WarehouseSchema';
  hazardousProductsCount: Scalars['Float']['output'];
  id: Scalars['ID']['output'];
  name: Scalars['String']['output'];
  size: Scalars['Float']['output'];
  totalProductQuantity: Scalars['Float']['output'];
  warehouseProducts?: Maybe<Array<WarehouseProductSchema>>;
};

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number }> };


export const ProductsDocument = {"kind":"Document","definitions":[{"kind":"OperationDefinition","operation":"query","name":{"kind":"Name","value":"Products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"products"},"selectionSet":{"kind":"SelectionSet","selections":[{"kind":"Field","name":{"kind":"Name","value":"id"}},{"kind":"Field","name":{"kind":"Name","value":"name"}},{"kind":"Field","name":{"kind":"Name","value":"sizePerUnit"}},{"kind":"Field","name":{"kind":"Name","value":"isHazardous"}},{"kind":"Field","name":{"kind":"Name","value":"quantity"}}]}}]}}]} as unknown as DocumentNode<ProductsQuery, ProductsQueryVariables>;