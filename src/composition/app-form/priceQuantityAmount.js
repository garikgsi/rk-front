import { ref, watch } from "vue";

export default function priceQuantityAmount() {
  let price = ref(0);
  let quantity = ref(1);
  let amount = ref(0);

  // recalc price-quantity-amount
  watch([price, quantity, amount], (newValue, oldValue) => {
    // old
    const [oldPrice, oldQuantity] = oldValue;
    // new
    const [newPrice, newQuantity] = newValue;
    // for price
    if (oldPrice != newPrice && newQuantity) {
      amount.value = newPrice * newQuantity;
      // stop();
    }
    // for quantity
    if (oldQuantity != newQuantity && newPrice) {
      amount.value = newPrice * newQuantity;
      // stop();
    }
  });

  return {
    price,
    quantity,
    amount,
  };
}
