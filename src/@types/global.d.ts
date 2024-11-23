declare type StringfyKeys<T> = T extends Object ? `${keyof T}` : never

declare type NonNullableProperties<T> = {
  [P in keyof T]: NonNullable<T[P]>
}

declare type PageParams<P> = {
  params: P
}

declare type PageSearchParams = {
  searchParams: { [key: string]: string | string[] | undefined }
}
