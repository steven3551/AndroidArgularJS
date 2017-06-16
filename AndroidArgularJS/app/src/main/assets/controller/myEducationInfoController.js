/**
 * 初始化angularjs
 */
var myEducationInfoApp = angular.module("myEducationInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myEducationInfoApp.controller("myEducationInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myEducationInfoHeaderParams);
		myEducationInfoController.init($scope);
	})
});

/**
 * 我的学历信息
 */
var myEducationInfoController = 
{
	//作用域
	scope : null,
	
	//我的学历数据模型
	myEducationInfoModel : 
	{
		educationList : [],
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.getEducationList();
		
		this.ngClickFunction();
	},
	
	//获取所有的学历信息
	getEducationList : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_EDUCATION_INFO, {}, function (data)
		{
			self.myEducationInfoModel.emptySearch = false;
			self.myEducationInfoModel.educationList = [];
			
			if (data.list.length == 0 || isEmpty(data.list[0].startTime))
			{
				self.myEducationInfoModel.emptySearch = true;
			}
			else
			{
				self.myEducationInfoModel.educationList = data.list;
				self.scope.educationList = self.myEducationInfoModel.educationList;
			}
			
			self.scope.emptySearch = self.myEducationInfoModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".edu-info-body").show();
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
