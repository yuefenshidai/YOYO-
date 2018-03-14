import ajax from '../../../../../../../assets/js/ajax.js'
import * as echarts from '../components/ec-canvas/echarts.js';

Page({

  /**
   * 页面的初始数据
   */
  data: {
		resultInfo:null,
		ec: {
			lazyLoad: true 
		},
		itemOpitions:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
	
	  this.setData({
		  optionsInfo: JSON.parse(options.data)
	  })
	  this.getInfo()
	  console.log(this.data.optionsInfo)
  },
  getInfo(){
	  let _info = this.data.optionsInfo
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
			  resultInfo: res.data.result
		  })
		  this.selectChartDom('shougoujia')
		  this.selectChartDom('maichujia')
		  this.selectChartDom('jiaoyijia')
		  this.selectChartDom('linechart')
	  })
  },
  //设置收购价参数
  setshougoujiaOption(chart){
	  let carInfo = this.data.resultInfo
	  let oldPrice = this.data.optionsInfo.buyPrice * 1
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
							  fontSize: '30rpx',
							  fontWeight: '700'
						  }
					  }
				  },
				  data: [
					  {
						  value: carInfo.est_price_result[0] / oldPrice * 100,
						  name: '',
						  itemStyle: {
							  normal: {
								  color: '#eb724f'
							  }
						  }
					  },
					  {
						  value: (1 - (carInfo.est_price_result[0] / oldPrice)) * 100,
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
	  chart.setOption(shougoujia_option);
  },
  //设置卖出价参数
  setmaichujiaOption(chart) {
	  let carInfo = this.data.resultInfo
	  let oldPrice = this.data.optionsInfo.buyPrice * 1
	  let maichujia_option = {
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
						  value: carInfo.est_price_result[1] / oldPrice * 100,
						  name: '',
						  itemStyle: {
							  normal: {
								  color: '#8cd84b'
							  }
						  }
					  },
					  {
						  value: (1 - (carInfo.est_price_result[1] / oldPrice)) * 100,
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
	  chart.setOption(maichujia_option);
  },
  //设置交易价参数
  setjiaoyijiaOption(chart) {
	  let carInfo = this.data.resultInfo
	  let oldPrice = this.data.optionsInfo.buyPrice * 1
	  let jiaoyijia_option = {
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
						  value: carInfo.est_price_result[2] / oldPrice * 100,
						  name: '',
						  itemStyle: {
							  normal: {
								  color: '#3c80e5',
								  barBorderRadius: 7
							  }
						  }
					  },
					  {
						  value: (1 - (carInfo.est_price_result[2] / oldPrice)) * 100,
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
	  chart.setOption(jiaoyijia_option);
  },
  //设置线形图参数
  setlinecharOption(chart) {
	  let carInfo = this.data.resultInfo
	  let oldPrice = this.data.optionsInfo.buyPrice * 1
	  let data = [];
	  let lineData = [];
	  carInfo.est_price_area.forEach((item, i)=> {
		  data.push(item.area.substring(0, 2))
		  if (i % 2 == 0) {
			  lineData.push({
				  value: item.price,
				  label: {
					  normal: {
						  show: 'true',
						  color: '#e2e5ea',
						  position: 'top',
						  distance: 3
					  }
				  },
				  itemStyle: {
					  normal: {
						  show: 'true',
						  color: '#e2e5ea',
						  fontSize: '10',
						  borderColor: '#fff',
						  formatter: '万'
					  }
				  }
			  })
		  } else {
			  lineData.push({
				  value: item.price,
				  label: {
					  normal: {
						  show: 'true',
						  color: '#e2e5ea',
						  position: 'bottom',
						  distance: -3
					  }
				  },
				  itemStyle: {
					  normal: {
						  show: 'true',
						  color: '#e2e5ea',
						  fontSize: '10'
					  }
				  }
			  })
		  }
	  })
	  let linechart_option = {
		  grid: {
			  left: '0%',
			  right: '4%',
			  bottom: '0%',
			  containLabel: true
		  },
		  xAxis:
		  {
			  type: 'category',
			  boundaryGap: false,
			  data: data,
			  interval: 0,
			  axisLine: {
				  lineStyle: {
					  color: '#fff'
				  }
			  }
		  },
		  yAxis:
		  {
			  show: false,
			  type: 'value',
			  axisLine: {
				  lineStyle: {
					  color: '#fff'
				  }
			  }
		  },
		  series: [
			  {
				  type: 'line',
				  stack: '总量',
				//   symbol: 'image:../../../image/chartFlag.png',
				  symbolSize: '10',
				  areaStyle: {
					  normal: {
						  color: {
							  type: 'linear',
							  x: 0,
							  y: 0,
							  x2: 0,
							  y2: 1,
							  colorStops: [{
								  offset: 0, color: '#68595e' // 0% 处的颜色
							  }, {
								  offset: 1, color: '#304268' // 100% 处的颜色
							  }],
							  globalCoord: false // 缺省为 false
						  }
					  }
				  },
				  label: {
					  normal: {
						  formatter: '{c}万'
					  }
				  },
				  data: lineData
			  }
		  ]
	  }
	  chart.setOption(linechart_option);
  },
  //选择图表节点
  selectChartDom(id){
	  this[id] = this.selectComponent('#'+id)
	  this[id].init((canvas, width, height)=>{
		  const chart = echarts.init(canvas, null, {
			  width: width,
			  height: height
		  });
		  if (id == 'shougoujia') this.setshougoujiaOption(chart);
		  if (id == 'maichujia') this.setmaichujiaOption(chart);
		  if (id == 'jiaoyijia') this.setjiaoyijiaOption(chart);
		  if (id == 'linechart') this.setlinecharOption(chart)
 	  })
  }
})
