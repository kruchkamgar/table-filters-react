
const Row = ({data, headers}) => {

  const tds = headers.map( header => {
    return <td>{data[header]}</td> });

  return (
    <tr>
      {tds}
    </tr>
  );
}

export default Row
