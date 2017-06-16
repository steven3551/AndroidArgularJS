/**
 * 初始化angularjs
 */
var myCommonApp = angular.module("myCommonApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myCommonApp.controller("myCommonController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myCommonHeaderParams);
		myCommonController.init($scope);
	})
});

/**
 * 我的
 */
var myCommonController = 
{
	//作用域
	scope : null,
	
	//我的信息--普通用户数据模型
	myCommonModel : 
	{
		userInfo : {},
		myFunList : [],
		myIcon : null,
		myName : null,
		gesturePwd : null,
		gestureTip : null,
		gestureClass : null,
		showModel : {},
		inputCodes : null,
		skipAble : true,//防止手势触发2次
		inputNickname : null,
		reSendTimer : null,
		reSendTime : 60,
		reSendDisAble : true,
		h5Clock : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.initGesture();
		
		this.reloadWillAppear();
		
		this.getMyfunList();
		
		this.ngClickFunction();
		
	},
	
	//重写，界面每次显示时和收到会话时的触发事件
	reloadWillAppear : function ()
	{
		var self = this;
		
		//界面显示时的回调
		mnWebMain.cbViewWillAppear = function ()
		{
			self.setDefault();
		}
		
	},
	
	//设置默认
	setDefault : function ()
	{
		var self = this;
		
		var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
		
		self.myCommonModel.userInfo = userInfo;
		
		if (isEmpty(userInfo.icon))
		{
			self.myCommonModel.myIcon = "img/ease_default_avatar.png";
		}
		else
		{
			self.myCommonModel.myIcon = userInfo.icon;
		}
		
		if (isEmpty(userInfo.name))
		{
			self.myCommonModel.myName = userInfo.platformId;
		}
		else
		{
			self.myCommonModel.myName = userInfo.name;
		}
		
		self.scope.myIcon = self.myCommonModel.myIcon;
		self.scope.myName = self.myCommonModel.myName;
		
		self.myCommonModel.gestureTip = "请输入手势密码";
		self.myCommonModel.gestureClass = "active";
		
		self.scope.gestureTip = self.myCommonModel.gestureTip;
		self.scope.gestureClass = self.myCommonModel.gestureClass;
		
		self.myCommonModel.showModel.showDialog = false;
		self.myCommonModel.showModel.showGesture = true;
		self.myCommonModel.showModel.showModNickname = false;
		self.scope.showModel = self.myCommonModel.showModel;
		
		self.myCommonModel.reSendTime = 60;
		self.scope.reSendTime = self.myCommonModel.reSendTime;
		self.myCommonModel.reSendDisAble = false;
		self.scope.reSendDisAble = self.myCommonModel.reSendDisAble;
		
		self.myCommonModel.inputCodes = null;
		self.scope.inputCodes = self.myCommonModel.inputCodes;
		self.scope.$apply();
	},
	
	//获取所有的我的功能列表
	getMyfunList : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_PAGE, {}, function (data)
		{
			self.myCommonModel.myFunList = [];
			self.myCommonModel.myFunList = data.userPages;
			
			for (var i = 0; i < self.myCommonModel.myFunList.length; ++ i) 
			{
				self.myCommonModel.myFunList[i].isShow = self.myCommonModel.myFunList[i].isOpen == 1 ? true : false;
			}
			
			self.scope.myFunList = self.myCommonModel.myFunList;
			
			self.scope.$apply();
			$(".my-popUp-bg").show();
			$(".my-popUp-container").show();
			$(".all-container").show();
//			self.resetPageHeight();
			document.getElementById("canvas").height = document.getElementById("canvas").width * 0.8;
			self.myCommonModel.h5Clock.reset();
		})
	},
	
	//重新设置界面高度
	resetPageHeight : function ()
	{
		var self = this;
		
		setTimeout(function()
		{
			var screenHeight =  window.screen.availHeight;
			var containerHeight = $(".personal-detail-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
				$(".personal-detail-container").height(screenHeight - 101);
			}
			else
			{
				$(".personal-detail-container").height("auto");
			}
			
			containerHeight = $(".personal-detail-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
				$(".personal-detail-container").height(screenHeight - 101);
			}
			
			self.scope.$apply();
			setTimeout(function(){
//				self.scope.$apply();
//				allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
			}, 0);
		}, 10);
	},
	
	//初始化手势插件
	initGesture : function ()
	{
		var self = this;
		
		mnWebMain.syncSetLocalStorage(storageKey.GESTURE_TYPE, gestureTypeKey.SALARY_VERTIFY_GESTURE);
		
		self.myCommonModel.h5Clock = new H5lock({
		    chooseType: 3
		});
		self.myCommonModel.h5Clock.init();
	},
	
	//手势登录处理
	gestureEndDeal : function (psw)
	{
		var self = this;
		
		if (self.myCommonModel.skipAble)
		{
			self.myCommonModel.gesturePwd = "";
		
			for (var i = 0; i < psw.length; i ++)
			{
				self.myCommonModel.gesturePwd += psw[i].index; 
			}
			
			var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
			
			
			if (self.myCommonModel.gesturePwd == userInfo.gestureCode)
			{
				self.myCommonModel.skipAble = false;
				self.myCommonModel.gestureTip = "手势密码验证通过！";
				self.myCommonModel.gestureClass = "active";
				
				self.scope.gestureTip = self.myCommonModel.gestureTip;
				self.scope.gestureClass = self.myCommonModel.gestureClass;
				
				self.myCommonModel.showModel.showDialog = false;
				self.myCommonModel.showModel.showGesture = true;
				
				self.scope.showModel = self.myCommonModel.showModel;
				
				self.scope.$apply();
				
				var params = 
				{
					type : "4"
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_STATISTICS, params, function (data)
				{
					
				})
				
//				allController.allModel.mySwiper.attachEvents();
				
				mnWebMain.setNoScroll(false, function (data)
				{
					
				});
				
				var baseParam = {
					"url" : pageUrl.APP_MY_SALARY_PAGE_URL,
					"isHideNavBar" : 0,
					"titleType" : 0,
				};
				var centerParam = [{"type" : 0,"param" : "工资查询"}];
				var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
				var rightParam = [];
				
				mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			}
			else
			{
				self.myCommonModel.gestureTip = "手势密码不正确，请重新绘制";
				self.myCommonModel.gestureClass = "no-active";
				
				self.scope.gestureTip = self.myCommonModel.gestureTip;
				self.scope.gestureClass = self.myCommonModel.gestureClass;
				self.scope.$apply();
			}
		}
		
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//换头像
		self.scope.onClickChangeHeadIcon = function()
		{
			mnWebMain.popupModal(pageUrl.APP_PHOTO_PICK_POP_MODAL, function (data)
			{
				var type = JSON.parse(data).data.params;
				
				if (type == 1)
				{
					mnWebMain.photoPicker(0, 0, 1, 1, function (data)//拍照
					{
						var result = JSON.parse(data);
						var imgUrl = result.data.localURLs[0].url;
						
						self.myCommonModel.myIcon = imgUrl;
	//					self.scope.myIcon = self.myCommonModel.myIcon;
	//					self.scope.$apply();
						$(".personal-icon-div").css("background-image",'url('+self.myCommonModel.myIcon+')');
						var sessionId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
						var pics = [];
						pics.push(imgUrl);
						
						mnWebMain.uploadFilesToSelfServer(sessionId, pics, function (data2)
						{
							var result2 = JSON.parse(data2);
							
							self.myCommonModel.myIcon = result2.data.objectKey[0].url;
	//						self.scope.myIcon = self.myCommonModel.myIcon;
	//						self.scope.$apply();
							$(".personal-icon-div").css("background-image",'url('+self.myCommonModel.myIcon+')');
							var modInfoObj = 
							{
								icon : self.myCommonModel.myIcon,
							}
							var params = 
							{
								modInfo : JSON.stringify(modInfoObj),
							}
							
							jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data3)
							{
								var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
								
								userInfo.icon = self.myCommonModel.myIcon;
								
								mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
								
								mnWebMain.showProgressDialog("修改头像成功!");
								
								var paramObj = 
								{
									userName : userInfo.name,
									userId : userInfo.userId,
									userIcon : userInfo.icon
								}
								
								mnWebMain.updateUserInfo(paramObj, function(data){
									
								});
								
							})
							
						});
					});
				}
				else if (type == 2)
				{
					mnWebMain.photoPicker(0, 1, 1, 1, function (data)//本地相册
					{
						var result = JSON.parse(data);
						var imgUrl = result.data.localURLs[0].url;
						self.myCommonModel.myIcon = imgUrl;
						$(".personal-icon-div").css("background-image",'url('+self.myCommonModel.myIcon+')');
	//					self.scope.myIcon = "myCommonController.myCommonModel.myIcon";
	//					myCommonController.scope.$apply();
	//					alert(myCommonController.scope.myIcon)
						var sessionId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
						var pics = [];
						pics.push(imgUrl);
						
						mnWebMain.uploadFilesToSelfServer(sessionId, pics, function (data2)
						{
							var result2 = JSON.parse(data2);
							
							self.myCommonModel.myIcon = result2.data.objectKey[0].url;
	//						alert(myCommonController.scope.myIcon)
							$(".personal-icon-div").css("background-image",'url('+self.myCommonModel.myIcon+')');
	//						myCommonController.scope.myIcon = myCommonController.myCommonModel.myIcon;
	//						myCommonController.scope.$apply();
	//						alert(myCommonController.scope.myIcon)
							var modInfoObj = 
							{
								icon : self.myCommonModel.myIcon,
							}
							var params = 
							{
								modInfo : JSON.stringify(modInfoObj),
							}
							
							jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data3)
							{
								var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
								
								userInfo.icon = self.myCommonModel.myIcon;
								
								mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
								
								mnWebMain.showProgressDialog("修改头像成功!");
								
								var paramObj = 
								{
									userName : userInfo.name,
									userId : userInfo.userId,
									userIcon : userInfo.icon
								}
								
								mnWebMain.updateUserInfo(paramObj, function(data){
									
								});
							})
						});
					});
				}
			});
			
