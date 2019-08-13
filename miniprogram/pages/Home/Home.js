// pages/Home/Home.js
var util=require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    'bnrUrl':[
      { "url":"/images/jing/1.jpg"},
      { "url":"/images/jing/2.jpg"},
      { "url":"/images/jing/3.jpg"},
      { "url":"/images/jing/4.jpg"},
    ],
    days:"至",
    date: '2019-07-31',
    date1: '2019-07-31',
    // time: '12:00',
    dateTimeArray: null,
    dateTime: null,
    dateTimeArray1: null,
    dateTime1: null,
    startYear: 2000,
    endYear: 2050
  },
  serch:function(){
    var searchdate = { starttime: this.data.date, endtime: this.data.date1};
    wx.switchTab({
      url: '/pages/housing/housing?json=' + JSON.stringify(searchdate) ,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    var TIME = util.formatTime(new Date(),"y-m-d");
    this.setData({
      date: TIME,
      date1:TIME
    })
  },
  dataspan: function (sDate1, sDate2){
    var dateSpan,
      tempDate,
      iDays;
    sDate1 = Date.parse(sDate1);
    sDate2 = Date.parse(sDate2);
    dateSpan = sDate2 - sDate1;
    dateSpan = Math.abs(dateSpan);
    iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
    return iDays
  },
   changeDate(e) {
    this.setData({ date: e.detail.value });
     var daycount = this.dataspan(this.data.date,this.data.date1);
     if (daycount <= 0 || daycount >= 10) {
       this.setData({ days: "至" });
     } else {
     this.setData({ days: daycount + "晚" });
    }
  },
  changeDate1(e) {
    this.setData({ date1: e.detail.value });
    var daycount = this.dataspan(this.data.date, this.data.date1);
    if (daycount <= 0 || daycount>=10){
      this.setData({ days: "至" });
    }else{
    this.setData({ days: daycount + "晚"});
    }
  },
  changeTime(e) {
    this.setData({ time: e.detail.value });
  },
  changeDateTime(e) {
    this.setData({ dateTime: e.detail.value });
  },
  changeDateTime1(e) {
    this.setData({ dateTime1: e.detail.value });
  },
  changeDateTimeColumn(e) {
    var arr = this.data.dateTime, dateArr = this.data.dateTimeArray;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray: dateArr,
      dateTime: arr
    });
  },
  changeDateTimeColumn1(e) {
    var arr = this.data.dateTime1, dat
    eArr = this.data.dateTimeArray1;

    arr[e.detail.column] = e.detail.value;
    dateArr[2] = dateTimePicker.getMonthDay(dateArr[0][arr[0]], dateArr[1][arr[1]]);

    this.setData({
      dateTimeArray1: dateArr,
      dateTime1: arr
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
     * 进行页面分享
     */
  onShareAppMessage: function (options) {
    if (options.from === 'button') {
      // 来自页面内转发按钮
      console.log(options.target)
    }
    return {
      title: '中邯旅行社', 
      desc: '中邯旅游社帮您解决旅游的一切问题',
      path: 'pages/Home/Home',
      success: function (res) {
        //成功
      },
      fail: function () {
       //失败
      }
    }
  },

})