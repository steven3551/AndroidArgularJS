/**
 * 初始化angularjs
 */
var myManagerApp = angular.module("myManagerApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myManagerApp.controller("myManagerController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myManagerHeaderParams);
		footerController.init($scope, myManagerParams.SELECTED_FOOTER_MENU_TYPE);
		myManagerController.init($scope);
	})
});

/**
 * 我的
 */
var myManagerController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"myIcon" : null,
		"myName" : null,
	},
	
	//我的信息--部门经理数据模型
	myManagerModel : 
	{
		
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setStaticBasicData();
		
		this.resetData();
		
		this.ngClickFunction();
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//我的信息
		self.scope.onClickMyInfo = function()
		{
			mnWebMain.openWebViewController(pageUrl.APP_MY_INFO_PAGE_URL);
		}
		
		//我的薪资
		self.scope.onClickMySalary = function()
		{
			mnWebMain.openWebViewController(pageUrl.APP_MY_SALARY_PAGE_URL);
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.myIcon = myManagerParams.MY_ICON;
		self.staticBasicModel.myName = myManagerParams.MY_NAME;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		
		self.scope.myManagerModel = self.myManagerModel;
		self.scope.$apply();
	},
	
	
}
