// let pagers= page(2,90,{listCnt: 5, pagerCnt : 5})
const pager = (page , totalRecord , obj)=>{
    page = Number(page);
    totalRecord=Number(totalRecord);
    let { listCnt = 5, pagerCnt = 3} = obj || {};
    let totalPage=Math.ceil(totalRecord/listCnt);
    let startInx = (page - 1) *listCnt;

    let startPage =Math.floor((page-1)/pagerCnt * pagerCnt +1);
    let endPage = startPage + pagerCnt -1 > totalPage ? totalPage : startPage + pagerCnt -1;
    let nextPage =page +1 > 0 ? totalPage:page+ 1;
    let prevPage = page-1;
    

    return {listCnt, page, totalPage, listCnt, pagerCnt, startPage,startInx, endPage, nextPage, prevPage};

}

module.exports = pager;