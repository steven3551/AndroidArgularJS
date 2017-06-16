/**
 * 初始化angularjs
 */
var mySalarySearchApp = angular.module("mySalarySearchApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
mySalarySearchApp.controller("mySalarySearchController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, mySalarySearchHeaderParams);
		mySalarySearchController.init($scope);
	})
});

/**
 * 我的--薪资查询
 */
var mySalarySearchController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
	},
	
	//我的薪资数据模型
	mySalarySearchModel : 
	{
		"startTimeYear" : null,
		"startTimeMonth" : null,
		"endTimeYear" : null,
		"endTimeMonth" : null,
		mySalarySearchList : [],
		emptySearch : true,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.resetData();
		
		this.ngClickFunction();
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.mySalarySearchModel.mySalarySearchList = []
		
		self.mySalarySearchModel.startTimeYear = salaryYearSearchParams.startTimeYear;
		self.mySalarySearchModel.startTimeMonth = salaryYearSearchParams.startTimeMonth;
		self.mySalarySearchModel.endTimeYear = salaryYearSearchParams.endTimeYear;
		self.mySalarySearchModel.endTimeMonth = salaryYearSearchParams.endTimeMonth;
		
//		self.mySalarySearchModel.mySalarySearchList = salaryYearSearchParams.SALARY_YEAR_SEARCH_LIST;
		
//		var startYear = localStorage.getItem(dateParams.START_YEAR);
//		var startMonth = localStorage.getItem(dateParams.START_MONTH);
//		var endYear = localStorage.getItem(dateParams.END_YEAR);
//		var endMonth = localStorage.getItem(dateParams.END_MONTH);
		
		var startYear = mnWebMain.syncGetLocalStorage(dateParams.START_YEAR);
		var startMonth = mnWebMain.syncGetLocalStorage(dateParams.START_MONTH);
		var endYear = mnWebMain.syncGetLocalStorage(dateParams.END_YEAR);
		var endMonth = mnWebMain.syncGetLocalStorage(dateParams.END_MONTH);
		
		if (!isEmpty(startYear))
		{
			self.mySalarySearchModel.startTimeYear = startYear + "年";
		}
		
		if (!isEmpty(startMonth))
		{
			self.mySalarySearchModel.startTimeMonth = startMonth + "月";
		}
		
		if (!isEmpty(endYear))
		{
			self.mySalarySearchModel.endTimeYear = endYear + "年";
		}
		
		if (!isEmpty(endMonth))
		{
			self.mySalarySearchModel.endTimeMonth = endMonth + "月";
		}
		
		var startYearNum = parseInt(startYear);
		
		var startMonthNum = startMonth;
		if (startMonthNum.charAt(0) == "0")
		{
			startMonthNum = parseInt(startMonthNum.substr(1, 1));
		}
		else
		{
			startMonthNum = parseInt(startMonthNum);
		}
		
		var endYearNum = parseInt(endYear);
		
		var endMonthNum = endMonth;
		if (endMonthNum.charAt(0) == "0")
		{
			endMonthNum = parseInt(endMonthNum.substr(1, 1));
		}
		else
		{
			endMonthNum = parseInt(endMonthNum);
		}
		
		var mySalaryList = mnWebMain.syncGetLocalStorage(userKeys.USER_SALARY_LIST);
		
		if (!isEmpty(mySalaryList))
		{
			mySalaryList = JSON.parse(mySalaryList);
			
			for (var i = 0; i < mySalaryList.length; i ++)
			{
				var itemObj = mySalaryList[i];
				
				var itemYearNum = parseInt(itemObj.year.substr(0, 4));
				var itemMonthNum = itemObj.month.substr(0, 2);
				
				if (itemMonthNum.charAt(0) == "0")
				{
					itemMonthNum = parseInt(itemMonthNum.substr(1, 1));
				}
				else
				{
					itemMonthNum = parseInt(itemMonthNum);
				}
				
				if (itemYearNum >= startYearNum && itemYearNum <= endYearNum)
				{
					if (itemYearNum == startYearNum)
					{
						if (itemYearNum == endYearNum)
						{
							if (itemMonthNum >= startMonthNum && itemMonthNum <= endMonthNum)
							{
								self.mySalarySearchModel.mySalarySearchList.push(itemObj);
							}
						}
						else if (itemYearNum < endYearNum)
						{
							if (itemMonthNum >= startMonthNum)
							{
								self.mySalarySearchModel.mySalarySearchList.push(itemObj);
							}
						}
					}
					else if (itemYearNum > startYearNum)
					{
						if (itemYearNum == endYearNum)
						{
							if (itemMonthNum <= endMonthNum)
							{
								self.mySalarySearchModel.mySalarySearchList.push(itemObj);
							}
						}
						else if (itemYearNum < endYearNum)
						{
							self.mySalarySearchModel.mySalarySearchList.push(itemObj);
						}
					}
				}
				
			}
		}
		
		if (self.mySalarySearchModel.mySalarySearchList.length > 0)
		{
			self.mySalarySearchModel.emptySearch = false;
			self.scope.emptySearch = self.mySalarySearchModel.emptySearch;
		}
		else
		{
			self.mySalarySearchModel.emptySearch = true;
			self.scope.emptySearch = self.mySalarySearchModel.emptySearch;	
		}
		
		
		
		self.scope.mySalarySearchModel = self.mySalarySearchModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".salary-search-body").show();
	},
	
	
}
