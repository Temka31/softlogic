import Head from 'next/head'
import styles from '../styles/Home.module.css'
import Table from "../components/table";
import {loadGetInitialProps} from "next/dist/next-server/lib/utils";
import {useState} from "react";
import React from "react"
import MapY from "../components/MapY";


function Home() {
    const[loading, setLoading]=useState(true)

 let data={
   "events": [
     {
       "id": 1,
       "timestamp": 1605103000,
       "camera_id": "SOMECAMERAID",
       "image": "https://konvajs.org/assets/lion.png",
       "latitude": 55.723373333333335,
       "longitude": 37.626803333333335,
       "items": [
         {
           "label": "LP",
           "accuracy": 0.85,
           "object": "A000AA777",
           "x": 0,
           "y": 0,
           "w": 245,
           "h": 80
         }, {
           "label": "SIGN",
           "accuracy": 0.9,
           "object": "",
           "x": 5,
           "y": 5,
           "w": 245,
           "h": 80
         }, ]
     },{
       "id": 2,
       "timestamp": 1605103000,
       "camera_id": "SOMECAMERAID",
       "image": "https://konvajs.org/assets/lion.png",
       "latitude": 55.723373333333335,
       "longitude": 37.626803333333335,
       "items": [
         {
           "label": "LP",
           "accuracy": 0.85,
           "object": "A000AA777",
           "x": 5,
           "y": 10,
           "w": 245,
           "h": 80
         }, {
           "label": "SIGN",
           "accuracy": 0.9,
           "object": " ",
           "x": 4,
           "y": 1,
           "w": 245,
           "h": 80
         }, ]
     } ]
 }


  const time = (unix) => {
    let date = new Date(unix * 1000);
    let d = date.getDate()
    let m = date.getMonth()
    let y = date.getFullYear()
    let h = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return `${d}-${m}-${y} ${h}:${min}:${sec}`
  }



  return (
    <div className={styles.container}>
      <Table events={data.events} time={time}/>
      <MapY/>
    </div>
  )
}
export default Home;