//			$cameraDialog.show(function(){
//				
//			},function(){
//				
//			})
		}
		
		//我的信息
		self.scope.onClickMyInfo = function()
		{
			var params = 
			{
				type : "3"
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_STATISTICS, params, function (data)
			{
				
			})
			
			var baseParam = {
				"url" : pageUrl.APP_MY_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor_white"}];
			var rightParam = [];
			var searchBarParam = "";
			var color = "41B6D5";
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam, color);
		}
		
		//我的薪资
		self.scope.onClickMySalary = function()
		{
			
			self.myCommonModel.gestureTip = "请输入手势密码";
			self.myCommonModel.gestureClass = "active";
			
			self.scope.gestureTip = self.myCommonModel.gestureTip;
			self.scope.gestureClass = self.myCommonModel.gestureClass;
			
			self.myCommonModel.showModel.showDialog = true;
			self.myCommonModel.showModel.showGesture = true;
			self.scope.showModel = self.myCommonModel.showModel;
			
//			allController.allModel.mySwiper.detachEvents();
			
			mnWebMain.setNoScroll(true, function (data)
			{
				
			});
			
			self.myCommonModel.inputCodes = null;
			self.scope.inputCodes = self.myCommonModel.inputCodes;
			
			self.myCommonModel.skipAble = true;
			
			
		}
		
		//其他功能
		self.scope.onClickOthers = function()
		{
//			$confirmTip.show("新功能暂未上线，敬请期待！");
			mnWebMain.showProgressDialog("新功能暂未上线，敬请期待！");
		}
		
		//选择手势密码
		self.scope.onClickSelectGesture = function ()
		{
			self.myCommonModel.showModel.showGesture = true;
			self.scope.showModel = self.myCommonModel.showModel;
		}
		
		//选择验证码
		self.scope.onClickSelectCodes = function ()
		{
			self.myCommonModel.showModel.showGesture = false;
			self.scope.showModel = self.myCommonModel.showModel;
		}
		
		//关闭弹框
		self.scope.onClickCloseDialog = function ()
		{
			self.myCommonModel.showModel.showDialog = false;
			self.myCommonModel.showModel.showGesture = true;
			
			self.scope.showModel = self.myCommonModel.showModel;
			
//			allController.allModel.mySwiper.attachEvents();
			
			mnWebMain.setNoScroll(false, function (data)
			{
				
			});
		}
		
		//获取验证码
		self.scope.onClickGetCodes = function ()
		{
			if (!self.myCommonModel.reSendDisAble)
			{
				self.myCommonModel.reSendDisAble = true;
				
				self.myCommonModel.reSendTimer = setInterval(function ()
				{
					self.myCommonModel.reSendTime--;
					
					if (self.myCommonModel.reSendTime < 0)
					{
						self.myCommonModel.reSendTime = 60;
						self.myCommonModel.reSendDisAble = false;
						self.scope.reSendDisAble = self.myCommonModel.reSendDisAble;
						clearInterval(self.myCommonModel.reSendTimer);
					}
					
					self.scope.reSendTime = self.myCommonModel.reSendTime;
					
					self.scope.$apply();
				}, 1000);
				
				var phoneAreaCode = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
			
				var params = 
				{
					phoneAreaCode : phoneAreaCode,
					mobile : self.myCommonModel.userInfo.platformId,
					type : 4,
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_GETCODE, params, function (data)
				{
					mnWebMain.showProgressDialog("验证码已发送！")
				})
				
			}
			
			
			
		}
		
		//确认验证码
		self.scope.onClickConfirmCodes = function ()
		{
			self.myCommonModel.inputCodes = self.scope.inputCodes;
			
			if (isEmpty(self.myCommonModel.inputCodes))
			{
				mnWebMain.showProgressDialog("请输入验证码！");
			}
			else 
			{
				var phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
				
				var params = 
				{
					smsCode : self.myCommonModel.inputCodes,
					type : 4,
					phoneNum : phoneNum,
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_VERIFY_SEARCH_SALARY_CODES, params, function (data)
				{
					self.myCommonModel.gestureTip = "手势密码验证通过！";
					self.myCommonModel.gestureClass = "active";
					
					self.scope.gestureTip = self.myCommonModel.gestureTip;
					self.scope.gestureClass = self.myCommonModel.gestureClass;
					
					self.myCommonModel.showModel.showDialog = false;
					self.myCommonModel.showModel.showGesture = true;
					
					self.scope.showModel = self.myCommonModel.showModel;
					self.scope.$apply();
					
					var params = 
					{
						type : "4"
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_STATISTICS, params, function (data)
					{
						
					})
					
//					allController.allModel.mySwiper.attachEvents();
					
					mnWebMain.setNoScroll(false, function (data)
					{
						
					});
					
					var baseParam = {
						"url" : pageUrl.APP_MY_SALARY_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "工资查询"}];
					var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
					var rightParam = [];
					
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
				})
			}
			
		}
		
		//弹出修改昵称弹框
		self.scope.onClickToModNickname = function ()
		{
			self.myCommonModel.showModel.showModNickname = true;
			self.scope.showModel = self.myCommonModel.showModel;
		}
		
		//关闭修改昵称弹框
		self.scope.onClickModNicknameDialog = function ()
		{
			self.myCommonModel.showModel.showModNickname = false;
			self.scope.showModel = self.myCommonModel.showModel;
		}
		
		//确认修改昵称
		self.scope.onClickModNickname = function ()
		{
			self.myCommonModel.inputNickname = self.scope.inputNickname;
			
			if (isEmpty(self.myCommonModel.inputNickname))
			{
				mnWebMain.showProgressDialog('昵称不能为空！')
			}
			else
			{
				var modInfo =
				{
					name : self.myCommonModel.inputNickname,
				}
				
				var params = 
				{
					modInfo : JSON.stringify(modInfo),
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data)
				{
					mnWebMain.showProgressDialog('修改昵称成功！');
					
					var userInfo  = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
					
					userInfo.name = self.myCommonModel.inputNickname;
					
					mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
					
					var paramObj = 
					{
						userName : userInfo.name,
						userId : userInfo.userId,
						userIcon : userInfo.icon
					}
					
					mnWebMain.updateUserInfo(paramObj, function(data){
						
					});
					
					
					self.myCommonModel.showModel.showModNickname = false;
					self.scope.showModel = self.myCommonModel.showModel;
					
					self.myCommonModel.myName = self.myCommonModel.inputNickname;
					self.scope.myName = self.myCommonModel.myName;
					
					self.scope.$apply();
				})
			}
			
		}
		
	},
	
	
}
