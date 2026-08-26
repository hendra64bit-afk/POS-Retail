# Basic Usage

Always prioritize using a supported framework over using the generated SDK
directly. Supported frameworks simplify the developer experience and help ensure
best practices are followed.




### React
For each operation, there is a wrapper hook that can be used to call the operation.

Here are all of the hooks that get generated:
```ts
import { useCreateCategory, useCreateProduct, useCreateStoreProfile, useCreateTransaction, useCreateTransactionItem, useGetCategory, useGetProduct, useGetStoreProfile, useGetTransaction, useGetTransactionItem } from '@dataconnect/generated/react';
// The types of these hooks are available in react/index.d.ts

const { data, isPending, isSuccess, isError, error } = useCreateCategory();

const { data, isPending, isSuccess, isError, error } = useCreateProduct();

const { data, isPending, isSuccess, isError, error } = useCreateStoreProfile();

const { data, isPending, isSuccess, isError, error } = useCreateTransaction();

const { data, isPending, isSuccess, isError, error } = useCreateTransactionItem();

const { data, isPending, isSuccess, isError, error } = useGetCategory(getCategoryVars);

const { data, isPending, isSuccess, isError, error } = useGetProduct(getProductVars);

const { data, isPending, isSuccess, isError, error } = useGetStoreProfile(getStoreProfileVars);

const { data, isPending, isSuccess, isError, error } = useGetTransaction(getTransactionVars);

const { data, isPending, isSuccess, isError, error } = useGetTransactionItem(getTransactionItemVars);

```

Here's an example from a different generated SDK:

```ts
import { useListAllMovies } from '@dataconnect/generated/react';

function MyComponent() {
  const { isLoading, data, error } = useListAllMovies();
  if(isLoading) {
    return <div>Loading...</div>
  }
  if(error) {
    return <div> An Error Occurred: {error} </div>
  }
}

// App.tsx
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import MyComponent from './my-component';

function App() {
  const queryClient = new QueryClient();
  return <QueryClientProvider client={queryClient}>
    <MyComponent />
  </QueryClientProvider>
}
```



## Advanced Usage
If a user is not using a supported framework, they can use the generated SDK directly.

Here's an example of how to use it with the first 5 operations:

```js
import { createCategory, createProduct, createStoreProfile, createTransaction, createTransactionItem, getCategory, getProduct, getStoreProfile, getTransaction, getTransactionItem } from '@dataconnect/generated';


// Operation CreateCategory: 
const { data } = await CreateCategory(dataConnect);

// Operation CreateProduct: 
const { data } = await CreateProduct(dataConnect);

// Operation CreateStoreProfile: 
const { data } = await CreateStoreProfile(dataConnect);

// Operation CreateTransaction: 
const { data } = await CreateTransaction(dataConnect);

// Operation CreateTransactionItem: 
const { data } = await CreateTransactionItem(dataConnect);

// Operation GetCategory:  For variables, look at type GetCategoryVars in ../index.d.ts
const { data } = await GetCategory(dataConnect, getCategoryVars);

// Operation GetProduct:  For variables, look at type GetProductVars in ../index.d.ts
const { data } = await GetProduct(dataConnect, getProductVars);

// Operation GetStoreProfile:  For variables, look at type GetStoreProfileVars in ../index.d.ts
const { data } = await GetStoreProfile(dataConnect, getStoreProfileVars);

// Operation GetTransaction:  For variables, look at type GetTransactionVars in ../index.d.ts
const { data } = await GetTransaction(dataConnect, getTransactionVars);

// Operation GetTransactionItem:  For variables, look at type GetTransactionItemVars in ../index.d.ts
const { data } = await GetTransactionItem(dataConnect, getTransactionItemVars);


```