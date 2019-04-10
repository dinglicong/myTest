define('base', [], function() {
    seajs.config({
        base: 'http://dev.s.56qq.cn/staticBIFlowAnalysis/src',
        chartset: 'utf-8',
        alias: {
            'datepicker': 'https://s.56qq.com/staticBase/src/js/common/datepicker.js',
        }
    })
});
seajs.use('base');
