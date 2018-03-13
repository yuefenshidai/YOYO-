import ajax from '../../../../../../../assets/js/ajax.js'
import * as echarts from '../components/ec-canvas/echarts.js';


Page({

  /**
   * 页面的初始数据
   */
  data: {
		resultInfo:null,
		ec: {
			onInit: null
		},
		itemOpitions:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	//   let _options  = JSON.stringify(options)
	//   wx.setStorage({
	// 	  key: 'result',
	// 	  data: _options,
	//   })
	//   console.log(_options)
	wx.getStorage({
		key: 'result',
		success: res=> {
			let info = JSON.parse(res.data)
			let _info = JSON.parse(info.data)
			this.getInfo(res.data)
			this.setData({
				_options: _info
			})
		}
	})

  },
  getInfo(data){
	  let info = JSON.parse(data)
	  let _info = JSON.parse(info.data)
	  wx.showNavigationBarLoading()
	  ajax.GET('SecondCar/getCarPrice',{
		  carstatus: _info.carStatus.value,
		  city:'248',
		  car: _info.chooseBrand.id,
		  useddate: _info.date.substring(0,4),
		  useddateMonth: _info.date.substring(5, 7),
		  mileage: _info.driveLong*1,
		  price: _info.buyPrice*1,
		  province: 22,
		  purpose: _info.carUse.value
	  }).then(res=>{
		  wx.hideNavigationBarLoading()
		  this.setData({
			  resultInfo: res.data
		  })
		  this.setOption()
	  })
  },
  //设置参数
  setOption(){
	  let carInfo = this.data.resultInfo
	  let oldPrice = this.data._options.buyPrice * 1
	  let shougoujia_option = {
		  tooltip: {
			  trigger: 'item',
			  formatter: "{a} <br/>{b}: {c} ({d}%)"
		  },
		  legend: {
			  orient: 'vertical',
			  x: 'left',
			  data: []
		  },
		  series: [
			  {
				  name: '访问来源',
				  type: 'pie',
				  radius: ['90%', '100%'],
				  avoidLabelOverlap: false,
				  label: {
					  normal: {
						  show: false,
						  position: 'center'
					  },
					  emphasis: {
						  show: false,
						  textStyle: {
							  fontSize: '0.3rem',
							  fontWeight: '700'
						  }
					  }
				  },
				  data: [
					  {
						  value: carInfo.result.est_price_result[0] / oldPrice * 100,
						  name: '',
						  itemStyle: {
							  normal: {
								  color: '#eb724f'
							  }
						  }
					  },
					  {
						  value: (1 - (carInfo.result.est_price_result[0] / oldPrice)) * 100,
						  name: '',
						  itemStyle: {
							  normal: {
								  color: '#fff'
							  }
						  }
					  }
				  ]
			  }
		  ]
	  };
	  this.setData({
		  itemOpitions: shougoujia_option
		})
	  this.setData({
		  ec:{
			  onInit: this.baiduEcharts
		  }
	  })
	  console.log(this.data)
  },
  //百度Echarts
  baiduEcharts(canvas, width, height) {
	  const chart = echarts.init(canvas, null, {
		  width: width,
		  height: height
	  });
	  canvas.setChart(chart);
	  let opitons = this.data.itemOpitions
	  chart.setOption(opitons);
	  return chart;
  }
})
