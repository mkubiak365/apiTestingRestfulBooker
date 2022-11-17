const XLSX = require('xlsx');
const table = XLSX.readFile("test/files/BookingInfo.xlsx", {cellDates: true, dateNF:"yyy-mm-dd"});
const sheet = table.Sheets[table.SheetNames[0]];
const range = XLSX.utils.decode_range(sheet['!ref']);
const config = require('../config.js');
const request = require('supertest')(config.baseUrl);
const expect = require('chai').expect; 


class PostPage {

    async getNumberRows() {
        let rowNum;
        for (rowNum = range.s.r; rowNum <= range.e.r; rowNum++) {
            try{
                let getData = await sheet[XLSX.utils.encode_cell({r: rowNum, c: 0})].w;
            } catch(e) {
                console.log("Empty row");
                break;
            };
        };
        return rowNum -1;
    };

    async getDataFromExcel(rowNum) {
        let values = []
            for (let colNum = range.s.c; colNum <= range.e.c; colNum++) {
                try{
                    let getData = await sheet[XLSX.utils.encode_cell({r: rowNum, c: colNum})].w;
                    values.push(getData);
                } catch(e) {
                    console.log("Empty cell");
                    break;
                };
            };
        return values;
    };

    async requestBodyPost(values) {
        let request;
        for(let i = 0; i <= values.length; i++) {
            request = {
                "firstname" : values[0],
                "lastname" : values[1],
                "totalprice" : values[2],
                "depositpaid" : values[3],
                "bookingdates" : {
                    "checkin" : values[4],
                    "checkout" : values[5]
                },
                "additionalneeds" : values[6]
            };
        };
        return request;
    };

    async sendReqPost(body) {
        let response = await request
        .post("booking")
        .send(body)
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200)

        expect(response.body.bookingid).to.be.above(0);

        return response.body.bookingid;
    };

    async saveResIdToExcel(sendRequest, rowNum) {
        await XLSX.utils.sheet_add_aoa(sheet, [[sendRequest]], {origin: `H + ${rowNum + 1}`});
        await XLSX.writeFile(table, "test/files/BookingInfo.xlsx");
    };

    async postToken() {
        const response = await request
        .post("auth")
        .send({
            "username" : "admin",
            "password" : "password123"
        })
        .set("Content-Type", "application/json")
        .set("Accept", "application/json")
        .expect(200)

        return response.body.token;
    };
    
};

module.exports = new PostPage();