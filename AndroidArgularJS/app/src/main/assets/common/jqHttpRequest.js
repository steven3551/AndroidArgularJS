/*
 *jia yu fanancing httpRequest parameter 
 * 
 * andy xie 
 * 2016 - 05 - 23
 *
 * */
//JQuery http请求方法
var jqHttpRequest = 
{
	
	//同步数据请求
	syncHttpRequest : function(s_url,params,callback, errCallback){
		
		var phpSessId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
		
		if ((phpSessId != null) && (phpSessId != ''))
		{
			s_url = s_url + "?sid=" + phpSessId;
		}
		
		$.ajax({
			type: "post" ,
			url: s_url ,
			async:false,
			data : params ,
			dataType : 'json',
			success : function(data){
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(equal(err,errCode.SUCCESS))
				{
					callback(data.data);
				}
				else if(equal(err,errCode.SESSION_FAILD))
				{
					mnWebMain.closeLoading();
					jqHttpRequest.relogin();
					return ;
				}
				else if (equal(err,errCode.RELOGIN_FAILED))
				{
					mnWebMain.closeLoading();
					jqHttpRequest.goToLoginPage();
					return;
				}
				else if(equal(err,errCode.TOKEN_ERR))
				{
					mnWebMain.closeLoading();
					jqHttpRequest.goToLoginPage();
					return ;
				}
				else
				{
					mnWebMain.closeLoading();
					
					if (err != errCode.ACCOUNT_EXISTS)
					{
						mnWebMain.showProgressDialog(errMsg);
					}
					
					if (!isEmpty(errCallback))
					{
						errCallback(err);
					}
					
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown){
				mnWebMain.closeLoading();
				mnWebMain.showProgressDialog("请求失败！");
//				mnWebMain.showProgressDialog("您很久没有登录了，请重新登录");
			}
		});
		
		
	},
	
	//异步数据请求
	asyncHttpRequest : function(s_url,params,callback, errCallback){
		
		var phpSessId = mnWebMain.syncGetLocalStorage(storageKey.SESSION_ID);
		
		if ((phpSessId != null) && (phpSessId != ''))
		{
			s_url = s_url + "?sid=" + phpSessId;
		}
		
		$.ajax({
			type: "post" ,
			url: s_url ,
			async: true,
			data : params ,
			dataType : 'json',
			success : function(data){
				var err = data.err;
				var errMsg = data.errMsg;
				
				if(equal(err,errCode.SUCCESS))
				{
					callback(data.data);
				}
				else if(equal(err,errCode.SESSION_FAILD))
				{
					jqHttpRequest.relogin();
					return ;
				}
				else if (equal(err,errCode.RELOGIN_FAILED))
				{
					mnWebMain.closeLoading();
					jqHttpRequest.goToLoginPage();
					return;
				}
				else if(equal(err,errCode.TOKEN_ERR))
				{
					mnWebMain.closeLoading();
					jqHttpRequest.goToLoginPage();
					return ;
				}
				else
				{
					mnWebMain.closeLoading();
					if (err != errCode.ACCOUNT_EXISTS)
					{
						mnWebMain.showProgressDialog(errMsg);
					}
					
					if (!isEmpty(errCallback))
					{
						errCallback(err);
					}
				}
			},
			error : function(XMLHttpRequest, textStatus, errorThrown)
			{
				mnWebMain.closeLoading();
				mnWebMain.showProgressDialog("请求失败！");
//				mnWebMain.showProgressDialog("您很久没有登录了，请重新登录");
			}
		});
		
		
	},
	
	relogin : function()
	{
		var flag = false;
		var token = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_TOKEN);
		
		var params = 
		{
			"userType" : 1,
			"token" : token
		}
		
		jqHttpRequest.syncHttpRequest(apiUrl.API_ACCOUNT_RELOGIN, params,function(data){
			flag = true;
			
			var userInfo = data.userInfo;
			userInfo.name = data.userInfo.baseInfo.name;
					
			mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID,data.sessionId);
			mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN,data.token);
			mnWebMain.syncSetLocalStorage(storageKey.USER_DATA,JSON.stringify(userInfo));
			mnWebMain.syncSetLocalStorage(userKeys.START_PHONE_NUM, data.phoneAreaCode);
			mnWebMain.syncSetLocalStorage(userKeys.PHONE_NUM, data.userInfo.platformId);
			mnWebMain.syncSetLocalStorage(storageKey.IS_OPEN_GESTURE, data.userInfo.isOpenGestureCode);
			mnWebMain.syncSetLocalStorage(storageKey.GESTURE_COUNT, data.configData["1"]);
			mnWebMain.closeLoading();
		});
		
		if(!flag)
		{
			try
			{
//				clearInterval(timer);
			}
			catch(e)
			{
				//TODO handle the exception
			}
//			mnWebMain.removeLocalStorage(storageKey.LOGIN_TOKEN);
//			jqHttpRequest.goToLoginPage();
//			login();
		}
		
		return flag;
	},
	
	goToLoginPage : function ()
	{
		var baseParam = {
			"url" : pageUrl.APP_LOGIN_PAGE_URL,
			"isHideNavBar" : 1,
			"titleType" : 0,
		};
		var centerParam = [];
		var leftParam = [];
		var rightParam = [];
		
		mnWebMain.openWebViewController(baseParam, leftParam, centerParam, rightParam);
		
		mnWebMain.closeSelfViewController(1);
	}
	
}


