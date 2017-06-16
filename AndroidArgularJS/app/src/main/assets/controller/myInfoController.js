/**
 * 初始化angularjs
 */
var myInfoApp = angular.module("myInfoApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
myInfoApp.controller("myInfoController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, myInfoHeaderParams);
		myInfoController.init($scope);
	})
});

/**
 * 我的基本信息
 */
var myInfoController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"contactWayList" : [],
		"enterpriseInfoList" : [],
	},
	
	//登录数据模型
	myInfoModel : 
	{
		personalIcon : null,
		personalName : null,
		showModel : {},
		inputNickname : null,
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
		
		//点击头像
		self.scope.changeHeadIcon = function()
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
						
						self.myInfoModel.personalIcon = imgUrl;
						
						self.scope.personalIcon = self.myInfoModel.personalIcon;
						self.scope.$apply();
						
						var sessionId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
						var pics = [];
						pics.push(imgUrl);
						
						mnWebMain.uploadFilesToSelfServer(sessionId, pics, function (data2)
						{
							var result2 = JSON.parse(data2);
							
							self.myInfoModel.personalIcon = result2.data.objectKey[0].url;
							self.scope.personalIcon = self.myInfoModel.personalIcon;
							self.scope.$apply();
							
							var modInfoObj = 
							{
								icon : self.myInfoModel.personalIcon,
							}
							var params = 
							{
								modInfo : JSON.stringify(modInfoObj),
							}
							
							jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data3)
							{
								var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
								
								userInfo.icon = self.myInfoModel.personalIcon;
								
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
						
						self.myInfoModel.personalIcon = imgUrl;
						
						self.scope.personalIcon = self.myInfoModel.personalIcon;
						self.scope.$apply();
						
						var sessionId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
						var pics = [];
						pics.push(imgUrl);
						
						mnWebMain.uploadFilesToSelfServer(sessionId, pics, function (data2)
						{
							var result2 = JSON.parse(data2);
							
							self.myInfoModel.personalIcon = result2.data.objectKey[0].url;
							self.scope.personalIcon = self.myInfoModel.personalIcon;
							self.scope.$apply();
							
							var modInfoObj = 
							{
								icon : self.myInfoModel.personalIcon,
							}
							var params = 
							{
								modInfo : JSON.stringify(modInfoObj),
							}
							
							jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data3)
							{
								var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
								
								userInfo.icon = self.myInfoModel.personalIcon;
								
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
			})
//			$cameraDialog.show(function(){
//				
//			},function(){
//				
//			})
		}
		
		//跳转到基本信息页面
		self.scope.onClickToBasicInfo = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_COMMON_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "基本信息"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					
		}
		
		//跳转到任职信息页面
		self.scope.onClickToWorkingInfo = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_MY_POST_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "任职信息"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
		}
		
		//跳转到履历信息页面
		self.scope.onClickToRecordInfo = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_MY_RECORD_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "履历信息"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
		}
		
		//跳转到学历信息页面
		self.scope.onClickToEducationInfo = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_EDUCAATION_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "学历信息"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
		}
		
		//跳转到家庭信息页面
		self.scope.onClickToFamilyInfo = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_FAMILY_INFO_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "家庭信息"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
		}
		
		//弹出修改昵称弹框
		self.scope.onClickToModNickname = function ()
		{
			self.myInfoModel.showModel.showModNickname = true;
			self.scope.showModel = self.myInfoModel.showModel;
			
			self.myInfoModel.inputNickname = null;
			self.scope.inputNickname = self.myInfoModel.inputNickname;
		}
		
		//关闭修改昵称弹框
		self.scope.onClickModNicknameDialog = function ()
		{
			self.myInfoModel.showModel.showModNickname = false;
			self.scope.showModel = self.myInfoModel.showModel;
		}
		
		//确认修改昵称
		self.scope.onClickModNickname = function ()
		{
			self.myInfoModel.inputNickname = self.scope.inputNickname;
			
			if (isEmpty(self.myInfoModel.inputNickname))
			{
				mnWebMain.showProgressDialog('昵称不能为空！')
			}
			else
			{
				var modInfo =
				{
					name : self.myInfoModel.inputNickname,
				}
				
				var params = 
				{
					modInfo : JSON.stringify(modInfo),
				}
				
				jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_USERINFO, params, function (data)
				{
					mnWebMain.showProgressDialog('修改昵称成功！');
					
					var userInfo  = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
					
					userInfo.name = self.myInfoModel.inputNickname;
					
					mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
					
					var paramObj = 
					{
						userName : userInfo.name,
						userId : userInfo.userId,
						userIcon : userInfo.icon
					}
					
					mnWebMain.updateUserInfo(paramObj, function(data){
						
					});
					
					self.myInfoModel.showModel.showModNickname = false;
					self.scope.showModel = self.myInfoModel.showModel;
					
					self.myInfoModel.personalName = self.myInfoModel.inputNickname;
					self.scope.personalName = self.myInfoModel.personalName;
					
					self.scope.$apply();
				})
			}
			
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		
//		self.scope.staticBasicModel = self.staticBasicModel;
//		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
		
		if (isEmpty(userInfo.icon))
		{
			self.myInfoModel.personalIcon = "img/ease_default_avatar.png";
		}
		else
		{
			self.myInfoModel.personalIcon = userInfo.icon;
		}
		
		if (isEmpty(userInfo.name))
		{
			self.myInfoModel.personalName = userInfo.platformId;
		}
		else 
		{
			self.myInfoModel.personalName = userInfo.name;
		}
		
		self.myInfoModel.showModel.showModNickname = false;
		self.scope.showModel = self.myInfoModel.showModel;
		
		self.scope.personalIcon = self.myInfoModel.personalIcon;
		self.scope.personalName = self.myInfoModel.personalName;
		
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".my-info-container").show();
	},
}
