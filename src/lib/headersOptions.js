const getHeaderOptions = (data, headersConfig) => {
  const headerOptions = {};
  for( const [name, config] of Object.entries(headersConfig) ){
    if(!config) continue;
    const queuedOptions = [];
    for (const datum in data) {
      if(config.delimiter) {
        const split = data[datum][name].split(config.delimiter);
        queuedOptions.push(...split); }
      else { queuedOptions.push(data[datum][name]); } };
    if(!config.caseSensitivity) {
      for(let option in queuedOptions){
        queuedOptions[option] = queuedOptions[option].toLowerCase(); }}

    //feature: use 'filterResult' to calculate the number of rows matching each filter option (queuedOptions)
    const options = new Set(['(all)']);
    for(const option of queuedOptions) {
      options.add(option); }
    headerOptions[name] = options; }
  return headerOptions;
}

export default getHeaderOptions
