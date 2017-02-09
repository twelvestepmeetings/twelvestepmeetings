import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';
import bounds from 'react-bounds';
import moment from 'moment';
import Header from './Header';
import Dropdown from './Dropdown';
import Meeting from './HomeMeeting';

const MEETINGS = 'MEETINGS';
const SPEAKERTAPES = 'SPEAKERTAPES';
const stylesheet = {
  'default': {
    hero: {
      backgroundImage: 'url(/img/bg-hero.png)',
      backgroundSize: 'cover',
      height: '500px'
    },
    heroBody: {
      textAlign: 'center',
      marginTop: '70px',
      color: 'white'
    },
    intro: {
      textTransform: 'uppercase',
      fontSize: '20px'
    },
    hr: {
      width: '55px'
    },
    headline: {
      marginTop: '35px',
      fontSize: '65px',
      fontWeight: 500
    },
    heroDescription: {
      marginTop: '35px',
      fontSize: '16px'
    },
    tabs: {
      textAlign: 'center',
      paddingTop: '30px',
      fontSize: '20px',
      fontWeight: 500
    },
    tab: {
      margin: '0 20px',
      color: 'hsl(0, 0%, 70%)',
      cursor: 'pointer'
    },
    activeTab: {
      margin: '0 10px',
      color: 'HSL(145, 44%, 55%)',
      textDecoration: 'underline',
      cursor: 'pointer'
    },
    selectFellowship: {
      width: '400px',
      margin: '35px auto'
    },
    selectFellowshipDropdown: {
      color: 'hsl(0, 0%, 15%)',
      borderColor: 'hsl(0, 0%, 55%)'
    },
    meetings: {
      width: '700px',
      margin: '20px auto'
    }
  },
  'mobile': {
    hero: {
      height: '330px'
    },
    heroBody: {
      marginTop: '15px'
    },
    intro: {
      fontSize: '17px'
    },
    headline: {
      marginTop: '15px',
      fontSize: '44px'
    },
    heroDescription: {
      marginTop: '12px',
      fontSize: '15px'
    }
  }
};

const propTypes = {

  /**
   * Provided by react-bounds
   */
  isBound: PropTypes.func.isRequired
};

class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      sliderIndex: 0,
      subview: MEETINGS,
      selectedFellowship: 0
    };
  }

  render() {
    const { subview } = this.state;
    const styles = reactCSS(stylesheet, {
      'mobile': this.props.isBound('mobile')
    });
    const hero = (
      <div style={styles.hero}>
        <Header />
        <div style={styles.heroBody}>
          <div style={styles.intro}>
            Good Morning!
          </div>
          <hr style={styles.hr} />
          <div style={styles.headline}>
            Recovery for the world
          </div>
          <div style={styles.heroDescription}>
            Online Meetings & Speakertapes
            {' '}&bull;{' '}
            7 fellowships
            {' '}&bull;{' '}
            13 languages
          </div>
        </div>
      </div>
    );
    const tabs = (
      <div style={styles.tabs}>
        <a
          onClick={() => this.setState({ subview: MEETINGS })}
          style={subview === MEETINGS ? styles.activeTab : styles.tab}
        >
          Today's Online Meetings
        </a>
        <a
          onClick={() => this.setState({ subview: SPEAKERTAPES })}
          style={subview === SPEAKERTAPES ? styles.activeTab : styles.tab}
        >
          Featured Speakertapes
        </a>
      </div>
    );
    const dropdown = (
      <div style={styles.selectFellowship}>
        <Dropdown
          style={styles.selectFellowshipDropdown}
          items={['Alcoholics Anonymous', 'Narcotics Anonymous']}
          selected={this.state.selectedFellowship}
          onSelect={(item, i) => this.setState({ selectedFellowship: i })}
        />
      </div>
    );
    const meetings = (
      <div style={styles.meetings}>
        {getMeetings().map(meeting =>
          <Meeting
            key={meeting.id}
            live={meeting.live}
            fellowship={meeting.fellowship}
            topic={meeting.topic}
            time={meeting.time}
            tags={meeting.tags}
          />
        )}
      </div>
    );

    return (
      <div style={styles.container}>
        {hero}
        {tabs}
        {dropdown}
        {meetings}
      </div>
    );
  }
}

Home.bounds = () => ({
  'mobile': {
    maxWidth: 800
  }
});

Home.propTypes = propTypes;

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

export default bounds.wrap(Home);
