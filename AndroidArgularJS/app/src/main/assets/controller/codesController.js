/**
 * 初始化angularjs
 */
var codesApp = angular.module("codesApp", []).run(function()
{
	FastClick.attach(document.body);
});

/**
 * 初始化controller
 */
codesApp.controller("codesController", function($scope)
{
	initMN(function()
	{
		mnWebMain.disableDrag();
		headerController.init($scope, codesHeaderParams);
		codesController.init($scope);
	})
});

//$(function(){
//  $('input').focus();
//  $("#codes1").focus();
//	$("#codes1").click();
//	$("#codes1").trigger("focus");
//	$("#codes1").trigger("click");
//});

/**
 * 填写验证码
 */
var codesController = 
{
	//作用域
	scope : null,
	
	//静态基本数据模型
	staticBasicModel : 
	{
		"phoneTip" : null,
		"nextStep" : null,
		"firstText" : null,
		"sendMessage" : null,
		"or" : null,
		"answerPhone" : null,
		"lastText" : null,
	},
	
	//登录数据模型
	codesModel : 
	{
		"startPhoneNum" : null,
		"phoneNum" : null,
		"codes" : [],
		clickAble : false,
		reSendCodes : false,
		reSendTimer : null,
		reSendTime : 60,
		inputCodes : null,
	},
	
	//初始化
	init : function ($scope)
	{
		this.scope = $scope;
		
		mnWebMain.showLoading();
		
		this.setStaticBasicData();
		
		this.resetData();
		
		this.reSendMsg();
		
		$("#codes1").focus();
		$("#codes1").click();
		$("#codes1").trigger("focus");
		$("#codes1").trigger("click");
		
		this.ngClickFunction();
	},
	
	willAppear : function ()
	{
		mnWebMain.cbViewWillAppear = function ()
		{
			$(".codes-body").show();
			$("#codes1").focus();
			$("#codes1").click();
			$("#codes1").trigger("focus");
			$("#codes1").trigger("click");
		}
	},
	
	//获取验证码
	getCodes : function ()
	{
		var self = this;
		
		var type = 1;
		var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
		
		if (skipType == skipTypeKey.REGISTER_TYPE)
		{
			type = skipTypeKey.REGISTER_TYPE;
		}
		else if (skipType == skipTypeKey.MOD_PWD_TYPE)
		{
			type = skipTypeKey.MOD_PWD_TYPE;
		}
		else if (skipType == skipTypeKey.LOGIN_TYPE)
		{
			type = 	skipTypeKey.LOGIN_TYPE;
		}
		
		var phoneAreaCode = self.codesModel.startPhoneNum;
		var mobile = self.codesModel.phoneNum;
		
		var params = 
		{
			type : type,
			mobile : mobile,
			phoneAreaCode : phoneAreaCode,
		}
		
		jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_GETCODE, params, function (data)
		{
			mnWebMain.showProgressDialog("验证码已发送！");
		})
	},
	
	//重发短信
	reSendMsg : function ()
	{
		var self = this;
		
		self.codesModel.reSendCodes = true;
		self.scope.reSendCodes = self.codesModel.reSendCodes;
		
		self.getCodes();
		
		self.codesModel.reSendTimer = setInterval(function(){
			if (self.codesModel.reSendTime > 0)
			{
				self.codesModel.reSendTime--;
				self.scope.reSendTime =  "(" + self.codesModel.reSendTime + ")";
				self.scope.$apply();
			}
			else
			{
				self.codesModel.reSendCodes = false;
				self.scope.reSendCodes = self.codesModel.reSendCodes;
				self.codesModel.reSendTime = 60;
				self.scope.$apply();
			}
		}, 1000);
	},
	
	
	//所有angularjs点击事件
	ngClickFunction : function ()
	{
		var self = this;
		
		//下一步
		self.scope.onClickNextStep = function ()
		{
			self.checkClickAble();
			
			if (self.codesModel.clickAble)
			{
				clearInterval(self.codesModel.reSendTimer);
				
				//保存用户输入的验证码
				mnWebMain.syncSetLocalStorage(storageKey.INPUT_CODES, self.codesModel.inputCodes)
				
				var phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
				var skipType = mnWebMain.syncGetLocalStorage(storageKey.SKIP_TYPE);
				
				if (skipType == skipTypeKey.REGISTER_TYPE)//注册
				{
					
					
					var params = 
					{
						smsCode : self.codesModel.inputCodes,
						type : 1,
						phoneNum : phoneNum,
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_VERIFY_SEARCH_SALARY_CODES, params, function (data)
					{
						var baseParam = {
							"url" : pageUrl.APP_SET_PASSWORD_PAGE_URL,
							"isHideNavBar" : 0,
							"titleType" : 0,
						};
						var centerParam = [{"type" : 0,"param" : "设置密码"}];
						var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
						var rightParam = [];
						
						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					})
					
					
				}
				else if (skipType == skipTypeKey.LOGIN_TYPE)//验证码登录
				{
					var toNext = false;
					
					var params = 
					{
						smsCode : self.codesModel.inputCodes,
						type : 3,
						phoneNum : phoneNum,
					}
					
					jqHttpRequest.syncHttpRequest(apiUrl.API_VERIFY_SEARCH_SALARY_CODES, params, function (data)
					{
						toNext = true;
					})
					
					if (toNext)
					{
						var phoneAreaCode = self.codesModel.startPhoneNum;
						var platformId = self.codesModel.phoneNum;
						
						var params = 
						{
							phoneAreaCode : phoneAreaCode,
							platformId : platformId,
							verifyCode : self.codesModel.inputCodes,
						}
						
						jqHttpRequest.asyncHttpRequest(apiUrl.API_ACCOUNT_LOGIN_WITH_CODE, params, function (data)
						{
							var userInfo = data.userInfo;
							userInfo.name = data.userInfo.baseInfo.name;
						
							mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID, data.sessionId);
							mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN, data.token);
							mnWebMain.syncSetLocalStorage(storageKey.USER_DATA, JSON.stringify(userInfo));
							mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, data.phoneAreaCode);
							mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, data.userInfo.platformId);
							mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, data.userInfo.isOpenGestureCode);
							mnWebMain.syncSetLocalStorage(storageKey.GESTURE_COUNT, data.configData["1"]);
							
							var easeParams = 
							{
								account : data.userInfo.userId,
								password : "111111",
								userName : data.userInfo.baseInfo.name,
								userIcon : data.userInfo.icon
							}
							
							mnWebMain.showLoading();
							
							mnWebMain.easeChatLogin(easeParams, function (data)
							{
								mnWebMain.closeLoading();
								
								mnWebMain.openViewController(VCID_INDEX);
								
								var pageIds = [pageUrl.APP_CODES_PAGE_URL, 
								pageUrl.APP_INPUT_PHONE_PAGE_URL, 
								pageUrl.APP_LOGIN_PAGE_URL
								];
								mnWebMain.closeMoreViewController(pageIds);
								mnWebMain.closeSelfViewController(1);
							});
						
							
							

							
							
//							if (isAndroid)
//							{
								
//							}
						})
					}
				}
				else if (skipType == skipTypeKey.MOD_PWD_TYPE)//修改密码
				{
					var params = 
					{
						smsCode : self.codesModel.inputCodes,
						type : 2,
						phoneNum : phoneNum,
					}
					
					jqHttpRequest.asyncHttpRequest(apiUrl.API_VERIFY_SEARCH_SALARY_CODES, params, function (data)
					{
						var baseParam = {
							"url" : pageUrl.APP_RESET_PWD2_PAGE_URL,
							"isHideNavBar" : 0,
							"titleType" : 0,
						};
						var centerParam = [{"type" : 0,"param" : "设置密码"}];
						var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
						var rightParam = [];
						
						mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
					})
					
					
				}
				
			}
			
		}
		
		//收不到验证码
		self.scope.midIconClick = function()
		{
			var baseParam = {
				"url" : pageUrl.APP_CANNOT_RECEIVE_CODES_PAGE_URL,
				"isHideNavBar" : 0,
				"titleType" : 0,
			};
			var centerParam = [{"type" : 0,"param" : "收不到验证码"}];
			var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}];
			var rightParam = [];
			
			mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		}
		
		//重发短信
		self.scope.onClickSendMsg = function ()
		{
			self.reSendMsg();
		}
		
		//监听输入框变化
		self.scope.checkInputCodes = function (inputCodes)
		{
			self.codesModel.inputCodes = inputCodes;
			self.scope.inputCodes = self.codesModel.inputCodes;
			
			self.codesModel.clickAble = false;
			
			if (isEmpty(inputCodes))
			{
				self.codesModel.codes[0] = "";
				self.codesModel.codes[1] = "";
				self.codesModel.codes[2] = "";
				self.codesModel.codes[3] = "";
				$("#codes1").css("padding-left", "20px");
				$(".codes-cover").css("margin-left", "-280px");
			}
			else if (inputCodes.length == 1)
			{
				self.codesModel.codes[0] = inputCodes;
				self.codesModel.codes[1] = "";
				self.codesModel.codes[2] = "";
				self.codesModel.codes[3] = "";
				$("#codes1").css("padding-left", "70px");
				$(".codes-cover").css("margin-left", "-230px");
			}
			else if (inputCodes.length == 2)
			{
				self.codesModel.codes[1] = inputCodes.toString().substr(inputCodes.length - 1, 1);
				self.codesModel.codes[2] = "";
				self.codesModel.codes[3] = "";
				$("#codes1").css("padding-left", "120px");
				$(".codes-cover").css("margin-left", "-180px");
			}
			else if (inputCodes.length == 3)
			{
				self.codesModel.codes[2] = inputCodes.toString().substr(inputCodes.length - 1, 1);
				self.codesModel.codes[3] = "";
				$("#codes1").css("padding-left", "160px");
				$(".codes-cover").css("margin-left", "-130px");
			}
			else if (inputCodes.length == 4)
			{
				self.codesModel.codes[3] = inputCodes.toString().substr(inputCodes.length - 1, 1);
				self.codesModel.clickAble = true;
				$(".codes-cover").css("margin-left", "-120px");
			}
			
			self.scope.codesModel = self.codesModel;
			
			self.scope.clickAble = self.codesModel.clickAble;
		}
		
		self.scope.onClickInput = function (e)
		{
			e.preventDefault();
		}
		
		//
