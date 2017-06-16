/**
 * 初始化angularjs
 */
var gestureLoginApp = angular.module("gestureLoginApp", ["ngTouch"]).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
gestureLoginApp.controller("gestureLoginController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		gestureLoginController.init($scope);
	})
});

/**
 * 手势登录
 */
var gestureLoginController = 
{
	//作用域
	scope : null,
	
	//数据模型
	gestureLoginModel : 
	{
		phoneNum : null,
		gesturePwd : null,
		gestureTip : null,
		gestureClass : null,
		myIcon : null,
		verifyCount : 3,
		currentVerifyCount : 0,
		sliderAble : true,//是否可以使用手势
		h5Clock : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.initGesture();
		
		this.setDefault();
		
		this.ngClickFunction();
	},
	
	//初始化数据
	setDefault : function ()
	{
		var self = this;
		
		var verifyCount = mnWebMain.syncGetLocalStorage(storageKey.GESTURE_COUNT);
		
		if (isEmpty(verifyCount))
		{
			self.gestureLoginModel.verifyCount = 3;
		}
		else
		{
			self.gestureLoginModel.verifyCount = parseInt(verifyCount);
		}
		
		self.gestureLoginModel.currentVerifyCount = 0;
		
		var currentTime = new Date().getTime();
		
		var lastGestureErrorTime = mnWebMain.syncGetLocalStorage(storageKey.GESTURE_ERROR_TIME);
		
		if (isEmpty(lastGestureErrorTime))
		{
			self.gestureLoginModel.sliderAble = true;
		}
		else
		{
			var time = (parseFloat(currentTime) - parseFloat(lastGestureErrorTime)) / 1000;
			time = time / 60;
			
			if (time >= 5)//超过5分钟，则可以重新设置手势密码
			{
				self.gestureLoginModel.sliderAble = true;
				self.gestureLoginModel.gestureTip = "请输入手势密码";
				self.gestureLoginModel.gestureClass = "active";
				mnWebMain.syncSetLocalStorage(storageKey.GESTURE_ERROR_TIME, null);
			}
			else
			{
				self.gestureLoginModel.sliderAble = false;
				self.gestureLoginModel.gestureTip = "请" + (5 - parseInt(time))+ "分钟后重试！";
				self.gestureLoginModel.gestureClass = "no-active";
			}
		}
		
		var userInfo = mnWebMain.syncGetLocalStorage(storageKey.USER_DATA);
		
		if (isEmpty(userInfo))
		{
			self.gestureLoginModel.myIcon = "img/ease_default_avatar.png";
		}
		else
		{
			userInfo = JSON.parse(userInfo);
			
			if (isEmpty(userInfo.icon))
			{
				self.gestureLoginModel.myIcon = "img/ease_default_avatar.png";
			}
			else
			{
				self.gestureLoginModel.myIcon = userInfo.icon;
			}
			
		}
		
		self.scope.myIcon = self.gestureLoginModel.myIcon;
		
		self.gestureLoginModel.phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
		
		self.gestureLoginModel.phoneNum = changePhoneNumFormat(self.gestureLoginModel.phoneNum);
		
		self.scope.phoneNum = self.gestureLoginModel.phoneNum;
		self.scope.gestureTip = self.gestureLoginModel.gestureTip;
		self.scope.gestureClass = self.gestureLoginModel.gestureClass;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".gesture-login-body").show();
		
		self.gestureLoginModel.h5Clock.reset();
//		self.initGesture();
	},
	
	//初始化手势插件
	initGesture : function ()
	{
		var self = this;
		
		mnWebMain.syncSetLocalStorage(storageKey.GESTURE_TYPE, gestureTypeKey.LOGIN_GESTURE);
		
		self.gestureLoginModel.h5Clock = new H5lock({
			    chooseType: 3
			});
			
		self.gestureLoginModel.h5Clock.init();
	},
	
	//手势登录处理
	gestureEndDeal : function (psw)
	{
		var self = this;
		
		if (!self.gestureLoginModel.sliderAble)
		{
			var currentTime = new Date().getTime();
		
			var lastGestureErrorTime = mnWebMain.syncGetLocalStorage(storageKey.GESTURE_ERROR_TIME);
			
			if (isEmpty(lastGestureErrorTime))
			{
				self.gestureLoginModel.sliderAble = true;
			}
			else
			{
				var time = (parseFloat(currentTime) - parseFloat(lastGestureErrorTime)) / 1000;
				time = time / 60;
				
				if (time >= 5)//超过5分钟，则可以重新设置手势密码
				{
					self.gestureLoginModel.sliderAble = true;
					self.gestureLoginModel.gestureTip = "请输入手势密码";
					self.gestureLoginModel.gestureClass = "active";
					mnWebMain.syncSetLocalStorage(storageKey.GESTURE_ERROR_TIME, null);
				}
				else
				{
					self.gestureLoginModel.sliderAble = false;
					self.gestureLoginModel.gestureTip = "请" + (5 - parseInt(time))+ "分钟后重试！";
					self.gestureLoginModel.gestureClass = "no-active";
				}
			}
		}
		
		if (self.gestureLoginModel.sliderAble)
		{
			self.gestureLoginModel.currentVerifyCount++;
			
			if (self.gestureLoginModel.currentVerifyCount <= self.gestureLoginModel.verifyCount)
			{
				self.gestureLoginModel.gesturePwd = "";
			
				for (var i = 0; i < psw.length; i ++)
				{
					self.gestureLoginModel.gesturePwd += psw[i].index; 
				}
				
				var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
				
				if (self.gestureLoginModel.gesturePwd == userInfo.gestureCode)
				{
					self.gestureLoginModel.gestureTip = "手势密码验证通过！";
					self.gestureLoginModel.gestureClass = "active";
					
					self.scope.gestureTip = self.gestureLoginModel.gestureTip;
					self.scope.gestureClass = self.gestureLoginModel.gestureClass;
					self.scope.$apply();
					
					mnWebMain.syncSetLocalStorage(storageKey.GESTURE_ERROR_TIME, null);
					
					var easeParams = 
					{
						account : userInfo.userId,
						password : "111111",
						userName : userInfo.baseInfo.name,
						userIcon : userInfo.icon
					}
					
					mnWebMain.showLoading();
					
					mnWebMain.easeChatLogin(easeParams, function (data)
					{
						mnWebMain.closeLoading();
						
						mnWebMain.openViewController(VCID_INDEX);
						
						mnWebMain.closeSelfViewController(1);
					});
					
//					var baseParam = {
//						"url" : pageUrl.APP_INDEX_PAGE_URL,
//						"isHideNavBar" : 1,
//						"titleType" : 0,
//					};
//					var centerParam = [];
//					var leftParam = [];
//					var rightParam = [];
//					
//					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					
					
					
//					if (isAndroid)
//					{
						
//					}
				}
				else
				{
					if (self.gestureLoginModel.gesturePwd.length < 4)
					{
						self.gestureLoginModel.currentVerifyCount--;
					}
					else
					{
						var count = self.gestureLoginModel.verifyCount - self.gestureLoginModel.currentVerifyCount;
						self.gestureLoginModel.gestureTip = "手势密码不正确，还有" + count + "次机会";
					}
					
					self.gestureLoginModel.gestureClass = "no-active";
					
					self.scope.gestureTip = self.gestureLoginModel.gestureTip;
					self.scope.gestureClass = self.gestureLoginModel.gestureClass;
					self.scope.$apply();
					
					if (self.gestureLoginModel.currentVerifyCount == self.gestureLoginModel.verifyCount)
					{
						var time = new Date().getTime() + "";
						mnWebMain.syncSetLocalStorage(storageKey.GESTURE_ERROR_TIME, time);
					}
				}
			}
			else
			{
				mnWebMain.showProgressDialog("请重新登录,或5分钟后再试！");
			}
		}
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//返回
		self.scope.back = function ()
		{
//			mnWebMain.closeSelfViewController(1);
		}
		
		//其他方式登录
		self.scope.onClickOtherLogin = function ()
		{
			mnWebMain.easeChatLogout();
			
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
		
		
		
		
	},
	
}
