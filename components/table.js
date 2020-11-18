import Row from "./Row";
import React, {useState} from "react";

export default function Table({events, time, submit, renderHeader, setModal, setOpen}) {


    return (
        <div>
            <button onClick={submit}>Фильтровать</button>
            <table>
                {renderHeader()}
                <tbody>
                {events.map(event => (
                    <Row key={event.id} event={event} time={time} setModal={setModal} setOpen={setOpen}/>
                ))}

                </tbody>
            </table>
        </div>
    );
}
