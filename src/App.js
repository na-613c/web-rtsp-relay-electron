import React, { useRef, useEffect, PureComponent } from "react";
import { RTSP } from "./const";
import Video from "./Video";

class Clock extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      time: new Date().toLocaleString(),
    };
  }
  componentDidMount() {
    this.intervalID = setInterval(() => this.tick(), 1000);
  }
  componentWillUnmount() {
    clearInterval(this.intervalID);
  }
  tick() {
    this.setState({
      time: new Date().toLocaleString(),
    });
  }
  render() {
    return <h3>{this.state.time}</h3>;
  }
}

const App = () => {
  const tmp = [
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
    RTSP,
  ];

  const tmp2 = [
    RTSP,RTSP
  ];

  const videos = tmp2.map(url => <Video url={url} key={url} />);

  return (
    <div>
      <div style={{ display: "inline", width: "30%", float: "left" }}>
        <Clock />
      </div>
      <div
        style={{
          display: "inline",
          width: "60%",
          height: "99vh",
          float: "right",
          overflowY: "scroll",
        }}
      >
        {videos}
      </div>
    </div>
  );
};

export default App;
