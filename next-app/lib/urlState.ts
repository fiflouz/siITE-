export type UrlState = Record<string, string | string[] | undefined>;

export function getSearchParam(searchParams: URLSearchParams, key: string): string | undefined {
  const value = searchParams.get(key);
  return value ?? undefined;
}

export function getSearchParamList(searchParams: URLSearchParams, key: string): string[] {
  return searchParams.getAll(key).filter(Boolean);
}

export function setSearchParam(
  searchParams: URLSearchParams,
  key: string,
  value: string | string[] | undefined,
): URLSearchParams {
  const params = new URLSearchParams(searchParams.toString());
  params.delete(key);
  if (typeof value === "string" && value.length > 0) {
    params.set(key, value);
  } else if (Array.isArray(value)) {
    value.filter(Boolean).forEach((item) => params.append(key, item));
  }
  return params;
}

export function mergeUrlState(
  current: URLSearchParams,
  next: UrlState,
): URLSearchParams {
  const params = new URLSearchParams(current.toString());
  Object.entries(next).forEach(([key, value]) => {
    params.delete(key);
    if (typeof value === "string" && value.length > 0) {
      params.set(key, value);
    } else if (Array.isArray(value)) {
      value.filter(Boolean).forEach((item) => params.append(key, item));
    }
  });
  return params;
}
