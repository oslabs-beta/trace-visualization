interface StatementController {
	[key: string]: any;
}

const statementController: StatementController = {};

statementController.populateSelectCols = (stmt: any, queryInfo: any, aliasObj: any): any => {
	const columns = queryInfo.columns;
	const colsArr: Array<any> = stmt.targetList;
	//if a left or right join statement is used
	if (stmt.fromClause[0].JoinExpr) {
		if (stmt.fromClause[0].JoinExpr.jointype === 'JOIN_LEFT' || stmt.fromClause[0].JoinExpr.jointype === 'JOIN_RIGHT') {
			//check to see if alias needs to be populated
			if (stmt.fromClause[0].JoinExpr.larg.RangeVar.alias) {
				aliasObj[stmt.fromClause[0].JoinExpr.larg.RangeVar.alias.aliasname] = stmt.fromClause[0].JoinExpr.larg.RangeVar.relname;
				aliasObj[stmt.fromClause[0].JoinExpr.rarg.RangeVar.alias.aliasname] = stmt.fromClause[0].JoinExpr.rarg.RangeVar.relname;
			}

			//populate the columns
			for (let i = 0; i < colsArr.length; i++) {
				const pair = colsArr[i].ResTarget.val.ColumnRef.fields;
				if (!columns[pair[0].String.str]) {
					columns[pair[0].String.str] = [pair[1].String.str];
				} else {
					columns[pair[0].String.str].push(pair[1].String.str);
				}
			}
		}
		//inner join in used
		else if (stmt.fromClause[0].JoinExpr.jointype === 'JOIN_INNER') {
			//check to see if alias needs to be populated
			if (stmt.fromClause[0].JoinExpr.larg.RangeVar.alias) {
				aliasObj[stmt.fromClause[0].JoinExpr.larg.RangeVar.alias.aliasname] = stmt.fromClause[0].JoinExpr.larg.RangeVar.relname;
				aliasObj[stmt.fromClause[0].JoinExpr.rarg.RangeVar.alias.aliasname] = stmt.fromClause[0].JoinExpr.rarg.RangeVar.relname;
			}
			//populate the columns
			columns[stmt.fromClause[0].JoinExpr.larg.RangeVar.relname] = [];
			for (let i = 0; i < colsArr.length; i++) {
				columns[stmt.fromClause[0].JoinExpr.larg.RangeVar.relname].push(colsArr[i].ResTarget.val.ColumnRef.fields[0].String.str);
			}
		}
	}
	//join statement not used
	else {
		//check to see if alias needs to be populated
		if (stmt.fromClause[0].RangeVar.alias) {
			aliasObj[stmt.fromClause[0].RangeVar.alias.aliasname] = stmt.fromClause[0].RangeVar.relname;
		}

		//populate the columns
		columns[stmt.fromClause[0].RangeVar.relname] = [];
		if (colsArr[0].ResTarget.val.ColumnRef.fields[0].A_Star) return;
		for (let i = 0; i < colsArr.length; i++) {
			columns[stmt.fromClause[0].RangeVar.relname].push(colsArr[i].ResTarget.val.ColumnRef.fields[0].String.str);
		}
	}
};

statementController.populateInsertCols = (stmt: any, queryInfo: any, aliasObj: any): any => {
	const columns = queryInfo.columns;
	const colsArr: Array<any> = stmt.cols;
	const table = stmt.relation.relname;
	columns[table] = [];
	for (let i = 0; i < colsArr.length; i++) {
		columns[table].push(colsArr[i].ResTarget.name);
	}
};

statementController.populateUpdateCols = (stmt: any, queryInfo: any, aliasObj: any): any => {
	const columns = queryInfo.columns;
	const colsArr: Array<any> = stmt.targetList;

	//check if FROM clause is used
	if (stmt.fromClause) {
		//check to see if alias needs to be populated
		if (stmt.fromClause[0].RangeVar.alias) {
			aliasObj[stmt.fromClause[0].RangeVar.alias.aliasname] = stmt.fromClause[0].RangeVar.relname;
		}
	}

	//populate the columns
	const table = stmt.relation.relname;
	columns[table] = [];
	for (let i = 0; i < colsArr.length; i++) {
		columns[table].push(colsArr[i].ResTarget.name);
	}
};

statementController.populateDeleteCols = (stmt: any, queryInfo: any, aliasObj: any): any => {
	const columns = queryInfo.columns;
	columns[stmt.relation.relname] = [];
};

module.exports = statementController;
