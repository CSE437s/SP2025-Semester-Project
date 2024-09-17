"use client"; 
import { NextPage } from "next";
import styles from '../styles/homePageLayout.module.css';
import { useState } from "react";
import { Button } from "@mui/material";

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
      <Button></Button>
    </div>
    </main>
    </>
  );
}

export default HomePage;
