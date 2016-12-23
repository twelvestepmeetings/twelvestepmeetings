import React from 'react';
import reactCSS from 'reactcss';
import Header from './Header';

const styles = reactCSS({
  'default': {
    container: {
      backgroundImage: 'url(/img/bg-hero.png)',
      backgroundSize: 'cover',
      height: '500px'
    }
  }
});

const Home = () => (
  <div style={styles.container}>
    <div style={styles.hero}>
      <Header />
    </div>
  </div>
);

export default Home;
