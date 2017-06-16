/**
 * 初始化angularjs
 */
var modChatRoomNameModalApp = angular.module("modChatRoomNameModalApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
modChatRoomNameModalApp.controller("modChatRoomNameModalController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		modChatRoomNameModalController.init($scope);
	})
});

/**
 * 
 */
var modChatRoomNameModalController = 
{
	//作用域
	scope : null,
	
	modChatRoomNameModel : 
	{
		inputChatRoomName : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.setDefault();
		
		this.ngClickFunction();
	},
	
	setDefault : function ()
	{
		var self = this;
		
		self.modChatRoomNameModel.inputChatRoomName = null;
		self.scope.inputChatRoomName = self.modChatRoomNameModel.inputChatRoomName;
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//改变群聊名称
		self.scope.onChangeInputChatRoomName = function (inputChatRoomName)
		{
			self.modChatRoomNameModel.inputChatRoomName = inputChatRoomName;
		}
		
		//隐藏弹框
		self.scope.onClickHideDialog = function ()
		{
			$("#mod-chat-room-name").blur();
			
			var params = 
			{
				type : 0,
			}
			
			mnWebMain.closeModal(params);
		}
		
		//修改群聊名称
		self.scope.onClickModChatRoomName = function ()
		{
			if (isEmpty(self.modChatRoomNameModel.inputChatRoomName))
			{
				mnWebMain.showProgressDialog("群聊名称不能为空！");
				return;
			}
			
			$("#mod-chat-room-name").blur();
			
			var params = 
			{
				type : 1,
				inputChatRoomName : self.modChatRoomNameModel.inputChatRoomName,
			}
			
			mnWebMain.closeModal(params);
		}
		
	},
	
}
