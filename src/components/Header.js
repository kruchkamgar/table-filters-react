
const Header = ({clickEvent, selectEvent, filterBy, name, options={}}) => {
  const optionElements = [];
  for( const [option, count] of Object.entries(options) ) {
    const selectedOption = filterBy[name] === option ?
      true : false;
    optionElements.push(
      <option key={option} value={option} selected={selectedOption}>
        {(option ?
          option.charAt(0).toUpperCase() + option.slice(1) : '') +
        ' (' + count + ') '}</option> ) }
  optionElements.unshift(
    <option key={"all"} value={'(all)'}>{'(all)'}</option> )
      //option counts: add a couple divs to contain the option name and count

  return (
    <th name={name}>
      <div onClick={clickEvent} name={name}>{name}</div>
      {optionElements.length > 1 ?
        <select name={name}
          onChange={selectEvent}>
          {optionElements}
        </select> : null}
    </th>
  )
}

export default Header