//		self.scope.onFocusInput = function ()
//		{
//		}
//		
//		self.scope.onBlurInput = function ()
//		{
//		}
		
		//接听电话
//		self.scope.onClickAnswerPhone = function ()
//		{
//			mnWebMain.showProgressDialog("请拨打电话");
//		}
		
		//验证码1
		self.scope.codesChange1 = function (codes)
		{
			if (!isEmpty(codes))
			{
				
				$("#codes2").focus();
			}
			
			self.checkClickAble();
		}
		
		//验证码2
		self.scope.codesChange2 = function (codes)
		{
			if (!isEmpty(codes))
			{
				self.codesModel.codes[1] = codes;
				
				$("#codes3").focus();
			}
			
			self.checkClickAble();
		}
		
		//验证码3
		self.scope.codesChange3 = function (codes)
		{
			if (!isEmpty(codes))
			{
				self.codesModel.codes[2] = codes;
				$("#codes4").focus();
			}
			
			self.checkClickAble();
		}
		
		//验证码4
		self.scope.codesChange4 = function (codes)
		{
			if (!isEmpty(codes)) 
			{
				self.codesModel.codes[3] = codes;
			}
			
			self.checkClickAble();
		}
		
		
	},
	
	//
	checkClickAble : function ()
	{
		var self = this;
		
		if (!isEmpty(self.codesModel.codes[0]) && !isEmpty(self.codesModel.codes[1])
			&& !isEmpty(self.codesModel.codes[2]) && !isEmpty(self.codesModel.codes[3]))
		{
			self.codesModel.clickAble = true;
		}
		else 
		{
			self.codesModel.clickAble = false;
		}
		
		self.scope.clickAble = self.codesModel.clickAble;
	},
	
	//初始化基本静态数据
	setStaticBasicData : function ()
	{
		var self = this;
		
		self.staticBasicModel.phoneTip = codesParams.PHONE_TIP;
		self.staticBasicModel.nextStep = codesParams.NEXT_STEP;
		self.staticBasicModel.firstText = codesParams.FIRST_TEXT;
		self.staticBasicModel.sendMessage = codesParams.SEND_MESSAGE;
		self.staticBasicModel.or = codesParams.OR;
		self.staticBasicModel.answerPhone = codesParams.ANSWER_PHONE;
		self.staticBasicModel.lastText = codesParams.LAST_TEXT;
		
		self.codesModel.clickAble = false;
		self.scope.clickAble = self.codesModel.clickAble;
		
		self.scope.staticBasicModel = self.staticBasicModel;
		self.scope.$apply();
	},
	
	//重置数据
	resetData : function ()
	{
		var self = this;
		
		self.codesModel.codes = [];

		self.codesModel.startPhoneNum = mnWebMain.syncGetLocalStorage(userKeys.START_PHONE_NUM);
		var phoneNum = mnWebMain.syncGetLocalStorage(userKeys.PHONE_NUM);
		
		if (!isEmpty(phoneNum))
		{
			self.codesModel.phoneNum = phoneNum;
		}
		else
		{
			self.codesModel.phoneNum = userParams.PHONE_NUM;
		}
		
		self.codesModel.reSendCodes = true;
		self.scope.reSendCodes = self.codesModel.reSendCodes;
		
		self.codesModel.reSendTime = 60;
		self.scope.reSendTime = "(" + self.codesModel.reSendTime + ")";
		
		self.codesModel.inputCodes = null;
		self.scope.inputCodes = self.codesModel.inputCodes;
		
		self.scope.codesModel = self.codesModel;
		self.scope.$apply();
		
		mnWebMain.closeLoading();
		$(".codes-body").show();
		
		setTimeout(function()
		{
			$("#codes1").focus();
			$("#codes1").click();
			$("#codes1").trigger("focus");
			$("#codes1").trigger("click");
		}, 5);
	},
}
