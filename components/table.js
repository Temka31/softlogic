import Row from "./Row";
import React from "react";

export default function Table({events, time, renderHeader, setModal, setOpen, renderFilter}) {


    return (
        <div>

            <table>
                <thead>
                {renderHeader()}
                {renderFilter()}
                </thead>
                <tbody>
                {events.map(event => (
                    <Row key={event.id} event={event} time={time} setModal={setModal} setOpen={setOpen}/>
                ))}
                </tbody>
            </table>
        </div>
    );
}
