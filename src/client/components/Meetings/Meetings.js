import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';
import bounds from 'react-bounds';
import moment from 'moment';
import Header from './../Header';
import Dropdown from './../Dropdown';
import Meeting from './../Meeting';
import { TabOption } from './TabOption';

const TUE = 'TUE', WED = 'WED', THUR = 'THUR', FRI = 'FRI', SAT = 'SAT', SUN = 'SUN';
const days = [ TUE, WED, THUR, FRI, SAT, SUN];
let key = 1;
const stylesheet = {
  'default': {
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
  }
};

const propTypes = {

  /**
   * Provided by react-bounds
   */
  isBound: PropTypes.func.isRequired
};

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
    const { subview } = this.state;
    const meetings = getMeetings();
    const styles = reactCSS(stylesheet, {
      mobile: this.props.isBound('mobile')
    });
    const titlebar = (
      <div style={styles.titleBar}>
        <h2 style={styles.title}>Online Meetings</h2>
        <div>Filter</div>
      </div>
    );

    const tabs = (
      <div style={styles.grey}>
        <div style={styles.tabs}>
          {days.map(day =>
            <TabOption
              key={day}
              day={day}
              onClick={() => this.setState({ subview: day })}
              style={subview === day ? styles.activeTab : styles.tab}
            />
          )}
        </div>
      </div>
    );
    const header = (
      <div style={styles.classesHeader}>
        <div style={{ flex: '0.5' }} />
        <div style={{ flex: 0.5 }}>FELLOWSHIP</div>
        <div style={{ flex: '0.5' }}>TIME</div>
        <div style={{ flex: '1' }}>MEETING TOPIC</div>
        <div style={{ flex: '0.5' }}>GROUP</div>
        <div style={{ flex: 0.5 }} />
      </div>
    );
    const body = (
      <div style={styles.classesWrapper}>
        {meetings.map(meeting =>
          <div style={styles.classesListItem} key={meeting.id}>
            <div style={{ flex: '0.5', display: 'flex', alignItems: 'center' }}>
              {meeting.live && <div style={styles.liveButton}>LIVE</div>}
            </div>
            <div style={{ ...styles.cell, flex: 0.5 }}>{meeting.fellowship}</div>
            <div style={{ ...styles.cell, flex: 0.5 }}>
              {moment(meeting.time).format('hh:mm A')}
            </div>
            <div style={{ ...styles.cell, flex: 1 }}>{meeting.topic}</div>
            <div style={{ ...styles.cell, flex: 0.5 }}>
              {meeting.tags.join(', ')}
            </div>
            <div style={{ ...styles.cell, flex: 0.5 }}>
              <a style={styles.joinButton} href="#">JOIN</a>
            </div>
          </div>
        )}
      </div>
    );

    return (
      <div style={styles.container}>
        <Header style={styles.header} />
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

function getMeetings() { // eslint-disable-line
  /* eslint-disable no-magic-numbers, lines-around-comment */
  const meetings = [
    {
      id: 1,
      live: true,
      fellowship: 'AA',
      topic: 'Higher power',
      time: moment().hour(19).minute(0).second(0).toDate(),
      tags: ['youth']
    },
    {
      id: 2,
      live: true,
      fellowship: 'AA',
      topic: 'Alcoholism in the workplace',
      time: moment().hour(13).minute(0).second(0).toDate(),
      tags: ['youth']
    },
    {
      id: 3,
      live: false,
      fellowship: 'NA',
      topic: 'Sandy B Shares His Story',
      time: moment().hour(19).minute(0).second(0).toDate(),
      tags: ['youth']
    },
    {
      id: 4,
      live: false,
      fellowship: 'AA',
      topic: 'Women of AA',
      time: moment().hour(19).minute(0).second(0).toDate(),
      tags: ['youth']
    }
  ];

  return meetings;
}

export default bounds.wrap(Meetings);
