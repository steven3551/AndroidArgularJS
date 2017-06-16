/**
 * 初始化angularjs
 */
var startChatRoomApp = angular.module("startChatRoomApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
startChatRoomApp.controller("startChatRoomController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, startChatRoomHeaderParams);
		startChatRoomController.init($scope);
	})
});

/**
 * 发起群聊
 */
var startChatRoomController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"searchIcon" : null,
		"searchTip" : null,
	},
	
	//发起群聊数据模型
	startChatRoomModel : 
	{
		addFriendList : [],
		showModel : {},
		inputChatRoomName : null,
		inputChatRoomDes : null,
		inputChatRoomMemberNum : null,
		skipType : null,
		showModel : {},
		searchName : null,
		clickAble : true,
		rightTopStyle : null,
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.reWriterFunction();
		
		this.getAllUsers();
		
		this.ngClickFunction();
	},
	
	//
	reWriterFunction : function ()
	{
		var self = this;
		
		//搜索的回调
		mnWebMain.cbSearchToUpdateH5Ui = function (data)
		{
			var searchContent = data.searchContent;
			self.searchFriends(searchContent);
		}
		
		//清空搜索内容
		mnWebMain.cbSearchClearToUpdateH5Ui = function ()
		{
			self.emptySearchContent();
		}
		
		mnWebMain.cbNavRightClicked = function ()
		{
			if (self.startChatRoomModel.skipType == 1)
			{
				mnWebMain.popupModal(pageUrl.APP_CREATE_CHAT_ROOM_POPMODAL, function (data) 
				{
					var paramsObj = JSON.parse(data).data.params;
					
					if (paramsObj.type == 1)
					{
						var membersObj = [];
					
						for (var i = 0; i < self.startChatRoomModel.addFriendList.length; i ++)
						{
							for (var j = 0; j < self.startChatRoomModel.addFriendList[i].friendList.length; j ++)
							{
								if (self.startChatRoomModel.addFriendList[i].friendList[j].isSelected)
								{
									membersObj.push(self.startChatRoomModel.addFriendList[i].friendList[j].userId);
								}
							}
						}
						
						if (isEmpty(paramsObj.inputChatRoomDes))
						{
							paramsObj.inputChatRoomDes = "大家一起来聊天!";
						}
						
						var params = 
						{
							groupName : paramsObj.inputChatRoomName,
							groupDesc : paramsObj.inputChatRoomDes,
							maxusers : "2000",
							members : JSON.stringify(membersObj),
						}
						
						jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_CHAT_ROOM, params, function (data)
						{
							self.startChatRoomModel.clickAble = true;
							
							mnWebMain.showProgressDialog("创建群组成功！");
							
							mnWebMain.closeSelfViewController(1);
							
						})
					}
				});
			
//				self.startChatRoomModel.showModel.showCreateChatRoom = true;
//				self.scope.showModel = self.startChatRoomModel.showModel;
//				
//				self.startChatRoomModel.inputChatRoomName = null;
//				self.startChatRoomModel.inputChatRoomDes = null;
//				self.startChatRoomModel.inputChatRoomMemberNum = null;
//				self.scope.inputChatRoomName = self.startChatRoomModel.inputChatRoomName;
//				self.scope.inputChatRoomDes = self.startChatRoomModel.inputChatRoomDes;
//				self.scope.inputChatRoomMemberNum = self.startChatRoomModel.inputChatRoomMemberNum;
//				self.scope.$apply();
			}
			else if (self.startChatRoomModel.skipType == 2)
			{
				var membersObj = [];
				
				for (var i = 0; i < self.startChatRoomModel.addFriendList.length; i ++)
				{
					for (var j = 0; j < self.startChatRoomModel.addFriendList[i].friendList.length; j ++)
					{
						if (self.startChatRoomModel.addFriendList[i].friendList[j].isSelected)
						{
							membersObj.push(self.startChatRoomModel.addFriendList[i].friendList[j].userId);
						}
					}
				}
				
				if (membersObj.length > 0)
				{
					var groupId = mnWebMain.syncGetLocalStorage(startChatRoomSkipTypeKey.GROUP_ID);
					
					var params = 
					{
						groupId : groupId,
						members : JSON.stringify(membersObj),
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_CHAT_ROOM_MEMBERS, params, function (data)
					{
						mnWebMain.showProgressDialog("添加成功！");
						mnWebMain.closeSelfViewController(1);
					})
				}
				else 
				{
					mnWebMain.showProgressDialog("添加朋友到群组不能为空！");
				}
				
				
			}
			
			
		}
		
