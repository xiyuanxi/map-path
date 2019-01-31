import * as React from "react";
import {  GoogleMap, Polyline, withGoogleMap, withScriptjs, Marker } from 'react-google-maps';

class MyMapComponent extends React.Component {
    state = {
        pathData: [],
        step: -1
    };

    defaultCenter = { date: 'none', lat: 43.6, lng: -79.64 }
        
    proxyUrl = 'https://cors-anywhere.herokuapp.com/'
    //private apiUrl = "http://www.followmee.com/api/tracks.aspx?key=98809aec147567aec9e9864651813f24&username=peakpower&output=json&function=historyfordevice&history=1&deviceid=12095698"
    private apiUrl = "http://www.followmee.com/api/tracks.aspx?key=d0f06aa62d5b3ed5c50cc805f3c337a9&username=demo99&output=json&function=historyfordevice&history=1&deviceid=10000005"
    demoData = {"Data":[{"Date":"2019-01-30T18:30:18-06:00","Latitude":33.60847,"Longitude":-117.69870,"Type":"GPS","Speed(mph)":74,"Speed(km/h)":119,"Direction":116,"Altitude(ft)":350,"Altitude(m)":107,"Accuracy":5},{"Date":"2019-01-30T19:32:03-06:00","Latitude":33.59857,"Longitude":-117.67770,"Type":"GPS","Speed(mph)":61,"Speed(km/h)":98,"Direction":118,"Altitude(ft)":377,"Altitude(m)":115,"Accuracy":10},{"Date":"2019-01-30T19:33:30-06:00","Latitude":33.57962,"Longitude":-117.67200,"Type":"GPS","Speed(mph)":74,"Speed(km/h)":119,"Direction":180,"Altitude(ft)":331,"Altitude(m)":101,"Accuracy":5},{"Date":"2019-01-30T19:34:48-06:00","Latitude":33.55779,"Longitude":-117.67320,"Type":"GPS","Speed(mph)":69,"Speed(km/h)":111,"Direction":178,"Altitude(ft)":262,"Altitude(m)":80,"Accuracy":5},{"Date":"2019-01-30T19:36:29-06:00","Latitude":33.53814,"Longitude":-117.67500,"Type":"GPS","Speed(mph)":65,"Speed(km/h)":105,"Direction":178,"Altitude(ft)":209,"Altitude(m)":64,"Accuracy":87},{"Date":"2019-01-30T19:37:51-06:00","Latitude":33.51956,"Longitude":-117.66550,"Type":"GPS","Speed(mph)":65,"Speed(km/h)":105,"Direction":160,"Altitude(ft)":170,"Altitude(m)":52,"Accuracy":5},{"Date":"2019-01-30T19:39:19-06:00","Latitude":33.49892,"Longitude":-117.65860,"Type":"GPS","Speed(mph)":72,"Speed(km/h)":116,"Direction":186,"Altitude(ft)":88,"Altitude(m)":27,"Accuracy":5},{"Date":"2019-01-30T19:40:49-06:00","Latitude":33.47911,"Longitude":-117.67210,"Type":"GPS","Speed(mph)":73,"Speed(km/h)":117,"Direction":214,"Altitude(ft)":118,"Altitude(m)":36,"Accuracy":5},{"Date":"2019-01-30T19:41:53-06:00","Latitude":33.46255,"Longitude":-117.66310,"Type":"GPS","Speed(mph)":67,"Speed(km/h)":108,"Direction":128,"Altitude(ft)":160,"Altitude(m)":49,"Accuracy":5},{"Date":"2019-01-30T19:43:11-06:00","Latitude":33.45071,"Longitude":-117.64070,"Type":"GPS","Speed(mph)":70,"Speed(km/h)":113,"Direction":128,"Altitude(ft)":118,"Altitude(m)":36,"Accuracy":5},{"Date":"2019-01-30T19:44:35-06:00","Latitude":33.43774,"Longitude":-117.62040,"Type":"GPS","Speed(mph)":70,"Speed(km/h)":113,"Direction":124,"Altitude(ft)":101,"Altitude(m)":31,"Accuracy":5},{"Date":"2019-01-30T19:45:55-06:00","Latitude":33.42019,"Longitude":-117.60640,"Type":"GPS","Speed(mph)":69,"Speed(km/h)":111,"Direction":142,"Altitude(ft)":242,"Altitude(m)":74,"Accuracy":5},{"Date":"2019-01-30T19:47:29-06:00","Latitude":33.39977,"Longitude":-117.59560,"Type":"GPS","Speed(mph)":72,"Speed(km/h)":116,"Direction":156,"Altitude(ft)":75,"Altitude(m)":23,"Accuracy":5},{"Date":"2019-01-30T19:49:25-06:00","Latitude":33.38371,"Longitude":-117.57890,"Type":"GPS","Speed(mph)":70,"Speed(km/h)":113,"Direction":114,"Altitude(ft)":9,"Altitude(m)":3,"Accuracy":10},{"Date":"2019-01-30T19:50:25-06:00","Latitude":33.37112,"Longitude":-117.55440,"Type":"GPS","Speed(mph)":73,"Speed(km/h)":117,"Direction":122,"Altitude(ft)":91,"Altitude(m)":28,"Accuracy":5},{"Date":"2019-01-30T19:52:14-06:00","Latitude":33.35728,"Longitude":-117.53260,"Type":"GPS","Speed(mph)":66,"Speed(km/h)":106,"Direction":128,"Altitude(ft)":131,"Altitude(m)":40,"Accuracy":5},{"Date":"2019-01-30T19:53:39-06:00","Latitude":33.32950,"Longitude":-117.49360,"Type":"GPS","Speed(mph)":70,"Speed(km/h)":113,"Direction":130,"Altitude(ft)":111,"Altitude(m)":34,"Accuracy":5},{"Date":"2019-01-30T19:55:32-06:00","Latitude":33.31286,"Longitude":-117.48140,"Type":"GPS","Speed(mph)":67,"Speed(km/h)":108,"Direction":152,"Altitude(ft)":91,"Altitude(m)":28,"Accuracy":5},{"Date":"2019-01-30T19:57:03-06:00","Latitude":33.29803,"Longitude":-117.46400,"Type":"GPS","Speed(mph)":70,"Speed(km/h)":113,"Direction":132,"Altitude(ft)":62,"Altitude(m)":19,"Accuracy":10},{"Date":"2019-01-30T19:58:58-06:00","Latitude":33.28172,"Longitude":-117.44970,"Type":"GPS","Speed(mph)":67,"Speed(km/h)":108,"Direction":146,"Altitude(ft)":39,"Altitude(m)":12,"Accuracy":5},{"Date":"2019-01-30T20:00:46-06:00","Latitude":33.26582,"Longitude":-117.43360,"Type":"GPS","Speed(mph)":68,"Speed(km/h)":109,"Direction":130,"Altitude(ft)":32,"Altitude(m)":10,"Accuracy":5},{"Date":"2019-01-30T20:01:59-06:00","Latitude":33.24781,"Longitude":-117.41860,"Type":"GPS","Speed(mph)":73,"Speed(km/h)":117,"Direction":150,"Altitude(ft)":59,"Altitude(m)":18,"Accuracy":5},{"Date":"2019-01-30T20:03:54-06:00","Latitude":33.23135,"Longitude":-117.40220,"Type":"GPS","Speed(mph)":66,"Speed(km/h)":106,"Direction":136,"Altitude(ft)":16,"Altitude(m)":5,"Accuracy":5},{"Date":"2019-01-30T20:05:42-06:00","Latitude":33.21461,"Longitude":-117.39000,"Type":"GPS","Speed(mph)":64,"Speed(km/h)":103,"Direction":162,"Altitude(ft)":68,"Altitude(m)":21,"Accuracy":5}]}

    private InternalMap = props => {
        let currentLoc = this.state.step == -1? this.defaultCenter:this.state.pathData[this.state.step]
        return (<GoogleMap defaultZoom={11} defaultCenter={this.defaultCenter} center={this.state.step == -1? this.defaultCenter : this.state.pathData[this.state.step]}>
            <Polyline path={this.state.pathData} />
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
                    data = data.Data;
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