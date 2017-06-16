/**
 * 初始化angularjs
 */
var loadingApp = angular.module("loadingApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
loadingApp.controller("loadingController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		loadingController.init($scope);
	})
});

/**
 * 加载
 */
var loadingController = 
{
	//作用域
	scope : null,
	
	//数据模型
	loadingModel : 
	{
		showTip : null,
		timer : null,
		tipTime : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setDefault();
		
		this.ngClickFunction();
	},
	
	setDefault : function ()
	{
		var self = this;
		
		self.loadingModel.timer = setTimeout(function()
		{
			self.skipToLogin();
		},3000);
		
		mnWebMain.closeLoading();
		$(".loading-body").show();
	},
	
	//重登录
	reToLogin : function ()
	{
		var reloginSuccess =  jqHttpRequest.relogin();
		return reloginSuccess;
	},
	
	//调到登录页
	skipToLogin : function ()
	{
		var self = this;
		
		var isFirstEnter = mnWebMain.syncGetLocalStorage(storageKey.IS_FIRST_ENTER);
		
		if (isEmpty(isFirstEnter))
		{
			
		
			var baseParam = {
				"url" : pageUrl.APP_GUIDE_PAGE_URL,
				"isHideNavBar" : 1,
				"titleType" : 0,
			};
			
			var centerParam = [];
			var leftParam = [];
			var rightParam = [];
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
//			if (isAndroid)
//			{
				mnWebMain.closeSelfViewController(1);
//			}
		}
		else 
		{
			var isOpenGesture = mnWebMain.syncGetLocalStorage(storageKey.IS_OPEN_GESTURE);
			
			if (isOpenGesture == 1)
			{
				var reloginSuccess = self.reToLogin();
				
				if (reloginSuccess)
				{
					var baseParam = {
						"url" : pageUrl.APP_GESTURE_LOGIN_PAGE_URL,
						"isHideNavBar" : 1,
						"titleType" : 0,
					};
					
					var centerParam = [];
					var leftParam = [];
					var rightParam = [];
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					
//					if (isAndroid)
//					{
						mnWebMain.closeSelfViewController(1);
//					}
				}
				
			}
			else 
			{
				var baseParam = {
					"url" : pageUrl.APP_LOGIN_PAGE_URL,
					"isHideNavBar" : 1,
					"titleType" : 0,
				};
				
				var centerParam = [];
				var leftParam = [];
				var rightParam = [];
				mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
				
//				if (isAndroid)
//				{
					mnWebMain.closeSelfViewController(1);
//				}
			}
		}
		
		
		
		
		
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳过
		self.scope.onClickSkip = function ()
		{
			clearTimeout(self.loadingModel.timer);
			self.skipToLogin();
		}
		
		
	},
	
}
