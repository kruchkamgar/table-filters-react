
const Header = ({clickEvent, name, options=[]}) => {

  const optionElements = options.map( option => {
    return <option value={option}>
      {option.charAt(0).toUpperCase() + option.slice(1)}</option>
  });

  return (
    <th name={name}>
      <div onClick={clickEvent} name={name}>{name}</div>
      <select name={name}>
        <option value="denver">Denver</option>
      </select>
    </th>
  )
}

export default Header
