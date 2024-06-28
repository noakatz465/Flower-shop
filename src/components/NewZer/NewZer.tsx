import React, { FC } from 'react';
import './NewZer.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { FlowerModel } from '../../models/flower.model';

interface NewZerProps {
  show: boolean;
  handleClose: () => void;
  handleSave: (flower: FlowerModel) => void;
  initialValues?: FlowerModel | null;
  handleResetZerForEdit: () => void;
}

const NewZer = (props: NewZerProps) => {
  const validationSchema = yup.object().shape({
    name: yup.string().required('זהו שדה חובה'),
    price: yup.number().required('זהו שדה חובה').min(0, 'המחיר חייב להיות גדול או שווה ל-0'),
    types: yup.array().of(yup.string().required('זהו שדה חובה')).required('זהו שדה חובה')
  });

  const myForm = useFormik({
    initialValues: props.initialValues || {
      id: FlowerModel.index,
      name: '',
      price: 0,
      img: '',
      types: ['']
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const newFlower = new FlowerModel(values.img, values.name, values.price, values.types);
      if (props.initialValues) {
        newFlower.id = props.initialValues.id; // retain the id of the existing flower
      }
      props.handleSave(newFlower);
      props.handleClose();
      props.handleResetZerForEdit();
    },
    enableReinitialize: true,
  });

  return (
    <Modal show={props.show} onHide={props.handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{props.initialValues ? 'עריכת זר' : 'הוספת זר חדש'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={myForm.handleSubmit}>
          <div className='form-group'>
            <label className='mb-2'>שם הזר</label>
            <input
              name='name'
              value={myForm.values.name}
              onChange={myForm.handleChange}
              className={myForm.errors.name ? 'form-control is-invalid' : 'form-control'}
            />
            {myForm.errors.name ? <small className='errors text-danger'>{myForm.errors.name}</small> : null}
          </div>
          <div className='form-group'>
            <label className='mb-2'>מחיר</label>
            <input
              name='price'
              type='number'
              value={myForm.values.price}
              onChange={myForm.handleChange}
              className={myForm.errors.price ? 'form-control is-invalid' : 'form-control'}
            />
            {myForm.errors.price ? <small className='errors text-danger'>{myForm.errors.price}</small> : null}
          </div>
          <div className='form-group'>
            <label className='mb-2'>כתובת תמונה</label>
            <input
              name='img'
              value={myForm.values.img}
              onChange={myForm.handleChange}
              className={myForm.errors.img ? 'form-control is-invalid' : 'form-control'}
            />
            {myForm.errors.img ? <small className='errors text-danger'>{myForm.errors.img}</small> : null}
          </div>
          <div className='form-group'>
            <label className='mb-2'>סוגי פרחים</label>
            {myForm.values.types.map((type, index) => (
              <div key={index} className='mb-2'>
                <input
                  name={`types[${index}]`}
                  value={type}
                  onChange={myForm.handleChange}
                  className={myForm.errors.types && myForm.errors.types[index] ? 'form-control is-invalid' : 'form-control'}
                />
                {myForm.errors.types && myForm.errors.types[index] ? (
                  <small className='errors text-danger'>{myForm.errors.types[index]}</small>
                ) : null}
              </div>
            ))}
            <Button
              variant="link"
              onClick={() => myForm.setFieldValue('types', [...myForm.values.types, ''])}
            >
              הוסף סוג פרח
            </Button>
          </div>
          <div className="mt-3">
            <Button type="submit" className="me-2">
              שמור
            </Button>
            <Button variant="secondary" onClick={props.handleClose}>
              ביטול
            </Button>
          </div>
        </form>
      </Modal.Body>
    </Modal>
  );
}

export default NewZer;
