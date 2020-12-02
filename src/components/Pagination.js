
const Pagination = ({clickEvent, pageNumber, pages}) => {

  const pagination = pages.map( (page, index) => {
    if (index === pageNumber) {
      return <div key={index} clickEvent={clickEvent} className="currentPage pagination">{index}</div> }
    else {
      return <div key={index} clickEvent={clickEvent} className="pagination">{index}</div> } });

  return (
    <div className="container pagination">{pagination}</div>
  )
}

export default Pagination
