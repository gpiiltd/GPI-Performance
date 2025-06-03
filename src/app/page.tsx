'use client'

import React from "react";
import { useOrgRepos } from "@/hooks/useOrgRepos";
import { subYears } from "date-fns";
import { DateRange } from "react-day-picker";

import { useOrgMembers } from "@/hooks/useOrgMembers";

import { Tabs, DateRangePicker } from "@/components/ui";

import {OrgMetrics, DevMetrics } from "@/components/shared";

export default function Home() {

  const initialDateRange = {
    from: subYears(new Date(), 1),
    to: new Date
  };

  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange | undefined>(initialDateRange);

  const { activeRepositories, loading } = useOrgRepos();
  const { members, loading: membersLoading } = useOrgMembers()

  // const testMember = ['adaobieze']
  const testMember = ['Oluwagbenga-cloud']
  // const testMember = ['audrey-roe']
  const testRepo = [{
    "id": 938451906,
    "name": "nssf_django",
    "full_name": "gpiiltd/nssf_django",
    "pushed_at": "2025-06-03T14:29:22Z",
    "archived": false
  }]

  // console.log('members:', members)
  // console.log('selectedDateRange:', selectedDateRange)

  const tabItems = [
    {
      value: "dev-metrics",
      label: "Dev Metrics",
      content: (
        <div className="p-4 border rounded-lg flex flex-col">
          {loading ? (
            <div className="flex items-center justify-center">Fetching repositories...</div>
          ) : membersLoading ? (
            <div className="flex items-center justify-center">Fetching members...</div>
          ) : (
            <div>
              <DevMetrics dateRange={selectedDateRange} activeRepos={activeRepositories} members={members} />
            </div>
          )}
        </div>
      ),
    },
    // {
    //   value: "org-metrics",
    //   label: "Organization Metrics",
    //   content: (
    //     <div className="p-4 border rounded-lg flex flex-col">
    //       {loading ? (
    //         <div className="flex items-center justify-center">Fetching repositories...</div>
    //       ) : (
    //         <div>
    //           <OrgMetrics dateRange={selectedDateRange} activeRepos={activeRepositories} />
    //         </div>
    //       )}
    //     </div>
    //   ),
    // },
  ];

  return (
    <div className="w-screen h-screen p-4 flex flex-col">
      <div className="flex items-end justify-center md:justify-end w-full my-3">
        <div className="flex items-center justify-center md:justify-end">
          <DateRangePicker
            selectedDateRange={selectedDateRange}
            onChange={(newRange) => setSelectedDateRange(newRange)}
          />
        </div>
      </div>
      <div className="flex-1 h-full w-full">
        <Tabs
          items={tabItems}
          defaultValue="dev-metrics"
          className="w-full"
          listClassName="bg-background mb-2 w-full !text-lg"
          contentClassName="animate-in fade-in-50"
        />
      </div>

    </div>
  );
}
