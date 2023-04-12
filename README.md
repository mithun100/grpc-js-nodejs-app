# grpc-js-nodejs-app


This is a simple Node.js application which is using GRPC.  We are using https://www.npmjs.com/package/@grpc/grpc-js as AppDynamics does support instrumenting @grpc/grpc-js

There are two main files to focus.

1. client.js
2. server.js

Both of them has the AppDynamics snippet pasted at the top. You need to modify the xxxx and key value to report it to the required Controller.

To run the application

Clone the project
Run the node client.js
node server.js
Now access the http://localhost:3000
Reference 
