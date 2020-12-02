
const Pagination = ({clickEvent=() => {}, pageNumber, pages}) => {

  const pagination = pages.map( (page, index) => {
    const paginated = index + 1;
    if (index === pageNumber) {
      return <div key={index} pageNumber={index} onClick={clickEvent} className="currentPage paginated">{paginated}</div> }
    else {
      return <div key={index} pageNumber={index} onClick={clickEvent} className="paginated">{paginated}</div> } });

  return (
    <div className="container pagination">{pagination}</div>
  )
}

export default Pagination
