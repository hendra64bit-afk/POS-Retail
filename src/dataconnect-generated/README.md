# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetCategory*](#getcategory)
  - [*GetProduct*](#getproduct)
  - [*GetStoreProfile*](#getstoreprofile)
  - [*GetTransaction*](#gettransaction)
  - [*GetTransactionItem*](#gettransactionitem)
  - [*ListCategories*](#listcategories)
  - [*ListProducts*](#listproducts)
  - [*ListStoreProfiles*](#liststoreprofiles)
  - [*ListTransactions*](#listtransactions)
  - [*ListTransactionItems*](#listtransactionitems)
- [**Mutations**](#mutations)
  - [*CreateCategory*](#createcategory)
  - [*CreateProduct*](#createproduct)
  - [*CreateStoreProfile*](#createstoreprofile)
  - [*CreateTransaction*](#createtransaction)
  - [*CreateTransactionItem*](#createtransactionitem)
  - [*UpdateCategory*](#updatecategory)
  - [*UpdateProduct*](#updateproduct)
  - [*UpdateStoreProfile*](#updatestoreprofile)
  - [*UpdateTransaction*](#updatetransaction)
  - [*UpdateTransactionItem*](#updatetransactionitem)
  - [*DeleteCategory*](#deletecategory)
  - [*DeleteProduct*](#deleteproduct)
  - [*DeleteStoreProfile*](#deletestoreprofile)
  - [*DeleteTransaction*](#deletetransaction)
  - [*DeleteTransactionItem*](#deletetransactionitem)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetCategory
You can execute the `GetCategory` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getCategory(vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface GetCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
}
export const getCategoryRef: GetCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getCategory(dc: DataConnect, vars: GetCategoryVariables, options?: ExecuteQueryOptions): QueryPromise<GetCategoryData, GetCategoryVariables>;

interface GetCategoryRef {
  ...
  (dc: DataConnect, vars: GetCategoryVariables): QueryRef<GetCategoryData, GetCategoryVariables>;
}
export const getCategoryRef: GetCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getCategoryRef:
```typescript
const name = getCategoryRef.operationName;
console.log(name);
```

### Variables
The `GetCategory` query requires an argument of type `GetCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetCategory` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetCategoryData {
  category?: {
    name: string;
    description?: string | null;
  };
}
```
### Using `GetCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getCategory, GetCategoryVariables } from '@dataconnect/generated';

// The `GetCategory` query requires an argument of type `GetCategoryVariables`:
const getCategoryVars: GetCategoryVariables = {
  id: ..., 
};

// Call the `getCategory()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getCategory(getCategoryVars);
// Variables can be defined inline as well.
const { data } = await getCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getCategory(dataConnect, getCategoryVars);

console.log(data.category);

// Or, you can use the `Promise` API.
getCategory(getCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category);
});
```

### Using `GetCategory`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getCategoryRef, GetCategoryVariables } from '@dataconnect/generated';

// The `GetCategory` query requires an argument of type `GetCategoryVariables`:
const getCategoryVars: GetCategoryVariables = {
  id: ..., 
};

// Call the `getCategoryRef()` function to get a reference to the query.
const ref = getCategoryRef(getCategoryVars);
// Variables can be defined inline as well.
const ref = getCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getCategoryRef(dataConnect, getCategoryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.category);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.category);
});
```

## GetProduct
You can execute the `GetProduct` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getProduct(vars: GetProductVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductData, GetProductVariables>;

interface GetProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
}
export const getProductRef: GetProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getProduct(dc: DataConnect, vars: GetProductVariables, options?: ExecuteQueryOptions): QueryPromise<GetProductData, GetProductVariables>;

interface GetProductRef {
  ...
  (dc: DataConnect, vars: GetProductVariables): QueryRef<GetProductData, GetProductVariables>;
}
export const getProductRef: GetProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getProductRef:
```typescript
const name = getProductRef.operationName;
console.log(name);
```

### Variables
The `GetProduct` query requires an argument of type `GetProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetProductVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetProduct` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetProductData {
  product?: {
    name: string;
    price: number;
    category: {
      name: string;
    };
  };
}
```
### Using `GetProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getProduct, GetProductVariables } from '@dataconnect/generated';

// The `GetProduct` query requires an argument of type `GetProductVariables`:
const getProductVars: GetProductVariables = {
  id: ..., 
};

// Call the `getProduct()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getProduct(getProductVars);
// Variables can be defined inline as well.
const { data } = await getProduct({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getProduct(dataConnect, getProductVars);

console.log(data.product);

// Or, you can use the `Promise` API.
getProduct(getProductVars).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

### Using `GetProduct`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getProductRef, GetProductVariables } from '@dataconnect/generated';

// The `GetProduct` query requires an argument of type `GetProductVariables`:
const getProductVars: GetProductVariables = {
  id: ..., 
};

// Call the `getProductRef()` function to get a reference to the query.
const ref = getProductRef(getProductVars);
// Variables can be defined inline as well.
const ref = getProductRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getProductRef(dataConnect, getProductVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.product);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.product);
});
```

## GetStoreProfile
You can execute the `GetStoreProfile` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getStoreProfile(vars: GetStoreProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoreProfileData, GetStoreProfileVariables>;

interface GetStoreProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetStoreProfileVariables): QueryRef<GetStoreProfileData, GetStoreProfileVariables>;
}
export const getStoreProfileRef: GetStoreProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getStoreProfile(dc: DataConnect, vars: GetStoreProfileVariables, options?: ExecuteQueryOptions): QueryPromise<GetStoreProfileData, GetStoreProfileVariables>;

interface GetStoreProfileRef {
  ...
  (dc: DataConnect, vars: GetStoreProfileVariables): QueryRef<GetStoreProfileData, GetStoreProfileVariables>;
}
export const getStoreProfileRef: GetStoreProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getStoreProfileRef:
```typescript
const name = getStoreProfileRef.operationName;
console.log(name);
```

### Variables
The `GetStoreProfile` query requires an argument of type `GetStoreProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetStoreProfileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetStoreProfile` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetStoreProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetStoreProfileData {
  storeProfile?: {
    storeName: string;
    address?: string | null;
  };
}
```
### Using `GetStoreProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getStoreProfile, GetStoreProfileVariables } from '@dataconnect/generated';

// The `GetStoreProfile` query requires an argument of type `GetStoreProfileVariables`:
const getStoreProfileVars: GetStoreProfileVariables = {
  id: ..., 
};

// Call the `getStoreProfile()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getStoreProfile(getStoreProfileVars);
// Variables can be defined inline as well.
const { data } = await getStoreProfile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getStoreProfile(dataConnect, getStoreProfileVars);

console.log(data.storeProfile);

// Or, you can use the `Promise` API.
getStoreProfile(getStoreProfileVars).then((response) => {
  const data = response.data;
  console.log(data.storeProfile);
});
```

### Using `GetStoreProfile`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getStoreProfileRef, GetStoreProfileVariables } from '@dataconnect/generated';

// The `GetStoreProfile` query requires an argument of type `GetStoreProfileVariables`:
const getStoreProfileVars: GetStoreProfileVariables = {
  id: ..., 
};

// Call the `getStoreProfileRef()` function to get a reference to the query.
const ref = getStoreProfileRef(getStoreProfileVars);
// Variables can be defined inline as well.
const ref = getStoreProfileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getStoreProfileRef(dataConnect, getStoreProfileVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.storeProfile);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.storeProfile);
});
```

## GetTransaction
You can execute the `GetTransaction` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTransaction(vars: GetTransactionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionData, GetTransactionVariables>;

interface GetTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionVariables): QueryRef<GetTransactionData, GetTransactionVariables>;
}
export const getTransactionRef: GetTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTransaction(dc: DataConnect, vars: GetTransactionVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionData, GetTransactionVariables>;

interface GetTransactionRef {
  ...
  (dc: DataConnect, vars: GetTransactionVariables): QueryRef<GetTransactionData, GetTransactionVariables>;
}
export const getTransactionRef: GetTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTransactionRef:
```typescript
const name = getTransactionRef.operationName;
console.log(name);
```

### Variables
The `GetTransaction` query requires an argument of type `GetTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTransactionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTransaction` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTransactionData {
  transaction?: {
    totalAmount: number;
    paymentMethod: string;
  };
}
```
### Using `GetTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTransaction, GetTransactionVariables } from '@dataconnect/generated';

// The `GetTransaction` query requires an argument of type `GetTransactionVariables`:
const getTransactionVars: GetTransactionVariables = {
  id: ..., 
};

// Call the `getTransaction()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTransaction(getTransactionVars);
// Variables can be defined inline as well.
const { data } = await getTransaction({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTransaction(dataConnect, getTransactionVars);

console.log(data.transaction);

// Or, you can use the `Promise` API.
getTransaction(getTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.transaction);
});
```

### Using `GetTransaction`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTransactionRef, GetTransactionVariables } from '@dataconnect/generated';

// The `GetTransaction` query requires an argument of type `GetTransactionVariables`:
const getTransactionVars: GetTransactionVariables = {
  id: ..., 
};

// Call the `getTransactionRef()` function to get a reference to the query.
const ref = getTransactionRef(getTransactionVars);
// Variables can be defined inline as well.
const ref = getTransactionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTransactionRef(dataConnect, getTransactionVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transaction);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction);
});
```

## GetTransactionItem
You can execute the `GetTransactionItem` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getTransactionItem(vars: GetTransactionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionItemData, GetTransactionItemVariables>;

interface GetTransactionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetTransactionItemVariables): QueryRef<GetTransactionItemData, GetTransactionItemVariables>;
}
export const getTransactionItemRef: GetTransactionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getTransactionItem(dc: DataConnect, vars: GetTransactionItemVariables, options?: ExecuteQueryOptions): QueryPromise<GetTransactionItemData, GetTransactionItemVariables>;

interface GetTransactionItemRef {
  ...
  (dc: DataConnect, vars: GetTransactionItemVariables): QueryRef<GetTransactionItemData, GetTransactionItemVariables>;
}
export const getTransactionItemRef: GetTransactionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getTransactionItemRef:
```typescript
const name = getTransactionItemRef.operationName;
console.log(name);
```

### Variables
The `GetTransactionItem` query requires an argument of type `GetTransactionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetTransactionItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `GetTransactionItem` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetTransactionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetTransactionItemData {
  transactionItem?: {
    quantity: number;
    priceAtTime: number;
  };
}
```
### Using `GetTransactionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getTransactionItem, GetTransactionItemVariables } from '@dataconnect/generated';

// The `GetTransactionItem` query requires an argument of type `GetTransactionItemVariables`:
const getTransactionItemVars: GetTransactionItemVariables = {
  id: ..., 
};

// Call the `getTransactionItem()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getTransactionItem(getTransactionItemVars);
// Variables can be defined inline as well.
const { data } = await getTransactionItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getTransactionItem(dataConnect, getTransactionItemVars);

console.log(data.transactionItem);

// Or, you can use the `Promise` API.
getTransactionItem(getTransactionItemVars).then((response) => {
  const data = response.data;
  console.log(data.transactionItem);
});
```

### Using `GetTransactionItem`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getTransactionItemRef, GetTransactionItemVariables } from '@dataconnect/generated';

// The `GetTransactionItem` query requires an argument of type `GetTransactionItemVariables`:
const getTransactionItemVars: GetTransactionItemVariables = {
  id: ..., 
};

// Call the `getTransactionItemRef()` function to get a reference to the query.
const ref = getTransactionItemRef(getTransactionItemVars);
// Variables can be defined inline as well.
const ref = getTransactionItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getTransactionItemRef(dataConnect, getTransactionItemVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactionItem);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionItem);
});
```

## ListCategories
You can execute the `ListCategories` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listCategories(options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listCategories(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListCategoriesData, undefined>;

interface ListCategoriesRef {
  ...
  (dc: DataConnect): QueryRef<ListCategoriesData, undefined>;
}
export const listCategoriesRef: ListCategoriesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listCategoriesRef:
```typescript
const name = listCategoriesRef.operationName;
console.log(name);
```

### Variables
The `ListCategories` query has no variables.
### Return Type
Recall that executing the `ListCategories` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListCategoriesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListCategoriesData {
  categories: ({
    name: string;
  })[];
}
```
### Using `ListCategories`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listCategories } from '@dataconnect/generated';


// Call the `listCategories()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listCategories();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listCategories(dataConnect);

console.log(data.categories);

// Or, you can use the `Promise` API.
listCategories().then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

### Using `ListCategories`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listCategoriesRef } from '@dataconnect/generated';


// Call the `listCategoriesRef()` function to get a reference to the query.
const ref = listCategoriesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listCategoriesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.categories);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.categories);
});
```

## ListProducts
You can execute the `ListProducts` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listProducts(options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;

interface ListProductsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListProductsData, undefined>;
}
export const listProductsRef: ListProductsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listProducts(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListProductsData, undefined>;

interface ListProductsRef {
  ...
  (dc: DataConnect): QueryRef<ListProductsData, undefined>;
}
export const listProductsRef: ListProductsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listProductsRef:
```typescript
const name = listProductsRef.operationName;
console.log(name);
```

### Variables
The `ListProducts` query has no variables.
### Return Type
Recall that executing the `ListProducts` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListProductsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListProductsData {
  products: ({
    name: string;
    price: number;
  })[];
}
```
### Using `ListProducts`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listProducts } from '@dataconnect/generated';


// Call the `listProducts()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listProducts();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listProducts(dataConnect);

console.log(data.products);

// Or, you can use the `Promise` API.
listProducts().then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

### Using `ListProducts`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listProductsRef } from '@dataconnect/generated';


// Call the `listProductsRef()` function to get a reference to the query.
const ref = listProductsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listProductsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.products);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.products);
});
```

## ListStoreProfiles
You can execute the `ListStoreProfiles` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listStoreProfiles(options?: ExecuteQueryOptions): QueryPromise<ListStoreProfilesData, undefined>;

interface ListStoreProfilesRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListStoreProfilesData, undefined>;
}
export const listStoreProfilesRef: ListStoreProfilesRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listStoreProfiles(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListStoreProfilesData, undefined>;

interface ListStoreProfilesRef {
  ...
  (dc: DataConnect): QueryRef<ListStoreProfilesData, undefined>;
}
export const listStoreProfilesRef: ListStoreProfilesRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listStoreProfilesRef:
```typescript
const name = listStoreProfilesRef.operationName;
console.log(name);
```

### Variables
The `ListStoreProfiles` query has no variables.
### Return Type
Recall that executing the `ListStoreProfiles` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListStoreProfilesData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListStoreProfilesData {
  storeProfiles: ({
    storeName: string;
  })[];
}
```
### Using `ListStoreProfiles`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listStoreProfiles } from '@dataconnect/generated';


// Call the `listStoreProfiles()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listStoreProfiles();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listStoreProfiles(dataConnect);

console.log(data.storeProfiles);

// Or, you can use the `Promise` API.
listStoreProfiles().then((response) => {
  const data = response.data;
  console.log(data.storeProfiles);
});
```

### Using `ListStoreProfiles`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listStoreProfilesRef } from '@dataconnect/generated';


// Call the `listStoreProfilesRef()` function to get a reference to the query.
const ref = listStoreProfilesRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listStoreProfilesRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.storeProfiles);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.storeProfiles);
});
```

## ListTransactions
You can execute the `ListTransactions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTransactions(options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface ListTransactionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionsData, undefined>;
}
export const listTransactionsRef: ListTransactionsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTransactions(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionsData, undefined>;

interface ListTransactionsRef {
  ...
  (dc: DataConnect): QueryRef<ListTransactionsData, undefined>;
}
export const listTransactionsRef: ListTransactionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTransactionsRef:
```typescript
const name = listTransactionsRef.operationName;
console.log(name);
```

### Variables
The `ListTransactions` query has no variables.
### Return Type
Recall that executing the `ListTransactions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTransactionsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTransactionsData {
  transactions: ({
    totalAmount: number;
    timestamp: TimestampString;
  })[];
}
```
### Using `ListTransactions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTransactions } from '@dataconnect/generated';


// Call the `listTransactions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTransactions();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTransactions(dataConnect);

console.log(data.transactions);

// Or, you can use the `Promise` API.
listTransactions().then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

### Using `ListTransactions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTransactionsRef } from '@dataconnect/generated';


// Call the `listTransactionsRef()` function to get a reference to the query.
const ref = listTransactionsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTransactionsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactions);
});
```

## ListTransactionItems
You can execute the `ListTransactionItems` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
listTransactionItems(options?: ExecuteQueryOptions): QueryPromise<ListTransactionItemsData, undefined>;

interface ListTransactionItemsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListTransactionItemsData, undefined>;
}
export const listTransactionItemsRef: ListTransactionItemsRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listTransactionItems(dc: DataConnect, options?: ExecuteQueryOptions): QueryPromise<ListTransactionItemsData, undefined>;

interface ListTransactionItemsRef {
  ...
  (dc: DataConnect): QueryRef<ListTransactionItemsData, undefined>;
}
export const listTransactionItemsRef: ListTransactionItemsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listTransactionItemsRef:
```typescript
const name = listTransactionItemsRef.operationName;
console.log(name);
```

### Variables
The `ListTransactionItems` query has no variables.
### Return Type
Recall that executing the `ListTransactionItems` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListTransactionItemsData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListTransactionItemsData {
  transactionItems: ({
    quantity: number;
    priceAtTime: number;
  })[];
}
```
### Using `ListTransactionItems`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listTransactionItems } from '@dataconnect/generated';


// Call the `listTransactionItems()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listTransactionItems();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listTransactionItems(dataConnect);

console.log(data.transactionItems);

// Or, you can use the `Promise` API.
listTransactionItems().then((response) => {
  const data = response.data;
  console.log(data.transactionItems);
});
```

### Using `ListTransactionItems`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listTransactionItemsRef } from '@dataconnect/generated';


// Call the `listTransactionItemsRef()` function to get a reference to the query.
const ref = listTransactionItemsRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listTransactionItemsRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.transactionItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionItems);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateCategory
You can execute the `CreateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createCategory(): MutationPromise<CreateCategoryData, undefined>;

interface CreateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateCategoryData, undefined>;
}
export const createCategoryRef: CreateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createCategory(dc: DataConnect): MutationPromise<CreateCategoryData, undefined>;

interface CreateCategoryRef {
  ...
  (dc: DataConnect): MutationRef<CreateCategoryData, undefined>;
}
export const createCategoryRef: CreateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createCategoryRef:
```typescript
const name = createCategoryRef.operationName;
console.log(name);
```

### Variables
The `CreateCategory` mutation has no variables.
### Return Type
Recall that executing the `CreateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateCategoryData {
  category_insert: Category_Key;
}
```
### Using `CreateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createCategory } from '@dataconnect/generated';


// Call the `createCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createCategory();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createCategory(dataConnect);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
createCategory().then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

### Using `CreateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createCategoryRef } from '@dataconnect/generated';


// Call the `createCategoryRef()` function to get a reference to the mutation.
const ref = createCategoryRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createCategoryRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_insert);
});
```

## CreateProduct
You can execute the `CreateProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createProduct(): MutationPromise<CreateProductData, undefined>;

interface CreateProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateProductData, undefined>;
}
export const createProductRef: CreateProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createProduct(dc: DataConnect): MutationPromise<CreateProductData, undefined>;

interface CreateProductRef {
  ...
  (dc: DataConnect): MutationRef<CreateProductData, undefined>;
}
export const createProductRef: CreateProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createProductRef:
```typescript
const name = createProductRef.operationName;
console.log(name);
```

### Variables
The `CreateProduct` mutation has no variables.
### Return Type
Recall that executing the `CreateProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateProductData {
  product_insert: Product_Key;
}
```
### Using `CreateProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createProduct } from '@dataconnect/generated';


// Call the `createProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createProduct();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createProduct(dataConnect);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
createProduct().then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

### Using `CreateProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createProductRef } from '@dataconnect/generated';


// Call the `createProductRef()` function to get a reference to the mutation.
const ref = createProductRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createProductRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_insert);
});
```

## CreateStoreProfile
You can execute the `CreateStoreProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createStoreProfile(): MutationPromise<CreateStoreProfileData, undefined>;

