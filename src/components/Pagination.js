
const Pagination = ({clickEvent=() => {}, pageNumber, pages}) => {

  const pagination = pages.map( (page, index) => {
    if (index === pageNumber) {
      return <div key={index} onClick={clickEvent} className="currentPage paginated">{index}</div> }
    else {
      return <div key={index} onClick={clickEvent} className="paginated">{index}</div> } });

  return (
    <div className="container pagination">{pagination}</div>
  )
}

export default Pagination
