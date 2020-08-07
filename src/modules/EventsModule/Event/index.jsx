import React from 'react';
import { Link } from 'react-router-dom';

const Event = ({ match, parentUrl }) => {
  const { id } = match.params;
  console.log(match);

  return (
    <div>
      <Link to={parentUrl}>Назад</Link>
      <h1>id: {id}</h1>
    </div>
  )
}

export default Event;
