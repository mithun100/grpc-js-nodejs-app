// client.js
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');

// Load the protobuf definition
const packageDefinition = protoLoader.loadSync('./example.proto');
const protoDescriptor = grpc.loadPackageDefinition(packageDefinition);

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

