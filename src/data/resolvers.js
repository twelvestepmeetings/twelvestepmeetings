const db = {

  users: [
    {
      id: 1,
      name: 'cooper'
    },
    {
      id: 2,
      name: 'bob'
    },
    {
      id: 3,
      name: 'joe'
    }
  ],

  meetings: [
    {
      id: 1,
      participantIds: [1, 2],
      leaderId: 3,
      live: false,
      startsAt: 1481356800000
    },
    {
      id: 2,
      participantIds: [3, 2],
      leaderId: 1,
      live: false,
      startsAt: 1482220800000
    }
  ]
};

export default {
  Query: {
    meetings(/* root, args, context */) {
      return db.meetings;
    },
    meeting(_, { id }) {
      return db.meetings.find(m => m.id === id);
    },
  },
  Mutation: {
    createMeeting(_, { leaderId, startsAt }) {
      const id = db.meetings.length + 1;

      db.meetings.push({ id, leaderId, live: false, startsAt });
    }
  },
  Meeting: {
    participants(meeting) {
      return meeting.participantIds.map(id => db.users.find(u => u.id === id));
    }
  },
  // User: {
  //
  // }
};
