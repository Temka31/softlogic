import {useEffect, useRef, useState} from "react";
import React from "react"
import {Stage, Layer, Rect, Circle, Image} from 'react-konva';
import useImage from 'use-image';

export default function Row({event,time}) {
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
        let query = {lat: lat, lon: lon};
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
        console.log(event)
        fetch(url, options)
            .then(response => response.json())
            .then(result => setAddress(result.suggestions[0].value))
            .catch(error => console.log("error", error));
    }

// decode(event.latitude,event.longitude)



    const URLImage = ({img}) => {
        // console.log(img)
        const [image] = useImage(img);
        return <Image image={image}/>;
    };


    const renderImg = (image, items) => {
        return (
            <Stage width={200} height={200}>
                <Layer>
                    <URLImage img={image}/>
                    {items.map(item => {
                        return <Rect
                            key={item.x}
                            x={item.x}
                            y={item.y}
                            width={item.w}
                            height={item.h}
                            stroke="black"
                            onclick={() => alert(2)}
                        />
                    })}
                </Layer>
            </Stage>
        )

    }

    return (
        <tr id={event.id}
            // onClick={handleClick}
        >
            {/*{console.log(event)}*/}
            <td style={styles.root}>{event.id}</td>
            <td style={styles.root}>{event.camera_id}</td>
            <td style={styles.root}>{time(event.timestamp)}</td>
            <td style={styles.root}>{address}</td>
            <td style={styles.root}>
                {renderImg(event.image, event.items)}
            </td>

        </tr>

    );
}
