import React, { useContext, useEffect } from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import am5themes_Dark from "@amcharts/amcharts5/themes/Dark";
import { ThemeContext } from "../../context/ThemeContext";
import { getUserChartData } from "../../api/user/UserApi";
import { useQuery } from "@tanstack/react-query";


const UserChart = () => {
  const { isLoading, error, data } = useQuery({
    queryKey: ["users", "chart-for-user"],
    queryFn: getUserChartData,
  });

  const { theme } = useContext(ThemeContext)
    
  useEffect(() => {
    if (!data) return;
    // Create root element
    let root = am5.Root.new("chartdiv");

    // Set themes
    const themes = [am5themes_Animated.new(root)];
      if (theme === "dark") {
        themes.push(am5themes_Dark.new(root));
      }
      root.setThemes(themes);

    // Create chart
    let chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        endAngle: 270
      })
    );

    // Create series
    let series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        endAngle: 270
      })
    );

    series.states.create("hidden", {
      endAngle: -90
    });

    // Set data
    series.data.setAll(data?.data);

    series.appear(1000, 100);

    return () => {
      root.dispose();
    };
  }, [theme, data]);

  if (isLoading) {
    return (
      <div className="h-30rem card">
        <h1>Loading..</h1>
      </div>
    );
  }

  if (error) {
    return (
      <div className="h-30rem card">
        <h1>Error..</h1>
      </div>
    );
  }

  return (
    <div id="chartdiv" style={{ width: "100%", height: "30rem" }}></div>
  );
};

export default UserChart;
