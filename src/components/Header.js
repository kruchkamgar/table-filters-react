
const Header = ({clickEvent, name}) => {

  return (
    <th onClick={clickEvent} name={name}>
      {name}
    </th>
  )
}

export default Header
