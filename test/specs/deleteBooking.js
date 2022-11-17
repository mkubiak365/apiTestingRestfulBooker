const DeletePage = require('../pages/deletePage.js');
const PostPage = require('../pages/postPage.js');


describe('Delete - Booking hotel', async() => {
    it('Get IDs from Excel and delete bookings.', async() => {
        
        const maxRowNum = await PostPage.getNumberRows();
        const token = await PostPage.postToken();

        for(let rowNum = 1; rowNum <= maxRowNum; rowNum++) {

            let getData = await PostPage.getDataFromExcel(rowNum);

            let sendRequest  = await DeletePage.sendReqDelete(token, getData[7]);
    
            let deleteIdFromExcel = await DeletePage.deleteResIdFromExcel(rowNum);

        };

    });
});