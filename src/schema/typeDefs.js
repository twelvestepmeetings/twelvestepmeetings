/**
 * Main GraphQL Type definitions
 */

export default /* GraphQL */`

type User {
  _id: ID!
  name: String
}

type Meeting {
  _id: String!
  participants: [User!]
  speaker: User # User who is 'sharing'
  leader: User # User with admin privileges
  live: Boolean # Is the meeting in session?
  startsAt: Int! # When does the meeting start?
}

type Query {
  meetings: [Meeting]
  meeting(id: String!): Meeting
}

type Mutation {
  createMeeting (
    leaderId: ID!
    startsAt: Int
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
