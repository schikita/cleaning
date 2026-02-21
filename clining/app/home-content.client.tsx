"use client";

import dynamic from "next/dynamic";
import { HomeSkeleton } from "@/components/blocks/home-skeleton";

const HomeContentDynamic = dynamic(
  () => import("@/components/blocks/home-content").then((m) => m.HomeContent),
  {
    loading: () => <HomeSkeleton />,
    ssr: false,
  },
);

export default function HomeContentClient() {
  return <HomeContentDynamic />;
}
