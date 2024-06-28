import React, { useState } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
import FlowerList from './components/FlowerList/FlowerList';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home/Home';
import Zer from './components/Zer/Zer';
import { FlowerModel } from './models/flower.model';
import Cart from './components/Cart/Cart';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import usersSlice from './redux/slices/users';
import searchSlice from './redux/slices/search';
import About from './components/About/About';
import message from './redux/slices/message';
import Contact from './components/Contact/Contact';

function App() {
  const myStore = configureStore({
    reducer:{
      usersSlice, searchSlice, message
    } 
  })
  const [flowers, setFlowers] = useState<FlowerModel[]>([
    new FlowerModel('/zer2.jpg', 'זר לוריאן', 120, ['נרקיס', 'לבנדר']),
    new FlowerModel('/zer3.webp', 'זר עירית', 180, ['חרצית', 'נרקיס']),
    new FlowerModel('/zer4.jpg', 'זר חלום', 210, ['לבן', 'שושנה']),
    new FlowerModel('/zer5.webp', 'זר אהבה', 139, ['ורד']),
    new FlowerModel('/zer6.webp', 'זר הרמוניה', 75, ['צבעוני']),
    new FlowerModel('/zer7.jpg', 'זר פרחית', 60, ['חמניה']),
    new FlowerModel('/zer8.jpg', 'זר קטיה', 112, ['חמניה','שושנה']),
    new FlowerModel('/zer9.jpg', 'זר בלה', 95, ['טוליפ','לבנדר']),
    new FlowerModel('/zer10.jpg', 'זר אושר', 65, ['חמניה', 'צבעוני', 'ורד']),
  ]);
  const handleSaveFlower = (newFlower: FlowerModel, isEdit: boolean) => {
    if (isEdit) {
      setFlowers((prevFlowers) =>
        prevFlowers.map((flower) =>
          flower.id === newFlower.id ? newFlower : flower
        )
      );
    } else {
      setFlowers((prevFlowers) => [...prevFlowers, newFlower]);
    }
  };
 
  return (
    <>
      <Provider store={myStore}>
        <Routes>
          <Route path='' element={<NavBar></NavBar>}>
            <Route path='' element={<Home></Home>}></Route>
            <Route path='/home' element={<Home></Home>}></Route>
            <Route path='/about' element={<About></About>}></Route>
            <Route path='/flower-list' element={<FlowerList handleSave={handleSaveFlower} flowers={flowers}></FlowerList>}></Route>
            <Route path='/zer/:zerId' element={<Zer flowers={flowers}></Zer>}></Route>
            <Route path='/cart' element={<Cart></Cart>}></Route>
            <Route path='/contact' element={<Contact></Contact>}></Route>
          </Route>
        </Routes>
      </Provider>
    </>
  );
}

export default App;
