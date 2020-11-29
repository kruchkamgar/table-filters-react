
const Header = ({clickEvent, selectEvent, name, options=[]}) => {
  const optionElements = options.map( option => {
    return <option value={option}>
      {option ?
        option.charAt(0).toUpperCase() + option.slice(1) : ''}</option>
  });

  return (
    <th name={name}>
      <div onClick={clickEvent} name={name}>{name}</div>
      <select name={name} onChange={selectEvent}>
        {optionElements}
      </select>
    </th>
  )
}

export default Header
