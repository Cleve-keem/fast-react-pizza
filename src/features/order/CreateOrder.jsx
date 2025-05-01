import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import { clearCart, getCart, getTotalCartPrice } from "../cart/cartSlice";
import Button from "../../ui/Button";
import EmptyCart from "../cart/EmptyCart";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { fetchAddress } from "../user/UseSlicer";
import store from "../../store";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str
  );

function CreateOrder() {
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: addressError,
  } = useSelector((state) => state.user);

  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";
  const isLoadingAddress = addressStatus === "loading";
  const formErrors = useActionData();
  const dispatch = useDispatch();

  const [withPriority, setWithPriority] = useState(false);
  const cart = useSelector(getCart);

  const totalCartPrice = useSelector(getTotalCartPrice);
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-6">
      <h2 className="text-xl font-semibold mb-8">Ready to order? Let's go!</h2>

      <Form method="POST">
        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center">
          <label className="sm:basis-40">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formErrors?.phone && (
              <p className="text-xs mt-1 text-red-700">{formErrors.phone}</p>
            )}
          </div>
        </div>

        <div className="mb-5 flex gap-2 flex-col sm:flex-row sm:items-center relative">
          <label className="sm:basis-40">Address</label>
          <div className="grow">
            <input
              className="input w-full"
              type="text"
              name="address"
              defaultValue={address}
              disabled={isLoadingAddress}
              required
            />
            {addressStatus === "error" && (
              <p className="text-xs mt-1 ml-3 text-red-700">{addressError}</p>
            )}
          </div>
          {!position.latitude && !position.longitude && (
            <div className="absolute right-1 top-[35px] z-10 sm:top-[3px] md:top-[5px]">
              <Button
                type="small"
                disable={isLoadingAddress}
                onClick={(e) => {
                  e.preventDefault();
                  dispatch(fetchAddress());
                }}
              >
                Get Position
              </Button>
            </div>
          )}
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="w-6 h-6 accent-yellow-500 focus:outline-none focus:ring focus:ring-yellow-500 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="position"
            value={
              position.latitude && position.longitude
                ? `${position.latitude}, ${position.longitude}`
                : ""
            }
          />

          <Button type="primary" disabled={isSubmitting || isLoadingAddress}>
            {isSubmitting
              ? "Placing order..."
              : `Order now ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

export async function action({ request }) {
  const formData = await request.formData();
  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone))
    errors.phone =
      "Invalid number, we might need your number to contact your if anything go wrong";

  if (Object.keys(errors).length > 0) return errors;

  const newOrder = await createOrder(order);

  // Clear cart right immediately after order is place
  store.dispatch(clearCart());

  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
