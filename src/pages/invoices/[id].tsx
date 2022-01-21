import { useParams } from 'react-router-dom';

function Invoice() {
  let { id } = useParams();
  return <h1>发票ID {id}</h1>;
}

export default Invoice;
