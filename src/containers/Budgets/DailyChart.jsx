import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

import utils from './utils';

function simpleLineChart(props) {
  const { budget } = props;

  const transactions = extractTransactions(budget);
  const data = groupTotalsByDate(transactions);

  return (
    // 99% per https://github.com/recharts/recharts/issues/172
    <ResponsiveContainer width="99%" height={420}>
      <LineChart data={data}>
        <XAxis dataKey="date" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Total" stroke="#e53250" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}

function extractTransactions(budget) {
  const transactions = [];
  budget.expenseItems.forEach(i => {
    if (i.transactions && i.transactions.length) {
      transactions.push(...i.transactions)
    }
  });

  return transactions;
}

function groupTotalsByDate(transactions) {
  const groups = {};

  transactions.forEach(t => {
    const date = utils.formatDate(t.creationDate);
    const total = t.total / 100;
    if (groups[date]) {
      groups[date].Total += total;
    } else {
      groups[date] = { Total: total, date };
    }
  });

  return Object.values(groups);
}

export default simpleLineChart;