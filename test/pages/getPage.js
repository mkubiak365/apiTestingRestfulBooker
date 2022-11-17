const config = require('../config.js');
const request = require('supertest')(config.baseUrl);
const expect = require('chai').expect; 


class GetPage {

    async sendReqGet(bookingId) {
        let response = await request
        .get("booking/" + bookingId)
        .set("Accept", "application/json")
        .expect(200)

        return response;
    };

    async compareData(getData, sendRequest){
        expect(getData[0]).to.be.equal(sendRequest.body.firstname);
        expect(getData[1]).to.be.equal(sendRequest.body.lastname);
        expect(getData[2]).to.be.equal(`${sendRequest.body.totalprice}`);
        expect(getData[3]).to.be.equal(`${sendRequest.body.depositpaid}`);
        expect(getData[4]).to.be.equal(sendRequest.body.bookingdates.checkin);
        expect(getData[5]).to.be.equal(sendRequest.body.bookingdates.checkout);
        expect(getData[6]).to.be.equal(sendRequest.body.additionalneeds);
    };

};

module.exports = new GetPage();