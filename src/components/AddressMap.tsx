import { useEffect, useRef } from 'react';
import { Button, message } from 'antd';
import { AimOutlined } from '@ant-design/icons';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
export type MapLocation={lat:number;lng:number};
export default function AddressMap({value,onChange}:{value?:MapLocation;onChange:(location:MapLocation)=>void}){
 const container=useRef<HTMLDivElement>(null);const map=useRef<L.Map|null>(null);const marker=useRef<L.Marker|null>(null);const callback=useRef(onChange);callback.current=onChange;
 useEffect(()=>{if(!container.current)return;const start=value||{lat:11.5564,lng:104.9282};const instance=L.map(container.current).setView(start,13);map.current=instance;
 L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',{attribution:'&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',maxZoom:19}).addTo(instance);
 const pin=L.divIcon({className:'address-map-pin',html:'<span></span>',iconSize:[24,32],iconAnchor:[12,32]});
 const select=(point:MapLocation)=>{if(!marker.current){marker.current=L.marker(point,{icon:pin,draggable:true}).addTo(instance);marker.current.on('dragend',()=>{const p=marker.current!.getLatLng();callback.current({lat:p.lat,lng:p.lng})})}else marker.current.setLatLng(point);callback.current(point)};
 if(value)select(value);instance.on('click',e=>select({lat:e.latlng.lat,lng:e.latlng.lng}));const timer=setTimeout(()=>instance.invalidateSize(),200);
 return()=>{clearTimeout(timer);instance.remove();map.current=null;marker.current=null};
 },[]);
 useEffect(()=>{if(value&&map.current){map.current.setView(value,16);if(marker.current)marker.current.setLatLng(value);else map.current.fire('click',{latlng:L.latLng(value.lat,value.lng)})}},[value?.lat,value?.lng]);
 const locate=()=>{if(!navigator.geolocation){message.error('Location is unavailable in this browser');return}navigator.geolocation.getCurrentPosition(p=>callback.current({lat:p.coords.latitude,lng:p.coords.longitude}),()=>message.error('Could not access your location. Select a point on the map instead.'))};
 return <div><div className="address-map-toolbar"><span>Click the map to place a pin. Drag it to adjust.</span></div><div className="address-map-wrapper"><div ref={container} className="address-map-canvas"/><Button className="address-map-locate" icon={<AimOutlined/>} onClick={locate}>Use my location</Button></div>{value&&<p className="address-map-coordinates">Selected location: {value.lat.toFixed(6)}, {value.lng.toFixed(6)}</p>}</div>
}
