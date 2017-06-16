/**
 * 初始化angularjs
 */
var personalDetailApp = angular.module("personalDetailApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
personalDetailApp.controller("personalDetailController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, personalDetailHeaderParams);
		personalDetailController.init($scope);
	})
});

/**
 * 个人详情
 */
var personalDetailController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"chatLeftIcon" : null,
		"chatLeftTitle" : null,
		"followRightIcon" : null,
		"followRightTitle" : null,
		"contactWayList" : [],
		"enterpriseInfoList" : [],
	},
	
	//登录数据模型
	personalDetailModel : 
	{
		personalIcon : null,
		personalName : null,
		userInfo : {},
		userId : null,
		isFollowed : false,
		tempIcon : null,
		showModel : {},
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.updateTitleModal();
		
		this.setStaticBasicData();
		
		this.getUserBasicInfo();
		
		this.ngClickFunction();
	},
	
	//
	updateTitleModal : function ()
	{
		var baseParam = {
			"url" : pageUrl.APP_PERSONAL_DETAIL_PAGE_URL,
			"isHideNavBar" : 0,
			"titleType" : 0,
		};
		var centerParam = [];
		var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor_white"}];
		var rightParam = [];
		var searchBarParam = "";
		var color = "41B6D5";
			
		mnWebMain.updateDataModel(baseParam, leftParam, centerParam, rightParam, searchBarParam, color);
	},
	
	//获取用户的基本信息
	getUserBasicInfo : function ()
	{
		var self = this;
		
		var userId = getQueryString("userId");
		
		if (isEmpty(userId))
		{
			userId = mnWebMain.syncGetLocalStorage(userKeys.USERID);
		}
		
		self.personalDetailModel.userId = userId + "";
		
		
		
		var itemObj = [];
		itemObj.push(self.personalDetailModel.userId)
		
		var paramsObj = 
		{
			userIds : JSON.stringify(itemObj)
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_SIMPLE_USER_INFO, paramsObj, function (data)
		{
			var userInfo = data[self.personalDetailModel.userId];
			
			if (isEmpty(userInfo.icon))
			{
				self.personalDetailModel.tempIcon = "";
				self.personalDetailModel.personalIcon = "img/ease_default_avatar.png";
			}
			else
			{
				self.personalDetailModel.tempIcon = userInfo.icon;
				self.personalDetailModel.personalIcon = userInfo.icon;
			}
			
			
			self.personalDetailModel.personalName = userInfo.name;
			
			
			self.scope.personalDetailModel = self.personalDetailModel;
			self.scope.$apply();
		})
		
		var userInfo2 = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
		
		if (self.personalDetailModel.userId == userInfo2.userId)
		{
			self.personalDetailModel.showModel.showChatAndFollow = false;
		}
		else
		{
			self.personalDetailModel.showModel.showChatAndFollow = true;
			
			paramsObj2 = 
			{
				relationUserId : self.personalDetailModel.userId
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_FOLLOWED_PEOPLE, paramsObj2, function (data)
			{
				self.personalDetailModel.isFollowed = false;
				
				if (data.foucesInfo.length > 0)
				{
					self.personalDetailModel.isFollowed = true;
					self.staticBasicModel.followRightTitle = "取消关注";
				}
				else
				{
					self.personalDetailModel.isFollowed = false;
					self.staticBasicModel.followRightTitle = "关注";
				}
				
				self.scope.staticBasicModel = self.staticBasicModel;
				self.scope.$apply();
			})
		}
		
		var params = 
		{
			userId : self.personalDetailModel.userId
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_USER_BASIC_INFO, params, function (data)
		{
			self.personalDetailModel.emptySearch = false;
			self.personalDetailModel.userInfo = {};
			
			if (isEmpty(data.staffCode))
			{
				self.personalDetailModel.emptySearch = true;
			}
			else
			{
				self.personalDetailModel.userInfo = data;
				self.scope.userInfo = self.personalDetailModel.userInfo;
			}
			
			self.scope.showModel = self.personalDetailModel.showModel;
			self.scope.emptySearch = self.personalDetailModel.emptySearch;
			self.scope.$apply();
			
			mnWebMain.closeLoading();
			$(".personal-detail-body").show();
		})
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//聊天
		self.scope.onClickToChat = function ()
		{
			var chatType = 1;
			var userId = self.personalDetailModel.userId;
			var userName = self.personalDetailModel.personalName;
			var userIcon = self.personalDetailModel.tempIcon;
			mnWebMain.openViewController(VCID_SINGLE_CHAT, chatType, userId, userName, userIcon);//原生单聊
		}
		
		//关注
		self.scope.onClickFollow = function ()
		{
			var params = 
			{
				relationUserId : self.personalDetailModel.userId,
				foucesOperate : "1"
			}
				
			if (self.personalDetailModel.isFollowed)
			{
				params.foucesOperate = "0";
			}
			else
			{
				params.foucesOperate = "1";
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_MOD_CONTACT_FOLLOWED, params, function (data)
			{
				if (params.foucesOperate == "0")
				{
					mnWebMain.showProgressDialog("取消关注！");
					self.personalDetailModel.isFollowed = false;
					self.staticBasicModel.followRightTitle = "关注";
				}
				else if (params.foucesOperate == "1")
				{
					mnWebMain.showProgressDialog("关注成功！");
					self.personalDetailModel.isFollowed = true;
					self.staticBasicModel.followRightTitle = "取消关注";
				}
				
				self.scope.$apply();
			})
		}
		
		//打手机号
		self.scope.onClickToCallMobilePhone = function ()
		{
			if (!isEmpty(self.personalDetailModel.userInfo.mobilePhone))
			{
				mnWebMain.popupModal(pageUrl.APP_CALL_PHONE_POP_MODAL, function (data) 
				{
					var type = JSON.parse(data).data.params;
					
					if (type == 1)
					{
						mnWebMain.callPhone(self.personalDetailModel.userInfo.mobilePhone);
					}
				});
			}
			
		}
		
		//打电话
		self.scope.onClickToCallPhone = function ()
		{
			if (!isEmpty(self.personalDetailModel.userInfo.phone))
			{
				mnWebMain.popupModal(pageUrl.APP_CALL_PHONE_POP_MODAL, function (data) 
				{
					var type = JSON.parse(data).data.params;
					
					if (type == 1)
					{
						mnWebMain.callPhone(self.personalDetailModel.userInfo.phone);
					}
				});
			}
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.chatLeftIcon = personalDetailParams.CHAT_LEFT_ICON;
		self.staticBasicModel.chatLeftTitle = personalDetailParams.CHAT_LEFT_TITLE;
		self.staticBasicModel.followRightIcon = personalDetailParams.FOLLOW_RIGHT_ICON;
		self.staticBasicModel.followRightTitle = personalDetailParams.FOLLOW_RIGHT_TITLE;
		self.staticBasicModel.contactWayList = personalDetailParams.CONTACT_WAY_LIST;
		self.staticBasicModel.enterpriseInfoList = personalDetailParams.ENTERPRISE_INFO_LIST;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
}
