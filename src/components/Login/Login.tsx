import React, { FC } from 'react';
import './Login.scss';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../../redux/slices/users';
import { showMessage, hideMessage } from '../../redux/slices/message';



interface LoginProps {
  handleCloseLogin: () => void;
  show: boolean;
}

const Login: FC<LoginProps> = (props: LoginProps) => {
  const _dispatch = useDispatch();
  const message = useSelector((state: any) => state.message);

  const myForm = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      password: "",
    }, onSubmit: (value: any) => {
      _dispatch(addUser({
        firstName: value.firstName,
        lastName: value.lastName,
        phone: value.phone,
        email: value.email,
        password: value.password,
        itemInCart: 0,
        items: []
      }));
      props.handleCloseLogin()
      _dispatch(showMessage({ type: 'success', text: 'המשתמש נוסף בהצלחה!' })); // הצגת הודעת הצלחה
      setTimeout(() => {
        _dispatch(hideMessage()); // הסתרת הודעה אחרי שלוש שניות
      }, 3000);
    },
    validationSchema: yup.object().shape({
      firstName: yup.string().required('זהו שדה חובה'),
      lastName: yup.string().required('זהו שדה חובה'),
      phone: yup.string().min(9, 'מספר הטלפון חייב להיות לפחות 9 ספרות').max(10, 'מספר הטלפון יכול להיות עד 10 ספרות'),
      password: yup.string()
        .min(6, 'הסיסמה חייבת להיות לפחות 6 תווים')
        .matches(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/, 'הסיסמה חייבת להכיל אותיות באנגלית ומספרים')
        .required('זהו שדה חובה'),
    })
  });

  const saveUser = () => {

  }

  return (
    <Modal
      show={props.show}
      onHide={props.handleCloseLogin}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      dialogClassName="custom-modal-width"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          הרשמה
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={myForm.handleSubmit} style={{ direction: 'rtl' }}>
          <div className='form-group'>
            <label className='mb-2'>שם פרטי</label>
            <input name='firstName' onChange={myForm.handleChange} className={myForm.errors.firstName ? 'form-control is-invalid' : 'form-control'}></input>
            {myForm.errors.firstName ? <small className='errors text-danger'>{myForm.errors.firstName?.toString()}</small> : ''}
          </div>
          <div className='form-group'>
            <label className='mb-2'>שם משפחה</label>
            <input name='lastName' onChange={myForm.handleChange} className={myForm.errors.lastName ? 'form-control is-invalid' : 'form-control'}></input>
            {myForm.errors.lastName ? <small className='errors text-danger'>{myForm.errors.lastName?.toString()}</small> : ''}
          </div>
          <div className='form-group'>
            <label className='mb-2'>טלפון</label>
            <input name='phone' onChange={myForm.handleChange} className={myForm.errors.phone ? 'form-control is-invalid' : 'form-control'}></input>
            {myForm.errors.phone ? <small className='errors text-danger'>{myForm.errors.phone?.toString()}</small> : ''}
          </div>
          <div className='form-group'>
            <label className='mb-2'>מייל</label>
            <input name='email' onChange={myForm.handleChange} className='form-control'></input>
          </div>
          <div className="form-group">
            <label className='mb-2'>סיסמה</label>
            <input name='password' type="password" onChange={myForm.handleChange} className={myForm.errors.password ? 'form-control is-invalid' : 'form-control'} placeholder="בחר סיסמה"></input>
            {myForm.errors.password ? <small className='errors text-danger'>{myForm.errors.password?.toString()}</small> : ''}
          </div>
          <div className="mt-3">
            <Button style={{ margin: '4px' }} onClick={saveUser} type="submit">שמור</Button>
            <Button style={{ margin: '4px' }} onClick={props.handleCloseLogin} className="ms-2">ביטול</Button>
          </div>
        </form>
        {message?.text && (
          <div className={`mt-3 alert alert-${message?.type}`} role="alert">
            {message?.text}
          </div>
        )}
      </Modal.Body>
    </Modal>
  );
}

export default Login;
