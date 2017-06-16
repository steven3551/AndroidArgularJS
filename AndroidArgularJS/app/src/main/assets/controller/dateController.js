/**
 * 时间
 */
var dateController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	dateModel : 
	{
		startYearList : [],
		startMonthList : [],
		endYearList : [],
		endMonthList : [],
		startYearIndex : null,
		startMonthIndex : null,
		endYearIndex : null,
		endMonthIndex : null,
		showDateDialog : true,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setDateData();
		
		this.ngClickFunction();
		
		this.initSwiper();
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//隐藏时间弹框
		self.scope.onClickToCloseDateDialog = function ()
		{
			self.scope.showDateDialog = false;
		}
		
		//取消
		self.scope.onClickDateCancel = function ()
		{
			self.scope.showDateDialog = false;
		}
		
		//确定
		self.scope.onClickDateSure = function ()
		{
			
		}
	},
	
	//初始化时间数据
	setDateData : function ()
	{
		var self = this;
		
		self.dateModel.startYearIndex = 0;
		self.dateModel.startMonthIndex = 0;
		self.dateModel.endYearIndex = 0;
		self.dateModel.endMonthIndex = 0;
		
		self.dateModel.startYearList = dateParams.START_YAER_LIST;
		self.dateModel.startMonthList = dateParams.START_MONTH_LIST;
		self.dateModel.endYearList = dateParams.END_YEAR_LIST;
		self.dateModel.endMonthList = dateParams.END_MONTH_LIST;
		
		self.scope.startYearList = self.dateModel.startYearList;
		self.scope.startMonthList = self.dateModel.startMonthList;
		self.scope.endYearList = self.dateModel.endYearList;
		self.scope.endMonthList = self.dateModel.endMonthList;
		
		self.scope.$apply();
	},
	
	initSwiper : function ()
	{
		var self = this;
		
		setTimeout(function(){
			var swiperStartYear = new Swiper('.start-date-year', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        onSlideChangeEnd : function (swiper) {
		        	self.dateModel.startYearIndex = swiper.activeIndex + 1;
		        	self.scope.startYearIndex = self.dateModel.startYearIndex;
		        },
		    });
		    
		    swiperStartYear.activeIndex = 1;
		    self.dateModel.startYearIndex = swiperStartYear.activeIndex;
		    self.scope.startYearIndex = self.dateModel.startYearIndex;
		        	
		    var swiperStartMonth = new Swiper('.start-date-month', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        onSlideChangeEnd : function (swiper) {
		        	self.dateModel.startMonthIndex = swiper.activeIndex + 1;
		        	self.scope.startMonthIndex = self.dateModel.startMonthIndex;
		        },
		    });
		    
		    swiperStartMonth.activeIndex = 1;
		    self.dateModel.startMonthIndex = swiperStartMonth.activeIndex;
		    self.scope.startMonthIndex = self.dateModel.startMonthIndex;
		    
		    var swiperEndYear = new Swiper('.end-date-year', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        onSlideChangeEnd : function (swiper) {
		        	self.dateModel.endYearIndex = swiper.activeIndex + 1;
		        	self.scope.endYearIndex = self.dateModel.endYearIndex;
		        },
		    });
		    
		    swiperEndYear.activeIndex = 1;
		    self.dateModel.endYearIndex = swiperEndYear.activeIndex;
		    self.scope.endYearIndex = self.dateModel.endYearIndex;
		    
		    
		    var swiperEndMonth = new Swiper('.end-date-month', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        onSlideChangeEnd : function (swiper) {
		        	self.dateModel.endMonthIndex = swiper.activeIndex + 1;
		        	self.scope.endMonthIndex = self.dateModel.endMonthIndex;
		        },
		    });
		    
		    swiperEndMonth.activeIndex = 1;
		    self.dateModel.endMonthIndex = swiperEndMonth.activeIndex;
		    self.scope.endMonthIndex = self.dateModel.endMonthIndex;
		    
		}, 10);
	},
	
}
