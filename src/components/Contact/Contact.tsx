import React, { FC, useEffect, useState } from 'react';
import './Contact.scss';
import { useDispatch } from 'react-redux';
import userService from '../../services/userService.service';
import { User } from '../../models/user.model';

interface ContactProps { }

const Contact = () => {

  const [currentUser, setCurrentUser] = useState<any>(null);
  const transformToUserModel = (data: any) => {
    return new User(
      data.name.first,
      data.name.last,
      data.picture.large,
      data.email
    );
  };
  const fetchAndSetUsers = async () => {
    try {
      const response = await userService.getUser();
      setCurrentUser(transformToUserModel(response.data.results[0]));
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };
  useEffect(() => {
    fetchAndSetUsers();
  }, []);
  
  return (
    <div className="Contact">
      {currentUser ? (
        <div className="contact-card">
          <h2>פרטי איש הקשר במיוחד בשבילך</h2>
          <img src={currentUser.img} alt="User" className="user-image" />
          <p className="user-name">{currentUser.firstName} {currentUser.lastName}</p>
          <p className="user-email">{currentUser.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
export default Contact;
