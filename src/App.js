import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import Footer from './components/Footer/Footer';
import Header from './components/Header/Header';
import CartContext from './contexts/CartContext';

const GlobalStyle = createGlobalStyle`
  @font-face {
    font-family: PingFangTC;
    src: url('/PingFang-TC-Regular-2.otf') format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: PingFangTC;
    src: url('/PingFang-TC-Thin-2.otf') format('opentype');
    font-weight: 100;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url('/NotoSansTC-Regular.otf') format('opentype');
    font-weight: normal;
  }

  @font-face {
    font-family: NotoSansTC;
    src: url('/NotoSansTC-Bold.otf') format('opentype');
    font-weight: bold;
  }

  * {
    box-sizing: border-box;
  }

  body {
    margin: 0;
    font-family: NotoSansTC;
  }

  #root {
    min-height: 100vh;
    padding: 140px 0 115px;
    position: relative;

    @media screen and (max-width: 1279px) {
      padding: 102px 0 208px;
    }
  }
`;

function App() {
  const [cartItems, setCartItems] = useState(
    JSON.parse(window.localStorage.getItem('cartItems')) || []
  );

  function getItems() {
    return cartItems;
  }

  function addItem(item) {
    const newCartItems = [...cartItems, item];
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已加入商品');
  }

  function changeItemQuantity(itemIndex, itemQuantity) {
    const newCartItems = cartItems.map((item, index) =>
      index === itemIndex
        ? {
            ...item,
            qty: itemQuantity,
          }
        : item
    );
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已修改數量');
  }

  function deleteItem(itemIndex) {
    const newCartItems = cartItems.filter((_, index) => index !== itemIndex);
    setCartItems(newCartItems);
    window.localStorage.setItem('cartItems', JSON.stringify(newCartItems));
    window.alert('已刪除商品');
  }

  function clearItems() {
    setCartItems([]);
  }

  const cart = {
    getItems,
    addItem,
    changeItemQuantity,
    deleteItem,
    clearItems,
  };

  return (
    <CartContext.Provider value={cart}>
      <GlobalStyle />
      <Header />
      <Outlet />
      <Footer />
    </CartContext.Provider>
  );
}

export default App;
