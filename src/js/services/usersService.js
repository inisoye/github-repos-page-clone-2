const baseUrl = 'https://api.github.com/graphql';

const headers = {
  'Content-Type': 'application/json',
  authorization: 'bearer ' + import.meta.env.VITE_GITHUB_TOKEN,
};

const getUsers = async (searchQuery) => {
  const query = `query {
                  search(query: "${searchQuery}", type: USER, first: 10) {
                    edges {
                      node {
                        ... on User {
                          avatarUrl
                          login
                          name
                          email
                        }
                      }
                    }
                  }
                }`;

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

    return responseJson.data.search;
  } catch (err) {
    console.warn(err);
  }
};

export default getUsers;
