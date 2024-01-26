import BarChart from "@/components/BarChart";
import CircleChart from "@/components/CircleChart";
import PercentChart from "@/components/PercentChart";
import SankeyChart from "@/components/SankeyChart";
import SunburstChart from "@/components/SunburstChart";

export default function AntdPage() {
  return (
    <main>
      <div>
        <h1 className="text-3xl font-bold text-center mt-8">Sankey Chart</h1>
        <div className="flex justify-center">
          <SankeyChart />
        </div>
        <h1 className="text-3xl font-bold text-center mt-8">Sunburst Chart</h1>
        <div className="flex justify-center">
          <SunburstChart />
        </div>
        <h1 className="text-3xl font-bold text-center mt-8">Bar Chart</h1>
        <div className="flex justify-center">
          <BarChart />
          <PercentChart />
        </div>
        <h1 className="text-3xl font-bold text-center mt-8">
          Packed Circle Chart
        </h1>
        <div className="flex justify-center">
          <CircleChart />
        </div>
      </div>
    </main>
  );
}
