// @flow
import React, { PropTypes } from 'react';
import bounds from 'react-bounds';
import moment from 'moment';
import { Link } from 'react-router-dom';
import style from 'lib/style';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Header from './../Header';

const TUE = 'TUE', WED = 'WED', THUR = 'THUR', FRI = 'FRI', SAT = 'SAT', SUN = 'SUN';
const days = [ TUE, WED, THUR, FRI, SAT, SUN];

const ACTIONS = gql`
mutation createMeeting (
  $leaderId: ID!
  $time: Int
  $fellowship: String!
  $topic: String
  $tags: [String!]
) {
  createMeeting(
    leaderId: $leaderId
    time: $time
    fellowship: $fellowship
    topic: $topic
    tags: $tags
  ) {
    _id
    topic
    time
    live
    fellowship
    tags
  }
}
`;

const QUERY = gql`
query {
  meetings {
    _id
    live
    fellowship
    topic
    time
    tags
  }
}
`;
const mapDataToProps = result => ({
  meetings: result.data.meetings,
  isFetching: result.data.loading
});
const withData = graphql(QUERY, {
  props: mapDataToProps
});

const propTypes = {

  /**
   * Provided by react-bounds
   */
  isBound: PropTypes.func.isRequired
};

@withData
@style(stylesheet())
class Meetings extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderIndex: 0,
      subview: TUE,
      selectedFellowship: 0
    };
  }

  render() {
    const { classes, meetings, isFetching, match } = this.props;
    if (isFetching) return <div>Loading...</div>;
    const { subview } = this.state;
    const isMobile = this.props.isBound('mobile');
    const titlebar = (
      <div className={classes.titleBar}>
        <h2 className={classes.title}>Online Meetings</h2>
        <div>Filter</div>
      </div>
    );
    const tabs = (
      <div className={classes.grey}>
        <div className={classes.tabs}>
          {days.map(day =>
            <a
              key={day}
              onClick={() => this.setState({ subview: day })}
              className={subview === day ? classes.activeTab : classes.tab}
            >{day}</a>
          )}
        </div>
      </div>
    );
    const header = (
      <div className={classes.classesHeader}>
        <div style={{ flex: '0.5' }} />
        <div style={{ flex: 0.5 }}>FELLOWSHIP</div>
        <div style={{ flex: '0.5' }}>TIME</div>
        <div style={{ flex: '1' }}>MEETING TOPIC</div>
        <div style={{ flex: '0.5' }}>GROUP</div>
        <div style={{ flex: 0.5 }} />
      </div>
    );
    const body = (
      <div className={classes.classesWrapper}>
        {meetings.map(meeting =>
          <div className={classes.classesListItem} key={meeting._id}>
            <div style={{ flex: '0.5', display: 'flex', alignItems: 'center' }}>
              {meeting.live && <div className={classes.liveButton}>LIVE</div>}
            </div>
            <div className={classes.cell} style={{ flex: 0.5 }}>
              {meeting.fellowship}
            </div>
            <div className={classes.cell} style={{ flex: 0.5 }}>
              {moment(meeting.time).format('hh:mm A')}
            </div>
            <div className={classes.cell} style={{ flex: 1 }}>
              {meeting.topic}
            </div>
            <div className={classes.cell} style={{ flex: 0.5 }}>
              {meeting.tags.join(', ')}
            </div>
            <div className={classes.cell} style={{ flex: 0.5 }}>
              <Link
                className={classes.joinButton}
                to={`${match.url}/${meeting._id}`}
              >JOIN</Link>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div className={classes.container}>
        <Header className={classes.header} />
        {titlebar}
        {tabs}
        {header}
        {body}
      </div>
    );
  }
}

Meetings.bounds = () => ({
  'mobile': {
    maxWidth: 800
  }
});

Meetings.propTypes = propTypes;


function stylesheet() {
  return {
    header: {
      backgroundColor: 'hsl(225, 8%, 19%)'
    },
    titleBar: {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 15px',
      background: 'hsl(0,0%,98%)'
    },
    title: {
      color: 'hsl(0, 0%, 20%)',
      fontSize: '25px',
      fontWeight: '300',
      margin: '15px 0'
    },
    grey: {
      background: 'hsl(0,0%,100%)',
      border: '1px solid hsl(0,0%,93%)',
      borderRight: 'none',
      borderLeft: 'none'
    },
    tabs: {
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      fontSize: '14px',
      padding: '12px 0',
      fontWeight: 400
    },
    tab: {
      color: 'hsl(0, 0%, 70%)',
      cursor: 'pointer'
    },
    activeTab: {
      color: 'HSL(145, 44%, 55%)',
      cursor: 'pointer'
    },
    classesHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: 'hsl(0, 0%, 30%)',
      fontWeight: 500,
      textAlign: 'left',
      fontSize: '14px',
      padding: '20px 0 10px 0',
      fontFamily: 'Montserrat'
    },
    classesWrapper: {
      margin: '0 auto'
    },
    classesListItem: {
      display: 'flex',
      textAlign: 'left',
      background: 'white',
      borderBottom: '1px solid #f7f7f7',
      alignItems: 'center',
      padding: '10px 0'
    },
    ul: {
      margin: '0',
      padding: '0',
      alignItems: 'center'
    },
    joinButton: {
      background: 'hsl(146, 46%, 54%)',
      color: 'hsl(0, 0%, 100%)',
      textDecoration: 'none',
      borderRadius: '25px',
      padding: '5px 30px',
      lineHeight: '53px',
      display: 'flex',
      height: '30px',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100px',
      outline: 'none',
      marginRight: '10px'
    },
    liveButton: {
      border: '1px solid #53bf81',
      color: '#53bf81',
      width: '58px',
      fontSize: '12px',
      margin: '0 auto',
      borderRadius: '25px',
      padding: '0px 10px',
      textAlign: 'center'
    },
    cell: {
      whiteSpace: 'nowrap',
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      fontSize: '13px',
      color: 'hsl(0, 0%, 35%)',
      fontWeight: 400
    }
  };
}

export default bounds.wrap(Meetings);
