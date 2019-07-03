import React from 'react';
import ResponsiveContainer from 'recharts/lib/component/ResponsiveContainer';
import LineChart from 'recharts/lib/chart/LineChart';
import Line from 'recharts/lib/cartesian/Line';
import XAxis from 'recharts/lib/cartesian/XAxis';
import YAxis from 'recharts/lib/cartesian/YAxis';
import CartesianGrid from 'recharts/lib/cartesian/CartesianGrid';
import Tooltip from 'recharts/lib/component/Tooltip';
import Legend from 'recharts/lib/component/Legend';

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
  budget.expenseItems && budget.expenseItems.forEach(i => {
    if (i.transactions && i.transactions.length) {
      transactions.push(...i.transactions)
    }
  });

  return transactions;
}

function groupTotalsByDate(transactions) {
  const groups = {};
  const ascending = (t1, t2) => new Date(t1.creationDate) - new Date(t2.creationDate);
  const addDateTotal = t => {
    const date = formatDate(t.creationDate);
    const total = +t.total;
    if (groups[date]) {
      groups[date].Total += total;
    } else {
      groups[date] = { Total: total, date };
    }
  }

  transactions.sort(ascending).forEach(addDateTotal);

  return Object.values(groups);
}

function formatDate(dateString) {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${zeroPrefix(day)}.${zeroPrefix(month)}.${year}`;
}

function zeroPrefix(val) {
  return val < 10 ? `0${val}` : val;
}

export default simpleLineChart;