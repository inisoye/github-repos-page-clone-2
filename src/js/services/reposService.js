const baseUrl = 'https://api.github.com/graphql';

const headers = {
  'Content-Type': 'application/json',
  authorization: 'bearer ' + process.env.VITE_GITHUB_TOKEN,
};

const getRepos = async (selectedUser) => {
  const query = `query {
                  user(login: "${selectedUser}") {
                    avatarUrl
                    status {
                      message
                      emojiHTML
                    }
                    name
                    login
                    bio
                    repositories(first: 20, orderBy: {field: UPDATED_AT, direction: DESC}, privacy:PUBLIC) {
                      totalCount
                      nodes {
                        name
                        isPrivate
                        isFork
                        parent {
                          nameWithOwner
                        }
                        description
                        primaryLanguage {
                          color
                          name
                        }
                        stargazers {
                          totalCount
                        }
                        forks {
                          totalCount
                        }
                        licenseInfo {
                          name
                        }
                        updatedAt
                      }
                    }
                  }
                }
                `;

  try {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: headers,
      body: JSON.stringify({
        query: query,
      }),
    });

    if (!response.ok) {
      const message = `An error has occured: ${response.status}`;
      console.error(message);
      return Promise.reject(response);
    }

    const responseJson = await response.json();

    return responseJson.data;
  } catch (err) {
    console.warn(err);
  }
};

export default getRepos;
