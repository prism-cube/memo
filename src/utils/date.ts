export const formatDate = (date: Date | null | undefined) => {
  if (!date) return ''
  let result = date.getFullYear() + '/'
  result += (date.getMonth() + 1).toString().length === 1 ? '0' + (date.getMonth() + 1).toString() : (date.getMonth() + 1)
  result += '/'
  result += date.getDate().toString().length === 1 ? '0' + date.getDate().toString() : date.getDate().toString()
  return result
}

export const formatDateTime = (date: Date | null | undefined) => {
  if (!date) return ''
  let result = formatDate(date) + ' '
  result += date.getHours().toString().length === 1 ? '0' + date.getHours().toString() : date.getHours().toString()
  result += ':'
  result += date.getMinutes().toString().length === 1 ? '0' + date.getMinutes().toString() : date.getMinutes().toString()
  result += ':'
  result += date.getSeconds().toString().length === 1 ? '0' + date.getSeconds().toString() : date.getSeconds().toString()
  return result
}