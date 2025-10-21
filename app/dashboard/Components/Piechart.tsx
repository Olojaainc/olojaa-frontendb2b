 /* eslint-disable */
import React, { JSX } from 'react';
import { PieChart, Pie, Sector, ResponsiveContainer } from 'recharts';
import { IOrderManagement } from '@/app/Types/Interfaces/IOrders';

interface ActiveShapeProps {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
  fill: string;
  payload: { name: string, value: number };
  percent: number;
  value: number;
}

const renderActiveShape = (props: ActiveShapeProps) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, payload } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  // const cos = Math.cos(-RADIAN * midAngle);
  // const sx = cx + (outerRadius + 10) * cos;
  // const sy = cy + (outerRadius + 10) * sin;
//   const mx = cx + (outerRadius + 30) * cos;
  // const my = cy + (outerRadius + 30) * sin;
//   const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  // const ey = my;
  // const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={'#030712'}>
        {payload.name}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        // outerRadius={outerRadius + 10}
        fill={fill}
      />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" />
      <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} textAnchor={textAnchor} fill="#333">{`PV ${value}`}</text>
      <text x={ex + (cos >= 0 ? 1 : -1) * 12} y={ey} dy={18} textAnchor={textAnchor} fill="#999">
        {`(Rate ${(percent * 100).toFixed(2)}%)`}
      </text> */}
    </g>
  );
};

interface OrderChartProps {
  orderData?: IOrderManagement;
}

export default function OrderChart({ orderData }: OrderChartProps) {
  const [activeIndex, setActiveIndex] = React.useState(0);

  const onPieEnter = (_: any, index: any) => {
    setActiveIndex(index);
  };

  // Transform API data into chart format
  const data = React.useMemo(() => {
    if (!orderData) {
      return [
        { name: 'No Data', value: 1, fill: '#E5E7EB' }
      ];
    }

    return [
      { name: 'Completed', value: orderData.completedOrders || 0, fill: '#C4B5FD' },
      { name: 'Pending', value: orderData.pendingOrders || 0, fill: '#F5B547' },
      { name: 'Rejected', value: orderData.rejectedOrders || 0, fill: '#9CA3AF' },
      { name: 'Recurring', value: orderData.recurringOrders || 0, fill: '#60A5FA' },
    ].filter(item => item.value > 0); // Only show segments with data
  }, [orderData]);

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart width={400} height={400}>
          <Pie
              activeIndex={activeIndex}
              activeShape={renderActiveShape as unknown as (props: any) => JSX.Element}
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={80}
              outerRadius={100}
              dataKey="value"
              onMouseEnter={onPieEnter}
          />
      </PieChart>
    </ResponsiveContainer>
  );
}
