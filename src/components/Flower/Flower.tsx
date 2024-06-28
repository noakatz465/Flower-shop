import React, { FC } from 'react';
import './Flower.scss';
import { FlowerModel } from '../../models/flower.model';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';

interface FlowerProps {
  flower: FlowerModel,
  handleEditZer: (flower:FlowerModel) => void
}

const Flower = (props: FlowerProps) => {
  const user = useSelector((store: any) => store.usersSlice)


  const editZer = (flower: FlowerModel) => {
    props.handleEditZer(flower)
  }
  const _navigate = useNavigate();

  const goToZer = (id: number) => {
    _navigate(`/zer/${id}`)

  }

  return <div className="Flower col-sm-3">
    <img style={{ cursor: 'pointer' }} onClick={() => goToZer(props.flower.id)} src={props.flower.img} alt={props.flower.name} className="Flower-img" />
    <h2 className="Flower-name">{props.flower.name}</h2>
    <p className="Flower-price">₪{props.flower.price.toFixed(2)}</p>
    {user.phone == '0583210465' ? <Button variant="primary" onClick={() => { editZer(props.flower) }}>ערוך זר</Button> : ''}
  </div>
}

export default Flower;
