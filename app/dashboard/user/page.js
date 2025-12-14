"use client";

import VerticalTabs from "@/components/dashboard/user/VerticalTabs";
import Dashboard from "../../../components/dashboard/user/dashboard";
// import Dashboard from "@/components/dashboard/user/Dashboard";

export default function Home() {
  return (
    <VerticalTabs>
      <Dashboard />
    </VerticalTabs>
  );
}