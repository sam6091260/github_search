import { Octokit } from "@octokit/core";

// 獲取Issue
export default async function handler(req, res) {
  if (req.method === "GET") {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    try {
      const response = await octokit.request(
        "GET /repos/{owner}/{repo}/issues",
        {
          owner: "your-github-username",
          repo: "your-repo-name",
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["GET"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
