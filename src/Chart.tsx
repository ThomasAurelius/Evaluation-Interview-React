import { ResponsiveLine } from "@nivo/line";
import { useEffect, useMemo, useState } from "react";
import { TLog } from "./models";

type ChartProps = {
  data: TLog[];
};

type Serie = { x: string; y: number };

const Chart: React.FC<ChartProps> = (props) => {
  const [data, setData] = useState<Serie[]>([]);
  const [xLegend, setXLegend] = useState("");

  useEffect(() => {
    const byDayData: Serie[] = [];
    props.data
      //@ts-expect-error
      // sort by day to group by it later
      .sort((a, b) => new Date(a.time) - new Date(b.time))
      // group by day and count
      .forEach((v, i, arr) => {
        const prev = arr[i - 1];
        if (new Date(v.time).getDay() !== new Date(prev?.time).getDay()) {
          byDayData.push({ x: v.time, y: 1 });
        } else {
          byDayData[byDayData.length - 1].y += 1;
        }
      });

    const start = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
    }).format(new Date(byDayData[0].x));
    const end = new Intl.DateTimeFormat("en-US", {
      dateStyle: "short",
    }).format(new Date(byDayData[byDayData.length - 1].x));

    setData(byDayData);
    setXLegend(`Conversions ${start} - ${end}`);
  }, []);

  return (
    <div className="Chart-container">
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
        colors={{ scheme: "greys" }}
      />
    </div>
  );
};

export { Chart };
