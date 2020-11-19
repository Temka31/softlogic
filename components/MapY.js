import {YMaps, Map, Placemark} from 'react-yandex-maps';
import React from "react";


const MapY = ({events, setModal,setOpen}) => {

    const openModal=(item)=>{
      setModal({image:item.image, item:item.items, time:item.timestamp, camera:item.camera_id})
        setOpen(true)
    }


    const renderPlacemark = () => {
        return events.map((item) => {
                return <Placemark key={item.id} geometry={[item.latitude, item.longitude]}
                                  onClick={()=>openModal(item)}/>
            }
        )
    }

    return (
        <YMaps>
                <Map defaultState={{center: [55.75, 37.57], zoom: 6}}>
                    {renderPlacemark()}
                </Map>
        </YMaps>
    )
};

export default MapY