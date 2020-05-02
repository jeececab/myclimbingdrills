import React from 'react';
import styles from './Hero.module.css';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.tags}>
        <h2>Schedule.</h2>
        <h2>Train.</h2>
        <h2>Share.</h2>
        <p>Choose an existing training program or create your own (sport, bouldering, trad, etc).</p>
        <p>Train and log your progress.</p>
        <p>Share your created programs and exercises with others.</p>
        <p>Vote for the best ones to help others choose well.</p>
      </div>
      <Link to="/signup" className={styles.signup}>
        Start Training
      </Link>
    </section>
  );
};

export default Hero;
