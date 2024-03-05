export  function  getPageCale(body, pagesize_min, pagesize_max) {
    let DEFAULT_MIN_PAGESIZE = 1; // Placeholder value, replace with actual default
    let DEFAULT_MAX_PAGESIZE = 10; // Placeholder value, replace with actual default

    let pagesize = parseInt(body?.pagesize) || DEFAULT_MIN_PAGESIZE;
    let limit = pagesize < (pagesize_min || DEFAULT_MIN_PAGESIZE) || pagesize > (pagesize_max || DEFAULT_MAX_PAGESIZE) ? DEFAULT_MIN_PAGESIZE : pagesize;
    let pagenum = (parseInt(body?.pagenum) && parseInt(body?.pagenum) > 1) ? parseInt(body?.pagenum) : 1;
    let start = limit * (pagenum - 1);
    return { start, limit, pagenum, pagesize };
}