const config = require('../config.js');
const request = require('supertest')(config.baseUrl);
const XLSX = require('xlsx');
const table = XLSX.readFile("test/files/BookingInfo.xlsx", {cellDates: true, dateNF:"yyy-mm-dd"});
const sheet = table.Sheets[table.SheetNames[0]];


class DeletePage {

    async sendReqDelete(token, bookingId) {
        let response = await request
        .delete("booking/" + bookingId)
        .set("Accept", "application/json")
        .set("Cookie", `token=${token}`)
        .expect(201)

        return response;
    };

    async deleteResIdFromExcel(rownNum) {
        await XLSX.utils.sheet_add_aoa(sheet, [['']], {origin: `H + ${rownNum + 1}`});
        await XLSX.writeFile(table, "test/files/BookingInfo.xlsx");
    };

};

module.exports = new DeletePage();