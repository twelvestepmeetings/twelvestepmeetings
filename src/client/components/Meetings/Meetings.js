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
      width: '1000px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#757575'
    },
    grey: {
      background: '#f2f2f2',
      borderBottom: '1px solid #e5e5e5'
    },
    lightGrey: {
      background: '#fcfcfc'
    },
    tabs: {
      width: '640px',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '20px',
      padding: '20px 0',
      fontWeight: 500
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
      width: '640px',
      margin: '0 152px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      color: '#2f2f2f',
      fontWeight: 'bold',
      textAlign: 'center'
    },
    classesWrapper: {
      width: '1000px',
      margin: '0 auto'
    },
    classesListItem: {
      display: 'flex',
      textAlign: 'center',
      background: 'white',
      border: '1px solid #f7f7f7'
    },
    ul: {
      margin:'0',
      padding:'0'
    },
    joinButton: {
      background: '#53bf81',
      color: 'white',
      textDecoration: 'none',
      borderRadius: '25px',
      padding: '5px 50px',
      lineHeight: '53px'
    },
    liveButton: {
      border: '1px solid #53bf81',
      color: '#53bf81',
      width: '58px',
      fontSize: '14px',
      margin: '0 auto',
      borderRadius: '25px',
      padding: '0px 10px'
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
    const styles = reactCSS(stylesheet, {
      'mobile': this.props.isBound('mobile')
    });
    const titlebar = (
      <div>
        <Header style={styles.header} />
        <div style={styles.grey}>
          <div style={styles.titleBar}>
            <h2>Online Meetings</h2>
            <div>Filter</div>
          </div>
        </div>
      </div>
    );

    const tabs = (
      <div style={styles.grey}>
        <div style={styles.tabs}>
          { days.map(day =>
            <TabOption
              key={key += 1}
              day={day}
              onClick={() => this.setState({ subview: day })}
              style={subview === day ? styles.activeTab : styles.tab}
            />
          )}
        </div>
      </div>
    );

    const classeslist = (
      <div style={styles.lightGrey}>
        <div style={{ width: '1000px', margin: '0 auto'}}>
          <div style={styles.classesHeader}>
            <p style={{ flex: '1', textAlign: 'justify' }}>FELLOWSHIP</p>
            <p style={{ flex: '0.5' }}>TIME</p>
            <p style={{ flex: '1' }}>MEETING TOPIC</p>
            <p style={{ flex: '0.5' }}>GROUP</p>
          </div>
        </div>
        <div style={styles.classesWrapper}>
          <ul style={styles.ul}>
            <li style={styles.classesListItem}>
              <div style={{ flex: '1.4', display: 'flex', alignItems: 'center' }}>
                <p style={styles.liveButton}>LIVE</p>
              </div>
              <p style={{ flex: '3.4' }}>Alcoholics Anonymous</p>
              <p style={{ flex: '1.4' }}>08:00</p>
              <p style={{ flex: '2.8' }}>A Higher Power</p>
              <p style={{ flex: '1.4' }}>Youth</p>
              <div style={{ flex: '2.8' }}>
                <a style={styles.joinButton} href="#">JOIN</a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    );

    return (
      <div style={styles.container}>
        {titlebar}
        {tabs}
        {classeslist}
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
      topic: 'Higher power',
      time: moment().hour(13).minute(0).second(0).toDate(),
      tags: ['youth']
    },
    {
      id: 3,
      live: false,
      fellowship: 'NA',
      topic: 'Higher power',
      time: moment().hour(19).minute(0).second(0).toDate(),
      tags: ['youth']
    },
    {
      id: 4,
      live: false,
      fellowship: 'AA',
      topic: 'Higher power',
      time: moment().hour(19).minute(0).second(0).toDate(),
      tags: ['youth']
    }
  ];

  return meetings;
}

export default bounds.wrap(Meetings);