interface CreateStoreProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateStoreProfileData, undefined>;
}
export const createStoreProfileRef: CreateStoreProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createStoreProfile(dc: DataConnect): MutationPromise<CreateStoreProfileData, undefined>;

interface CreateStoreProfileRef {
  ...
  (dc: DataConnect): MutationRef<CreateStoreProfileData, undefined>;
}
export const createStoreProfileRef: CreateStoreProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createStoreProfileRef:
```typescript
const name = createStoreProfileRef.operationName;
console.log(name);
```

### Variables
The `CreateStoreProfile` mutation has no variables.
### Return Type
Recall that executing the `CreateStoreProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateStoreProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateStoreProfileData {
  storeProfile_insert: StoreProfile_Key;
}
```
### Using `CreateStoreProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createStoreProfile } from '@dataconnect/generated';


// Call the `createStoreProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createStoreProfile();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createStoreProfile(dataConnect);

console.log(data.storeProfile_insert);

// Or, you can use the `Promise` API.
createStoreProfile().then((response) => {
  const data = response.data;
  console.log(data.storeProfile_insert);
});
```

### Using `CreateStoreProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createStoreProfileRef } from '@dataconnect/generated';


// Call the `createStoreProfileRef()` function to get a reference to the mutation.
const ref = createStoreProfileRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createStoreProfileRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.storeProfile_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.storeProfile_insert);
});
```

## CreateTransaction
You can execute the `CreateTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTransaction(): MutationPromise<CreateTransactionData, undefined>;

