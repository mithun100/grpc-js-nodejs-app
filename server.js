require("appdynamics").profile({
  controllerHostName: 'xxxx.saas.appdynamics.com',
  controllerPort: 443,
  accountName: 'xxxx',
  accountAccessKey: 'key',
  controllerSslEnabled: true,
  applicationName: 'GRPC-Server-Mithun-App',
  tierName: 'UGRPC-Server-Mithun-tier',
  nodeName: 'GRPC-Server-Mithun-node',
  logging: {
      'logfiles': [{
              'root_directory': '/tmp/appd/GRPC-Server-Mithun',
              'filename': 'echo_%N.log',
              'level': 'TRACE',
              'max_size': 5242880,
              'max_files': 10
          },
          {
              'root_directory': '/tmp/appd/GRPC-Server-Mithun',
              'filename': 'protobuf_%N.log',
              'level': 'TRACE',
              'max_size': 5242880,
              'max_files': 10,
              'channel': 'protobuf'
          }
      ]
  }
})

// server.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('./example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

// Create a gRPC server
const server = new grpc.Server();

// Define the handler function for the greet RPC
function greet(call, callback) {
  const name = call.request.name;
  const message = `Hello, ${name}!`;
  callback(null, { message });
}

// Add the greet RPC to the server
server.addService(protoDescriptor.example.ExampleService.service, { greet });

// Start the server
server.bindAsync('localhost:50051', grpc.ServerCredentials.createInsecure(), () => {
  console.log('Server started, listening on port 50051');
  server.start();
});


