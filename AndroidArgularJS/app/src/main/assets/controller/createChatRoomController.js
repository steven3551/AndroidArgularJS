/**
 * 初始化angularjs
 */
var createChatRoomApp = angular.module("createChatRoomApp", []).run(function()
{
	FastClick.attach(document.body);
});


/**
 * 初始化controller
 */
createChatRoomApp.controller("createChatRoomController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		createChatRoomController.init($scope);
	})
});

/**
 * 登录
 */
var createChatRoomController = 
{
	//作用域
	scope : null,
	
	createChatRoomModel : {
		inputChatRoomName : null,
		inputChatRoomDes : null,
		clickAble : true,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		this.ngClickFunction();
	},
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//隐藏弹框
		self.scope.onClickHideCreateChatRoom = function ()
		{
			$("#create-chat-room-name").blur();
			$("#create-chat-room-des").blur();
					
			var params = 
			{
				type : 0,
				inputChatRoomName : self.createChatRoomModel.inputChatRoomName,
				inputChatRoomDes : self.createChatRoomModel.inputChatRoomDes,
				inputChatRoomMemberNum : self.createChatRoomModel.inputChatRoomMemberNum,
			}
					
			mnWebMain.closeModal(params);
		}
		
		//跳到群聊界面
		self.scope.onClickCreateChatRoom = function ()
		{
			if (self.createChatRoomModel.clickAble)
			{
				self.createChatRoomModel.clickAble = false;
				
				self.createChatRoomModel.inputChatRoomName = self.scope.inputChatRoomName;
				self.createChatRoomModel.inputChatRoomDes = self.scope.inputChatRoomDes;
				self.createChatRoomModel.inputChatRoomMemberNum = self.scope.inputChatRoomMemberNum;
				
				if (isEmpty(self.createChatRoomModel.inputChatRoomName))
				{
					mnWebMain.showProgressDialog("群组名称不能为空！");
					self.createChatRoomModel.clickAble = true;
				}
				else
				{
					$("#create-chat-room-name").blur();
					$("#create-chat-room-des").blur();
					
					var params = 
					{
						type : 1,
						inputChatRoomName : self.createChatRoomModel.inputChatRoomName,
						inputChatRoomDes : self.createChatRoomModel.inputChatRoomDes,
						inputChatRoomMemberNum : self.createChatRoomModel.inputChatRoomMemberNum,
					}
					mnWebMain.closeModal(params);
				}
			}
			
		}
		
	},
	
}
