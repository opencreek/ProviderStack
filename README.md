## Provider Stack [![npm version](https://badge.fury.io/js/@opencreek%2Fprovider-stack.svg)](https://badge.fury.io/js/@opencreek%2Fprovider-stack)

Are you tired of the mountain of react providers, just lying in your app.tsx?
This simple library solves that for you!

## Usage

```tsx
// app.tsx
import { providers, ProviderStack } from "@opencreek/provider-stack"



// Somewhere in your app component

const theme = //...

const providerStack = useMemo(() =>
    providers()
        .add(ThemeProvider, {theme: theme})
        .add(SomeOtherProvider),
    [theme] // make sure to add everything that needs to trigger an update
)


return (
    <ProviderStack providers={providerStack}>
        // Rest of your app
    </ProviderStack>
)
```

### Some more Detail

```tsx
providers()
    .add(ThemeProvider, { theme: theme }) // The second parameter are the props of the provider (excluding `children`)
    .add(SomeOtherProvider) // If no props are needed, you can just leave them out!
```
