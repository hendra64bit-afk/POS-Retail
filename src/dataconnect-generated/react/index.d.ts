import { CreateCategoryData, CreateProductData, CreateStoreProfileData, CreateTransactionData, CreateTransactionItemData, GetCategoryData, GetCategoryVariables, GetProductData, GetProductVariables, GetStoreProfileData, GetStoreProfileVariables, GetTransactionData, GetTransactionVariables, GetTransactionItemData, GetTransactionItemVariables, ListCategoriesData, ListProductsData, ListStoreProfilesData, ListTransactionsData, ListTransactionItemsData, UpdateCategoryData, UpdateCategoryVariables, UpdateProductData, UpdateProductVariables, UpdateStoreProfileData, UpdateStoreProfileVariables, UpdateTransactionData, UpdateTransactionVariables, UpdateTransactionItemData, UpdateTransactionItemVariables, DeleteCategoryData, DeleteCategoryVariables, DeleteProductData, DeleteProductVariables, DeleteStoreProfileData, DeleteStoreProfileVariables, DeleteTransactionData, DeleteTransactionVariables, DeleteTransactionItemData, DeleteTransactionItemVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateCategory(options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;
export function useCreateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<CreateCategoryData, FirebaseError, void>): UseDataConnectMutationResult<CreateCategoryData, undefined>;

export function useCreateProduct(options?: useDataConnectMutationOptions<CreateProductData, FirebaseError, void>): UseDataConnectMutationResult<CreateProductData, undefined>;
export function useCreateProduct(dc: DataConnect, options?: useDataConnectMutationOptions<CreateProductData, FirebaseError, void>): UseDataConnectMutationResult<CreateProductData, undefined>;

export function useCreateStoreProfile(options?: useDataConnectMutationOptions<CreateStoreProfileData, FirebaseError, void>): UseDataConnectMutationResult<CreateStoreProfileData, undefined>;
export function useCreateStoreProfile(dc: DataConnect, options?: useDataConnectMutationOptions<CreateStoreProfileData, FirebaseError, void>): UseDataConnectMutationResult<CreateStoreProfileData, undefined>;

export function useCreateTransaction(options?: useDataConnectMutationOptions<CreateTransactionData, FirebaseError, void>): UseDataConnectMutationResult<CreateTransactionData, undefined>;
export function useCreateTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTransactionData, FirebaseError, void>): UseDataConnectMutationResult<CreateTransactionData, undefined>;

export function useCreateTransactionItem(options?: useDataConnectMutationOptions<CreateTransactionItemData, FirebaseError, void>): UseDataConnectMutationResult<CreateTransactionItemData, undefined>;
export function useCreateTransactionItem(dc: DataConnect, options?: useDataConnectMutationOptions<CreateTransactionItemData, FirebaseError, void>): UseDataConnectMutationResult<CreateTransactionItemData, undefined>;

export function useGetCategory(vars: GetCategoryVariables, options?: useDataConnectQueryOptions<GetCategoryData>): UseDataConnectQueryResult<GetCategoryData, GetCategoryVariables>;
export function useGetCategory(dc: DataConnect, vars: GetCategoryVariables, options?: useDataConnectQueryOptions<GetCategoryData>): UseDataConnectQueryResult<GetCategoryData, GetCategoryVariables>;

export function useGetProduct(vars: GetProductVariables, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, GetProductVariables>;
export function useGetProduct(dc: DataConnect, vars: GetProductVariables, options?: useDataConnectQueryOptions<GetProductData>): UseDataConnectQueryResult<GetProductData, GetProductVariables>;

export function useGetStoreProfile(vars: GetStoreProfileVariables, options?: useDataConnectQueryOptions<GetStoreProfileData>): UseDataConnectQueryResult<GetStoreProfileData, GetStoreProfileVariables>;
export function useGetStoreProfile(dc: DataConnect, vars: GetStoreProfileVariables, options?: useDataConnectQueryOptions<GetStoreProfileData>): UseDataConnectQueryResult<GetStoreProfileData, GetStoreProfileVariables>;

export function useGetTransaction(vars: GetTransactionVariables, options?: useDataConnectQueryOptions<GetTransactionData>): UseDataConnectQueryResult<GetTransactionData, GetTransactionVariables>;
export function useGetTransaction(dc: DataConnect, vars: GetTransactionVariables, options?: useDataConnectQueryOptions<GetTransactionData>): UseDataConnectQueryResult<GetTransactionData, GetTransactionVariables>;

export function useGetTransactionItem(vars: GetTransactionItemVariables, options?: useDataConnectQueryOptions<GetTransactionItemData>): UseDataConnectQueryResult<GetTransactionItemData, GetTransactionItemVariables>;
export function useGetTransactionItem(dc: DataConnect, vars: GetTransactionItemVariables, options?: useDataConnectQueryOptions<GetTransactionItemData>): UseDataConnectQueryResult<GetTransactionItemData, GetTransactionItemVariables>;

export function useListCategories(options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;
export function useListCategories(dc: DataConnect, options?: useDataConnectQueryOptions<ListCategoriesData>): UseDataConnectQueryResult<ListCategoriesData, undefined>;

export function useListProducts(options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;
export function useListProducts(dc: DataConnect, options?: useDataConnectQueryOptions<ListProductsData>): UseDataConnectQueryResult<ListProductsData, undefined>;

export function useListStoreProfiles(options?: useDataConnectQueryOptions<ListStoreProfilesData>): UseDataConnectQueryResult<ListStoreProfilesData, undefined>;
export function useListStoreProfiles(dc: DataConnect, options?: useDataConnectQueryOptions<ListStoreProfilesData>): UseDataConnectQueryResult<ListStoreProfilesData, undefined>;

export function useListTransactions(options?: useDataConnectQueryOptions<ListTransactionsData>): UseDataConnectQueryResult<ListTransactionsData, undefined>;
export function useListTransactions(dc: DataConnect, options?: useDataConnectQueryOptions<ListTransactionsData>): UseDataConnectQueryResult<ListTransactionsData, undefined>;

export function useListTransactionItems(options?: useDataConnectQueryOptions<ListTransactionItemsData>): UseDataConnectQueryResult<ListTransactionItemsData, undefined>;
export function useListTransactionItems(dc: DataConnect, options?: useDataConnectQueryOptions<ListTransactionItemsData>): UseDataConnectQueryResult<ListTransactionItemsData, undefined>;

export function useUpdateCategory(options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;
export function useUpdateCategory(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateCategoryData, FirebaseError, UpdateCategoryVariables>): UseDataConnectMutationResult<UpdateCategoryData, UpdateCategoryVariables>;

export function useUpdateProduct(options?: useDataConnectMutationOptions<UpdateProductData, FirebaseError, UpdateProductVariables>): UseDataConnectMutationResult<UpdateProductData, UpdateProductVariables>;
export function useUpdateProduct(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateProductData, FirebaseError, UpdateProductVariables>): UseDataConnectMutationResult<UpdateProductData, UpdateProductVariables>;

export function useUpdateStoreProfile(options?: useDataConnectMutationOptions<UpdateStoreProfileData, FirebaseError, UpdateStoreProfileVariables>): UseDataConnectMutationResult<UpdateStoreProfileData, UpdateStoreProfileVariables>;
export function useUpdateStoreProfile(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateStoreProfileData, FirebaseError, UpdateStoreProfileVariables>): UseDataConnectMutationResult<UpdateStoreProfileData, UpdateStoreProfileVariables>;

export function useUpdateTransaction(options?: useDataConnectMutationOptions<UpdateTransactionData, FirebaseError, UpdateTransactionVariables>): UseDataConnectMutationResult<UpdateTransactionData, UpdateTransactionVariables>;
export function useUpdateTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTransactionData, FirebaseError, UpdateTransactionVariables>): UseDataConnectMutationResult<UpdateTransactionData, UpdateTransactionVariables>;

export function useUpdateTransactionItem(options?: useDataConnectMutationOptions<UpdateTransactionItemData, FirebaseError, UpdateTransactionItemVariables>): UseDataConnectMutationResult<UpdateTransactionItemData, UpdateTransactionItemVariables>;
export function useUpdateTransactionItem(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateTransactionItemData, FirebaseError, UpdateTransactionItemVariables>): UseDataConnectMutationResult<UpdateTransactionItemData, UpdateTransactionItemVariables>;

export function useDeleteCategory(options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;
export function useDeleteCategory(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteCategoryData, FirebaseError, DeleteCategoryVariables>): UseDataConnectMutationResult<DeleteCategoryData, DeleteCategoryVariables>;

export function useDeleteProduct(options?: useDataConnectMutationOptions<DeleteProductData, FirebaseError, DeleteProductVariables>): UseDataConnectMutationResult<DeleteProductData, DeleteProductVariables>;
export function useDeleteProduct(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteProductData, FirebaseError, DeleteProductVariables>): UseDataConnectMutationResult<DeleteProductData, DeleteProductVariables>;

export function useDeleteStoreProfile(options?: useDataConnectMutationOptions<DeleteStoreProfileData, FirebaseError, DeleteStoreProfileVariables>): UseDataConnectMutationResult<DeleteStoreProfileData, DeleteStoreProfileVariables>;
export function useDeleteStoreProfile(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteStoreProfileData, FirebaseError, DeleteStoreProfileVariables>): UseDataConnectMutationResult<DeleteStoreProfileData, DeleteStoreProfileVariables>;

export function useDeleteTransaction(options?: useDataConnectMutationOptions<DeleteTransactionData, FirebaseError, DeleteTransactionVariables>): UseDataConnectMutationResult<DeleteTransactionData, DeleteTransactionVariables>;
export function useDeleteTransaction(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTransactionData, FirebaseError, DeleteTransactionVariables>): UseDataConnectMutationResult<DeleteTransactionData, DeleteTransactionVariables>;

export function useDeleteTransactionItem(options?: useDataConnectMutationOptions<DeleteTransactionItemData, FirebaseError, DeleteTransactionItemVariables>): UseDataConnectMutationResult<DeleteTransactionItemData, DeleteTransactionItemVariables>;
export function useDeleteTransactionItem(dc: DataConnect, options?: useDataConnectMutationOptions<DeleteTransactionItemData, FirebaseError, DeleteTransactionItemVariables>): UseDataConnectMutationResult<DeleteTransactionItemData, DeleteTransactionItemVariables>;
