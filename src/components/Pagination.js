
const Pagination = ({clickEvent=() => {}, setPageNumber, pageNumber, pages}) => {

  const paginate = (event) => {
    const currentPage = document.getElementsByClassName('currentPage');
    if (currentPage.length > 0) { currentPage[0].classList.remove('currentPage') }
    event.target.classList.add('currentPage');
    setPageNumber(event.target.getAttribute('page_number'))
  }

  const pagination = pages.map( (page, index) => {
    const paginated = index + 1;
    return <div key={index} page_number={index} onClick={(event) => paginate(event)} className="paginated">{paginated}</div> });

  return (
    <div className="container pagination">{pagination}</div>
  )
}

export default Pagination
