const TableNode = ({ data }: any) => {

  return (
    <div style={{border: '1px solid black', borderRadius: '0.4rem'}}>
      <table style={
        {
          minWidth: 100, 
          borderCollapse: 'collapse',
        }}>
        <thead style={{backgroundColor: 'white'}}>
          <tr>
            <th style={{borderBottom: '1px solid black', borderTopLeftRadius: '0.4rem', borderTopRightRadius: '0.4rem'}}>
              <span style={{color:'black'}}>{data.tableName}</span>
            </th>
          </tr>
        </thead>
        <tbody style={{backgroundColor: 'white'}}>
          {data.fields.map((field: any, i: number) => {
            return (i === data.fields.length - 1) 
            ? 
            <tr>
              <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem'}}>
                {field}
              </td>
            </tr> 
            : 
            <tr>
              <td style={{color: 'black', borderBottom: '1px solid #dbdbdb'}}>
                {field}
              </td>
            </tr>
          })}
        </tbody>
      </table>
    </div>
  );
}

export default TableNode
