
require("appdynamics").profile({
  controllerHostName: 'xxxx.saas.appdynamics.com',
  controllerPort: 443,
  accountName: 'xxxx',
  accountAccessKey: 'key',
  controllerSslEnabled: true,
  applicationName: 'GRPC-Client-Mithun-App',
  tierName: 'UGRPC-Client-Mithun-tier',
  nodeName: 'GRPC-Client-Mithun-node',
  logging: {
      'logfiles': [{
              'root_directory': '/tmp/appd/GRPC-Client-Mithun',
              'filename': 'echo_%N.log',
              'level': 'TRACE',
              'max_size': 5242880,
              'max_files': 10
          },
          {
              'root_directory': '/tmp/appd/GRPC-Client-Mithun',
              'filename': 'protobuf_%N.log',
              'level': 'TRACE',
              'max_size': 5242880,
              'max_files': 10,
              'channel': 'protobuf'
          }
      ]
  }
})
//====
// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('./example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);


// Create a continous server which will call the client and it will run on 3000
const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {


// Create a gRPC client
const client = new protoDescriptor.example.ExampleService('localhost:50051', grpc.credentials.createInsecure());

// Make a unary call to the greet RPC
client.greet({ name: 'John' }, (error, response) => {
  if (error) {
    console.error(error);
  } else {
    console.log(response.message);
  }
});



  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})





