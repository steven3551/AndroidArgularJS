/**
 * 初始化angularjs
 */
var chatPeopleNumApp = angular.module("chatPeopleNumApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
chatPeopleNumApp.controller("chatPeopleNumController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, chatPeopleNumHeaderParams);
		chatPeopleNumController.init($scope);
	})
});

/**
 * 聊天人数
 */
var chatPeopleNumController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"addIcon" : null,
		"addName" : null,
		"exitChatRoom" : null,
	},
	
	//登录数据模型
	chatPeopleNumModel : 
	{
		chatPeopleNumList : [],
		showModel : {},
		inputChatRoomName : null,
		chatRoomName : null,
		groupId : null,
		peopleNum : 1,
		exitType : 1,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.willAppears();
		
//		this.setStaticBasicData();
//		
//		this.resetData();
//			
//		this.getChatRoomInfo();
			
		this.ngClickFunction();
	},
	
	willAppears : function ()
	{
		var self = this;
		
		mnWebMain.cbViewWillAppear = function ()
		{
//			self.updateTitleModal();
			self.setStaticBasicData();
			self.resetData();
			self.getChatRoomInfo();
		}
	},
	
	//
	updateTitleModal : function (chatRoomName, num)
	{
		
		var baseParam = {
			"url" : pageUrl.APP_ADD_FRIENDS_PAGE_URL,
			"isHideNavBar" : 0,
			"titleType" : 0,
		};
		var title;
		
		if (isEmpty(num))
		{
			if (isEmpty(chatRoomName))
			{
				title = "聊天信息(" + self.chatPeopleNumModel.peopleNum + ")";
			}
			else
			{
				title = chatRoomName + "("+ self.chatPeopleNumModel.peopleNum +")";
			}
		}
		else
		{
			if (isEmpty(chatRoomName))
			{
				title = "聊天信息("+ num +")";
			}
			else
			{
				title = chatRoomName + "("+ num +")";
			}
		}
		var centerParam = [{"type" : 0,"param" : title}];
		var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
		var rightParam = [];
			
		mnWebMain.updateDataModel(baseParam, leftParam, centerParam, rightParam);
	},
	
	//获取群组信息
	getChatRoomInfo : function ()
	{
		var self = this;
		
		self.chatPeopleNumModel.groupId = getQueryString("groupId");
		
		var params = 
		{
			groupId : self.chatPeopleNumModel.groupId
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_CHAT_ROOM_INFO, params, function (data)
		{
			self.chatPeopleNumModel.chatPeopleNumList = [];
			
			var groupInfo = data.groupInfo;
			
			self.chatPeopleNumModel.peopleNum = groupInfo.affiliations_count;
			self.scope.headerModel.midTitle = groupInfo.name + "(" + groupInfo.affiliations_count + ")";
			
			self.chatPeopleNumModel.chatRoomName = groupInfo.name;
			self.scope.chatRoomName = self.chatPeopleNumModel.chatRoomName;
			
			self.updateTitleModal(self.chatPeopleNumModel.chatRoomName, self.chatPeopleNumModel.peopleNum);
			
			var userIdArr = [];
			var owner;
			for (var i = 0; i < groupInfo.affiliations.length; i ++) 
			{
				if (isEmpty(groupInfo.affiliations[i].member))
				{
					owner = groupInfo.affiliations[i].owner + "";
//					userIdArr.push(groupInfo.affiliations[i].owner + "")
				}
				else
				{
					userIdArr.push(groupInfo.affiliations[i].member + "")
				}
			}
			
			var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
			if (userInfo.userId == owner)
			{
				self.staticBasicModel.exitChatRoom = "解散该群";
				self.scope.staticBasicModel = self.staticBasicModel;
				self.chatPeopleNumModel.exitType = 2;
				
				self.chatPeopleNumModel.showModel.showChatRoomName = true;
				self.scope.showModel = self.chatPeopleNumModel.showModel;
			}
			
			userIdArr.unshift(owner);
			
			mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.GROUP_MEMBER_IDS, JSON.stringify(userIdArr));
			
			var paramsObj = 
			{
				userIds : JSON.stringify(userIdArr)
			}
			
			jqHttpRequest.syncHttpRequest(apiUrl.API_GET_SIMPLE_USER_INFO, paramsObj, function (data2)
			{
				var ownerObj = {};
				for (var i = 0; i < groupInfo.affiliations.length; i ++)
				{
					if (isEmpty(groupInfo.affiliations[i].member))
					{
						ownerObj.userId = groupInfo.affiliations[i].owner;
						ownerObj.name = data2[ownerObj.userId].name;
						
						if (isEmpty(data2[ownerObj.userId].icon))
						{
							ownerObj.icon = "img/ease_default_avatar.png";
						}
						else
						{
							ownerObj.icon = data2[ownerObj.userId].icon; 
						}
						ownerObj.type = 1;
					}
					else
					{
						var itemObj = {};
						itemObj.userId = groupInfo.affiliations[i].member + "";
						itemObj.name = data2[itemObj.userId].name;
						
						if (isEmpty(data2[itemObj.userId].icon))
						{
							itemObj.icon = "img/ease_default_avatar.png";
						}
						else
						{
							itemObj.icon = data2[itemObj.userId].icon;	
						}
						itemObj.type = 1;
						
						self.chatPeopleNumModel.chatPeopleNumList.push(itemObj);
					}
					
				}
				
				self.chatPeopleNumModel.chatPeopleNumList.unshift(ownerObj);
				
				var itemObj = 
				{
					userId : 0,
					type : 2,
					icon : self.staticBasicModel.addIcon,
					name : self.staticBasicModel.addName
				}
				
				self.chatPeopleNumModel.chatPeopleNumList.push(itemObj);
				self.scope.chatPeopleNumList = self.chatPeopleNumModel.chatPeopleNumList;
			
				self.scope.$apply();
			
				mnWebMain.closeLoading();
				$(".chat-people-body").show();
			})
			
			
		})
		
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳转到个人详情
		self.scope.toPersonalDetail = function (userId, icon, name, type)
		{
			if (type == 1)
			{
				mnWebMain.syncSetLocalStorage(userKeys.USERID, userId);
			
				if (!isEmpty(icon))
				{
					mnWebMain.syncSetLocalStorage(userKeys.USER_ICON, icon);
				}
				else
				{
				 	mnWebMain.syncSetLocalStorage(userKeys.USER_ICON, userParams.USER_ICON);
				}
				 
				if (!isEmpty(name))
				{
				 	mnWebMain.syncSetLocalStorage(userKeys.USER_NAME, userParams.USER_NAME);
				}
				else
				{
				 	mnWebMain.syncSetLocalStorage(userKeys.USER_NAME, userParams.USER_NAME);
				}
				
				var baseParam = {
					"url" : pageUrl.APP_PERSONAL_DETAIL_PAGE_URL + "?userId=" + userId,
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
			else if (type == 2)
			{
				mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.GROUP_ID, self.chatPeopleNumModel.groupId);
				mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE, 2);
				
				var baseParam = {
					"url" : pageUrl.APP_START_CHAT_ROOM_PAGE_URL,
					"isHideNavBar" : 0,
					"titleType" : 0,
				};
				var centerParam = [{"type" : 0,"param" : "选择联系人"}];
				var leftParam = [{"leftType":0, "type" : 0 ,"param" : "取消"}];
				var rightParam = [{"type":0,"param":"确定"}];
				var searchBarParam = {"title" : "搜索"}
				
				mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
			}
			
					
		}
		
		//添加朋友
		self.scope.onClickAddFriend = function ()
		{
			mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.GROUP_ID, self.chatPeopleNumModel.groupId);
			mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE, 2);
			
			var baseParam = {
				"url" : pageUrl.APP_START_CHAT_ROOM_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "选择联系人"}];
			var leftParam = [{"leftType":0, "type" : 0 ,"param" : "取消"}];
			var rightParam = [{"type":0,"param":"确定"}];
			var searchBarParam = {"title" : "搜索"}
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
		}
		
		//退出群聊
		self.scope.onClickExit = function ()
		{
			$confirmDialog.show("退出将不再收到该群的任何消息，确定要退出吗？",function()
			{
				var params = 
				{
					groupId : self.chatPeopleNumModel.groupId
				}
				
				if (self.chatPeopleNumModel.exitType == 1)
				{
					jqHttpRequest.asyncHttpRequest(apiUrl.API_DEL_GROUP, params, function (data)
					{
						mnWebMain.showProgressDialog("退群成功！");
						
						mnWebMain.easeExitGroup(self.chatPeopleNumModel.groupId, function(data)
						{
							
						});
						
						if (isAndroid)
						{
							mnWebMain.closeSelfViewController(1);
						}
						
					})
				}
				else if (self.chatPeopleNumModel.exitType == 2)
				{
					jqHttpRequest.asyncHttpRequest(apiUrl.API_DEL_GROUP2, params, function (data)
					{
						mnWebMain.showProgressDialog("解散群成功！");
						
						mnWebMain.easeExitGroup(self.chatPeopleNumModel.groupId, function(data)
						{
							
						});
						
						if (isAndroid)
						{
							mnWebMain.closeSelfViewController(1);
						}
						
					})
				}
				
			})
		}
		
		//弹出修改群聊名称弹框
		self.scope.onClickToModChatRoomName = function ()
		{
//			self.chatPeopleNumModel.showModel.showModChatRoomName = true;
//			self.scope.showModel = self.chatPeopleNumModel.showModel;
//			
//			self.chatPeopleNumModel.inputChatRoomName = null;
//			self.scope.inputChatRoomName = self.chatPeopleNumModel.inputChatRoomName;
			
			mnWebMain.popupModal(pageUrl.APP_MOD_CHAT_ROOM_NAME_MODAL, function (data) 
			{
				var dataObj = JSON.parse(data).data.params;
				
				if (dataObj.type == 1)
				{
					var groupInfoObj = 
					{
						groupname : dataObj.inputChatRoomName
					}
					
					var params = 
					{
						groupId : self.chatPeopleNumModel.groupId,
						groupInfo : JSON.stringify(groupInfoObj)
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_MOD_GROUP_INFO, params, function (data)
					{
						mnWebMain.showProgressDialog("修改成功！");
						
						self.chatPeopleNumModel.chatRoomName = dataObj.inputChatRoomName;
						
						self.updateTitleModal(dataObj.inputChatRoomName, self.chatPeopleNumModel.peopleNum);
						
//						self.scope.headerModel.midTitle = self.chatPeopleNumModel.inputChatRoomName + "(" + self.chatPeopleNumModel.peopleNum + ")";
//						self.chatPeopleNumModel.chatRoomName = self.chatPeopleNumModel.inputChatRoomName;
//						self.scope.chatRoomName = self.chatPeopleNumModel.chatRoomName;
//						self.scope.$apply();
					})
				}
				
			});
		}
		
		//隐藏弹框
		self.scope.onClickHideDialog = function ()
		{
			self.chatPeopleNumModel.showModel.showModChatRoomName = false;
			self.scope.showModel = self.chatPeopleNumModel.showModel;
		}
		
		//修改群聊名称
		self.scope.onClickModChatRoomName = function ()
		{
			self.chatPeopleNumModel.inputChatRoomName = self.scope.inputChatRoomName;
			
			if (isEmpty(self.chatPeopleNumModel.inputChatRoomName))
			{
				mnWebMain.showProgressDialog("群聊名称不能为空！");
			}
			else
			{
				self.chatPeopleNumModel.showModel.showModChatRoomName = false;
				self.scope.showModel = self.chatPeopleNumModel.showModel;
				
				
				
				
			}
		}
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.addIcon = chatPeopleNumParams.ADD_ICON;
		self.staticBasicModel.addName = chatPeopleNumParams.ADD_NAME;
		self.staticBasicModel.exitChatRoom = chatPeopleNumParams.EXIT_CHAT_ROOM;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.chatPeopleNumModel.chatPeopleNumList = chatPeopleNumParams.CHAT_PEOPLE_LIST;
		
		self.scope.chatPeopleNumList = self.chatPeopleNumModel.chatPeopleNumList;
		
		self.chatPeopleNumModel.showModel.showModChatRoomName = false;
		self.scope.showModel = self.chatPeopleNumModel.showModel;
		
		self.chatPeopleNumModel.showModel.showChatRoomName = false;
		self.scope.showModel = self.chatPeopleNumModel.showModel;
		
		self.chatPeopleNumModel.inputChatRoomName = null;
		self.scope.inputChatRoomName = self.chatPeopleNumModel.inputChatRoomName;
		
		self.chatPeopleNumModel.exitType = 1;
		
		
		
	},
}
