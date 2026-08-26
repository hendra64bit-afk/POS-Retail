import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface Category_Key {
  id: UUIDString;
  __typename?: 'Category_Key';
}

export interface CreateCategoryData {
  category_insert: Category_Key;
}

export interface CreateProductData {
  product_insert: Product_Key;
}

export interface CreateStoreProfileData {
  storeProfile_insert: StoreProfile_Key;
}

export interface CreateTransactionData {
  transaction_insert: Transaction_Key;
}

export interface CreateTransactionItemData {
  transactionItem_insert: TransactionItem_Key;
}

export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}

export interface DeleteCategoryVariables {
  id: UUIDString;
}

export interface DeleteProductData {
  product_delete?: Product_Key | null;
}

export interface DeleteProductVariables {
  id: UUIDString;
}

export interface DeleteStoreProfileData {
  storeProfile_delete?: StoreProfile_Key | null;
}

export interface DeleteStoreProfileVariables {
  id: UUIDString;
}

export interface DeleteTransactionData {
  transaction_delete?: Transaction_Key | null;
}

export interface DeleteTransactionItemData {
  transactionItem_delete?: TransactionItem_Key | null;
}

export interface DeleteTransactionItemVariables {
  id: UUIDString;
}

export interface DeleteTransactionVariables {
  id: UUIDString;
}

export interface GetCategoryData {
  category?: {
    name: string;
    description?: string | null;
  };
}

export interface GetCategoryVariables {
  id: UUIDString;
}

export interface GetProductData {
  product?: {
    name: string;
    price: number;
    category: {
      name: string;
    };
  };
}

export interface GetProductVariables {
  id: UUIDString;
}

export interface GetStoreProfileData {
  storeProfile?: {
    storeName: string;
    address?: string | null;
  };
}

export interface GetStoreProfileVariables {
  id: UUIDString;
}

export interface GetTransactionData {
  transaction?: {
    totalAmount: number;
    paymentMethod: string;
  };
}

export interface GetTransactionItemData {
  transactionItem?: {
    quantity: number;
    priceAtTime: number;
  };
}

export interface GetTransactionItemVariables {
  id: UUIDString;
}

export interface GetTransactionVariables {
  id: UUIDString;
}

export interface ListCategoriesData {
  categories: ({
    name: string;
  })[];
}

export interface ListProductsData {
  products: ({
    name: string;
    price: number;
  })[];
}

export interface ListStoreProfilesData {
  storeProfiles: ({
    storeName: string;
  })[];
}

export interface ListTransactionItemsData {
  transactionItems: ({
    quantity: number;
    priceAtTime: number;
  })[];
}

export interface ListTransactionsData {
  transactions: ({
    totalAmount: number;
    timestamp: TimestampString;
  })[];
}

export interface Product_Key {
  id: UUIDString;
  __typename?: 'Product_Key';
}

export interface StoreProfile_Key {
  id: UUIDString;
  __typename?: 'StoreProfile_Key';
}

export interface TransactionItem_Key {
  id: UUIDString;
  __typename?: 'TransactionItem_Key';
}

export interface Transaction_Key {
  id: UUIDString;
  __typename?: 'Transaction_Key';
}

export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}

export interface UpdateCategoryVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateProductData {
  product_update?: Product_Key | null;
}

export interface UpdateProductVariables {
  id: UUIDString;
  price: number;
}

export interface UpdateStoreProfileData {
  storeProfile_update?: StoreProfile_Key | null;
}

export interface UpdateStoreProfileVariables {
  id: UUIDString;
  name: string;
}

export interface UpdateTransactionData {
  transaction_update?: Transaction_Key | null;
}

export interface UpdateTransactionItemData {
  transactionItem_update?: TransactionItem_Key | null;
}

export interface UpdateTransactionItemVariables {
  id: UUIDString;
  qty: number;
}

export interface UpdateTransactionVariables {
  id: UUIDString;
  notes: string;
}

interface CreateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCategoryData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateCategoryData, undefined>;
  operationName: string;
}
export const createCategoryRef: CreateCategoryRef;

export function createCategory(): MutationPromise<CreateCategoryData, undefined>;
export function createCategory(dc: DataConnect): MutationPromise<CreateCategoryData, undefined>;

interface CreateProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateProductData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateProductData, undefined>;
  operationName: string;
}
export const createProductRef: CreateProductRef;

