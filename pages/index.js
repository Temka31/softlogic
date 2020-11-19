import Table from "../components/table";
import {useEffect, useMemo, useRef, useState} from "react";
import React from "react"
import MapY from "../components/MapY";
import SimpleModal from "../components/modal";
import Button from '@material-ui/core/Button';


function Home() {
    const styles = {
        root: {
            margin: 0,
            width: "100%"
        },
        header: {
            border: "1px solid grey",
            width: "20%"
        },
        button: {
            position: "relative",
            left: "50%",
            transform: "translate(-50%, 0)",
            margin: 10
        },
        buttonPrew: {
            position: "relative",
            left: "50%",
            transform: "translate(-100%, 0)",
            margin: 10
        }
    };
    const camera = useRef();
    const label = useRef();
    const minTimeI = useRef();
    const maxTimeI = useRef();
    const accuracy = useRef()


    const handleSubmit = (e) => {
        filter()
        e.preventDefault();
    }
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(true)
    const [pageItem, setPageItem] = useState({start: 0, end: 30})
    const [table, setTable] = useState(true)
    const [filterItems, setFilterItems] = useState()
    const [itemModal, setItemModal] = useState({})
    const headers = [
        {name: "Номер", nameE: "id"},
        {name: "Камера", nameE: "camera_id", input: true, ref: camera},
        {
            name: "Время",
            nameE: "min dd.mm.yyyy",
            nameE2: "max dd.mm.yyyy",
            input: true,
            input2: true,
            ref: minTimeI,
            ref2: maxTimeI
        },
        {name: "Адрес", nameE: "Address"},
        {name: "Миниатюра", nameE: "label LP || SIGN", input: true, select: true, ref: label, sref: accuracy},

    ];
    const [data, setData] = useState()
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
        if (filterItems) {
            setData(filterItems.slice(pageItem.start, pageItem.end));
        } else if (resItems) {
            setData(resItems.slice(pageItem.start, pageItem.end));
            setLoading(false);
        }

    }, [resItems, pageItem, filterItems]);


    const renderHeader = () => {
        return (
            <tr>
                {headers.map(header => {
                    return (
                        <th style={styles.header} key={header.nameE}>
                            {header.name}
                        </th>
                    );
                })}
            </tr>
        );
    };

    const renderFilter = () => {
        return (
            <tr>
                {headers.map((header) => {
                    return (
                        <th style={styles.header} key={header.nameE}>
                            {header.input ?
                                <label>
                                    <input type="text" placeholder={header.nameE} id={header.nameE} ref={header.ref}/>
                                </label> : null
                            }
                            {header.input2 ?
                                <label>
                                    <input type="text" id={header.nameE2} placeholder={header.nameE2}
                                           ref={header.ref2}/>
                                </label> : null
                            }
                            {header.select ?
                                <select ref={header.sref}>
                                    <option value={null}>Все</option>
                                    <option value={true}>true</option>
                                    <option value={false}>false</option>
                                </select> : null
                            }
                        </th>)
                })}

            </tr>
        )
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

    const filter = () => {
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
        if (!!minTimeI.current.value) {
            const minTime = minTimeI.current.value.split(".")
            minTimeStamp = new Date(minTime[2], minTime[1], minTime[0]).getTime() / 1000

        }
        if (!!maxTimeI.current.value) {
            const maxTime = maxTimeI.current.value.split(".")
            maxTimeStamp = new Date(maxTime[2], maxTime[1], maxTime[0]).getTime() / 1000
        }

        const newItems = JSON.parse(JSON.stringify(resItems));
        let dataFilter = newItems.filter((item) => {
            if (!!label.current.value) {
                item.items = filterType(item.items, label.current.value)
            }

            if (typeof acc == "boolean") {
                item.items = filterSuc(item.items, acc)
            }

            return filterText(item) && filterTime(item, minTimeStamp, maxTimeStamp) && item.items.length > 0
        })
        setFilterItems(dataFilter)
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
        if (!!min && !!max && min < item.timestamp && item.timestamp < max) {
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


    const renderButton = () => {
        return (
            <div>
                {pageItem.start >= 30 ?
                    <Button style={styles.buttonPrew} variant="contained" onClick={handleBack}>Предыдущие</Button> :
                    <Button style={styles.buttonPrew} variant="contained" disabled
                            onClick={handleBack}>Предыдущие</Button>}

                <Button style={styles.buttonPrew} variant="contained" onClick={handleNext}>Следующие</Button>
            </div>
        )
    }

    const renderTable = () => {
        return (<div>
                <Button style={styles.button} variant="contained" onClick={() => setTable(!table)}>
                    {table ? "Карта" : "Таблица"}
                </Button>
                <br></br>
                <Button variant="contained" color="primary" style={styles.button}
                        onClick={handleSubmit}>Фильтровать</Button>
                <Table events={data} time={time}
                       renderHeader={renderHeader} renderFilter={renderFilter} setModal={setItemModal}
                       setOpen={setOpen}/>
                {renderButton()}

            </div>
        )
    }

    const renderMap = () => {
        return (<div>
                <Button style={styles.button} variant="contained" onClick={() => setTable(!table)}>
                    {table ? "Карта" : "Таблица"}
                </Button>
                <MapY events={data} time={time} setModal={setItemModal} setOpen={setOpen}/>

                {/*ТУТ передаются все 10к событий, честно страшно такое грузить) */}
                {/*Можете верхнюю закоментить и эту раскоментить, но мне на моем железе не удалось прогрузить столько точек*/}

                {/*<MapY events={resItems} time={time} setModal={setItemModal} setOpen={setOpen}/>*/}
                {renderButton()}
            </div>
        )

    }
    return (

        <div className={styles.container}>
            {!loading ?
                table ?
                    renderTable() : renderMap() : "Загрузка..."}
            <SimpleModal item={itemModal} open={open} setOpen={setOpen} time={time}/>
        </div>

    )
}

export default Home;




