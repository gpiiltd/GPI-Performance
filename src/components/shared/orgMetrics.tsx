

// components/OrgMetrics.tsx
import { useMultipleDevStats } from '@/hooks/useMultipleDevStats';
// import { useOrgMembers } from '@/hooks/useOrgMembers';
// import { useOrgRepos } from '@/hooks/useOrgRepos';
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line } from 'recharts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui';
import { DateRange } from 'react-day-picker';

interface OrgMetricsProps {
  members: string[];
  activeRepositories: any[];
  dateRange?: DateRange;
  devStatsData: any[]
}

export function OrgMetrics({ members, activeRepositories, dateRange, devStatsData }: OrgMetricsProps) {
  // const { members, loading: membersLoading } = useOrgMembers();
  // const { activeRepositories, loading: reposLoading } = useOrgRepos();
  // const { data: devStats, loading: statsLoading } = useMultipleDevStats(members, activeRepositories, dateRange);
  // console.log(devStats)

  // if (membersLoading || reposLoading || statsLoading) {
  //   return <div>Loading organization metrics...</div>;
  // }

  // Calculate contribution scores
  const calculateContributionScore = (stats: any) => {
    if (!stats) return 0;
    return (
      stats.commits * 1 +
      stats.prsMerged * 3 +
      stats.prReviews * 2 +
      stats.prComments * 0.5 +
      (stats.linesAdded + stats.linesDeleted) * 0.01
    );
  };

  // Team activity overview
  const teamTotals = devStatsData.reduce((acc, dev) => {
    if (dev.stats) {
      acc.totalCommits += dev.stats.commits;
      acc.totalPRsOpened += dev.stats.prsOpened;
      acc.totalPRsMerged += dev.stats.prsMerged;
      acc.totalReviews += dev.stats.prReviews;
      acc.totalComments += dev.stats.prComments;
      acc.totalLinesAdded += dev.stats.linesAdded;
      acc.totalLinesDeleted += dev.stats.linesDeleted;
    }
    return acc;
  }, {
    totalCommits: 0,
    totalPRsOpened: 0,
    totalPRsMerged: 0,
    totalReviews: 0,
    totalComments: 0,
    totalLinesAdded: 0,
    totalLinesDeleted: 0,
  });

  const activeDevs = devStatsData.filter(dev =>
    dev.stats && calculateContributionScore(dev.stats) > 0
  ).length;

  const barData = devStatsData
    .map((dev) => ({
      name: dev.member,
      commits: dev.stats?.commits || 0,
      prsMerged: dev.stats?.prsMerged || 0,
      reviews: dev.stats?.prReviews || 0,
      composite: calculateContributionScore(dev.stats),
    }))
    .filter((item) => item.composite > 0)
    .sort((a, b) => b.composite - a.composite);


  const activityOverTime = devStatsData.reduce((acc: Record<string, { commits: number; prs: number }>, dev) => {
    dev.dailyStats?.forEach((stat: any) => {
      const date = stat.date;
      if (!acc[date]) {
        acc[date] = { commits: 0, prs: 0 };
      }
      acc[date].commits += stat.commits || 0;
      acc[date].prs += stat.prsMerged || 0;
    });
    return acc;
  }, {});

  const activityChartData = Object.entries(activityOverTime)
    .map(([date, counts]) => ({
      date,
      ...counts,
    }))
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());



  return (
    <div className="space-y-6">
      {/* Team Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Developers</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeDevs}</div>
            <p className="text-xs text-muted-foreground">out of {members.length} total</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Commits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamTotals.totalCommits}</div>
            <p className="text-xs text-muted-foreground">across all repos</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">PRs Merged</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamTotals.totalPRsMerged}</div>
            <p className="text-xs text-muted-foreground">{teamTotals.totalPRsOpened} opened</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Code Reviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{teamTotals.totalReviews}</div>
            <p className="text-xs text-muted-foreground">{teamTotals.totalComments} comments</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Comparison */}
      <Card>
        <CardHeader>
          <CardTitle>Developer Activity Comparison</CardTitle>
          <CardDescription>
            Multi-dimensional view of team contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="commits" fill="#8884d8" name="Commits" />
                <Bar dataKey="prsMerged" fill="#82ca9d" name="PRs Merged" />
                <Bar dataKey="reviews" fill="#ffc658" name="Reviews" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle>Team Activity Over Time</CardTitle>
          <CardDescription>
            Daily trends of commits and PRs merged across the team
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart
                data={activityChartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="date"
                  tickFormatter={(value) => {
                    const date = new Date(value);
                    return `${date.getMonth() + 1}/${date.getDate()}`;
                  }}
                />
                <YAxis />
                <Tooltip
                  formatter={(value, name) => {
                    if (name === 'commits') return [`${value} commits`, 'Commits'];
                    if (name === 'prs') return [`${value} PRs`, 'PRs Merged'];
                    return [value, name];
                  }}
                  labelFormatter={(label) => {
                    return new Date(label).toLocaleDateString();
                  }}
                />
                <Legend
                  formatter={(value) => {
                    if (value === 'commits') return 'Commits';
                    if (value === 'prs') return 'PRs Merged';
                    return value;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="commits"
                  stroke="#8884d8"
                  activeDot={{ r: 8 }}
                  strokeWidth={2}
                  name="Commits"
                />
                <Line
                  type="monotone"
                  dataKey="prs"
                  stroke="#82ca9d"
                  strokeWidth={2}
                  name="PRs Merged"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

    </div>
  );
}