interface CreateTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTransactionData, undefined>;
}
export const createTransactionRef: CreateTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTransaction(dc: DataConnect): MutationPromise<CreateTransactionData, undefined>;

interface CreateTransactionRef {
  ...
  (dc: DataConnect): MutationRef<CreateTransactionData, undefined>;
}
export const createTransactionRef: CreateTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTransactionRef:
```typescript
const name = createTransactionRef.operationName;
console.log(name);
```

### Variables
The `CreateTransaction` mutation has no variables.
### Return Type
Recall that executing the `CreateTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTransactionData {
  transaction_insert: Transaction_Key;
}
```
### Using `CreateTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTransaction } from '@dataconnect/generated';


// Call the `createTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTransaction();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTransaction(dataConnect);

console.log(data.transaction_insert);

// Or, you can use the `Promise` API.
createTransaction().then((response) => {
  const data = response.data;
  console.log(data.transaction_insert);
});
```

### Using `CreateTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTransactionRef } from '@dataconnect/generated';


// Call the `createTransactionRef()` function to get a reference to the mutation.
const ref = createTransactionRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTransactionRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transaction_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction_insert);
});
```

## CreateTransactionItem
You can execute the `CreateTransactionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
createTransactionItem(): MutationPromise<CreateTransactionItemData, undefined>;

