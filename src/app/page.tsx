'use client'

import React from "react";
import { useOrgRepos } from "@/hooks/useOrgRepos";
import { subYears } from "date-fns";
import { DateRange } from "react-day-picker";

import { useOrgMembers } from "@/hooks/useOrgMembers";

import { DateRangePicker } from "@/components/ui";

import { OrgMetrics } from "@/components/shared";
import { useMultipleDevStats } from "@/hooks/useMultipleDevStats";

export default function Home() {

  const initialDateRange = {
    from: subYears(new Date(), 1),
    to: new Date
  };

  const [selectedDateRange, setSelectedDateRange] = React.useState<DateRange | undefined>(initialDateRange);

  const { activeRepositories, loading } = useOrgRepos();
  const { members, loading: membersLoading } = useOrgMembers()
  const { data: devStatsData, loading: statsLoading } = useMultipleDevStats(members, activeRepositories, selectedDateRange);

  // const testMember = ['Oluwagbenga-cloud']
  // // const testMember = ['audrey-roe']
  // const testRepo = [{
  //   "id": 938451906,
  //   "name": "nssf_django",
  //   "full_name": "gpiiltd/nssf_django",
  //   "pushed_at": "2025-06-03T14:29:22Z",
  //   "archived": false
  // }]

  // // console.log('members:', members)
  // // console.log('selectedDateRange:', selectedDateRange)
  // console.log('devStatsData:', devStatsData)

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
        {loading ? (
          <div className="flex items-center justify-center">Fetching repositories...</div>
        ) : membersLoading ? (
          <div className="flex items-center justify-center">Fetching team members...</div>
        ) : statsLoading ? (
          <div className="flex items-center justify-center">Fetching & compiling dev stats...</div>
        ) : (
          <div>
            <OrgMetrics
              dateRange={selectedDateRange}
              activeRepositories={activeRepositories}
              members={members}
              devStatsData={devStatsData}
            />
          </div>
        )}
      </div>

    </div>
  );
}
