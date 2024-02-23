import { Octokit } from "@octokit/core";

// 創建Issue
export default async function handler(req, res) {
  if (req.method === "POST") {
    const octokit = new Octokit({
      auth: process.env.GITHUB_TOKEN,
    });

    const { title, body } = req.body;

    try {
      const response = await octokit.request(
        "POST /repos/{owner}/{repo}/issues",
        {
          owner: "your-github-username",
          repo: "your-repo-name",
          title,
          body,
        }
      );
      res.status(200).json(response.data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  } else {
    // Handle any other HTTP method
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
