import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
const defaultOptions = {} as const;
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
  getFilteredWarehouses: Array<WarehouseSchema>;
  products: Array<ProductSchema>;
  warehouses: Array<WarehouseSchema>;
};


export type QueryGetFilteredWarehousesArgs = {
  input: WarehouseFilter;
};

export type UpdateProductInput = {
  id: Scalars['ID']['input'];
  name?: InputMaybe<Scalars['String']['input']>;
  quantity?: InputMaybe<Scalars['Float']['input']>;
};

export type WarehouseFilter = {
  id: Scalars['ID']['input'];
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

export type AddProductToWarehouseMutationVariables = Exact<{
  input: AddProductToWarehouseInput;
}>;


export type AddProductToWarehouseMutation = { __typename?: 'Mutation', addProductToWarehouse: { __typename?: 'WarehouseSchema', id: string, name: string, size: number, hazardousProductsCount: number, warehouseProducts?: Array<{ __typename?: 'WarehouseProductSchema', quantity: number, product?: { __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number } | null }> | null } };

export type CreateProductMutationVariables = Exact<{
  input: CreateProductInput;
}>;


export type CreateProductMutation = { __typename?: 'Mutation', createProduct: { __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number } };

export type ExportProductFromWarehouseMutationVariables = Exact<{
  input: ExportProductFromWarehouseInput;
}>;


export type ExportProductFromWarehouseMutation = { __typename?: 'Mutation', exportProductFromWarehouse: { __typename?: 'WarehouseSchema', id: string, name: string, size: number, hazardousProductsCount: number, totalProductQuantity: number, warehouseProducts?: Array<{ __typename?: 'WarehouseProductSchema', quantity: number, product?: { __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number } | null }> | null } };

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number }> };

export type WarehousesQueryVariables = Exact<{ [key: string]: never; }>;


export type WarehousesQuery = { __typename?: 'Query', warehouses: Array<{ __typename?: 'WarehouseSchema', id: string, name: string, size: number, hazardousProductsCount: number, totalProductQuantity: number }> };

export type GetFilteredWarehousesQueryVariables = Exact<{
  input: WarehouseFilter;
}>;


export type GetFilteredWarehousesQuery = { __typename?: 'Query', getFilteredWarehouses: Array<{ __typename?: 'WarehouseSchema', id: string, name: string, size: number, hazardousProductsCount: number, totalProductQuantity: number, warehouseProducts?: Array<{ __typename?: 'WarehouseProductSchema', quantity: number, product?: { __typename?: 'ProductSchema', id: string, name: string, sizePerUnit: number, isHazardous: boolean, quantity: number } | null }> | null }> };


export const AddProductToWarehouseDocument = gql`
    mutation AddProductToWarehouse($input: AddProductToWarehouseInput!) {
  addProductToWarehouse(input: $input) {
    id
    name
    size
    hazardousProductsCount
    warehouseProducts {
      product {
        id
        name
        sizePerUnit
        isHazardous
        quantity
      }
      quantity
    }
  }
}
    `;
export type AddProductToWarehouseMutationFn = Apollo.MutationFunction<AddProductToWarehouseMutation, AddProductToWarehouseMutationVariables>;

/**
 * __useAddProductToWarehouseMutation__
 *
 * To run a mutation, you first call `useAddProductToWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddProductToWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addProductToWarehouseMutation, { data, loading, error }] = useAddProductToWarehouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddProductToWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<AddProductToWarehouseMutation, AddProductToWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddProductToWarehouseMutation, AddProductToWarehouseMutationVariables>(AddProductToWarehouseDocument, options);
      }
export type AddProductToWarehouseMutationHookResult = ReturnType<typeof useAddProductToWarehouseMutation>;
export type AddProductToWarehouseMutationResult = Apollo.MutationResult<AddProductToWarehouseMutation>;
export type AddProductToWarehouseMutationOptions = Apollo.BaseMutationOptions<AddProductToWarehouseMutation, AddProductToWarehouseMutationVariables>;
export const CreateProductDocument = gql`
    mutation CreateProduct($input: CreateProductInput!) {
  createProduct(input: $input) {
    id
    name
    sizePerUnit
    isHazardous
    quantity
  }
}
    `;
export type CreateProductMutationFn = Apollo.MutationFunction<CreateProductMutation, CreateProductMutationVariables>;

/**
 * __useCreateProductMutation__
 *
 * To run a mutation, you first call `useCreateProductMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateProductMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createProductMutation, { data, loading, error }] = useCreateProductMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateProductMutation(baseOptions?: Apollo.MutationHookOptions<CreateProductMutation, CreateProductMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateProductMutation, CreateProductMutationVariables>(CreateProductDocument, options);
      }
export type CreateProductMutationHookResult = ReturnType<typeof useCreateProductMutation>;
export type CreateProductMutationResult = Apollo.MutationResult<CreateProductMutation>;
export type CreateProductMutationOptions = Apollo.BaseMutationOptions<CreateProductMutation, CreateProductMutationVariables>;
export const ExportProductFromWarehouseDocument = gql`
    mutation ExportProductFromWarehouse($input: ExportProductFromWarehouseInput!) {
  exportProductFromWarehouse(input: $input) {
    id
    name
    size
    hazardousProductsCount
    totalProductQuantity
    warehouseProducts {
      quantity
      product {
        id
        name
        sizePerUnit
        isHazardous
        quantity
      }
    }
  }
}
    `;
export type ExportProductFromWarehouseMutationFn = Apollo.MutationFunction<ExportProductFromWarehouseMutation, ExportProductFromWarehouseMutationVariables>;

/**
 * __useExportProductFromWarehouseMutation__
 *
 * To run a mutation, you first call `useExportProductFromWarehouseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useExportProductFromWarehouseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [exportProductFromWarehouseMutation, { data, loading, error }] = useExportProductFromWarehouseMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useExportProductFromWarehouseMutation(baseOptions?: Apollo.MutationHookOptions<ExportProductFromWarehouseMutation, ExportProductFromWarehouseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<ExportProductFromWarehouseMutation, ExportProductFromWarehouseMutationVariables>(ExportProductFromWarehouseDocument, options);
      }
export type ExportProductFromWarehouseMutationHookResult = ReturnType<typeof useExportProductFromWarehouseMutation>;
export type ExportProductFromWarehouseMutationResult = Apollo.MutationResult<ExportProductFromWarehouseMutation>;
export type ExportProductFromWarehouseMutationOptions = Apollo.BaseMutationOptions<ExportProductFromWarehouseMutation, ExportProductFromWarehouseMutationVariables>;
export const ProductsDocument = gql`
    query Products {
  products {
    id
    name
    sizePerUnit
    isHazardous
    quantity
  }
}
    `;

/**
 * __useProductsQuery__
 *
 * To run a query within a React component, call `useProductsQuery` and pass it any options that fit your needs.
 * When your component renders, `useProductsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProductsQuery({
 *   variables: {
 *   },
 * });
 */
