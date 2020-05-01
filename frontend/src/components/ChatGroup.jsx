import React, { useEffect, useRef, useState } from "react";
import socketIOClient from "socket.io-client";
import Peer from "simple-peer";
import { useParams } from "react-router-dom"
import UserVideo from "./UserVideo"
import { Grid, Card, CardHeader, CardContent } from '@material-ui/core';
import "./style.css"


const mediaOptions = {video: true, audio: true}
const ChatGroup = () => {
    const username = "anon" + Math.floor(Math.random()*10000);
    const [peers, setPeers] = useState([]);
    const socket = useRef();
    const userVideo = useRef();
    const peersRef = useRef([]);
    const { groupId } = useParams();

    useEffect(() => {
        socket.current = socketIOClient.connect("/");
        navigator.mediaDevices
        .getUserMedia(mediaOptions)
        .then((stream) => {
            userVideo.current.srcObject = stream;
            socket.current.on("participants", participants => {setPeers(onParticipantsList(participants, stream))})
            socket.current.on("new user", res => {setPeers(peers.concat(onNewUser(res, stream)))});
            socket.current.on("reply back", res => {onServerReply(res)});
            socket.current.emit("enter", {groupId, username});
        })
    }, []);

    const onParticipantsList = (participants, stream) => {
        const peers = [];
        participants.forEach((participant) => {
            const sPeer = createExistingPeer(participant.id, socket.current.id, stream, participant.username);
            const peer = sPeer.peer;
            peersRef.current.push({ userId: participant.id, peer })
            peers.push(sPeer);
        })
        console.log(peers)
        return peers;
    }

    const onNewUser = (res, stream) => {
        const sPeer = createNewPeer( res.newUserId, stream, res.username);
        const peer = sPeer.peer;
        peer.signal(res.signal)
        peersRef.current.push({userId: res.newUserId, peer })
        return sPeer;
    }

    const onServerReply = (res) => {
        peersRef
        .current
        .find(peer => peer.userId === res.id)
        .peer
        .signal(res.signal);
    }

    const createExistingPeer = (otherUser, newUserId, stream, username) => {
        const peer = peerFactory(true, stream)
        peer.on("signal", signal => {
            socket.current.emit("forward signal", { otherUser, newUserId, signal, username })
        })
        return {peer: peer, username: username};
    }

    const createNewPeer = ( newUserId, stream, username) => {
        const peer = peerFactory(false, stream)
        peer.on("signal", signal => {
            socket.current.emit("reply" , { signal, newUserId })
        })
        return {peer: peer, username: username};
    }

    const peerFactory = (isInitiator, stream) => {
        return new Peer({
            initiator: isInitiator,
            trickle: false,
            stream,
        })
    }

    return (
        <Grid container justify="center">
            <Grid item>
                <Card>
                    <CardHeader title={username}/>
                    <CardContent>
                    <video muted ref={userVideo} autoPlay playsInline/>
                    </CardContent>
                </Card>
            </Grid>
            {peers.map((peer, index) => {
                return (
                    <Grid item>
                        <UserVideo key={index} peer={peer}/>
                    </Grid>
                );
            })}
        </Grid>
    );
};

export default ChatGroup;
