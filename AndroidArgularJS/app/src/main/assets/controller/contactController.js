/**
 * 初始化angularjs
 */
var contactApp = angular.module("contactApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
contactApp.controller("contactController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, contactHeaderParams);
		contactController.init($scope);
	})
});

/**
 * 通讯录
 */
var contactController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"searchIcon" : null,
		"searchTip" : null,
	},
	
	//登录数据模型
	contactModel : 
	{
		originalContactList : [],
		contactList : [],
		showModel : {},
		showSearchBtn : null,
		showSearchInput : null,
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setStaticBasicData();
		
//		this.getAllContacts();
		
		this.reloadWillAppear();
		
		this.ngClickFunction();
		
	},
	
	//重写，界面每次显示时和收到会话时的触发事件
	reloadWillAppear : function ()
	{
		var self = this;
		
		//界面显示时的回调
		mnWebMain.cbViewWillAppear = function ()
		{
			self.getAllContacts();
		}
		
		mnWebMain.cbNavRightClicked = function ()
		{
			mnWebMain.popupModal(pageUrl.APP_INDEX_RIGHT_POPMODAL, function (data) 
			{
				var type = JSON.parse(data).data.params;
				
				if (type == 1)
				{
					mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE, 1);
			
					mnWebMain.syncSetLocalStorage(chatRoomBackSkipType.BACK_SKIP_TYPE, 1);
					
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
				else if (type == 2)
				{
					var baseParam = {
						"url" : pageUrl.APP_ADD_FRIENDS_PAGE_URL,
						"isHideNavBar" : 0,
						"titleType" : 0,
					};
					var centerParam = [{"type" : 0,"param" : "添加朋友"}];
					var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
					var rightParam = [];
					var searchBarParam = {"title" : "搜索"}
					
					mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
					
				}
			});
		}
		
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
	},
	
	//获取所有联系人
	getAllContacts : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_CONTACTS_LIST, {}, function (data)
		{
			self.contactModel.emptySearch = false;
			self.scope.emptySearch = self.contactModel.emptySearch;
			
			self.contactModel.originalContactList = [];
			self.contactModel.contactList = [];
			
			var contactLists = data.address_book;
				
			for (var i = 0; i < contactLists.length; i ++)
			{
				var friends = {};
				friends.contactPeopleList = [];
				var hasisFocus = false;
				
				for (var j = 0; j < contactLists[i].list.length; j ++)
				{
					if (contactLists[i].list[j].isFocus)
					{
						
						if (isEmpty(contactLists[i].list[j].icon))
						{
							contactLists[i].list[j].icon = "img/ease_default_avatar.png";
						}
						
						friends.contactPeopleList.push(contactLists[i].list[j]);
						hasisFocus = true;
					}
				}
				
				if (hasisFocus)
				{
					if (isEmpty(contactLists[i].firstChar))
					{
						self.contactModel.showModel.showHeadLetter = false;
					}
					friends.headLetter = contactLists[i].firstChar;
					friends.anchorId = "#" + friends.headLetter;
					friends.contactPeopleList2 = friends.contactPeopleList;
					
					self.contactModel.contactList.push(friends);
				}
				
			}
			
			self.contactModel.originalContactList = deepCopy(self.contactModel.contactList);
			self.scope.contactList = self.contactModel.contactList;
			self.scope.$apply();
			
			$(".index-right-dialog-bg").show();
			$(".index-right-dialog").show();
			$(".all-container").show();
			
		})
		
	},
 	
 	//重新设置界面高度
 	resetTheHeight : function ()
 	{
 		var self = this;
 		
 		setTimeout(function()
		{
			var screenHeight =  window.screen.availHeight;
			var containerHeight = $(".contact-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
				$(".contact-container").height(screenHeight - 101);
			}
			else
			{
				$(".contact-container").css("height", "auto");
			}
				
			containerHeight = $(".contact-container").height();
			
			if (containerHeight < screenHeight - 101)
			{
				$(".contact-container").height(screenHeight - 101);
			}
			self.scope.$apply();
			setTimeout(function(){
//				self.scope.$apply();
//				allController.allModel.mySwiper.container[0].style.height=allController.allModel.mySwiper.slides[allController.allModel.mySwiper.activeIndex].offsetHeight+'px';
			}, 10);
			
		}, 10);
 	},
 	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳转到个人详情
		self.scope.onClickPeopleDetail = function (headLetter, index)
		{
			var userId;
			
			for (var i = 0; i < self.contactModel.contactList.length; i ++) 
			{
				if (self.contactModel.contactList[i].headLetter == headLetter)
				{
					mnWebMain.syncSetLocalStorage(userKeys.USERID, self.contactModel.contactList[i].contactPeopleList[index].userId);
					userId = self.contactModel.contactList[i].contactPeopleList[index].userId;
					
					var name = self.contactModel.contactList[i].contactPeopleList[index].name;
					
					if (!isEmpty(name))
					{
						mnWebMain.syncSetLocalStorage(userKeys.USER_NAME, name);
					}
					else
					{
						mnWebMain.syncSetLocalStorage(userKeys.USER_NAME, userParams.USER_NAME);
					}
					
					var icon = self.contactModel.contactList[i].contactPeopleList[index].leftIcon;
					
					if (!isEmpty(icon))
					{
						mnWebMain.syncSetLocalStorage(userKeys.USER_ICON, icon);
					}
					else
					{
						mnWebMain.syncSetLocalStorage(userKeys.USER_ICON, userParams.USER_ICON);
					}
					
					break;
				}
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
		
		//所有人
////		self.scope.allPeople = function()
//		{
//			alert("下面的就是所有人啊！");
//		}
		
		//群聊列表
		self.scope.chatRoomList = function()
		{
			var baseParam = {
				"url" : pageUrl.APP_CHATROOMLIST_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			//TODO
			var centerParam = [{"type" : 0, "param" : "群聊"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			var searchBarParam = {"title" : "搜索"}
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
		}
		
		//搜索
//		self.scope.onClickSearch = function()
//		{
//			self.contactModel.showModel.showSearchBtn = false;
//			self.contactModel.showModel.showSearchInput = true;
//			self.contactModel.showModel.showDeleteIcon = false;
//			
//			self.contactModel.showSearchBtn = "ng-hide";
//			self.contactModel.showSearchInput = "ng-show";
//			self.scope.showSearchBtn = self.contactModel.showSearchBtn;
//			self.scope.showSearchInput = self.contactModel.showSearchInput;
//			
//			self.scope.showModel = self.contactModel.showModel;
//		}
		
		//删除搜索文本
		self.scope.onClickDelete = function ()
		{
			self.emptySearchContent();
		}
		
		//搜索
		self.scope.searchFriend = function (searchName)
		{
			self.searchFriends(searchName);
		}
		
		//添加朋友
		self.scope.onClickAddFriends = function ()
		{
			var params = 
			{
				type : "2"
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_ADD_STATISTICS, params, function (data)
			{
				
			})
			
			var baseParam = {
				"url" : pageUrl.APP_ADD_FRIENDS_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0, "param" : "添加朋友"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			var searchBarParam = {"title" : "搜索"}
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam, searchBarParam);
		}
		
		//跳到群聊界面
		self.scope.onClickContactToStartChatRoom = function ()
		{
			self.contactModel.showModel.showContactRightDialog = false;
			self.contactModel.showModel.showContactRightDialogBg = false;
			self.scope.showModel = self.contactModel.showModel;
			
			mnWebMain.syncSetLocalStorage(startChatRoomSkipTypeKey.SKIP_TO_START_CHAT_ROOM_TYPE, 1);
			
			mnWebMain.syncSetLocalStorage(chatRoomBackSkipType.BACK_SKIP_TYPE, 2);
			
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
		
		//跳到添加朋友界面
		self.scope.onClickContactToAddFriend = function ()
		{
			self.contactModel.showModel.showContactRightDialog = false;
			self.contactModel.showModel.showContactRightDialogBg = false;
			self.scope.showModel = self.contactModel.showModel;
			
			var baseParam = {
				"url" : pageUrl.APP_ADD_FRIENDS_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "添加朋友"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			var searchBarParam = {"title" : "搜索"}
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
			
		}
		
		//顶部右侧点击
		self.scope.contactRightPartClick = function ()
		{
			if (self.contactModel.showContactRightDialog)
			{
				self.contactModel.showModel.showContactRightDialog = false;
				self.contactModel.showModel.showContactRightDialogBg = false;
			}
			else 
			{
				self.contactModel.showModel.showContactRightDialog = true;
				self.contactModel.showModel.showContactRightDialogBg = true;
			}
		
			self.scope.showModel = self.contactModel.showModel;
		}
		
		//隐藏弹框
		self.scope.onClickContactHideDialog = function ()
		{
			self.contactModel.showModel.showContactRightDialog = false;
			self.contactModel.showModel.showContactRightDialogBg = false;
			self.scope.showModel = self.contactModel.showModel;
		}
		
//		self.scope.onClickRightNavTab = function (e,index)
//		{
//			e.stopPropagation();
//			$("body").css("padding-top", "120px");
//			var dHeight = document.documentElement.clientHeight;
//			alert(dHeight)
//			alert(index)
//			var id = self.contactModel.contactList[index].headLetter;
//			alert(id)
//			var div = document.getElementById(id + "");
//			div.style.height = dHeight - 120 + "px";
//			div.scrollIntoView(false);	
//			var div1 = document.getElementById("div1");
//			var div2 = document.getElementById("div2");
//			var div3 = document.getElementById("div3");
//			div1.style.height = dHeight - 30 + "px";		//通过一个js动态的来确定每个div的高度,还可以通过循环来实现，这里就不加了，各位自己可尝试
//			div2.style.height = dHeight -30 + "px";
//			div3.style.height = dHeight -30 + "px";
//			var li = document.getElementsByTagName("li");
//			li[0].onclick = function(){
//				div1.scrollIntoView(false);		  //这里不能给true不然会将会与导航条重叠
//			}
//			li[1].onclick = function(){
//				div2.scrollIntoView(false);
//			}
//			li[2].onclick = function(){
//				div3.scrollIntoView(false);
//			}
			
//			$("nav-letter li")[index].scrollIntoView(false);
//			$(this).scrollIntoView(false);
//			setTimeout(function()
//			{
//				alert(123)
//				$(".contact-container").css("margin-top", "120px");
//			}, 100);
//		}
	},
	
	//清空搜索内容
	emptySearchContent : function ()
	{
		var self = this;
		
//		$(".index-check-no-search").addClass("ng-hide");
		
		self.contactModel.emptySearch = false;
		self.scope.emptySearch = self.contactModel.emptySearch;
			
		self.scope.searchOrDelIcon = contactParams.SEARCH_ICON;
			
		self.contactModel.searchName = null;
		self.scope.searchName = self.contactModel.searchName;
		
		self.contactModel.contactList = [];
		var contactLists = deepCopy(self.contactModel.originalContactList);
		self.contactModel.contactList = contactLists;
		self.scope.contactList = self.contactModel.contactList;
		self.scope.$apply();
		
//		self.getAllContacts();
	},
	
	//搜索
	searchFriends : function (searchName)
	{
		var self = this;
		
		self.contactModel.searchName = searchName;
		self.scope.searchName = self.contactModel.searchName;
		
		if (isEmpty(searchName)) 
		{
			self.contactModel.emptySearch = false;
			self.scope.emptySearch = self.contactModel.emptySearch;
					
			self.scope.searchOrDelIcon = contactParams.SEARCH_ICON;
			
			self.contactModel.contactList = [];
			var contactLists = deepCopy(self.contactModel.originalContactList);
			self.contactModel.contactList = contactLists;
			self.scope.contactList = self.contactModel.contactList;
			self.scope.$apply();
//			self.getAllContacts();
		}
		else
		{
			self.scope.searchOrDelIcon = contactParams.DEL_ICON;
			
			var params = 
			{
				keyword : searchName
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_SEARCH_USERS, params, function (data)
			{
				self.contactModel.contactList = [];
				
				var contactLists = data.searchResult;
				
				for (var i = 0; i < contactLists.length; i ++)
				{
					var friends = {};
					friends.contactPeopleList = [];
					var hasisFocus = false;
					
					for (var j = 0; j < contactLists[i].list.length; j ++)
					{
						if (contactLists[i].list[j].isFocus)
						{
							if (isEmpty(contactLists[i].list[j].icon))
							{
								contactLists[i].list[j].icon = "img/ease_default_avatar.png";
							}
							
							friends.contactPeopleList.push(contactLists[i].list[j]);
							hasisFocus = true;
						}
					}
					
					if (hasisFocus)
					{
						friends.headLetter = contactLists[i].firstChar;
						friends.anchorId = "#" + friends.headLetter;
						friends.contactPeopleList2 = friends.contactPeopleList;
						
						self.contactModel.contactList.push(friends);
					}
					
				}
				
				if (self.contactModel.contactList.length == 0)
				{
					self.contactModel.emptySearch = true;
					self.scope.emptySearch = self.contactModel.emptySearch;
				}
				
				self.scope.contactList = self.contactModel.contactList;
				self.scope.$apply();
				
			});
			
		}
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.searchIcon = contactParams.SEARCH_ICON;
		self.staticBasicModel.searchTip = contactParams.SEARCH_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.contactModel.showModel.showContactRightDialog = false;
		self.contactModel.showModel.showContactRightDialogBg = false;
		
		self.contactModel.showModel.showAllPeople = true;
		self.contactModel.showModel.showChatRoom = true;
		
		self.contactModel.showModel.showSearchInput = false;
		
		self.contactModel.showSearchInput = "ng-hide";
		self.scope.showSearchInput = self.contactModel.showSearchInput;
		
		self.contactModel.showModel.showDeleteIcon = false;
		
		self.contactModel.showModel.showHeadLetter = true;
		
		self.scope.showModel = self.contactModel.showModel;
		
		self.contactModel.searchName = null;
		self.scope.searchName = self.contactModel.searchName;
		
		self.scope.searchOrDelIcon = contactParams.SEARCH_ICON;
		
		self.contactModel.emptySearch = false;
		self.scope.emptySearch = self.contactModel.emptySearch;
//		self.scope.$apply();
	},
	
}
