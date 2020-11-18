
import React, {useEffect, useState} from "react";
import {Image, Layer, Rect, Stage} from "react-konva";
import useImage from "use-image";

export default function ImageItem({image, items, setModal, setOpen}) {

let config ={color:"green", width:320, height:180}

    if(!Array.isArray(items)){
        if(items.accuracy>=0.85){
            console.log("green")

            config.color="green"
        }else{
            config.color="red"
            console.log("red")
        }
        config.width=640
        config.height=360
    }

    const openModal=(image, item)=>{
        setModal({image:image,item:item})
        setOpen(true)
    }


    const URLImage = ({img}) => {
        const [image] = useImage(img);
        return <Image image={image} width={config.width} height={config.height}/>;
    };



    return (
        // <div style={{width: "20px"}}>
        <Stage width={config.width} height={config.height}>
            <Layer>
                <URLImage img={image} width={config.width} height={config.height}/>
                {Array.isArray(items)?items.map(item => {
                    return <Rect
                        key={item.x}
                        x={item.x/6}
                        y={item.y/6}
                        width={item.w/6}
                        height={item.h/6}
                        stroke={item.label==="LP"?"blue":"orange"}
                        onclick={()=>openModal(image,item)}
                    />
                }):<Rect
                    key={items.x}
                    x={items.x/3}
                    y={items.y/3}
                    width={items.w/3}
                    height={items.h/3}
                    stroke={config.color}
                />}
            </Layer>
        </Stage>
        // </div>
    );
}
