import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="min-h-dvh w-full flex items-center justify-center ">
        <div className="flex flex-col justify-center items-center h-full w-full max-w-[400px]">
          <h1 className="text-3xl font-bold mb-5">CHART.JS DEMO</h1>
          <Link href={"/bar"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Bar
            </button>
          </Link>
          <Link href={"/stackedbar"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Stacked Bar
            </button>
          </Link>
          <Link href={"/tornado"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Tornado
            </button>
          </Link>
          <h1 className="text-3xl font-bold mb-5 mt-8">D3.JS DEMO</h1>
          <Link href={"/gauge"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Gauge
            </button>
          </Link>
          <Link href={"/circles"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Packed Circles
            </button>
          </Link>
          <Link href={"/sunburst"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Sunburst
            </button>
          </Link>
          <Link href={"/radialtree"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Radial Tree
            </button>
          </Link>
          <Link href={"/sankey"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Sankey
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
