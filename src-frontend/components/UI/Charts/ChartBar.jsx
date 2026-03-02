import React from "react";
import {
  VictoryBar,
  VictoryChart,
  // VictoryTheme,
  // VictoryAxis,
  // VictoryLabel,
} from "victory";

export const ChartBar = ({ data, horizontal = false, size = 500 }) => {
  return (
    <>
      {data ? (
        <div style={{ maxWidth: size }}>
          <VictoryChart
            // theme={VictoryTheme.material}
            domainPadding={{ x: 35 }}
          >
            {/* <VictoryAxis /> */}
            <VictoryBar
              horizontal={horizontal}
              barRatio={0.8}
              // alignment="middle"
              labels={({ datum }) => datum.y}
              // labelComponent={<VictoryLabel dy={30} />}
              style={{
                data: { fill: ({ datum }) => datum.fill },
                labels: { fill: "black" },
              }}
              data={data}
            />
          </VictoryChart>
        </div>
      ) : null}
    </>
  );
};
