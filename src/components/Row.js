
const Row = ({data, headers}) => {

  const tds = headers.map( (header, index) => {
    return <td key={index}>
      {data[header]}</td> });

  return (
    <tr>
      {tds}
    </tr>
  );
}

export default Row
