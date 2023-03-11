import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Nav from 'react-bootstrap/Nav';
import { changeProduct } from '../store.js';
import {useSelector, useDispatch} from "react-redux";



export default function Detail(props) { 

  let state = useSelector((state)=> {
    return state;
  });

  let dispatch = useDispatch();

  let [alert, setAlert] = useState(true);
  let [inputText, setInputText] = useState('');
  let [tab, setTab] = useState(0); 

  useEffect(()=>{
    let timea = setTimeout(() => {
      setAlert(false);
    }, 2000);

    if (isNaN(inputText)) {
      console.log("숫자를 입력해주세요");
    }

    return () => {
      clearTimeout(timea);
    }
  }, [inputText]);

  let {id} = useParams();
  let findShoes = props.shoes.find((element)=>element.id == id);

  useEffect(()=>{
    let getWatched = localStorage.getItem('watched');
    getWatched = JSON.parse(getWatched);
    getWatched.push(findShoes.id);
    getWatched = new Set(getWatched);
    getWatched = Array.from(getWatched);
    localStorage.setItem('watched', JSON.stringify(getWatched));
  }, []); 

  return (
       <div className="container">
        {alert == true ?  
          <div className="alert alert-warning">
            2초이내 구매시 할인
          </div> 
          : null
        }
        <div className="row">
            <div className="col-md-6">
              <img src="https://codingapple1.github.io/shop/shoes1.jpg" width="100%" />
            </div>
            <div className="col-md-6">
            <input onChange={(e) => {setInputText(e.target.value)}} />
            <h4 className="pt-5">{findShoes.title}</h4>
            <p>{findShoes.content}</p>
            <p>{findShoes.price}</p>
            <button className="btn btn-danger" onClick={() => {
              let product = {id : findShoes.id + 3, name : findShoes.title, count : 1}
              dispatch(changeProduct(product));
            }}>주문하기</button> 
            </div>
        </div>
        <Nav variant="tabs" defaultActiveKey="link-0">
          <Nav.Item>
            <Nav.Link onClick={()=>{
              setTab(0);
            }} eventKey="link-0">Option 0</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=> {
              setTab(1);
            }} eventKey="link-1">Option 1</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link onClick={()=> {
              setTab(2);
            }} eventKey="link-2">Option 2</Nav.Link>
          </Nav.Item>
        </Nav>
        <TabContent tab={tab}/>

    </div> 
  )
}

function TabContent({tab}) {
  let [fade, setFade] = useState('');

  useEffect(()=> {
    setTimeout(() => {
      setFade('end')
    }, 100);
    return ()=> {
      setFade('')
    }
  }, [tab])
  return (<div className={"start " + fade}>
    {[<div>내용0</div>, <div>내용1</div>, <div>내용2</div>][tab]}
  </div>)
}

