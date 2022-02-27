import Link from 'next/link';
import { useCart } from '../lib/cartState';
import NavStyles from './styles/NavStyles';
import { useUser } from './User';

export default function Nav() {
  const user = useUser();
  const { openCart } = useCart();
  return (
    <NavStyles>
      <Link href="/products">Products</Link>
      <Link href="/sell">Sell</Link>
      <Link href="/orders">Orders</Link>
      <Link href="/account">Account</Link>
      <button type="button" onClick={openCart}>
        My Cart
      </button>
    </NavStyles>
  );
}
