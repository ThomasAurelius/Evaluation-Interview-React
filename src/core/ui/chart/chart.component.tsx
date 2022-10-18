import { ResponsiveLine } from "@nivo/line";
import { useChartHook } from "./chart.hook";
import { ChartProps } from "./chart.props";
import styles from "./chart.module.scss";

const Chart: React.FC<ChartProps> = (props) => {
  const { data, xLegend } = useChartHook(props);

  return (
    <div className={styles.chart}>
      <ResponsiveLine
        margin={{ bottom: 10 }}
        data={[
          {
            id: "conversionByDay",
            data,
          },
        ]}
        enablePoints={false}
        enableGridX={false}
        enableGridY={false}
        isInteractive={false}
        axisBottom={{ legend: xLegend, renderTick: () => <></> }}
        colors={{ scheme: "accent" }}
      />
    </div>
  );
};

export { Chart };
