

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
      </table>
    </div>
  );
}

export default Table;
