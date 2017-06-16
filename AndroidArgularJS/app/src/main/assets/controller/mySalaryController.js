/**
 * 初始化angularjs
 */
var mySalaryApp = angular.module("mySalaryApp", []).run(function()
{
	FastClick.attach(document.body);
});

//自定义repeat完成事件
mySalaryApp.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

/**
 * 初始化controller
 */
mySalaryApp.controller("mySalaryController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, mySalaryHeaderParams);
		mySalaryController.init($scope);
	})
});

/**
 * 我的--薪资
 */
var mySalaryController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
	},
	
	//时间数据模型
	dateModel : 
	{
		startYearList : [],
		startMonthList : [],
		endYearList : [],
		endMonthList : [],
		startYearIndex : null,
		startYearPreIndex : null,
		startMonthIndex : null,
		startMonthPreIndex : null,
		endYearIndex : null,
		endMonthIndex : null,
		showDateDialog : true,
	},
	
	//我的薪资数据模型
	mySalaryModel : 
	{
		mySalaryList : [],
		switchSalary : false,
		salaryYearList : [],
		salaryYearId : null,
		emptySearch : false,
		emptySearch2 : false,
		initSwiperCount : 0,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.setDateData();
		
		this.setDefault();
		
		this.getAllSalary();
		
		this.ngClickFunction();
		
//		this.initSwiper();
		
		this.ngRepeatFinish();
	},
	
	//设置默认
	setDefault : function ()
	{
		var self = this;
		
		self.scope.switchSalary = this.mySalaryModel.switchSalary;
		
		self.dateModel.showDateDialog = false;
		self.scope.showDateDialog = self.dateModel.showDateDialog;
		
		self.scope.salaryMonthArrow = self.mySalaryModel.salaryMonthArrow;
		
		self.mySalaryModel.emptySearch = false;
		self.scope.emptySearch = self.mySalaryModel.emptySearch;
		
		self.mySalaryModel.emptySearch2 = false;
		self.scope.emptySearch2 = self.mySalaryModel.emptySearch2;
//		for (var i = 0;i < self.mySalaryModel.salaryYearList.length;i++) 
//		{
//			self.mySalaryModel.salaryYearList[i].salaryMonthDetail = false;
//			self.mySalaryModel.salaryYearList[i].salaryMonthArrow = (self.mySalaryModel.salaryYearList[i].salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
//		}
	},
	
	//获取所有的薪水
	getAllSalary : function()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_SALARY_LIST, {}, function (data)
		{
			self.mySalaryModel.mySalaryList = [];
			self.mySalaryModel.salaryYearList = [];
			
			if (data.list instanceof Array)
			{
				var salaryList = data.list;
				self.mySalaryModel.mySalaryList = salaryList;
				
				
				
				if (self.mySalaryModel.mySalaryList.length == 0)
				{
					self.mySalaryModel.emptySearch = true;
					self.scope.emptySearch = self.mySalaryModel.emptySearch;
					
					self.mySalaryModel.emptySearch2 = false;
					self.scope.emptySearch2 = self.mySalaryModel.emptySearch2;
					
					mnWebMain.syncSetLocalStorage(userKeys.USER_SALARY_LIST, null);
				}
				else
				{
					//按照年和月从大到小排序
					for (var i = 0; i < self.mySalaryModel.mySalaryList.length - 1; i ++)
					{
						for (var j = i + 1; j < self.mySalaryModel.mySalaryList.length; j ++) 
						{
							if (parseInt(self.mySalaryModel.mySalaryList[i].year) < parseInt(self.mySalaryModel.mySalaryList[j].year))
							{
								var temp = self.mySalaryModel.mySalaryList[i];
								self.mySalaryModel.mySalaryList[i] = self.mySalaryModel.mySalaryList[j];
								self.mySalaryModel.mySalaryList[j] = temp;
							}
							else if (parseInt(self.mySalaryModel.mySalaryList[i].year) == parseInt(self.mySalaryModel.mySalaryList[j].year))
							{
								
								if (parseInt(self.mySalaryModel.mySalaryList[i].month) < parseInt(self.mySalaryModel.mySalaryList[j].month))
								{
									var temp = self.mySalaryModel.mySalaryList[i];
									self.mySalaryModel.mySalaryList[i] = self.mySalaryModel.mySalaryList[j];
									self.mySalaryModel.mySalaryList[j] = temp;
								}
							}
						}
					}
					
					var salaryYearId = 1;
					var startYear = parseInt(salaryList[0].year);
					
					var salaryItemObj = {};
					salaryItemObj.salaryMonth = [];
					var salaryTotal = 0; 
					
					for (var i = 0; i < salaryList.length; i ++)
					{
						self.mySalaryModel.mySalaryList[i].yearText = self.mySalaryModel.mySalaryList[i].year + "年";
						self.mySalaryModel.mySalaryList[i].monthText = self.mySalaryModel.mySalaryList[i].month + "月";
						
						var currentYear = parseInt(salaryList[i].year);
						
						if (startYear != currentYear)
						{
							salaryItemObj.salaryYearId = salaryYearId++;
							salaryItemObj.salaryYear = startYear + "年";
							salaryItemObj.salaryTotal = salaryTotal;
							
							startYear = currentYear;
							
							salaryItemObj.salaryMonthDetail = false;
							salaryItemObj.salaryMonthArrow = (salaryItemObj.salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
							
							self.mySalaryModel.salaryYearList.push(salaryItemObj);
							salaryItemObj = {};
							salaryItemObj.salaryMonth = [];
							salaryTotal = 0;
						}
						
						var monthObj = {};
						monthObj.month = salaryList[i].month + "月";
						monthObj.salary = salaryList[i].totalActualSalary;
						
						salaryTotal +=  parseInt(salaryList[i].totalActualSalary);
						
						salaryItemObj.salaryMonth.push(monthObj)
						
					}
					
					salaryItemObj.salaryYearId = salaryYearId;
					salaryItemObj.salaryYear = startYear + "年";
					salaryItemObj.salaryTotal = salaryTotal;
					salaryItemObj.salaryMonthDetail = false;
					salaryItemObj.salaryMonthArrow = (salaryItemObj.salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
					
					self.mySalaryModel.salaryYearList.push(salaryItemObj);
				
					mnWebMain.syncSetLocalStorage(userKeys.USER_SALARY_LIST, JSON.stringify(self.mySalaryModel.mySalaryList))
				}
			}
			else
			{
				self.mySalaryModel.emptySearch = true;
				self.scope.emptySearch = self.mySalaryModel.emptySearch;
				
				self.mySalaryModel.emptySearch2 = false;
				self.scope.emptySearch2 = self.mySalaryModel.emptySearch2;
				
				mnWebMain.syncSetLocalStorage(userKeys.USER_SALARY_LIST, null);
			}
			
			self.scope.salaryYearList = self.mySalaryModel.salaryYearList;
			self.scope.mySalaryList = self.mySalaryModel.mySalaryList;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".my-salary-body").show();
			$(".popUp-date-cover").show();
			$(".popUp-date-container").show();
			
			
			
		})
		
		setTimeout(function()
		{
			mnWebMain.closeLoading();
			$(".my-salary-body").show();
			$(".popUp-date-cover").show();
			$(".popUp-date-container").show();
		}, 10);
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//当前年度
		self.scope.salaryForNow = function()
		{
			self.mySalaryModel.switchSalary = false;
			self.scope.switchSalary = self.mySalaryModel.switchSalary;
			if (self.mySalaryModel.mySalaryList.length == 0)
			{
				self.mySalaryModel.emptySearch = true;
				self.scope.emptySearch = self.mySalaryModel.emptySearch;
				
				self.mySalaryModel.emptySearch2 = false;
				self.scope.emptySearch2 = self.mySalaryModel.emptySearch2;
			}
		}
		
		//年度汇总
		self.scope.salaryForYear = function()
		{
			self.mySalaryModel.switchSalary = true;
			self.scope.switchSalary = self.mySalaryModel.switchSalary;
			if (self.mySalaryModel.salaryYearList.length == 0)
			{
				self.mySalaryModel.emptySearch = false;
				self.scope.emptySearch = self.mySalaryModel.emptySearch;
				
				self.mySalaryModel.emptySearch2 = true;
				self.scope.emptySearch2 = self.mySalaryModel.emptySearch2;
			}
			
		}
		
		//下拉查看月份薪资详情
		self.scope.salaryDetailShow = function(salaryYearId)
		{
			self.mySalaryModel.salaryYearId = salaryYearId;
			for (var i = 0;i < self.mySalaryModel.salaryYearList.length; i++) 
			{
				if(self.mySalaryModel.salaryYearId == self.mySalaryModel.salaryYearList[i].salaryYearId)
				{
					self.mySalaryModel.salaryYearList[i].salaryMonthDetail = !self.mySalaryModel.salaryYearList[i].salaryMonthDetail;
					self.mySalaryModel.salaryYearList[i].salaryMonthArrow = (self.mySalaryModel.salaryYearList[i].salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
					break;
				}
			}
		}
		
		//立即查询
		self.scope.onClickSearch = function()
		{
			if (isEmpty(self.dateModel.startYearIndex))
			{
//				$confirmTip.show("请选择查询时间");
				mnWebMain.showProgressDialog("请选择查询时间");
			}
			else 
			{
				var startYear = parseInt(self.dateModel.startYearList[self.dateModel.startYearIndex].year);
				var startMonth = self.dateModel.startMonthList[self.dateModel.startMonthIndex].month;
				var endYear = parseInt(self.dateModel.endYearList[self.dateModel.endYearIndex].year);
				var endMonth = self.dateModel.endMonthList[self.dateModel.endMonthIndex].month;
				
				if (startMonth.indexOf("0"))
				{
					startMonth = parseInt(startMonth.substr(startMonth.length - 1, 1));
				}
				else
				{
					startMonth = parseInt(startMonth);
				}
				
				if (endMonth.indexOf("0"))
				{
					endMonth = parseInt(endMonth.substr(endMonth.length - 1, 1));
				}
				else
				{
					endMonth = parseInt(endMonth);
				}
				
				
				if (startYear > endYear)
				{
					mnWebMain.showProgressDialog("请选择正确的年份");
				}
				else if (startYear == endYear && startMonth > endMonth)
				{
					mnWebMain.showProgressDialog("请选择正确的月份");
				}
				else
				{
					var baseParam = {
						"url" : pageUrl.APP_SALARY_YEAR_SEARCH_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "查询结果"}];
					var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
					var rightParam = [];
					
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
				}
				
				
			}
			
//			self.dateModel.startYearIndex = null;
//			self.dateModel.startMonthIndex = null;
//			self.dateModel.endYearIndex = null;
//			self.dateModel.endMonthIndex = null;
		}
		
		//选择时间查询
		self.scope.onClickToShowDateDialog = function ()
		{
//			$(".my-salaryInfo").css("overflow", "hidden");
//			$(".my-salaryInfo").css("position", "fixed");
			$(".my-salaryInfo").addClass("my-salary-fixed");
			self.mySalaryModel.showDateDialog = true;
			self.scope.showDateDialog = self.mySalaryModel.showDateDialog;
			
			if (self.mySalaryModel.initSwiperCount == 0)
			{
				self.initSwiper();
			}
			
			//TODO
//			swiperStartYear.update();
//			swiperStartMonth.update();
//			swiperEndYear.update();
//			swiperEndMonth.update();
		}
		
		//确定
		self.scope.onClickDateSure = function ()
		{
			mnWebMain.syncSetLocalStorage(dateParams.START_YEAR, parseInt(self.dateModel.startYearList[self.dateModel.startYearIndex].year));
			mnWebMain.syncSetLocalStorage(dateParams.START_MONTH, self.dateModel.startMonthList[self.dateModel.startMonthIndex].month);
			mnWebMain.syncSetLocalStorage(dateParams.END_YEAR, parseInt(self.dateModel.endYearList[self.dateModel.endYearIndex].year));
			mnWebMain.syncSetLocalStorage(dateParams.END_MONTH, self.dateModel.endMonthList[self.dateModel.endMonthIndex].month);
			//TODO
			
			var startYear = parseInt(self.dateModel.startYearList[self.dateModel.startYearIndex].year);
			var startMonth = self.dateModel.startMonthList[self.dateModel.startMonthIndex].month;
			var endYear = parseInt(self.dateModel.endYearList[self.dateModel.endYearIndex].year);
			var endMonth = self.dateModel.endMonthList[self.dateModel.endMonthIndex].month;
			
			if (startMonth.indexOf("0"))
			{
				startMonth = parseInt(startMonth.substr(startMonth.length - 1, 1));
			}
			else
			{
				startMonth = parseInt(startMonth);
			}
			
			if (endMonth.indexOf("0"))
			{
				endMonth = parseInt(endMonth.substr(endMonth.length - 1, 1));
			}
			else
			{
				endMonth = parseInt(endMonth);
			}
			
			
			if (startYear > endYear)
			{
				mnWebMain.showProgressDialog("请选择正确的年份");
				return;
			}
			else if (startYear == endYear && startMonth > endMonth)
			{
				mnWebMain.showProgressDialog("请选择正确的月份");
				return;
			}
			
			$(".my-salaryInfo").removeClass("my-salary-fixed");
			
			self.dateModel.showDateDialog = false;
			self.scope.showDateDialog = self.dateModel.showDateDialog;
		}
		
		//隐藏时间弹框
		self.scope.onClickToCloseDateDialog = function ()
		{
//			$(".my-salaryInfo").css("overflow", "auto");
//			$(".my-salaryInfo").css("position", "absolute");
			$(".my-salaryInfo").removeClass("my-salary-fixed");
			self.dateModel.showDateDialog = false;
			self.scope.showDateDialog = self.dateModel.showDateDialog;
			
//			self.dateModel.startYearIndex = null;
//			self.dateModel.startMonthIndex = null;
//			self.dateModel.endYearIndex = null;
//			self.dateModel.endMonthIndex = null;
		}
		
		//取消
		self.scope.onClickDateCancel = function ()
		{
//			$(".my-salaryInfo").css("overflow", "auto");
//			$(".my-salaryInfo").css("position", "absolute");
			$(".my-salaryInfo").removeClass("my-salary-fixed");
			self.dateModel.showDateDialog = false;
			self.scope.showDateDialog = self.dateModel.showDateDialog;
			
//			self.dateModel.startYearIndex = null;
//			self.dateModel.startMonthIndex = null;
//			self.dateModel.endYearIndex = null;
//			self.dateModel.endMonthIndex = null;
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		
//		self.scope.staticBasicModel = self.staticBasicModel;
//		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.mySalaryModel.mySalaryList = mySalaryParams.MY_SALARY_LIST;
		
		self.mySalaryModel.salaryYearList = mySalaryParams.SALARY_YEAR_LIST;
		
		self.dateModel.showDateDialog = false;
		self.scope.showDateDialog = self.dateModel.showDateDialog;
		
		self.scope.salaryMonthArrow = self.mySalaryModel.salaryMonthArrow;
		for (var i = 0;i < self.mySalaryModel.salaryYearList.length;i++) 
		{
			self.mySalaryModel.salaryYearList[i].salaryMonthDetail = false;
			self.mySalaryModel.salaryYearList[i].salaryMonthArrow = (self.mySalaryModel.salaryYearList[i].salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
		}
		
		self.scope.mySalaryModel = self.mySalaryModel;
		self.scope.$apply();
	},
	
	//初始化时间数据
	setDateData : function ()
	{
		var self = this;
		
		self.dateModel.startYearIndex = null;
		self.dateModel.startMonthIndex = null;
		self.dateModel.endYearIndex = null;
		self.dateModel.endMonthIndex = null;
		
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
		
		var date = new Date();
		var currentYear = date.getFullYear();
		var currentMonth = date.getMonth() + 1;
		
		self.mySalaryModel.initSwiperCount += 1;
		
		self.dateModel.startYearIndex = null;
		self.dateModel.startMonthIndex = null;
		self.dateModel.endYearIndex = null;
		self.dateModel.endMonthIndex = null;
		
		self.dateModel.startYearList = dateParams.START_YAER_LIST;
		self.dateModel.startMonthList = dateParams.START_MONTH_LIST;
		self.dateModel.endYearList = dateParams.END_YEAR_LIST;
		self.dateModel.endMonthList = dateParams.END_MONTH_LIST;
		
		for (var i = 0; i < self.dateModel.startYearList.length; i ++)
		{
			self.dateModel.startYearList[i].hasclass = "date-no-selected";
		}
		
		for (var i = 0; i < self.dateModel.startMonthList.length; i ++)
		{
			self.dateModel.startMonthList[i].hasclass = "date-no-selected";
		}
		
		for (var i = 0; i < self.dateModel.endYearList.length; i ++)
		{
			self.dateModel.endYearList[i].hasclass = "date-no-selected";
		}
		
		for (var i = 0; i < self.dateModel.endMonthList.length; i ++)
		{
			self.dateModel.endMonthList[i].hasclass = "date-no-selected";
		}
		
		self.scope.startYearList = self.dateModel.startYearList;
		self.scope.startMonthList = self.dateModel.startMonthList;
		self.scope.endYearList = self.dateModel.endYearList;
		self.scope.endMonthList = self.dateModel.endMonthList;
		
		setTimeout(function(){
			var swiperStartYear = new Swiper('.start-date-year', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        observer : true,
		        onTouchStart : function (swiper)
		        {
		        	self.dateModel.startYearIndex = swiper.activeIndex + 1;
		        	self.scope.startYearIndex = self.dateModel.startYearIndex;
		        	
//		        	self.dateModel.startYearList[self.dateModel.startYearIndex].hasclass = "date-no-selected";
		        	
					self.scope.startYearList = self.dateModel.startYearList;
		        	self.scope.$apply();
		        },
		        onSlideChangeEnd : function (swiper) 
		        {
		        	self.dateModel.startYearList[self.dateModel.startYearIndex].hasclass = "date-no-selected";
		        	
//		        	for (var i = 0; i < self.dateModel.startYearList.length; i ++)
//					{
//						self.dateModel.startYearList[i].hasclass = "date-no-selected";
//					}
		        	
		        	self.dateModel.startYearIndex = swiper.activeIndex + 1;
		        	self.scope.startYearIndex = self.dateModel.startYearIndex;
		        	
		        	self.dateModel.startYearList[self.dateModel.startYearIndex].hasclass = "date-left-selected";
		        	
		        	self.scope.startYearList = self.dateModel.startYearList;
		        	self.scope.$apply();
		        },
		    });
		    
		    swiperStartYear.activeIndex = 3;
		    swiperStartYear.slideTo(parseInt(currentYear) - 2005, true);
		    self.dateModel.startYearIndex = swiperStartYear.activeIndex + 1;
		    self.scope.startYearIndex = self.dateModel.startYearIndex;
		    
		    self.dateModel.startYearPreIndex = self.dateModel.startYearIndex;
		    
		    self.dateModel.startYearList[self.dateModel.startYearIndex].hasclass = "date-left-selected";
		    self.scope.startYearList = self.dateModel.startYearList;
		    
		    
		    
		    var swiperStartMonth = new Swiper('.start-date-month', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        observer : true,
		        onTouchStart : function (swiper)
		        {
		        	self.dateModel.startMonthIndex = swiper.activeIndex + 1;
		        	self.scope.startMonthIndex = self.dateModel.startMonthIndex;
		        	
//					self.dateModel.startMonthList[self.dateModel.startMonthIndex].hasclass = "date-no-selected";
					
					self.scope.startMonthList = self.dateModel.startMonthList;
					self.scope.$apply();
		        },
		        onSlideChangeEnd : function (swiper)
		        {
		        	self.dateModel.startMonthList[self.dateModel.startMonthIndex].hasclass = "date-no-selected";
		        	
//		        	for (var i = 0; i < self.dateModel.startMonthList.length; i ++)
//					{
//						self.dateModel.startMonthList[i].hasclass = "date-no-selected";
//					}
		        	
		        	self.dateModel.startMonthIndex = swiper.activeIndex + 1;
		        	self.scope.startMonthIndex = self.dateModel.startMonthIndex;
		        	
					self.dateModel.startMonthList[self.dateModel.startMonthIndex].hasclass = "date-selected";
					
					self.scope.startMonthList = self.dateModel.startMonthList;
					self.scope.$apply();
		        },
		    });
		    
		    swiperStartMonth.activeIndex = 3;
		    swiperStartMonth.slideTo(parseInt(currentMonth) - 1,true);
		    self.dateModel.startMonthIndex = swiperStartMonth.activeIndex + 1;
		    self.scope.startMonthIndex = self.dateModel.startMonthIndex;
		    
		    self.dateModel.startMonthList[self.dateModel.startMonthIndex].hasclass = "date-selected";
		    self.scope.startMonthList = self.dateModel.startMonthList;
		    
		    var swiperEndYear = new Swiper('.end-date-year', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        observer : true,
		        onTouchStart : function (swiper)
		        {
		        	self.dateModel.endYearIndex = swiper.activeIndex + 1;
		        	self.scope.endYearIndex = self.dateModel.endYearIndex;
		        	
//					self.dateModel.endYearList[self.dateModel.endYearIndex].hasclass = "date-no-selected";
		        	
		        	self.scope.endYearList = self.dateModel.endYearList;
		        	self.scope.$apply();
		        },
		        onSlideChangeEnd : function (swiper)
		        {
		        	self.dateModel.endYearList[self.dateModel.endYearIndex].hasclass = "date-no-selected";
		        	
//		        	for (var i = 0; i < self.dateModel.endYearList.length; i ++)
//					{
//						self.dateModel.endYearList[i].hasclass = "date-no-selected";
//					}
		        	
		        	self.dateModel.endYearIndex = swiper.activeIndex + 1;
		        	self.scope.endYearIndex = self.dateModel.endYearIndex;
		        	
					self.dateModel.endYearList[self.dateModel.endYearIndex].hasclass = "date-selected";
		        	
		        	self.scope.endYearList = self.dateModel.endYearList;
		        	self.scope.$apply();
		        },
		    });
		    
		    swiperEndYear.activeIndex = 3;
		    swiperEndYear.slideTo(parseInt(currentYear) - 2005,true);
		    self.dateModel.endYearIndex = swiperEndYear.activeIndex + 1;
		    self.scope.endYearIndex = self.dateModel.endYearIndex;
		    
		    self.dateModel.endYearList[self.dateModel.endYearIndex].hasclass = "date-selected";
		    self.scope.endYearList = self.dateModel.endYearList;
		        	
		    var swiperEndMonth = new Swiper('.end-date-month', {
		        slidesPerView: 3,
		        direction : 'vertical',
		        observer : true,
		        onTouchStart : function (swiper)
		        {
		        	self.dateModel.endMonthIndex = swiper.activeIndex + 1;
		        	self.scope.endMonthIndex = self.dateModel.endMonthIndex;
		        	
//					self.dateModel.endMonthList[self.dateModel.endMonthIndex].hasclass = "date-no-selected";
					
					self.scope.endMonthList = self.dateModel.endMonthList;
					self.scope.$apply();
		        },
		        onSlideChangeEnd : function (swiper) 
		        {
		        	self.dateModel.endMonthList[self.dateModel.endMonthIndex].hasclass = "date-no-selected";
		        	
//		        	for (var i = 0; i < self.dateModel.endMonthList.length; i ++)
//					{
//						self.dateModel.endMonthList[i].hasclass = "date-no-selected";
//					}
		        	
		        	self.dateModel.endMonthIndex = swiper.activeIndex + 1;
		        	self.scope.endMonthIndex = self.dateModel.endMonthIndex;
					
					self.dateModel.endMonthList[self.dateModel.endMonthIndex].hasclass = "date-selected";
					
					self.scope.endMonthList = self.dateModel.endMonthList;
					self.scope.$apply();
		        },
		    });
		    
		    swiperEndMonth.activeIndex = 3;
		    swiperEndMonth.slideTo(parseInt(currentMonth) - 1,true);
		    self.dateModel.endMonthIndex = swiperEndMonth.activeIndex + 1;
		    self.scope.endMonthIndex = self.dateModel.endMonthIndex;
		    
		    self.dateModel.endMonthList[self.dateModel.endMonthIndex].hasclass = "date-selected";
			self.scope.endMonthList = self.dateModel.endMonthList;	
			self.scope.$apply();	
		}, 100);
	},
	
	ngRepeatFinish : function(){
    	
    	var self = this;
    	
    	//ng-repeat完成后执行的操作
		this.scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent){
//			swiperStartYear.update();
//			swiperStartMonth.update();
//			swiperEndYear.update();
//			swiperEndMonth.update();
		});
    	
    },
	
}

