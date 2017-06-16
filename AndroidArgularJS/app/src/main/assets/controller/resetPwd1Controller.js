/**
 * 初始化angularjs
 */
var resetPwd1App = angular.module("resetPwd1App", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
resetPwd1App.controller("resetPwd1Controller", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, resetPwd1HeaderParams);
		resetPwd1Controller.init($scope);
	})
});

/**
 * 重置密码1
 */
var resetPwd1Controller = 
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
		"confirmPwdTitle" : null,
		"confirmPwdPlaceholder" : null,
		"codesModPwd" : null,
		"btnConfirmText" : null,
	},
	
	//重置密码1数据模型
	resetPwd1Model : 
	{
		oldPwd : null,
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
		
		//验证码修改
		self.scope.onClickCodesMod = function ()
		{
			var baseParam = {
				"url" : pageUrl.APP_CODES_PAGE_URL,
				"isHideNavBar" : 1,
				"titleType" : 0,
			};
			var centerParam = [];
			var leftParam = [];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//确定
		self.scope.onClickConfirm = function ()
		{
			if (self.resetPwd1Model.clickAble)
			{
				if (isEmpty(self.resetPwd1Model.oldPwd))
				{
					mnWebMain.showProgressDialog("旧密码不能为空！");
				}
				else if (isEmpty(self.resetPwd1Model.newPwd))
				{
					mnWebMain.showProgressDialog("新密码不能为空！");
				}
				else if (isEmpty(self.resetPwd1Model.confirmPwd))
				{
					mnWebMain.showProgressDialog("确认密码不能为空！");
				}
				else if (self.resetPwd1Model.newPwd.length >= 6 && self.resetPwd1Model.newPwd.length <= 20)
				{
					if (self.resetPwd1Model.newPwd == self.resetPwd1Model.confirmPwd)
					{
						var params = 
						{
							oldPassword : self.resetPwd1Model.oldPwd,
							newPassword : self.resetPwd1Model.newPwd,
						}
						
						jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_MOD_PWD_OLDPWD, params, function ()
						{
							mnWebMain.showProgressDialog("修改密码成功！");
							mnWebMain.closeSelfViewController(1);
//							if (isAndroid)
//							{
//								var pageIds = [
//									pageUrl.APP_RESET_PWD1_PAGE_URL,
//									pageUrl.APP_INDEX_PAGE_URL
//								];
//								mnWebMain.closeMoreViewController(pageIds);
//								
//							}
							
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
			
		}
		
		//旧密码改变
		self.scope.onChangeOldPwd = function (oldPwd)
		{
			oldPwd = filterChinese(oldPwd);
			oldPwd = filterIllegalChar(oldPwd);
			
			self.resetPwd1Model.oldPwd = oldPwd;
			
			self.checkPwds();
		}
		
		//新密码改变
		self.scope.onChangeNewPwd = function (newPwd)
		{
			newPwd = filterChinese(newPwd);
			newPwd = filterIllegalChar(newPwd);
			
			self.resetPwd1Model.newPwd = newPwd;
			
			self.checkPwds();
		}
		
		//确认密码改变
		self.scope.onChangeConfirmPwd = function (confirmPwd)
		{
			confirmPwd = filterChinese(confirmPwd);
			confirmPwd = filterIllegalChar(confirmPwd);
			
			self.resetPwd1Model.confirmPwd = confirmPwd;
			
			self.checkPwds();
		}
		
	},
	
	//检查密码
	checkPwds : function ()
	{
		var self = this;
		
		if (isEmpty(self.resetPwd1Model.oldPwd) || isEmpty(self.resetPwd1Model.newPwd) || isEmpty(self.resetPwd1Model.confirmPwd))
		{
			self.resetPwd1Model.clickAble = false;
		}
		else
		{
			self.resetPwd1Model.clickAble = true;
		}
		
		self.scope.clickAble = self.resetPwd1Model.clickAble;
		
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.oldPwdTitle = resetPwd1Params.OLD_PWD;
		self.staticBasicModel.oldPwdPlaceholder = resetPwd1Params.OLD_PWD_PLACEHOLDER;
		self.staticBasicModel.newPwdTitle = resetPwd1Params.NEW_PWD;
		self.staticBasicModel.newPwdPlaceholder = resetPwd1Params.NEW_PWD_PLACEHOLDER;
		self.staticBasicModel.confirmPwdTitle = resetPwd1Params.CONFIRM_PWD;
		self.staticBasicModel.confirmPwdPlaceholder = resetPwd1Params.CONFIRM_PWD_PLACEHOLDER;
		self.staticBasicModel.codesModPwd = resetPwd1Params.CODES_MOD_PWD;
		self.staticBasicModel.btnConfirmText = resetPwd1Params.BTN_CONFIRM_TEXT;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置非静态数据
	resetData : function ()
	{
		var self = this;
		
		self.resetPwd1Model.oldPwd = null;
		self.resetPwd1Model.newPwd = null;
		self.resetPwd1Model.confirmPwd = null;
		
		self.resetPwd1Model.clickAble = false;
		self.scope.clickAble = self.resetPwd1Model.clickAble;
		
		self.scope.resetPwd1Model = self.resetPwd1Model;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".reset-pwd1-body").show();
	},
}
