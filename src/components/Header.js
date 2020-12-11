
const Header = ({clickEvent, selectEvent, name, options=[]}) => {
  const optionElements = options.map( (option, index) => {
    //option counts: add a couple divs to contain the option name and count
    return <option key={index} value={option}>
      {option ?
        option.charAt(0).toUpperCase() + option.slice(1) : ''}</option>
  });

  return (
    <th name={name}>
      <div onClick={clickEvent} name={name}>{name}</div>
      {options.length > 0 ?
        <select name={name} onChange={selectEvent}>
          {optionElements}
        </select> : null}
    </th>
  )
}

export default Header
