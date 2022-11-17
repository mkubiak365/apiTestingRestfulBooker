const GetPage = require('../pages/getPage.js');
const PostPage = require('../pages/postPage.js');


describe('GET - Booking hotel', async() => {
    it('Get IDs from Excel, and next compare data between Excel and service.', async() => {

        const maxRowNum = await PostPage.getNumberRows();

        for(let rowNum = 1; rowNum <= maxRowNum; rowNum++) {

            let getData = await PostPage.getDataFromExcel(rowNum);
    
            let sendRequest = await GetPage.sendReqGet(getData[7]);
    
            let compareBooking = await GetPage.compareData(getData, sendRequest);

        };
        
    });
});