export function createProduct(): MutationPromise<CreateProductData, undefined>;
export function createProduct(dc: DataConnect): MutationPromise<CreateProductData, undefined>;

interface CreateStoreProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStoreProfileData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateStoreProfileData, undefined>;
  operationName: string;
}
export const createStoreProfileRef: CreateStoreProfileRef;

export function createStoreProfile(): MutationPromise<CreateStoreProfileData, undefined>;
export function createStoreProfile(dc: DataConnect): MutationPromise<CreateStoreProfileData, undefined>;

interface CreateTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTransactionData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateTransactionData, undefined>;
  operationName: string;
}
export const createTransactionRef: CreateTransactionRef;

export function createTransaction(): MutationPromise<CreateTransactionData, undefined>;
export function createTransaction(dc: DataConnect): MutationPromise<CreateTransactionData, undefined>;

interface CreateTransactionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTransactionItemData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateTransactionItemData, undefined>;
  operationName: string;
}
export const createTransactionItemRef: CreateTransactionItemRef;

export function createTransactionItem(): MutationPromise<CreateTransactionItemData, undefined>;
export function createTransactionItem(dc: DataConnect): MutationPromise<CreateTransactionItemData, undefined>;

interface GetCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
  operationName: string;
}
export const getCategoryRef: GetCategoryRef;

export function getCategory(vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;
export function getCategory(dc: DataConnect, vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface GetProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
  operationName: string;
}
export const getProductRef: GetProductRef;

export function getProduct(vars: GetProductVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductData, GetProductVariables>;
export function getProduct(dc: DataConnect, vars: GetProductVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductData, GetProductVariables>;

interface GetStoreProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoreProfileVariables): QueryRef<GetStoreProfileData, GetStoreProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetStoreProfileVariables): QueryRef<GetStoreProfileData, GetStoreProfileVariables>;
  operationName: string;
}
export const getStoreProfileRef: GetStoreProfileRef;

export function getStoreProfile(vars: GetStoreProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoreProfileData, GetStoreProfileVariables>;
export function getStoreProfile(dc: DataConnect, vars: GetStoreProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoreProfileData, GetStoreProfileVariables>;

interface GetTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionVariables): QueryRef<GetTransactionData, GetTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTransactionVariables): QueryRef<GetTransactionData, GetTransactionVariables>;
  operationName: string;
}
export const getTransactionRef: GetTransactionRef;

export function getTransaction(vars: GetTransactionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionData, GetTransactionVariables>;
export function getTransaction(dc: DataConnect, vars: GetTransactionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionData, GetTransactionVariables>;

interface GetTransactionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionItemVariables): QueryRef<GetTransactionItemData, GetTransactionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetTransactionItemVariables): QueryRef<GetTransactionItemData, GetTransactionItemVariables>;
  operationName: string;
}
export const getTransactionItemRef: GetTransactionItemRef;

export function getTransactionItem(vars: GetTransactionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionItemData, GetTransactionItemVariables>;
export function getTransactionItem(dc: DataConnect, vars: GetTransactionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionItemData, GetTransactionItemVariables>;

interface ListCategoriesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
  operationName: string;
}
export const listCategoriesRef: ListCategoriesRef;

export function listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;
export function listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListProductsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
  operationName: string;
}
export const listProductsRef: ListProductsRef;

export function listProducts(options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;
export function listProducts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;

interface ListStoreProfilesRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStoreProfilesData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListStoreProfilesData, undefined>;
  operationName: string;
}
export const listStoreProfilesRef: ListStoreProfilesRef;

export function listStoreProfiles(options?: ExecuteQueryOptions): QueryPromise<ListStoreProfilesData, undefined>;
export function listStoreProfiles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStoreProfilesData, undefined>;

interface ListTransactionsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTransactionsData, undefined>;
  operationName: string;
}
export const listTransactionsRef: ListTransactionsRef;

export function listTransactions(options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;
export function listTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface ListTransactionItemsRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionItemsData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListTransactionItemsData, undefined>;
  operationName: string;
}
export const listTransactionItemsRef: ListTransactionItemsRef;

export function listTransactionItems(options?: ExecuteQueryOptions): QueryPromise<ListTransactionItemsData, undefined>;
export function listTransactionItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionItemsData, undefined>;

interface UpdateCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
  operationName: string;
}
export const updateCategoryRef: UpdateCategoryRef;

