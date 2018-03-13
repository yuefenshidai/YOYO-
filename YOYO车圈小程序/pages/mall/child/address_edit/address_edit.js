import ajax from '../../../../assets/js/ajax.js'

// directory.js
var address = require('../../../../assets/js/city.js')
var animation
Page({

  /**
   * 页面的初始数据
   * 当前    provinces:所有省份
   * citys选择省对应的所有市,
   * areas选择市对应的所有区
   * provinces：当前被选中的省
   * city当前被选中的市
   * areas当前被选中的区
   */
  data: {
    menuType: 0,
    begin: null,
    status: 1,
    end: null,
    isVisible: false,
    animationData: {},
    animationAddressMenu: {},
    addressMenuIsShow: false,
    value: [0, 0, 0],
    provinces: [],
    citys: [],
    areas: [],
    province: '',
    city: '',
    area: '',
    receive_name: '',  //收货人的姓名
    receive_tel: '',  //收货人的电话
    receive_city: '', //收货人的地区
    receive_region: '',  //收货人的详细地址
    receive_id: ''  //收货地址的id
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 初始化动画变量
    var animation = wx.createAnimation({
      duration: 500,
      transformOrigin: "50% 50%",
      timingFunction: 'ease',
    })
    this.animation = animation;
    // 默认联动显示北京
    var id = address.provinces[0].id
    this.setData({
      provinces: address.provinces,
      citys: address.citys[id],
      areas: address.areas[address.citys[id][0].id],
    })
    this.getEditAddress(options);
  },

  // 执行动画
  startAnimation: function (isShow, offset) {
    var that = this
    var offsetTem
    if (offset == 0) {
      offsetTem = offset
    } else {
      offsetTem = offset + 'rpx'
    }
    this.animation.translateY(offset).step()
    this.setData({
      animationData: this.animation.export(),
      isVisible: isShow
    })
  },
  // 选择状态按钮
  selectState: function (e) {
    this.startAnimation(false, -200)
    var status = e.currentTarget.dataset.status
    this.setData({
      status: status
    })
  },
  // 日志选择
  bindDateChange: function (e) {
    if (e.currentTarget.dataset.type == 1) {
      this.setData({
        begin: e.detail.value
      })
    } else if (e.currentTarget.dataset.type == 2) {
      this.setData({
        end: e.detail.value
      })
    }
  },
  sureDateTap: function () {
    this.data.pageNo = 1
    this.startAnimation(false, -200)
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

  },
  // 点击所在地区弹出选择框
  selectDistrict: function (e) {
    var that = this
    if (that.data.addressMenuIsShow) {
      return
    }
    that.startAddressAnimation(true)
  },
  // 执行动画
  startAddressAnimation: function (isShow) {
    var that = this
    if (isShow) {
      that.animation.translateY(0 + 'vh').step()
    } else {
      that.animation.translateY(40 + 'vh').step()
    }
    that.setData({
      animationAddressMenu: that.animation.export(),
      addressMenuIsShow: isShow,
    })
  },
  // 点击地区选择取消按钮
  cityCancel: function (e) {
    this.startAddressAnimation(false)
  },
  // 点击地区选择确定按钮
  citySure: function (e) {
    var that = this
    var city = that.data.city
    var value = that.data.value
    that.startAddressAnimation(false)
    // 将选择的城市信息显示到输入框
    var areaInfo = that.data.provinces[value[0]].name + ' ' + that.data.citys[value[1]].name + ' ' + that.data.areas[value[2]].name
    that.setData({
      receive_city: areaInfo,
    })
  },
  hideCitySelected: function (e) {
    this.startAddressAnimation(false)
  },
  // 处理省市县联动逻辑
  cityChange: function (e) {
    var value = e.detail.value
    var provinces = this.data.provinces
    var citys = this.data.citys
    var areas = this.data.areas
    var provinceNum = value[0]
    var cityNum = value[1]
    var countyNum = value[2]
    if (this.data.value[0] != provinceNum) {
      var id = provinces[provinceNum].id
      this.setData({
        value: [provinceNum, 0, 0],
        citys: address.citys[id],
        areas: address.areas[address.citys[id][0].id],
      })
    } else if (this.data.value[1] != cityNum) {
      var id = citys[cityNum].id
      this.setData({
        value: [provinceNum, cityNum, 0],
        areas: address.areas[citys[cityNum].id],
      })
    } else {
      this.setData({
        value: [provinceNum, cityNum, countyNum]
      })
    }
  },

  //信息输入
  infoInput(e) {
    let npt_type = e.currentTarget.dataset.npt;
    let val = e.detail.value;
    if (npt_type == 'name') {
      this.setData({
        receive_name: val
      });
    } else if (npt_type == 'tel') {
      let reg = /^1[0-9]{10}/;
      if (reg.test(val)) {
        this.setData({
          receive_tel: val
        });
      } else {
        this.setData({
          receive_tel: ''
        });
        wx.showToast({
          title: '请输入正确的手机号！',
          icon: 'none',

        })
      }

    } else if (npt_type == 'address') {
      this.setData({
        receive_region: val
      });
    }
  },

  //提交收货地址信息
  submitAddress() {
    let this_ = this;
    let d = this.data;
    if (d.receive_name != '' && d.receive_tel != '' && d.receive_city != '' && d.receive_region != '') {
      ajax.GET('BMemberService/saveUserAddress', {
        aname: d.receive_name,
        aphone: d.receive_tel,
        bUseraddressid: d.receive_id,
        isdefaultads: 1,
        region: d.receive_city,
        address: d.receive_region
      }).then((res) => {
        if (d.receive_id != '') {
          wx.showToast({
            title: '地址修改成功',
            success() {
              this_.goAddressList();
            }
          })
        } else {
          wx.showToast({
            title: '地址添加成功',
            success() {
              this_.goAddressList();
            }
          })
        }
      });
    }
  },

  //跳转收货地址列表页
  goAddressList(){
    setTimeout(()=>{
      wx.navigateBack();
    },1500);
  },

  //获取要修改的收货地址信息
  getEditAddress(o) {
    let e_id = o.edit_id;
    let this_ = this;
    if (e_id != '') {
      this.setData({
        receive_id: e_id
      });
      ajax.GET('BMemberService/getUserAddress', {
        bUseraddressid: e_id
      }).then((res) => {
        let address_data = res.data[0];
        this_.setData({
          receive_name: address_data.aname,  //收货人的姓名
          receive_tel: address_data.aphone,  //收货人的电话
          receive_city: address_data.region, //收货人的地区
          receive_region: address_data.address,  //收货人的详细地址
        });
      });;
    }
  }
})