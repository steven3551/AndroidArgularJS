/**
 * 初始化angularjs
 */
var guideApp = angular.module("guideApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
guideApp.controller("guideController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		guideController.init($scope);
	})
});

/**
 * 引导页面
 */
var guideController = 
{
	//作用域
	scope : null,
	
	//数据模型
	guideModel : 
	{
		showTip : null,
		timer : null,
		tipTime : null,
		myIcon : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
//		mnWebMain.showLoading();
		
		this.initSwiper();
		
		this.setDefault();
		
		this.ngClickFunction();
	},
	
	//重登录
	reToLogin : function ()
	{
		var reloginSuccess =  jqHttpRequest.relogin();
		return reloginSuccess;
	},
	
	initSwiper : function ()
	{
		var swiper = new Swiper('.loading-guide', {
			pagination : '.swiper-pagination',
			paginationClickable : true,
	        spaceBetween: 0,
	        resistanceRatio : 0,
	        onSlideChangeEnd : function (swiper)
	        {
	        	
	        }
	    });
	},
	
	setDefault : function ()
	{
		var self = this;
		
//		self.guideModel.myIcon = "img/ease_default_avatar.png";
//			
//		var userIcon = mnWebMain.syncGetLocalStorage(userKeys.USER_ICON)
//		
//		if (!isEmpty(userIcon) && userIcon.indexOf(".") != -1)
//		{
//			self.guideModel.myIcon = userIcon;
//		}
//		
//		self.scope.myIcon = self.guideModel.myIcon;
//		
//		self.guideModel.showTip = false;
//		self.scope.showTip = self.guideModel.showTip;
//		
//		self.guideModel.tipTime = 5;
//		self.scope.tipTime = self.guideModel.tipTime;
//				
//		self.scope.$apply();
		
//		mnWebMain.closeLoading();
//		$(".guide-body").show();
		
//		var screenHeight = window.screen.availHeight;
//		$(".loading-guide").height(screenHeight);
//		$(".guide-img").height(screenHeight);
	},
	
	//调到登录页
	enterToLogin : function ()
	{
		var self = this;
		
		var isFirstEnter = mnWebMain.syncGetLocalStorage(storageKey.IS_FIRST_ENTER);
		
		if (isEmpty(isFirstEnter))
		{
			mnWebMain.syncSetLocalStorage(storageKey.IS_FIRST_ENTER, "IS_FIRST_ENTER");
			
			$(".register-tip-cover").show();
			$(".register-tip").show();
		
			self.guideModel.showTip = true;
			self.scope.showTip = self.guideModel.showTip;
//			self.guideModel.timer = window.setInterval(function()
//			{
//				if (self.guideModel.tipTime == 0)
//				{
//					clearInterval(this);
//					self.guideModel.showTip = false;
//					self.scope.showTip = self.guideModel.showTip;
//					self.scope.$apply();
//					
//					
//					
//					var baseParam = {
//						"url" : pageUrl.APP_LOGIN_PAGE_URL,
//						"isHideNavBar" : 1,
//						"titleType" : 0,
//					};
//					
//					var centerParam = [];
//					var leftParam = [];
//					var rightParam = [];
//					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
//					
//				}
//				self.guideModel.tipTime--;
//				self.scope.tipTime = self.guideModel.tipTime;
//				self.scope.$apply();
//			}, 1000);
			
		}
		else 
		{
			self.guideModel.showTip = false;
			self.scope.showTip = self.guideModel.showTip;
				
			var isOpenGesture = mnWebMain.syncGetLocalStorage(storageKey.IS_OPEN_GESTURE);
			
			if (isOpenGesture == 1)
			{
				mnWebMain.syncSetLocalStorage(storageKey.IS_FIRST_ENTER, "IS_FIRST_ENTER");
				
				var reloginSuccess = self.reToLogin();
				
				if (reloginSuccess)
				{
					var baseParam = {
						"url" : pageUrl.APP_GESTURE_LOGIN_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					
					var centerParam = [{"type" : 0,"param" : "手势密码登录"}];
					var leftParam = [{"leftType":1, "type" : 0 ,"param" : ""}];
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
				mnWebMain.syncSetLocalStorage(storageKey.IS_FIRST_ENTER, "IS_FIRST_ENTER");
				
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
		
		//隐藏首次安装提示弹框
		self.scope.onClickHide = function ()
		{
			clearInterval(self.guideModel.timer);
			
			self.guideModel.showTip = false;
			self.scope.showTip = self.guideModel.showTip;
			
			var baseParam = {
				"url" : pageUrl.APP_LOGIN_PAGE_URL,
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
		
		//进入登录页
		self.scope.onClickToLogin = function ()
		{
			self.enterToLogin();
//			var isFirstEnter = mnWebMain.syncGetLocalStorage(storageKey.IS_FIRST_ENTER);
//			isFirstEnter = null;
//			if (isEmpty(isFirstEnter))
//			{
//				self.guideModel.showTip = true;
//				self.scope.showTip = self.guideModel.showTip;
//				self.guideModel.timer = window.setInterval(function()
//				{
//					if (self.guideModel.tipTime == 0)
//					{
//						clearInterval(this);
//						self.guideModel.showTip = false;
//						self.scope.showTip = self.guideModel.showTip;
//						self.scope.$apply();
//						
//						self.enterToLogin();
//					}
//					self.guideModel.tipTime--;
//					self.scope.tipTime = self.guideModel.tipTime;
//					self.scope.$apply();
//				}, 1000);
//			}
//			else
//			{
//				self.guideModel.showTip = false;
//				self.scope.showTip = self.guideModel.showTip;
//				self.scope.$apply();
//			}
			
			
			
		}
		
		//进入登录
		self.scope.onClickToNext = function ()
		{
			self.guideModel.showTip = false;
			self.scope.showTip = self.guideModel.showTip;
			
			var baseParam = {
				"url" : pageUrl.APP_LOGIN_PAGE_URL,
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
		
		self.scope.onClickSkip = function ()
		{
			self.enterToLogin();
		}
		
		
	},
	
}
