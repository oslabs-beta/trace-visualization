const NodeStyles : any = {};

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
            if (data.columns.includes(field)){
              switch (data.statementType){
                case 'Select' :
                return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:'green'}}>
                      {field}
                    </td>
                  </tr> 
              </div>
              case 'Insert' :
                return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:'orange'}}>
                      {field}
                    </td>
                  </tr> 
              </div>
              case 'Update' :
                return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:'yellow'}}>
                      {field}
                    </td>
                  </tr> 
              </div>
              case 'Delete' :
                return <div>
                <tr>
                    <td style={{color: 'black', borderBottom: 'none', borderBottomLeftRadius: '0.4rem', borderBottomRightRadius: '0.4rem', backgroundColor:'red'}}>
                      {field}
                    </td>
                  </tr> 
              </div>
              }
              
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
