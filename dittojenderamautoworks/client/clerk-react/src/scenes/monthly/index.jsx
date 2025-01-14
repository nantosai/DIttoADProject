import React, { useMemo } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import { ResponsiveLine } from "@nivo/line";

import { useGetSalesQuery } from "../../state/api";
import { Header } from "../../components";

import "react-datepicker/dist/react-datepicker.css";

// Monthly
const Monthly = () => {
  // get data
  const { data } = useGetSalesQuery();
  // theme
  const theme = useTheme();

  // formatted data
  const [formattedData] = useMemo(() => {
    if (!data) return [];

    // monthly data
    const { monthlyData } = data;

    // total sales line
    const totalSalesLine = {
      id: "totalSales",
      color: theme.palette.tables.lines,
      data: [],
    };

    // total units line
    const totalUnitsLine = {
      id: "totalUnits",
      color: theme.palette.tables.anotherLine,
      data: [],
    };

    // factor monthly data
    Object.values(monthlyData).forEach(({ month, totalSales, totalUnits }) => {
      totalSalesLine.data = [
        ...totalSalesLine.data,
        {
          x: month,
          y: totalSales,
        },
      ];

      totalUnitsLine.data = [
        ...totalUnitsLine.data,
        {
          x: month,
          y: totalUnits,
        },
      ];
    });

    const formattedData = [totalSalesLine, totalUnitsLine];

    return [formattedData];
  }, [data]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Box m="1.5rem 2.5rem">
      {/* Header */}
      <Header title="MONTHLY SALES" subtitle="Chart of monthly sales" />

      {/* Content */}
      {data ? (
        <Box height="75vh">
          {/* Line Chart */}
          <ResponsiveLine
            data={formattedData}
            colors={({ id }) => {
              // Map each line id to a theme color
              if (id === "totalSales") return theme.palette.tables.lines;
              if (id === "totalUnits") return theme.palette.tables.anotherLine;
              return "#000"; // Fallback color
            }}
            theme={{
              axis: {
                domain: {
                  line: {
                    stroke: theme.palette.secondary.main,
                  },
                },
                legend: {
                  text: {
                    fill: theme.palette.secondary.main,
                  },
                },
                ticks: {
                  line: {
                    stroke: theme.palette.secondary.main,
                    strokeWidth: 1,
                  },
                  text: {
                    fill: theme.palette.secondary.main,
                  },
                },
              },
              legends: {
                text: {
                  fill: theme.palette.secondary.main,
                },
              },
              tooltip: {
                container: {
                  color: theme.palette.primary.main,
                },
              },
            }}
            //colors={{ datum: "color" }}
            margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
            xScale={{ type: "point" }}
            yScale={{
              type: "linear",
              min: "auto",
              max: "auto",
              stacked: false,
              reverse: false,
            }}
            yFormat=" >-.2f"
            axisTop={null}
            axisRight={null}
            axisBottom={{
              orient: "bottom",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 90,
              legend: "Month",
              legendOffset: 60,
              legendPosition: "middle",
            }}
            axisLeft={{
              orient: "left",
              tickSize: 5,
              tickPadding: 5,
              tickRotation: 0,
              legend: "Total",
              legendOffset: -50,
              legendPosition: "middle",
            }}
            enableGridX={false}
            enableGridY={false}
            pointSize={10}
            pointColor={{ theme: "background" }}
            pointBorderWidth={2}
            pointBorderColor={{ from: "serieColor" }}
            pointLabelYOffset={-12}
            useMesh={true}
            legends={[
              {
                anchor: "top-right",
                direction: "column",
                justify: false,
                translateX: 50,
                translateY: 0,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]}
          />
        </Box>
      ) : (
        // Loader
        <Typography variant="h5" mt="20%" textAlign="center">
          Loading...
        </Typography>
      )}
    </Box>
  );
};

export default Monthly;
