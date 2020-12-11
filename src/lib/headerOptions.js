const getHeaderOptions = (data, headersConfig) => {
  const headerOptions = {};
  for( const [name, config] of Object.entries(headersConfig) ){
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
      // calculate it once for, and independently of, each filterBy entry
    // const options = new Set(['(all)']);
    const options = {};
    for(const option of queuedOptions) {
      options[option] = (options[option] || 0) + 1; }
      // options.add(option); }
    headerOptions[name] = options; }
  return headerOptions;
}

export default getHeaderOptions
