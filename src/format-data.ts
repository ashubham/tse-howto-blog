import _ from "lodash";

export function formatData(payload) {
  const columns = _.keyBy(
    payload.columnsAndData.columns.map((c) => c.column),
    "id"
  );
  let columnarData = payload.columnsAndData.data;
  columnarData = Array.isArray(columnarData) ? columnarData[0] : columnarData;
  const rowCount = columnarData.totalRowCount;
  columnarData = _(columnarData.columnDataLite)
    .keyBy("columnId")
    .mapKeys((v, k) => columns[k].name)
    .mapValues((v) => v.dataValue)
    .value();
  let rows = [];
  for (let i = 0; i < rowCount; i++) {
    rows.push(
      _.mapValues(columnarData, (v) => {
        return v[i];
      })
    );
  }
  return rows;
}

export function createHtmlTable(rows) {
  var html = '<table class="table table-striped">';
  html += "<tr>";
  var flag = 0;
  _.forEach(rows[0], function (value, key) {
    html += "<th>" + key + "</th>";
  });
  html += "</tr>";
  _.forEach(rows, function (row) {
    html += "<tr>";
    _.forEach(row, function (value, key) {
      html += "<td>" + value + "</td>";
    });
    html += "<tr>";
  });
  html += "</table>";
  return html;
}
