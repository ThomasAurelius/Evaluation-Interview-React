import { TLog } from "src/models";

type ChartProps = {
  data: TLog[];
};

type Serie = { x: string; y: number };

export type { ChartProps, Serie };
