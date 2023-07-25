const NodeStyles: any = {};
NodeStyles.LegendNode = ({ data }: any) => {
	return (
		<div style={{ border: '1px solid black', borderRadius: 5 }}>
			<table
				style={{
					minWidth: 150,
					borderCollapse: 'collapse',
				}}>
				<thead style={{ backgroundColor: 'white' }}>
					<tr>
						<th style={{ borderBottom: '1px solid black', borderRadius: '5px 5px 0 0', padding: '3px 0px' }}>
							<span style={{ color: 'black' }}>{data.tableName}</span>
						</th>
					</tr>
				</thead>
				<tbody>
					<tr>
						<td style={{ color: 'black', backgroundColor: `#88D498`, padding: '3px 6px' }}>Select</td>
					</tr>
					<tr>
						<td style={{ color: 'black', backgroundColor: `#C6DABF`, padding: '3px 6px' }}>Insert</td>
					</tr>
					<tr>
						<td style={{ color: 'black', backgroundColor: `#F3E9D2`, padding: '3px 6px' }}>Update</td>
					</tr>
					<tr>
						<td style={{ color: 'black', backgroundColor: `#FA7E61`, borderRadius: '0 0 5px 5px', padding: '3px 6px' }}>Delete</td>
					</tr>
				</tbody>
			</table>
		</div>
	);
};

NodeStyles.OpaqueNode = ({ data }: any) => {
	return (
		<div style={{ border: '1px solid black', opacity: '0.2', borderRadius: 5 }}>
			<table
				style={{
					minWidth: 150,
				}}>
				<thead style={{ backgroundColor: 'white', borderRadius: 5 }}>
					<tr>
						<th style={{ borderBottom: '1px solid black', borderRadius: '5px 5px 0 0', padding: '3px 0px' }}>
							<span style={{ color: 'black' }}>{data.tableName}</span>
						</th>
					</tr>
				</thead>
				<tbody style={{ backgroundColor: 'white', borderRadius: 5 }}>
					{data.fields.map((field: any, i: number) => {
						return i === data.fields.length ? (
							<tr>
								<td style={{ color: 'black', borderBottom: 'none', borderRadius: 5 }}>{field}</td>
							</tr>
						) : (
							<tr>
								<td style={{ color: 'black', borderBottom: '1px solid #dbdbdb', backgroundColor: 'white', textAlign: 'center', padding: '3px 6px' }}>{field}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};

NodeStyles.TableNode = ({ data }: any) => {
	let color: string;
	switch (data.statementType) {
		case 'Select':
			color = '#88D498';
			break;
		case 'Insert':
			color = '#C6DABF';
			break;
		case 'Update':
			color = '#F3E9D2';
			break;
		case 'Delete':
			color = '#FA7E61';
			break;
	}

	return (
		<div style={{ backgroundColor: 'white', border: '1px solid black', borderRadius: 5 }}>
			<table
				style={{
					minWidth: 150,
					borderCollapse: 'collapse',
				}}>
				<thead style={{ backgroundColor: 'white' }}>
					<tr>
						<th style={{ borderBottom: '1px solid black', borderRadius: '5px 5px 0 0', padding: '3px 0px' }}>
							<span style={{ color: 'black' }}>{data.tableName}</span>
						</th>
					</tr>
				</thead>
				<tbody style={{ textAlign: 'center' }}>
					{data.fields.map((field: any, i: number) => {
						const isLastRowItem = i === data.fields.length - 1;
						return (
							<tr
								key={field}
								style={{
									backgroundColor: data.columns.includes(field) ? color : 'white',
									borderRadius: isLastRowItem ? '0 0 5px 5px' : 'none',
								}}>
								<td style={{ color: 'black', borderBottom: 'none', textAlign: 'center', padding: '3px 6px' }}>{field}</td>
							</tr>
						);
					})}
				</tbody>
			</table>
		</div>
	);
};
export default NodeStyles;
