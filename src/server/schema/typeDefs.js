/* eslint-disable */
export default /* GraphQL */`

type User {
  _id: ID!
  name: String
}

enum Fellowship {
  AA
  NA
  CA
}

type Meeting {
  _id: String!
  participants: [User!]
  speaker: User # User who is 'sharing'
  leader: User # User with admin privileges
  live: Boolean # Is the meeting in session?
  fellowship: Fellowship
  topic: String
  time: Int! # When does the meeting start?
  tags: [String!]
}

type Query {
  meetings: [Meeting]
  meeting(id: String!): Meeting
}

type Mutation {
  createMeeting (
    leaderId: ID!
    time: Int
    fellowship: String!
    topic: String
    tags: [String!]
  ) : Meeting
  startMeeting (
    _id: String!
  ) : Meeting
}

schema {
  query: Query
  mutation: Mutation
}
`;
