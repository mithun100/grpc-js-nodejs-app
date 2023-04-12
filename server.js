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


