const NodeStyles : any = {};
NodeStyles.LegendNode = ({ data }: any) => {
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
          <tr>
            <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.8rem', borderBottomRightRadius: '0.4rem', backgroundColor : `green`}}>
              Select
            </td>
          </tr>
          <tr>
            <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.8rem', borderBottomRightRadius: '0.4rem', backgroundColor : `yellow`}}>
              Insert
            </td>
          </tr> 
          <tr>
            <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.8rem', borderBottomRightRadius: '0.4rem', backgroundColor : `Orange`}}>
              Update
            </td>
          </tr>
          <tr>
            <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.8rem', borderBottomRightRadius: '0.4rem', backgroundColor : `red`}}>
              Delete
            </td>
          </tr> 
        </tbody>
      </table>
    </div>
  );
}

NodeStyles.OpaqueNode = ({ data }: any) => {

  return (
    <div style={{border: '1px solid black', borderRadius: '0.4rem', opacity : '0.2'}}>
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
            return (i === data.fields.length) 
                  ? 
                  <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.8rem', borderBottomRightRadius: '0.4rem'}}>
                      {field}
                    </td>
                  </tr> 
                  : 
                  <tr>
                    <td style={{color: 'black', borderBottom: '1px solid #dbdbdb', backgroundColor:'white'}}>
                      {field}
                    </td>
                  </tr>
                })}
        </tbody>
      </table>
    </div>
  );
}

NodeStyles.TableNode = ({ data }: any) => {

  let color: string = 'white';
  switch(data.statementType){
    case 'Select' : color = 'green' 
    break;
    case 'Insert' : color = 'yellow';
    break;
    case 'Update' : color = 'orange';
    break;
    case 'Delete' : color = 'red';
    break;
  }

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
          {data.fields.map((field: any) => {
            if (data.columns.includes(field)){
                return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:`${color}`}}>
                      {field}
                    </td>
                  </tr> 
              </div>
            } else{
              return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:'white'}}>
                      {field}
                    </td>
                  </tr> 
              </div>
            }
                })}
        </tbody>
      </table>
    </div>
  );
}
export default NodeStyles