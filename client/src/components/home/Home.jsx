import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EndlessDeathScroll from '../endlessDeathScroll/EndlessDeathScroll';

function Home() {
  return (
    <div>
        <div>
            <EndlessDeathScroll/>
        </div>
    </div>
  )
}

export default Home;