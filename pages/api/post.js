const { GraphQLClient, gql } = require('graphql-request');
const dayjs = require('dayjs');

export default async function handler(req, res) {
  const fromDay = dayjs().subtract(7, 'day');

  const query = gql`{
    posts(postedAfter: "${fromDay.format('YYYY-MM-DD')}T00:00:00Z", order: VOTES, first: 20) {
      edges {
        node {
          id,
          name,
          votesCount,
          featuredAt,
          thumbnail {
            url
          }
        }
      }
    }
  }`;

  const { token } = req.query;
  const endpoint = 'https://api.producthunt.com/v2/api/graphql';
  const client = new GraphQLClient(endpoint, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });

  try {
    const data = await client.request(query);
    res.status(200).json({ posts: data.posts.edges });
  } catch (error) {
    res.status(500).json({ error: error });
  }

}
