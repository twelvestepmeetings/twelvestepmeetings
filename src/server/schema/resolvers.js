import { Meeting, User } from './models';

/* =============================================================================
=    GraphQL stuff
============================================================================= */

export default {
  Query: {
    async meetings() {
      const docs = await Meeting.find();

      return docs;
    },
    async meeting(_, { id }) {
      const doc = await Meeting.findById(id);

      return doc;
    },
  },
  Mutation: {
    async createMeeting(_, args) {
      const { leaderId, time, fellowship, topic, tags } = args;
      const doc = await Meeting.create({
        leaderId,
        time,
        fellowship,
        topic,
        tags
      });

      return doc;
    }
  },
  Meeting: {
    async participants(meeting) {
      const doc = await Meeting
      .findById(meeting._id)
      .populate('participants')
      .execPopulate();

      return doc.participants;
    }
  },
  // User: {
  //
  // }
};
