const addDecimal = num => (Math.round(num * 100) / 100).toFixed(2)

export const updateCart = state => {
  state.itemsPrice = Number(
    state.cartItems.reduce((acc, item) => acc + item.price * item.qty, 0)
  )
  state.shippingPrice = state.itemsPrice > 5000 ? 0 : 100
  state.taxPrice = state.itemsPrice * 0.15
  state.totalPrice = Number(
    addDecimal(state.itemsPrice + state.shippingPrice + state.taxPrice)
  )
  localStorage.setItem('cart', JSON.stringify(state))
  return state
}