//		mnWebMain.cbNavRightClicked = function ()
//		{
//			alert(self.startChatRoomModel.skipType)
//			
//		}
	},
	
	//获取所有用户
	getAllUsers : function ()
	{
		var self = this;
		self.startChatRoomModel.skipType = mnWebMain.syncGetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE);
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_CONTACTS_LIST, {}, function (data)
		{
			self.startChatRoomModel.emptySearch = false;
			self.scope.emptySearch = self.startChatRoomModel.emptySearch;
					
			self.startChatRoomModel.addFriendList = [];
			var addFriendLists = data.address_book;
			
			var userIdArr = mnWebMain.syncGetLocalStorage(startChatRoomSkipTypeKey.GROUP_MEMBER_IDS);
			
			if (!isEmpty(userIdArr))
			{
				userIdArr = JSON.parse(userIdArr);
			}
			
			for (var i = 0; i < addFriendLists.length; i ++) 
			{
				var friends = addFriendLists[i];
				friends.headLetter = friends.firstChar;
				friends.anchorId = "#" + friends.headLetter;
				var friendLists = friends.list;
				friends.friendList = [];
				
				for (var j = 0; j < friendLists.length; j ++)
				{
					if (self.startChatRoomModel.skipType == 2)
					{
						if (userIdArr.indexOf(friendLists[j].userId) > -1)
						{
							continue;
						}
					}
					
					
					if (isEmpty(friendLists[j].icon))
					{
						friendLists[j].icon = "img/ease_default_avatar.png";
					}
					
					friendLists[j].isSelected = false;
					friendLists[j].icon_sel = startChatRoomSelectedType[0].icon;
					friendLists[j].noicon = startChatRoomSelectedType[1].icon;
					
					friends.friendList.push(friendLists[j]);
				}
				
				if (friends.friendList.length > 0)
				{
					self.startChatRoomModel.addFriendList.push(friends);
				}
			}
			
			self.startChatRoomModel.inputChatRoomName = null;
			self.startChatRoomModel.inputChatRoomDes = null;
			self.startChatRoomModel.inputChatRoomMemberNum = null;
			self.scope.inputChatRoomName = self.startChatRoomModel.inputChatRoomName;
			self.scope.inputChatRoomDes = self.startChatRoomModel.inputChatRoomDes;
			self.scope.inputChatRoomMemberNum = self.startChatRoomModel.inputChatRoomMemberNum;
			
			self.startChatRoomModel.showModel.showCreateChatRoom = false;
			self.scope.showModel = self.startChatRoomModel.showModel;
			
			self.scope.addFriendList = self.startChatRoomModel.addFriendList;
			self.scope.$apply();
			
			if (self.startChatRoomModel.addFriendList.length == 0)
			{
				mnWebMain.showProgressDialog("所有人已经在群中了");
			}
			
			mnWebMain.closeLoading();
			$(".start-chat-room-body").show();
			
		})
		
		
	},
	
	//重新设置界面高度
	resetPageHeight : function ()
	{
		setTimeout(function()
		{
			var screenHeight =  window.screen.availHeight;
			var containerHeight = $(".contact-container").height();
			
			if (containerHeight < screenHeight - 40)
			{
//				$(".contact-container").height(screenHeight - 66);
				$(".contact-container").height(screenHeight - 40);
			}
			else
			{
				$(".contact-container").css("height", "auto");
			}
		}, 10);
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//返回
		self.scope.back = function ()
		{
			mnWebMain.syncSetLocalStorage(chatRoomBackSkipType.BACK_SKIP_TYPE, null);
			mnWebMain.closeSelfViewController(1);
		}
		
		//跳转到群聊界面
//		self.scope.rightPartClick = function ()
//		{
//			
//			
//			
//			
//		}
		
		//隐藏群组弹框
		self.scope.onClickHideCreateChatRoom = function ()
		{
			self.startChatRoomModel.showModel.showCreateChatRoom = false;
			self.scope.showModel = self.startChatRoomModel.showModel;
		}
		
		//创建群组
//		self.scope.onClickCreateChatRoom = function ()
//		{
//			
//			
//		}
		
		//跳转到搜索页
		self.scope.onClickSearch = function ()
		{
//			var baseParam = {
//				"url" : pageUrl.APP_SEARCH_FRIEND_PAGE_URL,
//				"isHideNavBar" : 1,
//				"titleType" : 0,
//			};
//			var centerParam = [];
//			var leftParam = [];
//			var rightParam = [];
//			
//			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
			self.startChatRoomModel.showModel.showSearchInput = true;
			self.scope.showModel = self.startChatRoomModel.showModel;
			
			self.startChatRoomModel.searchName = null;
			self.scope.searchName = self.startChatRoomModel.searchName;
			setTimeout(function()
			{
				$("#start-chat-room").focus();
			}, 5);
			
		}
		
		//删除搜索内容
		self.scope.onClickDelete = function ()
		{
			
		}
		
		//搜索朋友
		self.scope.searchFriend = function (searchName)
		{
		
		}
		
		//选择朋友
		self.scope.onClickSelected = function (headerLetter, index)
		{
			var hasSelected = false;
			var isChangeOver = false;
			for (var i = 0; i < self.startChatRoomModel.addFriendList.length; i ++) 
			{
				if (self.startChatRoomModel.addFriendList[i].headLetter == headerLetter)
				{
					self.startChatRoomModel.addFriendList[i].friendList[index].isSelected = !self.startChatRoomModel.addFriendList[i].friendList[index].isSelected;
					
					isChangeOver = true;
					
					if (self.startChatRoomModel.addFriendList[i].friendList[index].isSelected)
					{
						hasSelected = true;
						break;
					}
				}
				
				if (hasSelected)
				{
					if (isChangeOver)
					{
						break;
					}
					
					continue;
				}
				
				for (var j = 0; j < self.startChatRoomModel.addFriendList[i].friendList.length; j ++)
				{
					if (self.startChatRoomModel.addFriendList[i].friendList[j].isSelected)
					{
						hasSelected = true;
						break;
					}
				}
			}
			
			if (hasSelected)
			{
				self.startChatRoomModel.rightTopStyle = "has-sel";
			}
			else
			{
				self.startChatRoomModel.rightTopStyle = null;
			}
			
			self.scope.rightTopStyle = self.startChatRoomModel.rightTopStyle;
			
			self.scope.addFriendList = self.startChatRoomModel.addFriendList;
			
		}
		
		//跳转到人物详情
		self.scope.onClickPeopleDetail = function (userId)
		{
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
		
	},
	
	//
	searchFriends : function (searchName)
	{
		var self = this;
		
		if (isEmpty(searchName))
		{
			self.startChatRoomModel.emptySearch = false;
			self.scope.emptySearch = self.startChatRoomModel.emptySearch;
					
			self.startChatRoomModel.showModel.showDeleteIcon = false;
			self.scope.showModel = self.startChatRoomModel.showModel;
			
			self.getAllUsers();
		}
		else
		{
			self.startChatRoomModel.showModel.showDeleteIcon = true;
			self.scope.showModel = self.startChatRoomModel.showModel;
			
			var params = 
			{
				keyword : searchName
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_SEARCH_USERS, params, function (data)
			{
				self.startChatRoomModel.addFriendList = [];
				self.startChatRoomModel.addFriendList = data.searchResult;
				
				for (var i = 0; i < self.startChatRoomModel.addFriendList.length; i ++) 
				{
					var friends = self.startChatRoomModel.addFriendList[i];
					friends.headLetter = friends.firstChar;
					friends.anchorId = "#" + friends.headLetter;
					friends.friendList = friends.list;
					
					for (var j = 0; j < friends.friendList.length; j ++)
					{
						if (isEmpty(friends.friendList[j].icon))
						{
							friends.friendList[j].icon = "img/ease_default_avatar.png";
						}
					
						friends.friendList[j].isSelected = false;
						friends.friendList[j].icon_sel = startChatRoomSelectedType[0].icon;
						friends.friendList[j].noicon = startChatRoomSelectedType[1].icon;
					}
				}
				
				self.startChatRoomModel.inputChatRoomName = null;
				self.startChatRoomModel.inputChatRoomDes = null;
				self.startChatRoomModel.inputChatRoomMemberNum = null;
				self.scope.inputChatRoomName = self.startChatRoomModel.inputChatRoomName;
				self.scope.inputChatRoomDes = self.startChatRoomModel.inputChatRoomDes;
				self.scope.inputChatRoomMemberNum = self.startChatRoomModel.inputChatRoomMemberNum;
				
				self.startChatRoomModel.showModel.showCreateChatRoom = false;
				self.scope.showModel = self.startChatRoomModel.showModel;
				
				if (self.startChatRoomModel.addFriendList.length == 0)
				{
					self.startChatRoomModel.emptySearch = true;
					self.scope.emptySearch = self.startChatRoomModel.emptySearch;
				}
				
				self.scope.addFriendList = self.startChatRoomModel.addFriendList;
				self.scope.$apply();
				
			})
		}
	},
	
	//
	emptySearchContent : function ()
	{
		var self = this;
		
		self.startChatRoomModel.emptySearch = false;
		self.scope.emptySearch = self.startChatRoomModel.emptySearch;
					
		self.startChatRoomModel.showModel.showSearchInput = false;
		self.scope.showModel = self.startChatRoomModel.showModel;
		
		self.startChatRoomModel.searchName = null;
		self.scope.searchName = self.startChatRoomModel.searchName;
		
		self.getAllUsers();
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.searchIcon = startChatRoomParams.SEARCH_ICON;
		self.staticBasicModel.searchTip = startChatRoomParams.SEARCH_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.startChatRoomModel.showModel.showSearchInput = false;
		self.startChatRoomModel.showModel.showDeleteIcon = false;
		self.scope.showModel = self.startChatRoomModel.showModel;
		
		self.startChatRoomModel.rightTopStyle = null;
		self.scope.rightTopStyle = self.startChatRoomModel.rightTopStyle;
		
		self.startChatRoomModel.searchName = null;
		self.scope.searchName = self.startChatRoomModel.searchName;
		
		self.startChatRoomModel.emptySearch = false;
		self.scope.emptySearch = self.startChatRoomModel.emptySearch;
//		self.scope.$apply();
	},
	
}
