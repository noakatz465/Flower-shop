import React, { FC, useMemo } from 'react';
import './Cart.scss';
import { FlowerModel } from '../../models/flower.model';
import Table from 'react-bootstrap/Table';
import Button from 'react-bootstrap/Button';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem } from '../../redux/slices/users';

interface CartProps {}

const Cart: FC<CartProps> = () => {
  const user = useSelector((store: any) => store.usersSlice);
  const _dispatch = useDispatch();

  const totalPrice = useMemo(() => {
    return user.items.reduce((total: number, flower: FlowerModel) => {
      return total + flower.price;
    }, 0);
  }, [user.items]);

  return (
    <div className="Cart">
      <h2>המוצרים שאספת...</h2>
      {user.items.length > 0 ? (
        <>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>תמונה</th>
                <th>שם</th>
                <th>מחיר</th>
                <th>פעולה</th>
              </tr>
            </thead>
            <tbody>
              {user.items.map((flower: FlowerModel) => (
                <tr key={flower.id}>
                  <td><img src={flower.img} alt={flower.name} className="flower-img" /></td>
                  <td>{flower.name}</td>
                  <td>₪{flower.price.toFixed(2)}</td>
                  <td>
                    <Button variant="danger" onClick={() => _dispatch(removeItem(flower.id))}>הסר</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="total-price">
            <h3>סה"כ לתשלום: ₪{totalPrice.toFixed(2)}</h3>
          </div>
        </>
      ) : (
        <div className="empty-cart">
          <h3>סל הקניות שלך ריק</h3>
        </div>
      )}
    </div>
  );
}

export default Cart;