export function updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;
export function updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductVariables): MutationRef<UpdateProductData, UpdateProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateProductVariables): MutationRef<UpdateProductData, UpdateProductVariables>;
  operationName: string;
}
export const updateProductRef: UpdateProductRef;

export function updateProduct(vars: UpdateProductVariables): MutationPromise<UpdateProductData, UpdateProductVariables>;
export function updateProduct(dc: DataConnect, vars: UpdateProductVariables): MutationPromise<UpdateProductData, UpdateProductVariables>;

interface UpdateStoreProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStoreProfileVariables): MutationRef<UpdateStoreProfileData, UpdateStoreProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateStoreProfileVariables): MutationRef<UpdateStoreProfileData, UpdateStoreProfileVariables>;
  operationName: string;
}
export const updateStoreProfileRef: UpdateStoreProfileRef;

export function updateStoreProfile(vars: UpdateStoreProfileVariables): MutationPromise<UpdateStoreProfileData, UpdateStoreProfileVariables>;
export function updateStoreProfile(dc: DataConnect, vars: UpdateStoreProfileVariables): MutationPromise<UpdateStoreProfileData, UpdateStoreProfileVariables>;

interface UpdateTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTransactionVariables): MutationRef<UpdateTransactionData, UpdateTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTransactionVariables): MutationRef<UpdateTransactionData, UpdateTransactionVariables>;
  operationName: string;
}
export const updateTransactionRef: UpdateTransactionRef;

export function updateTransaction(vars: UpdateTransactionVariables): MutationPromise<UpdateTransactionData, UpdateTransactionVariables>;
export function updateTransaction(dc: DataConnect, vars: UpdateTransactionVariables): MutationPromise<UpdateTransactionData, UpdateTransactionVariables>;

interface UpdateTransactionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTransactionItemVariables): MutationRef<UpdateTransactionItemData, UpdateTransactionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateTransactionItemVariables): MutationRef<UpdateTransactionItemData, UpdateTransactionItemVariables>;
  operationName: string;
}
export const updateTransactionItemRef: UpdateTransactionItemRef;

export function updateTransactionItem(vars: UpdateTransactionItemVariables): MutationPromise<UpdateTransactionItemData, UpdateTransactionItemVariables>;
export function updateTransactionItem(dc: DataConnect, vars: UpdateTransactionItemVariables): MutationPromise<UpdateTransactionItemData, UpdateTransactionItemVariables>;

interface DeleteCategoryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
  operationName: string;
}
export const deleteCategoryRef: DeleteCategoryRef;

export function deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;
export function deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteProductRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
  operationName: string;
}
export const deleteProductRef: DeleteProductRef;

export function deleteProduct(vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;
export function deleteProduct(dc: DataConnect, vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;

interface DeleteStoreProfileRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStoreProfileVariables): MutationRef<DeleteStoreProfileData, DeleteStoreProfileVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteStoreProfileVariables): MutationRef<DeleteStoreProfileData, DeleteStoreProfileVariables>;
  operationName: string;
}
export const deleteStoreProfileRef: DeleteStoreProfileRef;

export function deleteStoreProfile(vars: DeleteStoreProfileVariables): MutationPromise<DeleteStoreProfileData, DeleteStoreProfileVariables>;
export function deleteStoreProfile(dc: DataConnect, vars: DeleteStoreProfileVariables): MutationPromise<DeleteStoreProfileData, DeleteStoreProfileVariables>;

interface DeleteTransactionRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
  operationName: string;
}
export const deleteTransactionRef: DeleteTransactionRef;

export function deleteTransaction(vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;
export function deleteTransaction(dc: DataConnect, vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface DeleteTransactionItemRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionItemVariables): MutationRef<DeleteTransactionItemData, DeleteTransactionItemVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: DeleteTransactionItemVariables): MutationRef<DeleteTransactionItemData, DeleteTransactionItemVariables>;
  operationName: string;
}
export const deleteTransactionItemRef: DeleteTransactionItemRef;

export function deleteTransactionItem(vars: DeleteTransactionItemVariables): MutationPromise<DeleteTransactionItemData, DeleteTransactionItemVariables>;
export function deleteTransactionItem(dc: DataConnect, vars: DeleteTransactionItemVariables): MutationPromise<DeleteTransactionItemData, DeleteTransactionItemVariables>;

