import Row from "./Row";
import React, {useState} from "react";

const styles = {
    pagesNumber: {
        listStyle: "none",
        display: "flex",
        color: "blue",
        userSelect: "none",
        cursor: "pointer",
    }
};
export default function Table({ events,time, submit, renderHeader}) {

    const [id, setId]=useState("")

    const changeIdFilter =(e)=>{
        console.log(e.target.value)
        setId(e.target.value)
    }


    return (
        <div>

            <button onClick={submit}>Фильтровать</button>
            <table>
                {renderHeader()}

                <tbody>


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
