import React, { memo } from 'react';
import { useEffect, useRef, useState } from "react";
import { Table } from 'react-bootstrap';
import {useSelector, useDispatch} from "react-redux";
import { increase } from '../store/userSlice.js';
import { changeCount } from '../store.js';


export default function Cart() {
    let state = useSelector((state)=> {
        return state;
    });

    let [count, setCount] = useState(0);

    let dispatch = useDispatch();
    
    return (
        <div>
            {state.user.name} {state.user.age} 의 장바구니
            <button onClick={() => {
                dispatch(increase(100));
                }}>버튼</button>
            <Table>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>상품명</th>
                        <th>수량</th>
                        <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        state.cartProduct.map((data, i) => {
                            return (
                                <tr key={i}>
                                    <td>{data.id}</td>
                                    <td>{data.name}</td>
                                    <td>{data.count}</td>
                                    <td><button onClick={()=>{
                                        dispatch(changeCount(data.id));
                                    }}>+</button></td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </Table>
        </div>
    )
}
