import React, { FC, useEffect, useState } from 'react';
import './Zer.scss';
import { FlowerModel } from '../../models/flower.model';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addItem } from '../../redux/slices/users';

interface ZerProps {
  flowers: FlowerModel[];
}

const Zer = (props: ZerProps) => {
  const _dispatch = useDispatch();

  const handleAddToCart = () => {
    if (flower) {
       _dispatch(addItem(flower));
    }
  };
  const params = useParams();
  const [flower, setFlower] = useState<FlowerModel>();
  
  useEffect(() => {
    let i = Number(params)
    const foundFlower = props.flowers.find(f => f.id == Number(params.zerId));
    setFlower(foundFlower);
  }, [])

  return <div className="Zer container">
    <div className="row">
      <div className="col-md-6">
        <img src={flower?.img} alt={flower?.name} className="Zer-img" />
      </div>
      <div className="col-md-6">
        <h2 className="Zer-name">{flower?.name}</h2>
        <p className="Zer-price">₪{flower?.price.toFixed(2)}</p>
        <h3 className="Zer-types-title">מפרט:</h3>
        <ul className="Zer-types">
          {flower?.types.map((type, index) => (
            <li key={index}>{type}</li>
          ))}
        </ul>
        <button onClick={handleAddToCart} className="btn btn-primary">הוסף לסל</button>
      </div>
    </div>
  </div>
}

export default Zer;
