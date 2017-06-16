/**
 * 初始化angularjs
 */
var salaryYearApp = angular.module("salaryYearApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
salaryYearApp.controller("salaryYearController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, salaryYearHeaderParams);
		salaryYearController.init($scope);
	})
});

/**
 * 年度汇总
 */
var salaryYearController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
	},
	
	//我的薪资数据模型
	salaryYearModel : 
	{
		salaryYearList : [],
		salaryYearId : null,
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
		
		
		//下拉查看月份薪资详情
		self.scope.salaryDetailShow = function(salaryYearId)
		{
			self.salaryYearModel.salaryYearId = salaryYearId;
			for (var i = 0;i < self.salaryYearModel.salaryYearList.length; i++) 
			{
				if(self.salaryYearModel.salaryYearId == self.salaryYearModel.salaryYearList[i].salaryYearId)
				{
					self.salaryYearModel.salaryYearList[i].salaryMonthDetail = !self.salaryYearModel.salaryYearList[i].salaryMonthDetail;
					self.salaryYearModel.salaryYearList[i].salaryMonthArrow = (self.salaryYearModel.salaryYearList[i].salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
					break;
				}
			}
		}
		
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
		
		self.salaryYearModel.salaryYearList = salaryYearParams.SALARY_YEAR_LIST;
		
		self.scope.salaryMonthArrow = self.salaryYearModel.salaryMonthArrow;
		for (var i = 0;i < self.salaryYearModel.salaryYearList.length;i++) 
		{
			self.salaryYearModel.salaryYearList[i].salaryMonthDetail = false;
			self.salaryYearModel.salaryYearList[i].salaryMonthArrow = (self.salaryYearModel.salaryYearList[i].salaryMonthDetail) ? "img/up_arrow.png" : "img/down_arrow.png";
		}
		
		self.scope.salaryYearModel = self.salaryYearModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".salary-year-body").show();
	},
	
	
}
