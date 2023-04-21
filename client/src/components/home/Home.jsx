import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { increment, decrement } from '../../slices/posts';

import EndlessDeathScroll from '../endlessDeathScroll/EndlessDeathScroll';

function Home() {
  const counter = useSelector(state => state.post.value);
  console.log(counter);
  const dispatch = useDispatch();
  return (
    <div>
        <div>
        <p>{counter}</p>
          <button onClick={() => dispatch(increment())}>+</button>
            <EndlessDeathScroll/>
        </div>
    </div>
  )
}

export default Home;