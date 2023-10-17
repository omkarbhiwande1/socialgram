import React, {useEffect, useState} from 'react'
import {useSelector} from 'react-redux';
import io from 'socket.io-client'

import { Form, Button } from 'react-bootstrap'
const styles = {
    'redParagraph': {
			color: 'red'
		}
		
}
export default function Chat() {
	const id = useSelector(state => state.user.userid);
	const [socket, setSocket] = useState();
	// console.log(id);
	useEffect(()=>{
		let newSocket = null;
		if(id){
			newSocket = io('http://localhost:4000', {query: {id}, transports: ['websocket', 'polling', 'flashsocket']})
			setSocket(newSocket);
			newSocket.on('receive-message', ({secret})=>{
				console.log("Hello message is recieved",secret);
			})

			console.log("Socket is set");
		}
		return () => {
			if(newSocket){
				newSocket.off('receive-message');
				newSocket.close();
				setSocket(null);
			}
		}
	},[id])

	function handleSubmit(e){
		e.preventDefault();
		socket.emit('send-message',{text: 'A secret message'});
	}
	return (
		<div style={{height: '89vh'}} className='d-flex flex-column border border-primary rounded mt-1 w-50 ml-auto mr-auto'>
			<div className='d-flex flex-column flex-grow-1 pt-3 pl-3 pr-3 pb-1 overflow-auto'>
					<p style={{'width': 'fit-content'}} className="bg-primary text-white align-self-end rounded p-2">Hello</p>
					<p style={{'width': 'fit-content'}} className="bg-dark text-white rounded p-2">How are you</p>
		
			</div>
			<Form onSubmit={handleSubmit}>
				<Form.Group className="d-flex mb-0">
					<Form.Control type="text" placeholder="Enter message" />
					<Button variant="primary" type="submit" className="ml-2">
						Submit
					</Button>
				</Form.Group>
			</Form>
				
		</div>
	)
}
