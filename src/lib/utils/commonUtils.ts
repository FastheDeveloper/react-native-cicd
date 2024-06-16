export const getIsEmptyObject = (object?: object) => !object || !Object.values(object).some((x) => x)

export const hasEmptyValues = (object?: object) => !object || !Object.values(object).every((x) => x)

export const wait = async (ms: number) => new Promise((resolve) => {
  const t = setTimeout(() => {
    resolve(null)
    clearTimeout(t)
  }, ms)
})

export const makeid = (length = 21) => {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }

  return result
}

export const leftRight = (cond: any, trueValue: any, falseValue?: any): any => (cond ? trueValue : falseValue)
