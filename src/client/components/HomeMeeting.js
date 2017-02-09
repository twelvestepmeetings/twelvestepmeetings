import React, { PropTypes } from 'react';
import reactCSS from 'reactcss';
import moment from 'moment';

const stylesheet = {
  'default': {
    container: {
      border: '2px solid HSL(0, 0%, 65%)',
      height: '90px',
      borderRadius: '100px',
      display: 'flex',
      alignItems: 'flex-start',
      padding: '20px 35px',
      justifyContent: 'space-between',
      backgroundColor: 'hsl(0, 0%, 100%)',
      fontSize: '14px',
      position: 'relative',
      margin: '40px 0'
    },
    live: {
      position: 'absolute',
      background: 'HSL(145, 44%, 55%)',
      color: 'white',
      fontWeight: '500',
      top: '-9px',
      left: '50%',
      transform: 'translateX(-50%)',
      padding: '2px 20px',
      borderRadius: '30px',
      fontSize: '12px',
      letterSpacing: '1px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    metaTitle: {
      fontWeight: '500',
      textTransform: 'uppercase',
      fontSize: '13px',
      marginTop: '5px'
    },
    ctaColumn: {
      alignSelf: 'center',
      borderLeft: '1px solid black',
      height: '70px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingLeft: '33px',
      paddingRight: '0px'
    },
    cta: {
      borderBottom: '2px solid HSL(145, 44%, 55%)',
      textTransform: 'uppercase',
      width: '100px',
      textAlign: 'center',
      color: 'HSL(145, 44%, 55%)',
      fontWeight: '500',
      paddingBottom: '3px'
    }
  },
  'live': {
    container: {
      borderColor: 'hsl(145, 44%, 55%)'
    }
  }
};

const propTypes = {

  /**
  * Is the meeting live?
  */
  live: PropTypes.bool.isRequired,

  /**
  * Is it AA, NA, CA?
  */
  fellowship: PropTypes.string.isRequired,

  /**
  * Topic of the meeting.
  */
  topic: PropTypes.string.isRequired,

  /**
  * Time of meeting (Date object)
  */
  time: PropTypes.instanceOf(Date),

  /**
  * Tags
  */
  tags: PropTypes.array
};

function HomeMeeting(props) {
  const styles = reactCSS(stylesheet, props);
  const live = <div style={styles.live}>LIVE</div>;

  return (
    <div style={styles.container}>
      {props.live && live}
      <div>
        <div style={styles.metaTitle}>
          Fellowship
        </div>
        <div>
          {props.fellowship}
        </div>
        <div>
          {props.tags.map(tag =>
            <span key={tag}>{tag}</span>
          )}
        </div>
      </div>
      <div>
        <div style={styles.metaTitle}>
          Meeting Topic
        </div>
        <div>
          {props.topic}
        </div>
      </div>
      <div>
        <div style={styles.metaTitle}>
          Time
        </div>
        <div>
          {moment(props.time).format('hh:mm A')}
        </div>
      </div>
      <div style={styles.ctaColumn}>
        <a style={styles.cta}>
          {props.live &&
            <span>Join <br />Live Meeting</span>
          }
          {!props.live &&
            <span>Remind Me</span>
          }
        </a>
      </div>
    </div>
  );
}

HomeMeeting.propTypes = propTypes;

export default HomeMeeting;
