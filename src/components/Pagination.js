
const Pagination = ({clickEvent, pageNumber, pages}) => {

  const pagination = pages.map( (page, index) => {
    if (index === pageNumber) {
      return <div clickEvent={clickEvent} class="currentPage pagination">{index}</div> }
    else {
      return <div clickEvent={clickEvent} class="pagination">{index}</div> } });

  return (
    <div class="container pagination">{pagination}</div>
  )
}

export default Pagination
