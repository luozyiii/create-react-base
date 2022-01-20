import React from 'react';
import api from '@/api';

function Child() {
  const printApi = () => {
    console.log(api);
  };
  return <div onClick={printApi}>printApi</div>;
}

export default Child;
