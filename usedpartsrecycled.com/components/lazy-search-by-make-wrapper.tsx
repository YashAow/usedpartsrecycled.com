"use client";

import dynamic from "next/dynamic";

const LazySearchByMake = dynamic(() => import("./search-by-make"), {
  loading: () => <div>Loading Search...</div>,
  ssr: false,
});

export default function LazySearchWrapper({ page }: { page: string }) {
  return <LazySearchByMake page={page} />;
}
