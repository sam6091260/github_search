"use client";
import {
  Box,
  Button,
  Badge,
  Flex,
  Spinner,
  Link,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import ReactMarkdown from "react-markdown";

const Repos = ({ reposUrl }) => {
  const toast = useToast();
  const [repos, setRepos] = useState([]);
  const [issues, setIssues] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [openIssues, setOpenIssues] = useState({});

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const res = await fetch(reposUrl);
        const data = await res.json();
        if (data.message) throw new Error(data.message);
        setRepos(data);
      } catch (error) {
        toast({
          title: "Error",
          description: error.message,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, [reposUrl, toast]);

  // 抓取issue資訊
  const handleIssue = async (repoFullName) => {
    try {
      const res = await fetch(
        `https://api.github.com/repos/${repoFullName}/issues`
      );
      const data = await res.json();
      setIssues((prevIssues) => ({
        ...prevIssues,
        [repoFullName]: data,
      }));
      setOpenIssues((prevOpenIssues) => ({
        ...prevOpenIssues,
        [repoFullName]: true,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  // 關閉issue
  const handleCloseIssues = (repoFullName) => {
    setOpenIssues((prevOpenIssues) => ({
      ...prevOpenIssues,
      [repoFullName]: false,
    }));
  };

  return (
    <>
      <Text
        textAlign={"center"}
        letterSpacing={1.5}
        fontSize={"3xl"}
        fontWeight={"bold"}
        color={"green.400"}
        mt={4}
      >
        REPOSITORIES
      </Text>
      {loading && (
        <Flex justifyContent={"center"}>
          <Spinner size={"xl"} my={4} />
        </Flex>
      )}

      {repos
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .map((repo, idx) => {
          if (idx > 4 && !showMore) return null;
          return (
            <Flex
              key={repo.id}
              padding={4}
              bg={"whiteAlpha.200"}
              _hover={{ bg: "whiteAlpha.400" }}
              my={4}
              px={10}
              gap={4}
              borderRadius={4}
              transition={"all 0.3s ease"}
              justifyContent={"space-between"}
              alignItems={"center"}
            >
              <Flex flex={1} direction={"column"}>
                <Link
                  href={repo.html_url}
                  fontSize={"md"}
                  fontWeight={"bold"}
                  target="_blank"
                >
                  {repo.name}
                </Link>
                <Badge
                  fontSize={"0.7em"}
                  colorScheme={"whatsapp"}
                  w={"min-content"}
                  textAlign={"center"}
                  px={1}
                  mt={2}
                >
                  Language: {repo.language || "None"}
                </Badge>
              </Flex>
              <Flex flex={1} gap={4} ml={6}>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="orange"
                  flex={1}
                  textAlign={"center"}
                >
                  Stars: {repo.stargazers_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="pink"
                  flex={1}
                  textAlign={"center"}
                >
                  Forks: {repo.forks_count}
                </Badge>
                <Badge
                  fontSize={"0.9em"}
                  colorScheme="cyan"
                  flex={1}
                  textAlign={"center"}
                >
                  Watchers: {repo.watchers_count}
                </Badge>
              </Flex>
              {/* Issue開關 */}
              {openIssues[`${repo.owner.login}/${repo.name}`] ? (
                <Button
                  colorScheme="whatsapp"
                  onClick={() =>
                    handleCloseIssues(`${repo.owner.login}/${repo.name}`)
                  }
                >
                  Close Issues
                </Button>
              ) : (
                <Button
                  colorScheme="whatsapp"
                  onClick={() =>
                    handleIssue(`${repo.owner.login}/${repo.name}`)
                  }
                >
                  Get Issues
                </Button>
              )}
              <Box>
                {issues[`${repo.owner.login}/${repo.name}`] &&
                openIssues[`${repo.owner.login}/${repo.name}`] ? (
                  <Box>
                    {issues[`${repo.owner.login}/${repo.name}`].map(
                      (issue, index) => (
                        <Box key={index} mt={2}>
                          <Text fontWeight="bold">{issue.title}</Text>
                          <Text>{issue.body}</Text>
                        </Box>
                      )
                    )}
                  </Box>
                ) : null}
              </Box>
            </Flex>
          );
        })}
      {showMore && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="whatsapp"
            onClick={() => setShowMore(false)}
          >
            Show Less
          </Button>
        </Flex>
      )}

      {!showMore && repos.length > 5 && (
        <Flex justifyContent={"center"} my={4}>
          <Button
            size="md"
            colorScheme="whatsapp"
            onClick={() => setShowMore(true)}
          >
            Show More
          </Button>
        </Flex>
      )}
    </>
  );
};

export default Repos;
