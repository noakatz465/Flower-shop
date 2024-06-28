import React, { FC, useState } from 'react';
import './FlowerList.scss';
import { FlowerModel } from '../../models/flower.model';
import Flower from '../Flower/Flower';
import { useSelector } from 'react-redux';
import Button from 'react-bootstrap/Button';
import NewZer from '../NewZer/NewZer';

interface FlowerListProps {
  flowers: FlowerModel[];
  handleSave: (flower: FlowerModel, isEdit: boolean) => void;
}

const FlowerList = (props: FlowerListProps) => {
  const user = useSelector((store: any) => store.usersSlice);
  const [showModal, setShowModal] = useState(false);
  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const [zerForEdit, setZerForEdit] = useState<FlowerModel | null>(null);
  const search = useSelector((state: any) => state.searchSlice.flowerType);

  const filteredFlowers = props.flowers.filter((flower) => {
    const lowerCaseSearchTerm = search.toLowerCase();
    return flower.name.toLowerCase().includes(lowerCaseSearchTerm) || 
           flower.types.some(type => type.toLowerCase().includes(lowerCaseSearchTerm));
  });

  const handleEditZer = (flower: FlowerModel) => {
    handleOpenModal();
    setZerForEdit(flower);
  };

  const resetZerForEdit = () => {
    setZerForEdit(null);
  };

  return (
    <div className="FlowerList">
      {user.phone === '0583210465' ? (
        <>
          <h3 style={{ direction: 'rtl' }}>שלום {user.firstName}!</h3>
          <Button onClick={handleOpenModal} className="ms-2">הוספת זר חדש</Button>
        </>
      ) : ''}
      <div className='row'>
        {filteredFlowers.map(f => (
          <Flower handleEditZer={handleEditZer} key={f.id} flower={f} />
        ))}
      </div>
      <NewZer
        handleResetZerForEdit={resetZerForEdit}
        initialValues={zerForEdit}
        show={showModal}
        handleClose={handleCloseModal}
        handleSave={(flower: FlowerModel) => props.handleSave(flower, !!zerForEdit)}
      />
    </div>
  );
};

export default FlowerList;
