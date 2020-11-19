import {useEffect, useState} from "react";
import React from "react"
import ImageItem from "./ImageItem";


export default function Row({event, time, setModal, setOpen}) {


    const styles = {
        root: {
            border: "1px solid grey",
            width: "20%"
        }
    };

    const [address, setAddress] = useState("Декодирование")
    const decode = (lat, lon) => {
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        let token = "04a5cd9fd5bd68bf59266d3d20eebda8b1fc7026";
        let query = {lat: lat, lon: lon, radius_meters:1000};
        console.log(query)
        let options = {
            method: "POST",
            mode: "cors",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Token " + token
            },
            body: JSON.stringify(query)
        }
        fetch(url, options)
            .then(response => response.json())
            .then(result => setAddress(result.suggestions[0].value))
            .catch(error => console.log("error", error));
    }

    useEffect(() => {
        decode(event.latitude, event.longitude)
    }, []);

    return (
        <>
            <tr id={event.id}
            >

                <td style={styles.root}>{event.id}</td>
                <td style={styles.root}>{event.camera_id}</td>
                <td style={styles.root}>{time(event.timestamp)}</td>
                <td style={styles.root}>{address}</td>
                <td style={styles.root}>
                    <ImageItem image={event.image} items={event.items} setModal={setModal} setOpen={setOpen}/>
                </td>

            </tr>

        </>
    );
}
