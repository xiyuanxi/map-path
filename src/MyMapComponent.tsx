import * as React from "react";
import {  GoogleMap, Polyline, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';

class MyMapComponent extends React.Component {
    state = {
        pathData: [],
        step: -1
    };

    defaultCenter = { date: 'none', lat: 43.6, lng: -79.64 }
        
    proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    private apiUrl = "http://www.followmee.com/api/tracks.aspx?key=98809aec147567aec9e9864651813f24&username=peakpower&output=json&function=historyfordevice&history=1&deviceid=12095698"
    demoData = {"Data":[{"Date":"2019-01-30T11:11:30-06:00","Latitude":33.60847,"Longitude":-117.69870,"Type":"GPS","Speed(mph)":74,"Speed(km/h)":119,"Direction":116,"Altitude(ft)":350,"Altitude(m)":107,"Accuracy":5},{"Date":"2019-01-30T12:12:52-06:00","Latitude":33.59857,"Longitude":-117.67770,"Type":"GPS","Speed(mph)":61,"Speed(km/h)":98,"Direction":118,"Altitude(ft)":377,"Altitude(m)":115,"Accuracy":10},{"Date":"2019-01-30T12:14:38-06:00","Latitude":33.57962,"Longitude":-117.67200,"Type":"GPS","Speed(mph)":74,"Speed(km/h)":119,"Direction":180,"Altitude(ft)":331,"Altitude(m)":101,"Accuracy":5},{"Date":"2019-01-30T12:16:07-06:00","Latitude":33.55779,"Longitude":-117.67320,"Type":"GPS","Speed(mph)":69,"Speed(km/h)":111,"Direction":178,"Altitude(ft)":262,"Altitude(m)":80,"Accuracy":5},{"Date":"2019-01-30T12:17:23-06:00","Latitude":33.53814,"Longitude":-117.67500,"Type":"GPS","Speed(mph)":65,"Speed(km/h)":105,"Direction":178,"Altitude(ft)":209,"Altitude(m)":64,"Accuracy":87},{"Date":"2019-01-30T12:18:25-06:00","Latitude":33.51956,"Longitude":-117.66550,"Type":"GPS","Speed(mph)":65,"Speed(km/h)":105,"Direction":160,"Altitude(ft)":170,"Altitude(m)":52,"Accuracy":5},{"Date":"2019-01-30T12:19:36-06:00","Latitude":33.49892,"Longitude":-117.65860,"Type":"GPS","Speed(mph)":72,"Speed(km/h)":116,"Direction":186,"Altitude(ft)":88,"Altitude(m)":27,"Accuracy":5},{"Date":"2019-01-30T12:21:33-06:00","Latitude":33.47911,"Longitude":-117.67210,"Type":"GPS","Speed(mph)":73,"Speed(km/h)":117,"Direction":214,"Altitude(ft)":118,"Altitude(m)":36,"Accuracy":5}]}

    private InternalMap = props => {
        let currentLoc = this.state.step == -1? this.defaultCenter:this.state.pathData[this.state.step]
        return (<GoogleMap defaultZoom={11} defaultCenter={this.defaultCenter} center={this.state.step == -1? this.defaultCenter : this.state.pathData[this.state.step]}>
            <Polyline path={this.state.pathData.slice(0, this.state.step + 1)} />
            <Marker key={currentLoc.date}  position={{ lat : currentLoc.lat, lng : currentLoc.lng}} />
        </GoogleMap>);
    };

    private MapHoc = withScriptjs(withGoogleMap(this.InternalMap));

    handleClick = () => {
        if (this.state.pathData.length == 0) {
            fetch(this.proxyUrl + this.apiUrl)
                .then(data => data.json())
                .then(data => {
                    console.table(data);
                    // !!! Error: "DeviceID not valid for your user name. Or your device is in free license and API does not work with free license"__proto__: Object
                    // use demo data to do testing
                    data = this.demoData.Data;
                    console.table(data);
                    return data;
                })
                .then(data => data.map((d: any) => { return { date: d.Date, lat: d.Latitude, lng: d.Longitude } }))
                .then(data => { 
                    console.table(data); 
                    this.setState({ pathData: data, step: 0 }); 
                })
                .catch(e => {
                    console.log(e);
                    return e;
                });
        } else {
            this.setState({ step: ((this.state.step + 1) % this.state.pathData.length) })
            console.log(this.state.step);
        }
    }

    render() {

        return (<div>
            <this.MapHoc
                googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDq2gbbHtbzWzs3FFLp94bHyJYb4rloisU&v=3.exp&libraries=geometry,drawing,places"
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `500px` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            /> <br /><br /><br />
            <button style={{width:'300px', height:'50px'}} onClick={this.handleClick}>STEP BY STEP</button>
        </div>
        );
    }
}

export default MyMapComponent;