export const handleStatus = res =>
  res.ok ? res.json() : Promise.reject(res.statusText)

export const log = (...params) => {
  console.log(...params)

  return params
}

export const timeout = (dueTime, promise) => {
  const timeout = new Promise((resolve, reject) =>
    setTimeout(() => reject(`Limite da promise excedido (limite: ${dueTime} ms)`), dueTime))

  return Promise.race([
    timeout,
    promise
  ])
}

export const delay = delayTime => data =>
  new Promise((resolve, reject) =>
    setTimeout(() => resolve(data), delayTime))

export const retry = (retries, miliseconds, fn) =>
  fn().catch(err => {
    log(retries)

    return delay(miliseconds)()
      .then(() => retries > 1
        ? retry(--retries, miliseconds, fn)
        : Promise.reject(err)
      )
  })
