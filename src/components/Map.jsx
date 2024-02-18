import React, { useEffect, useState, useRef, useContext } from 'react'
import { Link } from 'react-router-dom';
import {MapContainer, TileLayer, Marker, Popup} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet';

import { GlobalContext } from '../contexts/GlobalContext';

import icon from '../assets/icons/map-marker-outlined-svgrepo-com.svg'
import selectedIcon from '../assets/icons/map-marker-svgrepo-com.svg'



function Map({places, suggest, interactive}) {

    const {selectedPlace, setBounds, bounds} = useContext(GlobalContext)

    const mapRef = useRef()

    const [averageLat, setAverageLat] = useState(null)
    const [averageLong, setAverageLong] = useState(null)
    const [isLoaded, setIsLoaded] = useState(false)




    useEffect(() => {

        let totalLat = 0;
        let totalLong = 0;
        if (places.length > 0) {
            for (let i = 0; i < places.length; i++) {
                totalLat += parseFloat(places[i].place_lat);
                totalLong += parseFloat(places[i].place_long);
            }
    
            setAverageLat(totalLat / places.length)
            setAverageLong(totalLong / places.length)

            
            if (mapRef.current && places.length > 0 && !interactive) {
                const bounds = places.reduce((acc, place) => {
                  acc.push([place.place_lat, place.place_long]);
                  return acc;
                }, []);
          
                mapRef.current.fitBounds(bounds);
              }
        }else{
            
            if(places.length !== 0 ){
                setAverageLat(places.place_lat)
                setAverageLong(places.place_long) 
            }else{
                setAverageLat(48.00774632090103)
                setAverageLong(0.19736360674464284)
            }
            
        }
    }, [places])

    const customMarker = new L.Icon({
        iconUrl: icon,
        iconSize: [32, 32],
        iconAnchor: [16, 32],
        popupAnchor: [0, -32],
      })
      
      const selectedMarker = new L.Icon({
        iconUrl: selectedIcon,
        iconSize: [38, 38],
        iconAnchor: [20, 38],
        popupAnchor: [0, -32],
      })
      useEffect(() => {
        if(averageLat && averageLong) setIsLoaded(true)

      }, [averageLat, averageLong])

    useEffect(() => {
        
        if (mapRef.current) {
            const map = mapRef.current

            map.on('moveend', handleMoveEnd);
            
        }
        
    }, [mapRef.current]);

    const handleMoveEnd = () => {
        if (mapRef.current) {
            const map = mapRef.current
            setBounds(map.getBounds())
        }
    };

    // useEffect(() => {
    //     console.log("map bounds ", bounds)
    // }, [bounds])


    

  return (
    <div className='mapContainer'>
        {
            isLoaded ? 
            <MapContainer center={[averageLat, averageLong]} ref={mapRef} zoom={15} scrollWheelZoom={false} className='map'>
                    <TileLayer
                    attribution={`&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors`}
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    { 
                    places.length ? 
                        places.map((place, index) => (
                            <Marker key={index} position={[place.place_lat, place.place_long]} icon={selectedPlace === place.id ? selectedMarker : customMarker}>
                                <Popup>
                                    <h2>{place.place_name}</h2>
                                    <p>{place.place_description.substr(1, 150)}{place.place_description.length > 150 ? ' [...]' : null}</p>
                                    <Link to="/lieu" state={place}>Visiter la page</Link>
                                </Popup>
                            </Marker>
                        ))
                    : 
                        (places.length !== 0 &&
                        <Marker position={[places.place_lat, places.place_long]} icon={selectedMarker}>
                            <Popup>
                                <h2>{places.place_name}</h2>
                                <p>{places.place_description.substr(1, 150)}{places.place_description.length > 150 ? ' [...]' : null}</p>
                                <Link to="/lieu" state={places}>Visiter la page</Link>
                            </Popup>
                        </Marker>
                            )
                        
                    }
                    {
                        suggest ? 
                            suggest.map((place, index) => (
                                <Marker key={index} position={[place.place_lat, place.place_long]} icon={selectedPlace === place.id ? selectedMarker : customMarker}>
                                    <Popup>
                                        <h2>{place.place_name}</h2>
                                        <p>{place.place_description.substr(1, 150)}{place.place_description.length > 150 ? ' [...]' : null}</p>
                                        <Link to="/lieu" state={place}>Visiter la page</Link>
                                    </Popup>
                                </Marker>
                            ))
                        :
                            null
                    }
                    
                </MapContainer>
            :
            null

        }
        
    </div>
  )
}

export default Map