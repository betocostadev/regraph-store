export default function formatMoney(amount = 0) {
  const formatter = Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    // Check if it is 0 cents
    minimumFractionDigits: amount % 100 === 0 ? 0 : 2,
  })

  return formatter.format(amount / 100)
}
