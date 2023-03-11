import './App.css';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { lazy, Suspense, useEffect, useState } from 'react';
import data from './data.js';
import {Routes, Route, Link, useNavigate, Outlet} from 'react-router-dom';
import axios from 'axios';
import {useQuery} from "react-query";


const Detail = lazy(() => import('./routes/Detail.js'));
const Cart = lazy(() => import('./routes/Cart.js'));



function App() {

  useEffect(() => {
    let getWatched = localStorage.getItem('watched');
    getWatched = JSON.parse(getWatched);

    if (getWatched.length == 0) {
      localStorage.setItem('watched', JSON.stringify([]))
    }

  }, [])

  let obj = {name : 'kim'}

  localStorage.setItem('data', JSON.stringify(obj));
  let getObj = localStorage.getItem('data');
  console.log(JSON.parse(getObj).name);

  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  let result = useQuery('a', () => {
    return axios.get('https://codingapple1.github.io/userdata.json').then((data)=>{
      return data.data
    }),
    {staleTime : 2000}
  })

  return (
    <div className="App">
        <Navbar bg="light" variant="light">
          <Container>
            <Navbar.Brand href="#home">shop</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link onClick={()=>{navigate('/')}}>홈</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/detail/0')}}>상세페이지</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/cart')}}>장바구니</Nav.Link>
              <Nav.Link onClick={()=>{navigate('/event')}}>이벤트</Nav.Link>
            </Nav>
            <Nav className='ms-auto'>
              {result.isLoading ? '로딩중' : result.data.name}
            </Nav>
          </Container>
        </Navbar>

        <Suspense fallback={<div>로딩중임</div>}>
          <Routes>
            <Route path='/' element={
              <>
                <div className="main-bg"></div>
                <div className='container'>
                    <div className='row'>
                      <MainProduct shoes={shoes} />
                    </div>
                </div>
                <button onClick={()=>{
                  axios.get('https://codingapple1.github.io/shop/data2.json').then((data)=>{
                    let newArray = shoes.concat(data.data);
                    console.log(newArray);
                    setShoes(newArray);
                    console.log('성공함');
                  }).catch(()=> {
                    console.log('실패함');
                  });
                }}>버튼</button>
              </>
            } />
            <Route path='/detail/:id' element={
                <Detail shoes={shoes}></Detail>
            } />
            
            <Route path='/cart' element={<Cart ></Cart>} />

            <Route path='/about' element={<About />}> 
              <Route path='member' element={<div>맴버임</div>} />
              <Route path='location' element={<div>위치정보임</div>} />
            </Route>

            <Route path='/event' element={<Event />}> 
              <Route path='one' element={<div>첫 주문시 양배추즙 서비스</div>} />
              <Route path='two' element={<div>생일기념 쿠폰받기</div>} />
            </Route>

            <Route path='*' element={<div>없는페이지요</div>} />
          </Routes>
        </Suspense>
    </div>
  );
}

function About() {
  return (
    <div>
      <h4>회사정보임</h4>
      <Outlet></Outlet>
    </div>
  )
}

function Event() {
  return (
    <div>
      <h4>오늘의 이벤트</h4>
      <Outlet></Outlet>
    </div>
  )
}

function MainProduct(props) {
  return (
    props.shoes.map(function(tit, i) {
      return (
        <div className='col-md-4'>
          <img src={'https://codingapple1.github.io/shop/shoes' + (i+1) +'.jpg'}  width='80%' />
          <h4>{props.shoes[i].title}</h4>
          <p>{props.shoes[i].price}</p>
        </div>
      );
    })
  )
}

export default App;
