import type { ComponentType, ReactElement, ReactNode } from "react"

type Provider = {
  add<T>(provider: ComponentType<T>, props?: Omit<T, "children">): Provider
  // (props: { children: ReactNode }): ReactElement
  providers: Array<[ComponentType<unknown>, unknown]>
}

export function ProviderStack({
  children,
  providers: currentProviders,
}: {
  children: ReactNode
  providers: Array<[ComponentType<unknown>, unknown]>
}): ReactElement {
  const provider = currentProviders?.reduceRight((cur, [Provider, props]) => {
    return <Provider {...props}>{cur}</Provider>
  }, <>{children}</>)

  return <>{provider}</>
}

export function providers(
  currentProviders?: Array<[ComponentType<unknown>, unknown]>
): Provider {
  return {
    add: function <T>(provider: ComponentType<T>, props?: Omit<T, "children">) {
      // @ts-ignore
      return providers([...(currentProviders ?? []), [provider, props]])
    },
    providers: currentProviders ?? [],
  }
}
