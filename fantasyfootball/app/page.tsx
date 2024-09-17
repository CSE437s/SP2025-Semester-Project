"use client"; 
import { NextPage } from "next";
import styles from '../styles/homePageLayout.module.css';
import { useState } from "react";
import { Button } from "@mui/material";
import VolumeUpIcon from '@mui/icons-material/VolumeUp';
import VolumeMuteIcon from '@mui/icons-material/VolumeMute';


const HomePage: NextPage = () => {

  const [isMute, setIsMute] = useState<boolean>(false);

  

  const muteSound = () => {
    setIsMute(false);
  }
  return (
    <>
    <main>
    <div className={styles.App}>
      <h1 className={styles.title}>Hello World</h1>
      {isMute ? (
        <Button onClick={muteSound}><VolumeMuteIcon/></Button>
      ): (
        <Button onClick={muteSound}><VolumeUpIcon/></Button>
      )}
    </div>
    </main>
    </>
  );
}

export default HomePage;
