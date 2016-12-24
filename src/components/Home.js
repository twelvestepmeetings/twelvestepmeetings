import React from 'react';
import reactCSS from 'reactcss';
import bounds from 'react-bounds';
import Header from './Header';

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

const Home = (props) => {
  const styles = reactCSS(stylesheet, {
    mobile: props.isBound('mobile')
  });

  return (
    <div style={styles.container}>
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
            Onlin Meetings & Speakertapes &bull; 7 fellowships &bull; 13 languages
          </div>
        </div>
      </div>
    </div>
  );
}

Home.bounds = () => ({
  'mobile': {
    maxWidth: 800
  }
});

export default bounds.wrap(Home);
