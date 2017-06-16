/**
 * 初始化angularjs
 */
var serviceProApp = angular.module("serviceProApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
serviceProApp.controller("serviceProController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, serviceProtocolHeaderParams);
		serviceProController.init($scope);
	})
});

/**
 * 服务协议
 */
var serviceProController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		
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
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".service-pro-body").show();
	},
}