export function useProductsQuery(baseOptions?: Apollo.QueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
      }
export function useProductsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export function useProductsSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<ProductsQuery, ProductsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<ProductsQuery, ProductsQueryVariables>(ProductsDocument, options);
        }
export type ProductsQueryHookResult = ReturnType<typeof useProductsQuery>;
export type ProductsLazyQueryHookResult = ReturnType<typeof useProductsLazyQuery>;
export type ProductsSuspenseQueryHookResult = ReturnType<typeof useProductsSuspenseQuery>;
export type ProductsQueryResult = Apollo.QueryResult<ProductsQuery, ProductsQueryVariables>;
export const WarehousesDocument = gql`
    query Warehouses {
  warehouses {
    id
    name
    size
    hazardousProductsCount
    totalProductQuantity
  }
}
    `;

/**
 * __useWarehousesQuery__
 *
 * To run a query within a React component, call `useWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useWarehousesQuery({
 *   variables: {
 *   },
 * });
 */
export function useWarehousesQuery(baseOptions?: Apollo.QueryHookOptions<WarehousesQuery, WarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<WarehousesQuery, WarehousesQueryVariables>(WarehousesDocument, options);
      }
export function useWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<WarehousesQuery, WarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<WarehousesQuery, WarehousesQueryVariables>(WarehousesDocument, options);
        }
export function useWarehousesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<WarehousesQuery, WarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<WarehousesQuery, WarehousesQueryVariables>(WarehousesDocument, options);
        }
export type WarehousesQueryHookResult = ReturnType<typeof useWarehousesQuery>;
export type WarehousesLazyQueryHookResult = ReturnType<typeof useWarehousesLazyQuery>;
export type WarehousesSuspenseQueryHookResult = ReturnType<typeof useWarehousesSuspenseQuery>;
export type WarehousesQueryResult = Apollo.QueryResult<WarehousesQuery, WarehousesQueryVariables>;
export const GetFilteredWarehousesDocument = gql`
    query GetFilteredWarehouses($input: WarehouseFilter!) {
  getFilteredWarehouses(input: $input) {
    id
    name
    size
    hazardousProductsCount
    totalProductQuantity
    warehouseProducts {
      quantity
      product {
        id
        name
        sizePerUnit
        isHazardous
        quantity
      }
    }
  }
}
    `;

/**
 * __useGetFilteredWarehousesQuery__
 *
 * To run a query within a React component, call `useGetFilteredWarehousesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetFilteredWarehousesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetFilteredWarehousesQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetFilteredWarehousesQuery(baseOptions: Apollo.QueryHookOptions<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>(GetFilteredWarehousesDocument, options);
      }
export function useGetFilteredWarehousesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>(GetFilteredWarehousesDocument, options);
        }
export function useGetFilteredWarehousesSuspenseQuery(baseOptions?: Apollo.SuspenseQueryHookOptions<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>(GetFilteredWarehousesDocument, options);
        }
export type GetFilteredWarehousesQueryHookResult = ReturnType<typeof useGetFilteredWarehousesQuery>;
export type GetFilteredWarehousesLazyQueryHookResult = ReturnType<typeof useGetFilteredWarehousesLazyQuery>;
export type GetFilteredWarehousesSuspenseQueryHookResult = ReturnType<typeof useGetFilteredWarehousesSuspenseQuery>;
export type GetFilteredWarehousesQueryResult = Apollo.QueryResult<GetFilteredWarehousesQuery, GetFilteredWarehousesQueryVariables>;