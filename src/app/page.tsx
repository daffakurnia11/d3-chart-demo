import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="h-screen w-screen flex items-center justify-center">
        <div className="flex flex-col justify-center items-center">
          <h1 className="text-3xl font-bold mb-5">TBJE CHART DEMO</h1>
          <Link href={"/sankey"}>
            <button className="border border-solid rounded px-4 py-2">
              Sankey
            </button>
          </Link>
        </div>
      </main>
    </>
  );
}