interface CreateTransactionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateTransactionItemData, undefined>;
}
export const createTransactionItemRef: CreateTransactionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createTransactionItem(dc: DataConnect): MutationPromise<CreateTransactionItemData, undefined>;

interface CreateTransactionItemRef {
  ...
  (dc: DataConnect): MutationRef<CreateTransactionItemData, undefined>;
}
export const createTransactionItemRef: CreateTransactionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createTransactionItemRef:
```typescript
const name = createTransactionItemRef.operationName;
console.log(name);
```

### Variables
The `CreateTransactionItem` mutation has no variables.
### Return Type
Recall that executing the `CreateTransactionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateTransactionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateTransactionItemData {
  transactionItem_insert: TransactionItem_Key;
}
```
### Using `CreateTransactionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createTransactionItem } from '@dataconnect/generated';


// Call the `createTransactionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createTransactionItem();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createTransactionItem(dataConnect);

console.log(data.transactionItem_insert);

// Or, you can use the `Promise` API.
createTransactionItem().then((response) => {
  const data = response.data;
  console.log(data.transactionItem_insert);
});
```

### Using `CreateTransactionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createTransactionItemRef } from '@dataconnect/generated';


// Call the `createTransactionItemRef()` function to get a reference to the mutation.
const ref = createTransactionItemRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createTransactionItemRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transactionItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionItem_insert);
});
```

## UpdateCategory
You can execute the `UpdateCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateCategory(vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateCategory(dc: DataConnect, vars: UpdateCategoryVariables): MutationPromise<UpdateCategoryData, UpdateCategoryVariables>;

interface UpdateCategoryRef {
  ...
  (dc: DataConnect, vars: UpdateCategoryVariables): MutationRef<UpdateCategoryData, UpdateCategoryVariables>;
}
export const updateCategoryRef: UpdateCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateCategoryRef:
```typescript
const name = updateCategoryRef.operationName;
console.log(name);
```

### Variables
The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateCategoryVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateCategoryData {
  category_update?: Category_Key | null;
}
```
### Using `UpdateCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateCategory, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateCategory(updateCategoryVars);
// Variables can be defined inline as well.
const { data } = await updateCategory({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateCategory(dataConnect, updateCategoryVars);

console.log(data.category_update);

// Or, you can use the `Promise` API.
updateCategory(updateCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

### Using `UpdateCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateCategoryRef, UpdateCategoryVariables } from '@dataconnect/generated';

// The `UpdateCategory` mutation requires an argument of type `UpdateCategoryVariables`:
const updateCategoryVars: UpdateCategoryVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateCategoryRef()` function to get a reference to the mutation.
const ref = updateCategoryRef(updateCategoryVars);
// Variables can be defined inline as well.
const ref = updateCategoryRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateCategoryRef(dataConnect, updateCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_update);
});
```

## UpdateProduct
You can execute the `UpdateProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateProduct(vars: UpdateProductVariables): MutationPromise<UpdateProductData, UpdateProductVariables>;

interface UpdateProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateProductVariables): MutationRef<UpdateProductData, UpdateProductVariables>;
}
export const updateProductRef: UpdateProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateProduct(dc: DataConnect, vars: UpdateProductVariables): MutationPromise<UpdateProductData, UpdateProductVariables>;

interface UpdateProductRef {
  ...
  (dc: DataConnect, vars: UpdateProductVariables): MutationRef<UpdateProductData, UpdateProductVariables>;
}
export const updateProductRef: UpdateProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateProductRef:
```typescript
const name = updateProductRef.operationName;
console.log(name);
```

### Variables
The `UpdateProduct` mutation requires an argument of type `UpdateProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateProductVariables {
  id: UUIDString;
  price: number;
}
```
### Return Type
Recall that executing the `UpdateProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateProductData {
  product_update?: Product_Key | null;
}
```
### Using `UpdateProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateProduct, UpdateProductVariables } from '@dataconnect/generated';

// The `UpdateProduct` mutation requires an argument of type `UpdateProductVariables`:
const updateProductVars: UpdateProductVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateProduct(updateProductVars);
// Variables can be defined inline as well.
const { data } = await updateProduct({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateProduct(dataConnect, updateProductVars);

console.log(data.product_update);

// Or, you can use the `Promise` API.
updateProduct(updateProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

### Using `UpdateProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateProductRef, UpdateProductVariables } from '@dataconnect/generated';

// The `UpdateProduct` mutation requires an argument of type `UpdateProductVariables`:
const updateProductVars: UpdateProductVariables = {
  id: ..., 
  price: ..., 
};

// Call the `updateProductRef()` function to get a reference to the mutation.
const ref = updateProductRef(updateProductVars);
// Variables can be defined inline as well.
const ref = updateProductRef({ id: ..., price: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateProductRef(dataConnect, updateProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_update);
});
```

## UpdateStoreProfile
You can execute the `UpdateStoreProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateStoreProfile(vars: UpdateStoreProfileVariables): MutationPromise<UpdateStoreProfileData, UpdateStoreProfileVariables>;

interface UpdateStoreProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateStoreProfileVariables): MutationRef<UpdateStoreProfileData, UpdateStoreProfileVariables>;
}
export const updateStoreProfileRef: UpdateStoreProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateStoreProfile(dc: DataConnect, vars: UpdateStoreProfileVariables): MutationPromise<UpdateStoreProfileData, UpdateStoreProfileVariables>;

interface UpdateStoreProfileRef {
  ...
  (dc: DataConnect, vars: UpdateStoreProfileVariables): MutationRef<UpdateStoreProfileData, UpdateStoreProfileVariables>;
}
export const updateStoreProfileRef: UpdateStoreProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateStoreProfileRef:
```typescript
const name = updateStoreProfileRef.operationName;
console.log(name);
```

### Variables
The `UpdateStoreProfile` mutation requires an argument of type `UpdateStoreProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateStoreProfileVariables {
  id: UUIDString;
  name: string;
}
```
### Return Type
Recall that executing the `UpdateStoreProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateStoreProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateStoreProfileData {
  storeProfile_update?: StoreProfile_Key | null;
}
```
### Using `UpdateStoreProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateStoreProfile, UpdateStoreProfileVariables } from '@dataconnect/generated';

// The `UpdateStoreProfile` mutation requires an argument of type `UpdateStoreProfileVariables`:
const updateStoreProfileVars: UpdateStoreProfileVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateStoreProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateStoreProfile(updateStoreProfileVars);
// Variables can be defined inline as well.
const { data } = await updateStoreProfile({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateStoreProfile(dataConnect, updateStoreProfileVars);

console.log(data.storeProfile_update);

// Or, you can use the `Promise` API.
updateStoreProfile(updateStoreProfileVars).then((response) => {
  const data = response.data;
  console.log(data.storeProfile_update);
});
```

### Using `UpdateStoreProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateStoreProfileRef, UpdateStoreProfileVariables } from '@dataconnect/generated';

// The `UpdateStoreProfile` mutation requires an argument of type `UpdateStoreProfileVariables`:
const updateStoreProfileVars: UpdateStoreProfileVariables = {
  id: ..., 
  name: ..., 
};

// Call the `updateStoreProfileRef()` function to get a reference to the mutation.
const ref = updateStoreProfileRef(updateStoreProfileVars);
// Variables can be defined inline as well.
const ref = updateStoreProfileRef({ id: ..., name: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateStoreProfileRef(dataConnect, updateStoreProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.storeProfile_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.storeProfile_update);
});
```

## UpdateTransaction
You can execute the `UpdateTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTransaction(vars: UpdateTransactionVariables): MutationPromise<UpdateTransactionData, UpdateTransactionVariables>;

interface UpdateTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTransactionVariables): MutationRef<UpdateTransactionData, UpdateTransactionVariables>;
}
export const updateTransactionRef: UpdateTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTransaction(dc: DataConnect, vars: UpdateTransactionVariables): MutationPromise<UpdateTransactionData, UpdateTransactionVariables>;

interface UpdateTransactionRef {
  ...
  (dc: DataConnect, vars: UpdateTransactionVariables): MutationRef<UpdateTransactionData, UpdateTransactionVariables>;
}
export const updateTransactionRef: UpdateTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTransactionRef:
```typescript
const name = updateTransactionRef.operationName;
console.log(name);
```

### Variables
The `UpdateTransaction` mutation requires an argument of type `UpdateTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTransactionVariables {
  id: UUIDString;
  notes: string;
}
```
### Return Type
Recall that executing the `UpdateTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTransactionData {
  transaction_update?: Transaction_Key | null;
}
```
### Using `UpdateTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTransaction, UpdateTransactionVariables } from '@dataconnect/generated';

// The `UpdateTransaction` mutation requires an argument of type `UpdateTransactionVariables`:
const updateTransactionVars: UpdateTransactionVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updateTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTransaction(updateTransactionVars);
// Variables can be defined inline as well.
const { data } = await updateTransaction({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTransaction(dataConnect, updateTransactionVars);

console.log(data.transaction_update);

// Or, you can use the `Promise` API.
updateTransaction(updateTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.transaction_update);
});
```

### Using `UpdateTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTransactionRef, UpdateTransactionVariables } from '@dataconnect/generated';

// The `UpdateTransaction` mutation requires an argument of type `UpdateTransactionVariables`:
const updateTransactionVars: UpdateTransactionVariables = {
  id: ..., 
  notes: ..., 
};

// Call the `updateTransactionRef()` function to get a reference to the mutation.
const ref = updateTransactionRef(updateTransactionVars);
// Variables can be defined inline as well.
const ref = updateTransactionRef({ id: ..., notes: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTransactionRef(dataConnect, updateTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transaction_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction_update);
});
```

## UpdateTransactionItem
You can execute the `UpdateTransactionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
updateTransactionItem(vars: UpdateTransactionItemVariables): MutationPromise<UpdateTransactionItemData, UpdateTransactionItemVariables>;

interface UpdateTransactionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateTransactionItemVariables): MutationRef<UpdateTransactionItemData, UpdateTransactionItemVariables>;
}
export const updateTransactionItemRef: UpdateTransactionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateTransactionItem(dc: DataConnect, vars: UpdateTransactionItemVariables): MutationPromise<UpdateTransactionItemData, UpdateTransactionItemVariables>;

