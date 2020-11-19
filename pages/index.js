import styles from '../styles/Home.module.css'
import Table from "../components/table";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react"
import MapY from "../components/MapY";
import SimpleModal from "../components/modal";
import SimplePopper from "../components/poper";


function Home() {
    const camera = useRef();
    const label = useRef();
    const minTime = useRef();
    const maxTime = useRef();
    const accuracy = useRef()



    const handleSubmit = (e) => {
        console.log(filt())
        console.log(123)
        e.preventDefault();
    }
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [loading, setLoading] = useState(true)
    const [pageItem, setPageItem] = useState({start: 0, end: 30})
    const [table, setTable] = useState(true)
    const [itemModal, setItemModal]=useState({})
    const headers = [
        {name: "Номер", nameE: "id"},
        {name: "Камера", nameE: "camera_id", input: true, ref: camera},
        {name: "Время", nameE: "timeMin", nameE2: "timemax", input: true, input2: true, ref: minTime, ref2: maxTime},
        {name: "Адрес", nameE: "Address"},
        {name: "Миниатюра", nameE: "image", input: true, select: true, ref: label, sref: accuracy},

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

    useEffect(() => {
        setLoading(true)
        fetch(
            url,
        )
            .then(response => response.json())
            .then(data => setResItems(data.events));
    }, []);

    useMemo(() => {
        if (resItems) {
            setData(resItems.slice(pageItem.start, pageItem.end));
            setLoading(false);
        }

    }, [resItems, pageItem]);


    const renderHeader = () => {
        return (
            <thead>
            <tr>
                {/*<form id={"id"} onSubmit={handleSubmit}>*/}
                {headers.map(header => {
                    return (
                        <th key={header.nameE}>
                            {header.name}
                            {header.input ?
                                <label>
                                    <input type="text" id={header.nameE} ref={header.ref}/>
                                </label> : null
                            }
                            {header.input2 ?
                                <label>
                                    <input type="text" id={header.nameE} ref={header.ref2}/>
                                </label> : null
                            }
                            {header.select ?
                                <select ref={header.sref}>
                                    <option value={null}>Все</option>
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select> : null
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

        //Дикий костыль
        let acc
        if (accuracy.current.value === "Все") {
            acc = null
        } else if (accuracy.current.value === "true") {
            acc = true
        } else {
            acc = false
        }

        if (!!minTime.current.value) {
            const minTime = minTime.current.value.split(".")
            minTimeStamp = new Date(minTime[2], minTime[1], minTime[0]).getTime() / 1000

        }
        if (!!maxTime.current.value) {
            const maxTime = maxTime.current.value.split(".")
            maxTimeStamp = new Date(maxTime[2], maxTime[1], maxTime[0]).getTime() / 1000
        }

        return data.filter((item) => {
            if (!!label.current.value) {
                item.items = filterType(item.items, label.current.value)
            }

            if (typeof acc == "boolean") {
                item.items = filterSuc(item.items, acc)
            }

            return filterText(item) && filterTime(item, minTimeStamp, maxTimeStamp) && item.items.length > 0
        })
    }


    const filterType = (arr, label) => {
        return arr.filter((item) => item.label == label)
    }

    const filterSuc = (arr, accuracy) => {
        return arr.filter((item) => (item.accuracy >= 0.85 && accuracy) || (item.accuracy < 0.85 && !accuracy))
    }


    const filterTime = (item, min, max) => {
        if (!min && !max) {
            return true
        }
        if (!!min && !!max && min < item.timestamp < max) {
            return true
        }
        if (!min && !!max && item.timestamp < max) {
            return true
        }
        if (!!min && !max && min < item.timestamp) {
            return true
        }

    }

    const handleNext = () => {
        setPageItem({start: pageItem.end, end: pageItem.end + 30});
    }
    const handleBack = () => {
        setPageItem({start: pageItem.start - 30, end: pageItem.start});
    }


const renderButton=()=>{
        return(
            <div>
    {pageItem.start >= 30 ? <button onClick={handleBack}>Предыдущие</button> : null}

    <button onClick={handleNext}>Следующие</button>
            </div>
)
}

    const renderTable = () => {
        return (<div>
                <Table events={data} time={time} submit={handleSubmit} filterText={filterText}
                       renderHeader={renderHeader} setModal={setItemModal} setOpen={setOpen}/>
                {renderButton()}

            </div>
        )
    }

    const renderMap=()=>{
        return(<div>
            <MapY events={data} time={time} setModal={setItemModal} setOpen={setOpen} />
        {renderButton()}
        </div>
        )

    }
    return (

        <div className={styles.container}>
            <button onClick={() => setTable(!table)}>
                {table ? "Карта" : "Таблица"}
            </button>
            {!loading ?
                table ?
                    renderTable() : renderMap() : null}
            <SimpleModal item={itemModal} open={open} setOpen={setOpen} time={time}/>
            {/*<SimplePopper anchorEl={anchorEl} setAnchorEl={setAnchorEl}/>*/}
        </div>

    )
}

export default Home;




