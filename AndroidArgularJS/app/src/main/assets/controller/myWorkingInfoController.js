/**
 * 初始化angularjs
 */
var myWorkingInfoApp = angular.module("myWorkingInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myWorkingInfoApp.controller("myWorkingInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myWorkingInfoHeaderParams);
		myWorkingInfoController.init($scope);
	})
});

/**
 * 我的任职信息
 */
var myWorkingInfoController = 
{
	//作用域
	scope : null,
	
	//我的任职数据模型
	myWorkingInfoModel : 
	{
		workInfoList : [],
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.getUserWorkingInfo();
		
		this.ngClickFunction();
	},
	
	//获取用户的任职信息
	getUserWorkingInfo : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_WORK_INFO, {}, function (data)
		{
			self.myWorkingInfoModel.emptySearch = false;
			self.myWorkingInfoModel.workInfoList = [];
			
			if (data.list.length == 0)
			{
				self.myWorkingInfoModel.emptySearch = true;
			}
			else
			{
				self.myWorkingInfoModel.workInfoList = data.list;
				self.scope.workInfoList = self.myWorkingInfoModel.workInfoList;
			}
			
			self.scope.emptySearch = self.myWorkingInfoModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".working-info-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		
	},
}