interface UpdateTransactionItemRef {
  ...
  (dc: DataConnect, vars: UpdateTransactionItemVariables): MutationRef<UpdateTransactionItemData, UpdateTransactionItemVariables>;
}
export const updateTransactionItemRef: UpdateTransactionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateTransactionItemRef:
```typescript
const name = updateTransactionItemRef.operationName;
console.log(name);
```

### Variables
The `UpdateTransactionItem` mutation requires an argument of type `UpdateTransactionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateTransactionItemVariables {
  id: UUIDString;
  qty: number;
}
```
### Return Type
Recall that executing the `UpdateTransactionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateTransactionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateTransactionItemData {
  transactionItem_update?: TransactionItem_Key | null;
}
```
### Using `UpdateTransactionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateTransactionItem, UpdateTransactionItemVariables } from '@dataconnect/generated';

// The `UpdateTransactionItem` mutation requires an argument of type `UpdateTransactionItemVariables`:
const updateTransactionItemVars: UpdateTransactionItemVariables = {
  id: ..., 
  qty: ..., 
};

// Call the `updateTransactionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateTransactionItem(updateTransactionItemVars);
// Variables can be defined inline as well.
const { data } = await updateTransactionItem({ id: ..., qty: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateTransactionItem(dataConnect, updateTransactionItemVars);

console.log(data.transactionItem_update);

// Or, you can use the `Promise` API.
updateTransactionItem(updateTransactionItemVars).then((response) => {
  const data = response.data;
  console.log(data.transactionItem_update);
});
```

### Using `UpdateTransactionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateTransactionItemRef, UpdateTransactionItemVariables } from '@dataconnect/generated';

// The `UpdateTransactionItem` mutation requires an argument of type `UpdateTransactionItemVariables`:
const updateTransactionItemVars: UpdateTransactionItemVariables = {
  id: ..., 
  qty: ..., 
};

// Call the `updateTransactionItemRef()` function to get a reference to the mutation.
const ref = updateTransactionItemRef(updateTransactionItemVars);
// Variables can be defined inline as well.
const ref = updateTransactionItemRef({ id: ..., qty: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateTransactionItemRef(dataConnect, updateTransactionItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transactionItem_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionItem_update);
});
```

## DeleteCategory
You can execute the `DeleteCategory` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteCategory(vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteCategory(dc: DataConnect, vars: DeleteCategoryVariables): MutationPromise<DeleteCategoryData, DeleteCategoryVariables>;

interface DeleteCategoryRef {
  ...
  (dc: DataConnect, vars: DeleteCategoryVariables): MutationRef<DeleteCategoryData, DeleteCategoryVariables>;
}
export const deleteCategoryRef: DeleteCategoryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteCategoryRef:
```typescript
const name = deleteCategoryRef.operationName;
console.log(name);
```

### Variables
The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteCategoryVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteCategory` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteCategoryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteCategoryData {
  category_delete?: Category_Key | null;
}
```
### Using `DeleteCategory`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteCategory, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategory()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteCategory(deleteCategoryVars);
// Variables can be defined inline as well.
const { data } = await deleteCategory({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteCategory(dataConnect, deleteCategoryVars);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
deleteCategory(deleteCategoryVars).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

### Using `DeleteCategory`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteCategoryRef, DeleteCategoryVariables } from '@dataconnect/generated';

// The `DeleteCategory` mutation requires an argument of type `DeleteCategoryVariables`:
const deleteCategoryVars: DeleteCategoryVariables = {
  id: ..., 
};

// Call the `deleteCategoryRef()` function to get a reference to the mutation.
const ref = deleteCategoryRef(deleteCategoryVars);
// Variables can be defined inline as well.
const ref = deleteCategoryRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteCategoryRef(dataConnect, deleteCategoryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.category_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.category_delete);
});
```

## DeleteProduct
You can execute the `DeleteProduct` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteProduct(vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;

interface DeleteProductRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
}
export const deleteProductRef: DeleteProductRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteProduct(dc: DataConnect, vars: DeleteProductVariables): MutationPromise<DeleteProductData, DeleteProductVariables>;

interface DeleteProductRef {
  ...
  (dc: DataConnect, vars: DeleteProductVariables): MutationRef<DeleteProductData, DeleteProductVariables>;
}
export const deleteProductRef: DeleteProductRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteProductRef:
```typescript
const name = deleteProductRef.operationName;
console.log(name);
```

### Variables
The `DeleteProduct` mutation requires an argument of type `DeleteProductVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteProductVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteProduct` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteProductData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteProductData {
  product_delete?: Product_Key | null;
}
```
### Using `DeleteProduct`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteProduct, DeleteProductVariables } from '@dataconnect/generated';

// The `DeleteProduct` mutation requires an argument of type `DeleteProductVariables`:
const deleteProductVars: DeleteProductVariables = {
  id: ..., 
};

// Call the `deleteProduct()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteProduct(deleteProductVars);
// Variables can be defined inline as well.
const { data } = await deleteProduct({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteProduct(dataConnect, deleteProductVars);

console.log(data.product_delete);

// Or, you can use the `Promise` API.
deleteProduct(deleteProductVars).then((response) => {
  const data = response.data;
  console.log(data.product_delete);
});
```

### Using `DeleteProduct`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteProductRef, DeleteProductVariables } from '@dataconnect/generated';

// The `DeleteProduct` mutation requires an argument of type `DeleteProductVariables`:
const deleteProductVars: DeleteProductVariables = {
  id: ..., 
};

// Call the `deleteProductRef()` function to get a reference to the mutation.
const ref = deleteProductRef(deleteProductVars);
// Variables can be defined inline as well.
const ref = deleteProductRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteProductRef(dataConnect, deleteProductVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.product_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.product_delete);
});
```

## DeleteStoreProfile
You can execute the `DeleteStoreProfile` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteStoreProfile(vars: DeleteStoreProfileVariables): MutationPromise<DeleteStoreProfileData, DeleteStoreProfileVariables>;

interface DeleteStoreProfileRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteStoreProfileVariables): MutationRef<DeleteStoreProfileData, DeleteStoreProfileVariables>;
}
export const deleteStoreProfileRef: DeleteStoreProfileRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteStoreProfile(dc: DataConnect, vars: DeleteStoreProfileVariables): MutationPromise<DeleteStoreProfileData, DeleteStoreProfileVariables>;

interface DeleteStoreProfileRef {
  ...
  (dc: DataConnect, vars: DeleteStoreProfileVariables): MutationRef<DeleteStoreProfileData, DeleteStoreProfileVariables>;
}
export const deleteStoreProfileRef: DeleteStoreProfileRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteStoreProfileRef:
```typescript
const name = deleteStoreProfileRef.operationName;
console.log(name);
```

### Variables
The `DeleteStoreProfile` mutation requires an argument of type `DeleteStoreProfileVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteStoreProfileVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteStoreProfile` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteStoreProfileData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteStoreProfileData {
  storeProfile_delete?: StoreProfile_Key | null;
}
```
### Using `DeleteStoreProfile`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteStoreProfile, DeleteStoreProfileVariables } from '@dataconnect/generated';

// The `DeleteStoreProfile` mutation requires an argument of type `DeleteStoreProfileVariables`:
const deleteStoreProfileVars: DeleteStoreProfileVariables = {
  id: ..., 
};

// Call the `deleteStoreProfile()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteStoreProfile(deleteStoreProfileVars);
// Variables can be defined inline as well.
const { data } = await deleteStoreProfile({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteStoreProfile(dataConnect, deleteStoreProfileVars);

console.log(data.storeProfile_delete);

// Or, you can use the `Promise` API.
deleteStoreProfile(deleteStoreProfileVars).then((response) => {
  const data = response.data;
  console.log(data.storeProfile_delete);
});
```

### Using `DeleteStoreProfile`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteStoreProfileRef, DeleteStoreProfileVariables } from '@dataconnect/generated';

// The `DeleteStoreProfile` mutation requires an argument of type `DeleteStoreProfileVariables`:
const deleteStoreProfileVars: DeleteStoreProfileVariables = {
  id: ..., 
};

// Call the `deleteStoreProfileRef()` function to get a reference to the mutation.
const ref = deleteStoreProfileRef(deleteStoreProfileVars);
// Variables can be defined inline as well.
const ref = deleteStoreProfileRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteStoreProfileRef(dataConnect, deleteStoreProfileVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.storeProfile_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.storeProfile_delete);
});
```

## DeleteTransaction
You can execute the `DeleteTransaction` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTransaction(vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface DeleteTransactionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
}
export const deleteTransactionRef: DeleteTransactionRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTransaction(dc: DataConnect, vars: DeleteTransactionVariables): MutationPromise<DeleteTransactionData, DeleteTransactionVariables>;

interface DeleteTransactionRef {
  ...
  (dc: DataConnect, vars: DeleteTransactionVariables): MutationRef<DeleteTransactionData, DeleteTransactionVariables>;
}
export const deleteTransactionRef: DeleteTransactionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTransactionRef:
```typescript
const name = deleteTransactionRef.operationName;
console.log(name);
```

### Variables
The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTransactionVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTransaction` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTransactionData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTransactionData {
  transaction_delete?: Transaction_Key | null;
}
```
### Using `DeleteTransaction`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTransaction, DeleteTransactionVariables } from '@dataconnect/generated';

// The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`:
const deleteTransactionVars: DeleteTransactionVariables = {
  id: ..., 
};

// Call the `deleteTransaction()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTransaction(deleteTransactionVars);
// Variables can be defined inline as well.
const { data } = await deleteTransaction({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTransaction(dataConnect, deleteTransactionVars);

console.log(data.transaction_delete);

// Or, you can use the `Promise` API.
deleteTransaction(deleteTransactionVars).then((response) => {
  const data = response.data;
  console.log(data.transaction_delete);
});
```

### Using `DeleteTransaction`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTransactionRef, DeleteTransactionVariables } from '@dataconnect/generated';

// The `DeleteTransaction` mutation requires an argument of type `DeleteTransactionVariables`:
const deleteTransactionVars: DeleteTransactionVariables = {
  id: ..., 
};

// Call the `deleteTransactionRef()` function to get a reference to the mutation.
const ref = deleteTransactionRef(deleteTransactionVars);
// Variables can be defined inline as well.
const ref = deleteTransactionRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTransactionRef(dataConnect, deleteTransactionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transaction_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transaction_delete);
});
```

## DeleteTransactionItem
You can execute the `DeleteTransactionItem` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
deleteTransactionItem(vars: DeleteTransactionItemVariables): MutationPromise<DeleteTransactionItemData, DeleteTransactionItemVariables>;

interface DeleteTransactionItemRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: DeleteTransactionItemVariables): MutationRef<DeleteTransactionItemData, DeleteTransactionItemVariables>;
}
export const deleteTransactionItemRef: DeleteTransactionItemRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
deleteTransactionItem(dc: DataConnect, vars: DeleteTransactionItemVariables): MutationPromise<DeleteTransactionItemData, DeleteTransactionItemVariables>;

interface DeleteTransactionItemRef {
  ...
  (dc: DataConnect, vars: DeleteTransactionItemVariables): MutationRef<DeleteTransactionItemData, DeleteTransactionItemVariables>;
}
export const deleteTransactionItemRef: DeleteTransactionItemRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the deleteTransactionItemRef:
```typescript
const name = deleteTransactionItemRef.operationName;
console.log(name);
```

### Variables
The `DeleteTransactionItem` mutation requires an argument of type `DeleteTransactionItemVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface DeleteTransactionItemVariables {
  id: UUIDString;
}
```
### Return Type
Recall that executing the `DeleteTransactionItem` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `DeleteTransactionItemData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface DeleteTransactionItemData {
  transactionItem_delete?: TransactionItem_Key | null;
}
```
### Using `DeleteTransactionItem`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, deleteTransactionItem, DeleteTransactionItemVariables } from '@dataconnect/generated';

// The `DeleteTransactionItem` mutation requires an argument of type `DeleteTransactionItemVariables`:
const deleteTransactionItemVars: DeleteTransactionItemVariables = {
  id: ..., 
};

// Call the `deleteTransactionItem()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await deleteTransactionItem(deleteTransactionItemVars);
// Variables can be defined inline as well.
const { data } = await deleteTransactionItem({ id: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await deleteTransactionItem(dataConnect, deleteTransactionItemVars);

console.log(data.transactionItem_delete);

// Or, you can use the `Promise` API.
deleteTransactionItem(deleteTransactionItemVars).then((response) => {
  const data = response.data;
  console.log(data.transactionItem_delete);
});
```

### Using `DeleteTransactionItem`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, deleteTransactionItemRef, DeleteTransactionItemVariables } from '@dataconnect/generated';

// The `DeleteTransactionItem` mutation requires an argument of type `DeleteTransactionItemVariables`:
const deleteTransactionItemVars: DeleteTransactionItemVariables = {
  id: ..., 
};

// Call the `deleteTransactionItemRef()` function to get a reference to the mutation.
const ref = deleteTransactionItemRef(deleteTransactionItemVars);
// Variables can be defined inline as well.
const ref = deleteTransactionItemRef({ id: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = deleteTransactionItemRef(dataConnect, deleteTransactionItemVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.transactionItem_delete);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.transactionItem_delete);
});
```

