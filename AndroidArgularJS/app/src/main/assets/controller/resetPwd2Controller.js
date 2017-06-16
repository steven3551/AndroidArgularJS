/**
 * 初始化angularjs
 */
var resetPwd2App = angular.module("resetPwd2App", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
resetPwd2App.controller("resetPwd2Controller", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, resetPwd2HeaderParams);
		resetPwd2Controller.init($scope);
	})
});

/**
 * 重置密码2
 */
var resetPwd2Controller = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"oldPwdTitle" : null,
		"oldPwdPlaceholder" : null,
		"newPwdTitle" : null,
		"newPwdPlaceholder" : null,
		"btnConfirmText" : null,
	},
	
	//重置密码2数据模型
	resetPwd2Model : 
	{
		newPwd : null,
		confirmPwd : null,
		clickAble : false,
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
		
		//确定
		self.scope.onClickConfirm = function ()
		{
			self.resetPwd2Model.newPwd = self.scope.resetPwd2Model.newPwd;
			self.resetPwd2Model.confirmPwd = self.scope.resetPwd2Model.confirmPwd;
			
			if (isEmpty(self.resetPwd2Model.newPwd))
			{
				mnWebMain.showProgressDialog("新密码不能为空！");
			}
			else if (isEmpty(self.resetPwd2Model.confirmPwd))
			{
				mnWebMain.showProgressDialog("确认密码不能为空！");
			}
			else if (self.resetPwd2Model.newPwd.length >=6 && self.resetPwd2Model.newPwd.length <= 20)
			{
				if (self.resetPwd2Model.newPwd == self.resetPwd2Model.confirmPwd)
				{
					var userInfo = JSON.parse(mnWebMain.syncGetLocalStorage(storageKey.USER_DATA));
					var platformId = userInfo.platformId;
					var phoneAreaCode = userInfo.phoneAreaCode;
					var verifyCode = mnWebMain.syncGetLocalStorage(storageKey.INPUT_CODES);
					
					var params = 
					{
						phoneAreaCode : phoneAreaCode,
						platformId : platformId,
						password : self.resetPwd2Model.newPwd,
						verifyCode : verifyCode,
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MODPWD, params, function ()
					{
						mnWebMain.showProgressDialog("修改密码成功！");
						
//						var baseParam = {
//							"url" : pageUrl.APP_LOGIN_PAGE_URL,
//							"isHideNavBar" : 1,
//							"titleType" : 0,
//						};
//						var centerParam = [];
//						var leftParam = [];
//						var rightParam = [];
//						
//						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
						
//						if (isAndroid)
//						{
							var pageIds = [pageUrl.APP_RESET_PWD2_PAGE_URL, 
							pageUrl.APP_CODES_PAGE_URL, 
							pageUrl.APP_RESET_PWD1_PAGE_URL,
							pageUrl.APP_INDEX_PAGE_URL
							];
							mnWebMain.closeMoreViewController(pageIds);
							
//							mnWebMain.closeSelfViewController(1);
//						}
					})
				}
				else
				{
					mnWebMain.showProgressDialog("两次密码不一致！");
				}
			}
			else 
			{
				mnWebMain.showProgressDialog("密码长度为6-20位！");
			}
			
		}
		
		self.scope.onChangeNewPwd = function (newPwd)
		{
			newPwd = filterChinese(newPwd);
			newPwd = filterIllegalChar(newPwd);
			
			self.resetPwd2Model.newPwd = newPwd;
			self.scope.resetPwd2Model = self.resetPwd2Model;
			
			self.checkPwds();
		}
		
		self.scope.onChangeConfirmPwd = function (confirmPwd)
		{
			confirmPwd = filterChinese(confirmPwd);
			confirmPwd = filterIllegalChar(confirmPwd);
			
			self.resetPwd2Model.confirmPwd = confirmPwd;
			self.scope.resetPwd2Model = self.resetPwd2Model;
			
			self.checkPwds();
		}
	},
	
	checkPwds : function ()
	{
		var self = this;
		
		self.resetPwd2Model.clickAble = false;
		
		if (isEmpty(self.resetPwd2Model.newPwd) || isEmpty(self.resetPwd2Model.confirmPwd))
		{
			self.resetPwd2Model.clickAble = false;
		}
		else if (self.resetPwd2Model.newPwd.length >=6 && self.resetPwd2Model.newPwd.length <= 20 && self.resetPwd2Model.newPwd == self.resetPwd2Model.confirmPwd)
		{
			self.resetPwd2Model.clickAble = true;
		}
		
		self.scope.clickAble = self.resetPwd2Model.clickAble;
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.oldPwdTitle = resetPwd2Params.OLD_PWD;
		self.staticBasicModel.oldPwdPlaceholder = resetPwd2Params.OLD_PWD_PLACEHOLDER;
		self.staticBasicModel.newPwdTitle = resetPwd2Params.NEW_PWD;
		self.staticBasicModel.newPwdPlaceholder = resetPwd2Params.NEW_PWD_PLACEHOLDER;
		self.staticBasicModel.btnConfirmText = resetPwd2Params.BTN_CONFIRM_TEXT;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.resetPwd2Model.newPwd = null;
		self.resetPwd2Model.confirmPwd = null;
		
		self.resetPwd2Model.clickAble = false;
		self.scope.clickAble = self.resetPwd2Model.clickAble;
		
		self.scope.resetPwd2Model = self.resetPwd2Model;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".reset-pwd2-body").show();
	},
}
