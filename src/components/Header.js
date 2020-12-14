
const Header = ({clickEvent, selectEvent, name, options={}}) => {
  const optionElements = [];
  for( const [option, count] of Object.entries(options) ) {
    optionElements.push(
      <option key={option} value={option}>
        {(option ?
          option.charAt(0).toUpperCase() + option.slice(1) : '') +
        ' (' + count + ') '}</option> ) }
  optionElements.unshift(
    <option key={"all"} value={'(all)'}>{'(all)'}</option>
  )
      //option counts: add a couple divs to contain the option name and count

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
