const getHeaderOptions = (data, headersConfig, setPriors=false) => {
  const headerOptions = {};
  for( const [column, config] of Object.entries(headersConfig) ){
    let queuedOptions = []
    if(setPriors){
      if(data[column] === undefined) continue;
      queuedOptions = formOptions(data[column], column, config) }
    else{
      queuedOptions = formOptions(data, column, headersConfig);
    }
    //feature: use 'filterResult' to calculate the number of rows matching each filter option (queuedOptions)
      // calculate it once for, and independently of, each filterBy entry
    // const options = new Set(['(all)']);
    const options = {};
    for(const option of queuedOptions) {
      options[option] = (options[option] || 0) + 1; }
      // options.add(option); }
    headerOptions[column] = options; }
  return headerOptions;
}

const formOptions = (data, column, config) => {
  const queuedOptions = [];
  for (const datum in data) {
    if(config.delimiter) {
      const split = data[datum][column].split(config.delimiter);
      queuedOptions.push(...split); }
    else { queuedOptions.push(data[datum][column]); } };
  if(!config.caseSensitivity) {
    for(let option in queuedOptions){
      queuedOptions[option] = queuedOptions[option].toLowerCase(); }}
  return queuedOptions;
}

export default getHeaderOptions
