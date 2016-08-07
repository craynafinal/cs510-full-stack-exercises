'use strict';

var express = require('express'); // do not change this line
var socket = require('socket.io'); // do not change this line
var assert = require('assert'); // do not change this line

var server = express();

server.use('/', express.static(__dirname + '/'));

var io = socket(server.listen(process.env.PORT || 8080)); // do not change this line

var objectClients = {};

io.on('connection', function(socketHandle) {
	// assign a random id to the socket and store the socketHandle in the objectClients variable - example: '9T1P4pUQ'

	socketHandle.id = Math.random().toString(36).substr(2, 8);
	objectClients[socketHandle.id] = {
		'id' : socketHandle.id,
		'socket' : socketHandle
	};



	// send the new client the 'hello' event, containing the assigned id - example: { 'id':'9T1P4pUQ' }

	socketHandle.emit('hello', { 'id' : socketHandle.id }); 

	// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'array':['GxwYr9Uz','9T1P4pUQ'] }

	var ids = [];

	for (var property in objectClients) {
		ids.push(objectClients[property].id);
	}		

  // for everyone
	io.emit('clients', { 'array' : ids });

	// send everyone the 'message' event, containing a message that a new client connected - example: { 'from':'server', 'to':'everyone', 'message':'9T1P4pUQ connected' }

	io.emit('message', {
		'from' : 'server',
		'to' : 'everyone',
		'message' : socketHandle.id + ' connected'
	});

	socketHandle.on('message', function(objectData) {
		// if the message should be recevied by everyone, broadcast it accordingly
		// if the message has a single target, send it to this target as well as to the origin

		if (objectData['to'] === 'everyone') {
			io.emit('message', {
				'from' : socketHandle.id,
				'to' : objectData['to'],
				'message' : objectData['message']
			});			
		} else {

			// origin
			objectClients[socketHandle.id].socket.emit('message', {
				'from' : socketHandle.id,
				'to' : objectData['to'],
				'message' : objectData['message']
			});

			// target
			objectClients[objectData['to']].socket.emit('message', {
        'from' : socketHandle.id,
        'to' : objectData['to'],
        'message' : objectData['message'] 
      });
		}
	});

	socketHandle.on('disconnect', function() {
		// remove the disconnected client from the objectClients variable
		delete objectClients[socketHandle.id];
	
		// send everyone the 'clients' event, contianing an array of the connected clients - example: { 'array':['GxwYr9Uz'] }

		var ids = [];

		for (var property in objectClients) {
			ids.push(objectClients[property].id);
		}

		// for everyone
		io.emit('clients', { 'array' : ids });


		// send everyone the 'message' event, containing a message that an existing client disconnected - example: { 'from':'server', 'to':'everyone', 'message':'9T1P4pUQ disconnected' }

		io.emit('message', {
			'from' : 'server',
			'to' : 'everyone',
			'message' : socketHandle.id + ' disconnected'
		});
	});
});

console.log('go ahead and open "http://localhost:8080/chat.html" in your browser');
