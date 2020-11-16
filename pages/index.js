import styles from '../styles/Home.module.css'
import Table from "../components/table";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react"
import MapY from "../components/MapY";
import {loadGetInitialProps} from "next/dist/next-server/lib/utils";



function Home() {
    const camera = useRef();
    const label = useRef();
    const minTime = useRef();
    const maxTime = useRef();
    const accuracy = useRef()



    const handleCamera=(e)=>{
        setFilter(s => ({...s, camera_id: e.target.value}));
        e.preventDefault();
    }
    const handleLabel=(e)=>{
        setFilter(s => ({...s, label: e.target.value}));
    }
    const handlMinTime=(e)=>{
        setFilter(s => ({...s, timestampMin: e.target.value}));
    }
    const handlMaxTime=(e)=>{
        setFilter(s => ({...s, timestampMax: e.target.value}));
    }
    const handleAccuracy=(e)=>{
        setFilter(s => ({...s, accuracy: e.target.value}));
    }

    const handleSubmit=(e)=>{
        console.log(filt())
        console.log(123)
        e.preventDefault();
    }

    const [loading, setLoading] = useState(true)
    const [table, setTable] = useState(true)
    const [filter, setFilter] = useState({
        camera_id: "",
        timestampMin: "10.10.2020",
        timestampMax: "12.10.2020",
        label: "",
        accuracy: 0
    })
    const headers = [
        {name:"Номер",nameE:"id"},
        {name:"Камера",nameE:"camera_id", input:true, ref:camera, value:filter.camera_id, change:handleCamera},
        {name:"Время", nameE:"timeMin", nameE2:"timemax", input:true, input2:true, value:filter.timestampMin, change:handlMinTime, value2:filter.timestampMax,change2:handlMaxTime },
        {name:"Адрес",nameE:"Address"},
        {name:"Миниатюра",nameE:"image", input:true, select:true, value:filter.label, change:handleLabel, svalue:filter.accuracy, schange:handleAccuracy},

    ];
    const [data, setData] = useState(
        [
            {
                "id": 1,
                "timestamp": 1605103000,
                "camera_id": "2",
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
                    },]
            }, {
            "id": 2,
            "timestamp": 1605103000,
            "camera_id": "1",
            "image": "https://konvajs.org/assets/lion.png",
            "latitude": 55.723373333333335,
            "longitude": 37.626803333333335,
            "items": [
                {
                    "label": "LP",
                    "accuracy": 0.5,
                    "object": "A000AA777",
                    "x": 5,
                    "y": 10,
                    "w": 245,
                    "h": 80
                }, {
                    "label": "LP",
                    "accuracy": 0.9,
                    "object": " ",
                    "x": 4,
                    "y": 1,
                    "w": 245,
                    "h": 80
                },]
        }]
    )
    const [resItems, setResItems] = useState()
    const url = "http://dev.softlogicrus.com:9090/events.json"

    // useEffect(() => {
    //     setLoading(true)
    //     fetch(
    //         url,
    //     )
    //         .then(response => response.json())
    //         .then(data => setResItems(data.events));
    // }, []);
    //
    // useMemo(() => {
    //     if(resItems){
    //         setData(resItems.slice(1,50));
    //         setLoading(false);
    //     }
    //
    // }, [resItems]);




    const renderHeader = () => {
        return (
            <thead>
            <tr>
                {/*<form id={"id"} onSubmit={handleSubmit}>*/}
                {headers.map(header => {
                    return (
                        <th key={header.nameE}>
                            {header.name}
                            {header.input?
                                <label>
                                    <input type="text" id={header.nameE} ref={header.ref}/>
                                </label>:null
                            }
                            {header.input2?
                                <label>
                                    <input type="text" id={header.nameE} value={header.value2} onChange={header.change2}/>
                                </label>:null
                            }
                            {header.select?
                                <select value={header.svalue} onChange={header.schange}>
                                    <option value={null}>Все</option>
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select>:null
                            }
                        </th>
                    );
                })}

                {/*</form>*/}
            </tr>
            </thead>

        );
    };
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
    const filterText = (item) => {
        if (String(item.camera_id).includes(camera.current.value)) {
            return true
        }
    }


    // const filt = () => {
    //     let minTimeStamp
    //     let maxTimeStamp
    //     console.log("Nen")
    //     if (!!filter.timestampMin) {
    //         const minTime = filter.timestampMin.split(".")
    //         minTimeStamp = new Date(minTime[2], minTime[1], minTime[0]).getTime() / 1000
    //
    //     }
    //     if (!!filter.timestampMax) {
    //         const maxTime = filter.timestampMax.split(".")
    //         maxTimeStamp = new Date(maxTime[2], maxTime[1], maxTime[0]).getTime() / 1000
    //     }
    //
    //     return data.filter((item) => {
    //         if (!!filter.label) {
    //             item.items = filterType(item.items, filter.label)
    //         }
    //         if (typeof filter.accuracy == "boolean") {
    //             item.items = filterSuc(item.items, filter.accuracy)
    //         }
    //
    //         console.log(filterTime(item,minTimeStamp,maxTimeStamp))
    //         return filterText(item)&&filterTime(item,minTimeStamp,maxTimeStamp)&&Array.isArray(item.items)
    //     })
    // }

    const filt = () => {
        let minTimeStamp
        let maxTimeStamp
        console.log("Nen")
        if (!!filter.timestampMin) {
            const minTime = filter.timestampMin.split(".")
            minTimeStamp = new Date(minTime[2], minTime[1], minTime[0]).getTime() / 1000

        }
        if (!!filter.timestampMax) {
            const maxTime = filter.timestampMax.split(".")
            maxTimeStamp = new Date(maxTime[2], maxTime[1], maxTime[0]).getTime() / 1000
        }

        return data.filter((item) => {
            if (!!filter.label) {
                item.items = filterType(item.items, filter.label)
            }
            if (typeof filter.accuracy == "boolean") {
                item.items = filterSuc(item.items, filter.accuracy)
            }

            console.log(filterTime(item,minTimeStamp,maxTimeStamp))
            return filterText(item)&&filterTime(item,minTimeStamp,maxTimeStamp)&&Array.isArray(item.items)
        })
    }


    const filterType = (arr, label) => {
        return arr.filter((item) => item.label == label)
    }

    const filterSuc = (arr, accuracy) => {
        return arr.filter((item) => (item.accuracy >= 0.85 && accuracy) || (item.accuracy < 0.85 && !accuracy))
    }


    const filterTime = (item, min, max) => {
        console.log(min,max,item.timestamp)
        if (!!min && !!max && min < item.timestamp < max) {
            return true
        }
        if (!min && !!max && item.timestamp < max) {
            return true
        }
        if (!!min && !max && min<item.timestamp) {
            return true
        }
    }




    return (

        <div className={styles.container}>
            {/*<input type="text" ref={refContainer} />*/}
            {/*<button onClick={() => console.log(refContainer)}>444444</button>*/}
            <button onClick={() => setTable(!table)}>
                {table ? "Карта" : "Таблица"}
            </button>
            {loading?
                table?
                    <Table events={data} time={time} submit={handleSubmit} filterText={filterText} renderHeader={renderHeader}/> : <MapY events={data} time={time}/>:null}

        </div>

    )
}

export default Home;




