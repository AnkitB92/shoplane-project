import './CartPage.css';
import { BsTrash3 } from "react-icons/bs";
import { useCart } from '../../Context/CartContext';


const CartPage = () => {

  const { cart, removeFromCart } = useCart();

  const subtotal = Math.round(
    cart.reduce((total, item) => total + item.price * item.quantity, 0) * 100
  ) / 100;

  const shipping = subtotal ? 5 : 0;
  const tax = Math.round(subtotal * 0.05 * 100) / 100;
  const netTotal = Math.round((subtotal + shipping + tax) * 100) / 100;

  return (
    <div className="row row-cols-1 justify-content-center row-gap-4 pb-4">
      <div className="col-12 order-2 col-sm-8 pt-2">

        {/* cart products row */}
        {cart.length === 0 ? (
          <p className='fs-5 text-center'>Your cart is empty.</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="items-row-grid">
              <div className="item-image-container">
                <img src={item.image} alt={item.title} />
              </div>

              <div className="item-info-container">
                <div className="item-name-container">
                  <strong>Brand</strong>
                  <p>{item.title}</p>
                </div>
                <div className="item-price">${(item.price).toFixed(2)}</div>
              </div>

              <div className="delete-btn-container">
                <button onClick={() => removeFromCart(item.id)}><BsTrash3 /></button>
              </div>
            </div>
          ))
        )}

      </div>

      {/* Order price summary */}
      <div className="col-10 order-sm-2 col-sm-4">
        <div className="card">
          <div className="card-body">
            <p className="summary-header">Order Summary</p>
            <div className="summary-body">
              <p>Subtotal<span>${subtotal}</span></p>
              <p>Shipping<span>${shipping}</span></p>
              <p>Tax (5%)<span>${tax}</span></p>
            </div>
            <p className="summary-footer">
              Net Total<span>${netTotal}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage;