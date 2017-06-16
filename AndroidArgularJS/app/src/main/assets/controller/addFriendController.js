/**
 * 初始化angularjs
 */
var addFriendApp = angular.module("addFriendApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
addFriendApp.controller("addFriendController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, addFriendHeaderParams);
		addFriendController.init($scope);
	})
});

/**
 * 添加朋友
 */
var addFriendController = 
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
	addFriendModel : 
	{
		addFriendList : [],
		showModel : {},
		searchName : null,
		emptySearch : false,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.reWriterSearchFun();
		
		this.getAllContacts();
		
		this.ngClickFunction();
	},
	
	//重写搜索方法
	reWriterSearchFun : function ()
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
	},
	
	//获取所有的通讯录
	getAllContacts : function ()
	{
		var self = this;
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_CONTACTS_LIST, {}, function (data)
		{
			self.addFriendModel.emptySearch = false;
			self.scope.emptySearch = self.addFriendModel.emptySearch;
			
			self.addFriendModel.addFriendList = [];
			
			var contactLists = data.address_book;
			
			for (var i = 0; i < contactLists.length; i ++) 
			{
				var friends = contactLists[i];
				friends.headLetter = contactLists[i].firstChar;
				friends.anchorId = "#" + friends.headLetter;
				friends.friendList = contactLists[i].list;
				
				for (var j = 0; j < friends.friendList.length; j ++)
				{
					
					if (isEmpty(friends.friendList[j].icon))
					{
						friends.friendList[j].icon = "img/ease_default_avatar.png";
					}
					
					friends.friendList[j].text = followType[0].text;
					friends.friendList[j].active = followType[0].active;
					friends.friendList[j].notext = followType[1].text;
					friends.friendList[j].noactive = followType[1].active;
				}
				
				self.addFriendModel.addFriendList.push(friends);
			}
			
			self.scope.addFriendList = self.addFriendModel.addFriendList;
			self.scope.$apply();
			
			self.resetPageHeight();
			
			mnWebMain.closeLoading();
			$(".add-friend-body").show();
		})
	},
	
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
		}, 10);
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//跳转到搜索页
		self.scope.onClickSearch = function ()
		{
			self.addFriendModel.showModel.showSearchInput = true;
			self.scope.showModel = self.addFriendModel.showModel;
			
			self.addFriendModel.searchName = null;
			self.scope.searchName = self.addFriendModel.searchName;
			
	    };
	    
		//删除搜索内容
		self.scope.onClickDelete = function ()
		{
			
		}
		
		//搜索朋友
		self.scope.searchFriend = function (searchName)
		{

		}
		
		//是否关注
		self.scope.onClickFollow = function (headerLetter, index)
		{
			for (var i = 0; i < self.addFriendModel.addFriendList.length; i ++) 
			{
				if (self.addFriendModel.addFriendList[i].headLetter == headerLetter)
				{
					self.addFriendModel.addFriendList[i].friendList[index].isFocus = !self.addFriendModel.addFriendList[i].friendList[index].isFocus;
					
					var isFollowed = "0";
					
					if (self.addFriendModel.addFriendList[i].friendList[index].isFocus) 
					{
						isFollowed = "1";
					}
					else 
					{
						isFollowed = "0";
					}
					
					var params = 
					{
						relationUserId : self.addFriendModel.addFriendList[i].friendList[index].userId,
						foucesOperate : isFollowed
					}
					
					var modSuccess = false;
					
					jqHttpRequest.syncHttpRequest(apiUrl.API_MOD_CONTACT_FOLLOWED, params, function (data)
					{
						modSuccess = true;
					})
					
					if (modSuccess)
					{
						self.scope.addFriendList = self.addFriendModel.addFriendList;
						
						if (isFollowed == "1")
						{
//							mnWebMain.showProgressDialog("关注成功！");
						}
						else
						{
//							mnWebMain.showProgressDialog("取消关注！");
						}
					}
					else
					{
						self.addFriendModel.addFriendList[i].friendList[index].isFocus = !self.addFriendModel.addFriendList[i].friendList[index].isFocus;
						self.scope.addFriendList = self.addFriendModel.addFriendList;
						
						if (isFollowed == "1")
						{
//							mnWebMain.showProgressDialog("关注失败！");
						}
						else
						{
//							mnWebMain.showProgressDialog("取消关注失败！");
						}
					}
					
					
					break;
				}
			}
			
			
		}
		
		//跳转到人物详情
		self.scope.onClickPeopleDetail = function (headerLetter, index)
		{
			
			var userId;
			for (var i = 0; i < self.addFriendModel.addFriendList.length; i ++) 
			{
				if (self.addFriendModel.addFriendList[i].headLetter == headerLetter)
				{
					userId = self.addFriendModel.addFriendList[i].friendList[index].userId;
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
		
	},
	
	//搜索
	searchFriends : function (searchName)
	{
		var self = this;
		
		if (isEmpty(searchName))
		{
			self.addFriendModel.emptySearch = false;
			self.scope.emptySearch = self.addFriendModel.emptySearch;
					
			self.addFriendModel.showModel.showDeleteIcon = false;
			self.scope.showModel = self.addFriendModel.showModel;
			
			self.getAllContacts();
		}
		else
		{
			self.addFriendModel.showModel.showDeleteIcon = true;
			self.scope.showModel = self.addFriendModel.showModel;
			
			var params = 
			{
				keyword : searchName
			}
			
			jqHttpRequest.asyncHttpRequest(apiUrl.API_GET_SEARCH_USERS, params, function (data)
			{
				self.addFriendModel.addFriendList = [];
				
				var contactLists = data.searchResult;
				
				for (var i = 0; i < contactLists.length; i ++) 
				{
					var friends = contactLists[i];
					friends.headLetter = contactLists[i].firstChar;
					friends.anchorId = "#" + friends.headLetter;
					friends.friendList = contactLists[i].list;
					
					for (var j = 0; j < friends.friendList.length; j ++)
					{
						if (isEmpty(friends.friendList[j].icon))
						{
							friends.friendList[j].icon = "img/ease_default_avatar.png";
						}
					
						friends.friendList[j].text = followType[0].text;
						friends.friendList[j].active = followType[0].active;
						friends.friendList[j].notext = followType[1].text;
						friends.friendList[j].noactive = followType[1].active;
					}
					
					self.addFriendModel.addFriendList.push(friends);
				}
				
				if (self.addFriendModel.addFriendList.length == 0)
				{
					self.addFriendModel.emptySearch = true;
					self.scope.emptySearch = self.addFriendModel.emptySearch;
				}
				
				self.scope.addFriendList = self.addFriendModel.addFriendList;
				self.scope.$apply();
				
			})
		}
	},
	
	//清空搜索内容
	emptySearchContent : function ()
	{
		var self = this;
		
		self.addFriendModel.emptySearch = false;
		self.scope.emptySearch = self.addFriendModel.emptySearch;
			
		self.addFriendModel.showModel.showSearchInput = false;
		self.scope.showModel = self.addFriendModel.showModel;
		
		self.addFriendModel.searchName = null;
		self.scope.searchName = self.addFriendModel.searchName;
		
		self.getAllContacts();
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.searchIcon = addFriendParams.SEARCH_ICON;
		self.staticBasicModel.searchTip = addFriendParams.SEARCH_TIP;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		
		self.addFriendModel.showModel.showSearchInput = false;
		self.addFriendModel.showModel.showDeleteIcon = false;
		self.scope.showModel = self.addFriendModel.showModel;
		
		self.addFriendModel.searchName = null;
		self.scope.searchName = self.addFriendModel.searchName;
		
		self.addFriendModel.emptySearch = false;
		self.scope.emptySearch = self.addFriendModel.emptySearch;
		
		self.scope.$apply();
	},
	
}
