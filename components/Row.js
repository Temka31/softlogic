import {useEffect, useRef, useState} from "react";
import React from "react"
import { Stage, Layer, Rect, Circle, Image } from 'react-konva';
import useImage from 'use-image';

export default function Row({event}) {
    const styles = {
        root: {
            border: "1px solid grey",
            width: "20%"
        }
    };

    const [address,setAddress]=useState("Декодирование")
    const  decode=(lat,lon) =>{
        let url = "https://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address";
        let token = "04a5cd9fd5bd68bf59266d3d20eebda8b1fc7026";
        let query = { lat: lat, lon: lon };
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
            .then(result => setAddress(result.suggestions[0].value) )
            .catch(error => console.log("error", error));
    }

// decode(event.latitude,event.longitude)
const time=(unix)=>{
    let date = new Date(unix * 1000);
    let d = date.getDate()
    let m = date.getMonth()
    let y=date.getFullYear()
    let h = date.getHours()
    let min = date.getMinutes()
    let sec = date.getSeconds()
    return `${d}-${m}-${y} ${h}:${min}:${sec}`
}



    // const canvasRef = useRef(null)

    // const draw = (ctx, image, obj) => {
    //     let img = new Image(100,100)
    //     img.src = "https://images.ua.prom.st/1440764527_saharnaya-kartinka-lyubov.jpg"
    //     img.onload=()=>{
    //         ctx.drawImage(img,0,0);
    //         ctx.beginPath()
    //         obj.map((item)=>{
    //             console.log(item.object)
    //             if(!!item.object){
    //             ctx.fillStyle = '#000000'
    //             }else{
    //                 ctx.fillStyle = '#fff'
    //             }
    //             ctx.strokeRect(item.x,item.y,item.w,item.h)
    //             ctx.addHitRegion({id: "test"});
    //         })
    //         ctx.fill()
    //     }
    // }

    // useEffect(() => {
    //     const canvas = canvasRef.current
    //     const context = canvas.getContext('2d')
    //     draw(context, event.image, event.items )
    // }, [draw])





    const URLImage = ({img}) => {
        console.log(img)
        const [image] = useImage(img);
        return <Image image={image} />;
    };


const renderImg=(image, items)=>{
        return(
            <Stage width={200} height={200}>
                <Layer>
                <URLImage img={image} />
                    {items.map(item=>{
                        return <Rect
                            x={item.x}
                            y={item.y}
                            width={item.w}
                            height={item.h}
                            stroke="black"
                            onclick={()=>alert(2)}
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
            {console.log(event)}
            <td style={styles.root}>{event.id}</td>
            <td style={styles.root}>{event.camera_id}</td>
            <td style={styles.root}>{time(event.timestamp)}</td>
            <td style={styles.root}>{address}</td>
            <td style={styles.root}>
                {/*<canvas ref={canvasRef} onClick={(e)=>{*/}
                {/*    console.log(e.region)*/}
                {/*}}/>*/}
                {renderImg(event.image,event.items)}

            </td>
            {/*<td style={styles.root}>{item.phone}</td>*/}

        </tr>

    );
}
