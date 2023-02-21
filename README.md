# apiTestingRestfulBooker
API testing for the Restful Booker services using Supertest and WebdriverIo.

https://restful-booker.herokuapp.com/

pages - catalog with files containing methods such as get, post, delete and functionalities

specs - catalog with tests

Install npm packages: npm install.
Run tests: npx wdio


The test flow:

1. Load users from BookingInfo.xlsx.
2. Create users using the POST method and save unique IDs to a file.
3. Get users using the GET service and compare them with BookingInfo.xlsx.
4. Delete users, which were created.
