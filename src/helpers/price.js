export const priceValidator = (value, params) => {
  if (!value)
    return ''
  value = value.replace(',', '.')
  const index = value.search(/\./) + 1
  if (index)
    value = value.substr(0, index) + value.slice(index, index + params.decimal).replace(/\./g, '')
  return value.replace(/[^0-9.]+/g, '').replace('.', params.separator)
}

export const priceFormat = (value, params) => {
  if (!value) return null
  if (typeof value === 'string')
    value = parseFloat(value.replace(',', '.')) || null
  if (typeof value === 'number' && (value % 1 !== 0 || params.forceDecimal))
    value = value.toFixed(params.decimal || 2).replace('.', params.separator)
  return value
}
