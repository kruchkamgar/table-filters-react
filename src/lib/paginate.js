const paginateData = (data) => {
  const numPages = Math.floor(data.length / 10) +
    ( (data.length % 10) > 0 ?
        1 : 0 );
  const paginatedData = [];
  for(let number = 0; number < numPages; number++) {
      paginatedData.push(
        data.slice((number*10), (number+1)*10) );
  }
  return paginatedData;
}

export default paginateData
