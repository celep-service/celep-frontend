export const createFakeApi = <T>(fakeResponse: T) =>
  new Promise<T>((resolve) =>
    setTimeout(() => {
      resolve(fakeResponse)
    }, 500)
  )
