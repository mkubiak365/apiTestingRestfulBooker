const PostPage = require('../pages/postPage.js');


describe('POST - Booking hotel', async() => {
    it('Create the new positions and save the IDs to Excel.', async() => {

        const maxRowNum = await PostPage.getNumberRows();

        for(let rowNum = 1; rowNum <= maxRowNum; rowNum++) {

            let values = await PostPage.getDataFromExcel(rowNum);

            let body = await PostPage.requestBodyPost(values);
    
            let sendRequest = await PostPage.sendReqPost(body);
    
            let saveResponseIdToExcel = await PostPage.saveResIdToExcel(sendRequest, rowNum);
        };
               
    });
});