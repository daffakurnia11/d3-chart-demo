import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-5">TBJE CHART DEMO</h1>
          <Link href={"/gauge"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Gauge
            </button>
          </Link>
          <Link href={"/bargauge"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Bar Gauge
            </button>
          </Link>
          <Link href={"/tornado"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Tornado
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
          <Link href={"/blueprintgauge"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Blueprint
            </button>
          </Link>
          <Link href={"/sankey"} className="block w-full" aria-disabled>
            <button
              className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50"
              disabled
            >
              Sankey
            </button>
          </Link>
          <Link href={"/bar"} className="block w-full" aria-disabled>
            <button
              className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50"
              disabled
            >
              Bar
            </button>
          </Link>
          <h2 className="text-xl font-bold mt-4 mb-3">
            Organization Dashboard Report Demo
          </h2>
          <Link href={"/example-api"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full disabled:opacity-50">
              Example
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
