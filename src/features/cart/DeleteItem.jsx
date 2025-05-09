import { deleteItem } from "./cartSlice";
import { useDispatch } from "react-redux";
import Button from "../../ui/Button";

export default function DeleteItem({ pizzaId }) {
  const dispatch = useDispatch();
  return (
    <Button type="small" onClick={() => dispatch(deleteItem(pizzaId))}>
      delete
    </Button>
  );
}
