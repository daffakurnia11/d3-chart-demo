import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-5">TBJE CHART DEMO</h1>
          <Link href={"/sankey"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Sankey
            </button>
          </Link>
          <Link href={"/sunburst"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Sunburst
            </button>
          </Link>
          <Link href={"/bar"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Bar
            </button>
          </Link>
          <Link href={"/stackedbar"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Stacked Bar
            </button>
          </Link>
          <Link href={"/circles"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Packed Circles
            </button>
          </Link>
          <Link href={"/radialtree"} className="block w-full">
            <button className="border border-solid rounded px-4 py-2 mb-3 w-full">
              Radial Tree
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
