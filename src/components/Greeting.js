import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRandomGreeting } from '../store/slices/greetingsSlice';

function Greeting() {
  const dispatch = useDispatch();
  const { greeting, status } = useSelector((state) => state.greetings);

  useEffect(() => {
    if (status === 'idle') {
      dispatch(fetchRandomGreeting());
    }
  }, [status, dispatch]);

  return (
    <div>
      <h1>Random Greeting:</h1>
      <p>{greeting.content}</p>
    </div>
  );
}

export default Greeting;
