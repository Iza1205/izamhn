import { NextResponse } from 'next/server';

const GITHUB_USERNAME = 'iza1205';

const QUERY = `
  query($username: String!) {
    user(login: $username) {
      contributionsCollection {
        contributionCalendar {
          totalContributions
          weeks {
            contributionDays {
              contributionCount
              date
            }
          }
        }
        totalCommitContributions
        totalPullRequestContributions
        totalIssueContributions
      }
    }
  }
`;

export async function GET() {
  const token = process.env.GITHUB_TOKEN;

  if (!token) {
    return NextResponse.json({ error: 'GITHUB_TOKEN not set' }, { status: 500 });
  }

  const res = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query: QUERY, variables: { username: GITHUB_USERNAME } }),
    next: { revalidate: 3600 }, // cache 1 jam
  });

  const json = await res.json();

  if (json.errors) {
    return NextResponse.json({ error: json.errors[0].message }, { status: 400 });
  }

  const calendar = json.data.user.contributionsCollection.contributionCalendar;
  const collection = json.data.user.contributionsCollection;

  return NextResponse.json({
    total: calendar.totalContributions,
    weeks: calendar.weeks,
    thisWeek: collection.totalCommitContributions,
    pullRequests: collection.totalPullRequestContributions,
    issues: collection.totalIssueContributions,
  });
}