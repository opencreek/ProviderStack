import type { ComponentType, ReactElement, ReactNode } from "react"

/**
 * Represents a Stack of provider
 */
type ProviderStack = {
    /**
     * Adds a new provider
     * @param provider The Provider to add
     * @param props Optional pros for the provider
     */
    add<T>(
        provider: ComponentType<T>,
        props?: Omit<T, "children">
    ): ProviderStack
    /**
     * The whole stack in order.
     * Tuple of provider and props
     */
    providers: Array<[ComponentType<unknown>, unknown]>
}

/**
 * Renders all configured providers in order
 * @param children react children
 * @param providers The providerStack
 * @constructor
 */
export function ProviderStack({
    children,
    providers,
}: {
    children: ReactNode
    providers: ProviderStack
}): ReactElement {
    const provider = providers.providers?.reduceRight(
        (cur, [Provider, props]) => {
            return <Provider {...props}>{cur}</Provider>
        },
        <>{children}</>
    )

    return <>{provider}</>
}

/**
 * Creates a ProviderStack.
 * On the provider Stack you can add new providers with `.add(Provider)`
 */
export function providers(): ProviderStack {
    return stack([])
}

function stack(
    currentProviders: Array<[ComponentType<unknown>, unknown]>
): ProviderStack {
    return {
        add: function <T>(
            provider: ComponentType<T>,
            props?: Omit<T, "children">
        ) {
            // @ts-ignore
            return stack([...(currentProviders ?? []), [provider, props]])
        },
        providers: currentProviders ?? [],
    }
}
