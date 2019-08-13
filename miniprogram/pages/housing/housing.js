// pages/housing/housing.js
var util = require("../../utils/util.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    starttime:'',
    endtime:'',
    houselist:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var TIME = util.formatTime(new Date(), "y-m-d");
    var times = { starttime: TIME,endtime:TIME};
    
    if (options.starttime){
      times = JSON.parse(options.json);
    }
    var that=this;
    this.setData({
      starttime: times.starttime,
      endtime: times.endtime
    })
    const db = wx.cloud.database();

     // console.log(options);
     db.collection('house').get({
      success: function (res) {
        // res.data 是一个包含集合中有权限访问的所有记录的数据，不超过 20 条
        that.setData({
          houselist: res.data
        })
      }
    })

  },
  todetials:function(e){
    wx.navigateTo({
      url: '../details/details?id=' + e.currentTarget.dataset['id'],
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})