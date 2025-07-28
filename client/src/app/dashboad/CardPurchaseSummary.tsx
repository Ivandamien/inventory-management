"use client";
import { useGetDashboardMetricsQuery } from "@/state/api";
import React from "react";

interface Props {}

const CardPurchaseSummary = (props: Props) => {
  const { data: dashboardMetrics, isLoading } = useGetDashboardMetricsQuery();
  return (
    <div className=" row-span-2 xl:row-span-3 col-span-1 md:col-span-2 xl:col-span-1 bg-gray-500"></div>
  );
};

export default CardPurchaseSummary;
