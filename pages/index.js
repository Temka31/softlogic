import styles from '../styles/Home.module.css'
import Table from "../components/table";
import {useState} from "react";
import React from "react"
import MapY from "../components/MapY";


function Home() {
    const[loading, setLoading]=useState(true)
    const[table, setTable]=useState(true)


 const [data,setData] =useState(
   [
     {
       "id": 1,
       "timestamp": 1605103000,
       "camera_id": "1",
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
       "camera_id": "1",
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
 )


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



const filterText =(id)=>{
let columns =["id","camera_id"]
     let newData = columns.filter((column)=>data.filter((item)=>String(item[column]).includes("1")))
  console.log(newData)
}



filterText(1)
  return (
    <div className={styles.container}>
      <button onClick={()=>setTable(!table)}>
        {table?"Карта":"Таблица"}
      </button>

          {table?<Table events={data} time={time} filterText={filterText}/>:<MapY events={data} tome={time}/>}

    </div>
  )
}
export default Home;




