import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import InfiniteScrollTable from "./InfiniteScrollTable";
import {useState} from "react";

const Home: NextPage = () => {

  const callback = (data: string[]) => {
    const lastIdx = data.length;
    const additionalData: string[] = [];

    for (let idx=lastIdx;idx<lastIdx+10;idx++) {
      additionalData.push(`Data_${idx}`);
    }
    const dataAdded = [...data, ...additionalData];
    // console.log('callback...');
    console.log('callback... dataAdded : ', dataAdded);
    return dataAdded;
  }

  return (
    <InfiniteScrollTable callback={callback}/>
  )
}

export default Home
