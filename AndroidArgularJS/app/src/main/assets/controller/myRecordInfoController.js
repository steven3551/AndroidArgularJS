/**
 * 初始化angularjs
 */
var myRecordInfoApp = angular.module("myRecordInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myRecordInfoApp.controller("myRecordInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myRecordInfoHeaderParams);
		myRecordInfoController.init($scope);
	})
});

/**
 * 我的履历信息
 */
var myRecordInfoController = 
{
	//作用域
	scope : null,
	
	//我的履历数据模型
	myRecordInfoModel : 
	{
		recordList : [],
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.getRecordList();
		
		this.ngClickFunction();
	},
	
	//获取履历信息
	getRecordList : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_RECORD_INFO, {}, function (data)
		{
			self.myRecordInfoModel.emptySearch = false;
			self.myRecordInfoModel.recordList = [];
			
			if (data.list.length == 0)
			{
				self.myRecordInfoModel.emptySearch = true;
			}
			else
			{
				self.myRecordInfoModel.recordList = data.list;
				self.scope.recordList = self.myRecordInfoModel.recordList;
			}
			
			self.scope.emptySearch = self.myRecordInfoModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".record-info-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		self.scope.back = function ()
		{
			mnWebMain.closeSelfViewController(1);
		}
		
	},
	
}
