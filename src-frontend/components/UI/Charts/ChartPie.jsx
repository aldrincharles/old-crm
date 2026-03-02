import React from "react";
import {
  VictoryPie,
  VictoryLegend,
  VictoryChart,
  VictoryAxis,
  VictoryLabel,
} from "victory";

export const ChartPie = ({ data, size = 400, label = null }) => {
  return (
    <div>
      <VictoryChart height={size}>
        <VictoryLegend
          orientation="horizontal"
          gutter={20}
          style={{
            border: { stroke: "black" },
          }}
          data={data}
        />
        <VictoryPie
          style={{
            data: { fill: ({ datum }) => datum.fill },
          }}
          data={data}
          innerRadius={70}
          labels={() => null}
        />
        {label && (
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 40 }}
            x={200}
            y={200}
            text={label}
          />
        )}
        <VictoryAxis
          style={{
            axis: { stroke: "none" },
            ticks: { stroke: "none" },
            tickLabels: { fill: "none" },
            grid: { stroke: "transparent" },
          }}
          standalone={false}
        />
      </VictoryChart>
    </div>
  );
};
