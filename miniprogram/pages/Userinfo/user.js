// miniprogram/pages/Userinfo/user.js
var app=getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    userinfo:{
      openid:""
    },
    disabled:true
  },
  subform:function(){
    var db = wx.cloud.database();
  
    if (!this.data.userinfo.openid){
      wx.showToast({
        title: '未获取到用户信息',
        ico:null
      })
      return;
    } else if (!this.data.userinfo.phone) {
      wx.showToast({
        title: '请输入用户手机号',
        ico: null
      })
      return;
    }
   if(this.data.userinfo.id){
     db.collection('user').doc(this.data.userinfo.id).update({data:{
       name: this.data.userinfo.name,
       card: this.data.userinfo.card,
       phone: this.data.userinfo.phone,
       address: this.data.userinfo.address
     },
       success: function(res) {
         wx.showToast({
           title: '保存成功'
         })
       },
       fail: console.error
     })
     return;
   }
    db.collection('user').add({
      // data 字段表示需新增的 JSON 数据
      data: {
        name: this.data.userinfo.name,
        card: this.data.userinfo.card,
        phone: this.data.userinfo.phone,
        address: this.data.userinfo.address,
      },
      success: function (res) {
        wx.showToast({
          title: '保存成功'
        })    
      },
      fail: console.error
    })
  },
  getuserinfo:function(){
    var db = wx.cloud.database();
    var that=this;
    var userinfo = db.collection("user").where({
      _openid: this.data.userinfo.openid
    }).get({
        success: function (res) {
        
          if(res.data){
          that.setData({
            userinfo: {
              id:res.data[0]["_id"],
              openid: res.data[0]["_openid"],
              name: res.data[0]["name"],
              card: res.data[0]["card"],
              phone: res.data[0]["phone"],
              address: res.data[0]["address"]
          }
          })
          }
        }
      });
  },

  inputname:function(e){
   var userinfo = this.data.userinfo;
    userinfo.name = e.detail.value;
    this.setData({ userinfo: userinfo });
  },
  inputcard: function (e) {
    var userinfo = this.data.userinfo;
    userinfo.card = e.detail.value;
    this.setData({ userinfo:  userinfo  });
  },
  inputphone: function (e) {
    var userinfo = this.data.userinfo;
    userinfo.phone = e.detail.value;
    this.setData({ userinfo: userinfo  });
  },
  inputaddress: function (e) {
    var userinfo = this.data.userinfo;
    userinfo.address = e.detail.value;
    this.setData({ userinfo:userinfo  });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.cloud.callFunction({
      name: 'login',
      complete: res => {
        that.setData({
          userinfo:{
          openid: res.result.openid
          },
          disabled:false
        })
        this.getuserinfo();
      }
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