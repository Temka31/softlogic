import Row from "./Row";
import {useState} from "react";
const styles = {
    pagesNumber: {
        listStyle: "none",
        display: "flex",
        color: "blue",
        userSelect: "none",
        cursor: "pointer",
    }
};
export default function Table({ events,time, filterText}) {

    const [id, setId]=useState("")

    const changeIdFilter =(e)=>{
        console.log(e.target)
        setId(e.target.value)
    }

    const handleIdSubmit=(e)=>{
        console.log(e.target[0].id)
        filterText(id, e.target[0].id)
        e.preventDefault();
    }

    return (
        <div>
            <form id={"id"} onSubmit={handleIdSubmit}>
                <label>
                    Имя:
                    <input type="text" id={"id"} value={id} onChange={changeIdFilter} />
                </label>
                <input type="submit" value="Фильтровать" />
            </form>
            <table>
                {/*{renderHeader()}*/}

                <tbody>
                {/*{console.log({events})}*/}

                {events.map(event => (
                    <Row key={event.id} event={event} time={time}/>
                ))}

                </tbody>
            </table>
            <ul style={styles.pagesNumber}>
                {/*{renderPageNumbers}*/}
            </ul>
        </div>
    );
}
