export default /* GraphQL */`

type User {
  id: ID!
  name: ID
}

type Meeting {
  id: String!
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
    id: String!
  ) : Meeting
}

schema {
  query: Query
  mutation: Mutation
}
`
