

const Table = ({
  rows=[], headers=[]
}) => {
  return (
    <div id="table">
      <table>
        <thead>
          <tr>
            {headers}
          </tr>
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
