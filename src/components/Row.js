
const Row = ({
  name='', city='', state='', genre='', attire='', phoneNumber=''
}) => {

  return (
    <tr>
      <td>{name}</td>
      <td>{city}</td>
      <td>{state}</td>
      <td>{genre}</td>
      <td>{attire}</td>
      <td>{phoneNumber}</td>
    </tr>
  );
}

export default Row
