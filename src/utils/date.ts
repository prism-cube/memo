export const formatDate = (date: Date | null | undefined, format: string) => {
  if (!date) return ''
  format = format.replace(/yyyy/g, date.getFullYear().toString())
  format = format.replace(/MM/g, ('0' + (date.getMonth() + 1)).slice(-2))
  format = format.replace(/dd/g, ('0' + date.getDate()).slice(-2))
  format = format.replace(/HH/g, ('0' + date.getHours()).slice(-2))
  format = format.replace(/mm/g, ('0' + date.getMinutes()).slice(-2))
  format = format.replace(/ss/g, ('0' + date.getSeconds()).slice(-2))
  format = format.replace(/SSS/g, ('00' + date.getMilliseconds()).slice(-3))
  return format
}

export const equalDate = (date1: Date | null | undefined, date2: Date | null | undefined, format: string) => {
  if (!date1 || !date2) return false
  return formatDate(date1, format) === formatDate(date2, format)
}