import React, { useEffect, useRef } from "react";
import { Card, CardHeader, CardContent } from '@material-ui/core';
import "./style.css"


const UserVideo = (props) => {
  const ref = useRef();

  useEffect(() => {
      props.peer.peer.on("stream", stream => {
          ref.current.srcObject = stream;
      })
  }, []);

  return (
      <Card>
        <CardHeader title={props.peer.username}/>
        <CardContent>
          <video playsInline autoPlay ref={ref}/>
        </CardContent>
      </Card>
  );
}

export default UserVideo