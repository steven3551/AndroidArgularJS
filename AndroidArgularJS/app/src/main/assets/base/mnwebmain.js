//js 检错工具

//onerror = function(msg, url, l)
//{
//	var errMsg = "Error: " + msg + "\n";
//	errMsg += "URL: " + url + "\n";
//	errMsg += "Line: " + l + "\n";
//
//	alert(errMsg);
//	return true;
//}

//原生接口
var mnInited = false;

function initMN(cbBridgeInited){
	if (mnInited)
	{
		return;
	}
	
	mnInited = true;
	
	
	//判断是否已经联网
	function checkInternetStatus(callback)
	{
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "checkInternetStatus",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler('mnSystemHandler', JSON.stringify(data),callback);
	}
	
	//打开二级弹框
	function popupModal(url,callback)
	{
		if(IsPC()){
			return ;
		}
		var data = {
			"method" : "popupModal",
			"data" : {
				"url" : url
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data),callback);
	}
	
	//关闭二级弹框
	function  closeModal(params) {
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "closeModal",
			"data" : {
				"params" : params
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	
	//下载文件
	function downloadFile(objectKey,callBack)
	{
		
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "downloadFile",
			"data" : {
				"objectKey" : objectKey 
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnAliOSSHandler', JSON.stringify(data),callBack);
		
	}
	
	//打开文件
	function openFile(filePath)
	{
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "openFile",
			"data" : {
				"filePath" : filePath 
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnSystemHandler', JSON.stringify(data));
	}
	
	//在app内打开wiki URl
	function openUrlInApp(wikiUrl,title){
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "openUrlInApp",
			"data" : {
				"url" : wikiUrl,
				"title" : title,
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//打电话
	function callPhone(phoneNo)
	{
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "callPhone",
			"data" : {
				"phoneNo" : phoneNo
			}
		}
		WebViewJavascriptBridge.callHandler('mnSystemHandler', JSON.stringify(data));
	}
	
	//发邮件
	function sendEmail(receiverEmail,title,content)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "sendEmail",
			"data" : {
				"receiverEmail" : receiverEmail,
				"title" : title,
				"content" : content,
			}
		}
		WebViewJavascriptBridge.callHandler('mnSystemHandler', JSON.stringify(data));
	}
	
	/**
	 * 
	 * 设置推送别名
	 * 
	 */
	function setAlias(phoneNo)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "setAlias",
			"data" : {
				"telephone" : phoneNo
			}
		}
		WebViewJavascriptBridge.callHandler('mnPushHandler', JSON.stringify(data));
		
	}
	
	
	//U盟统计登录
	function signIn(userName)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "signIn",
			"data" : {
				"userName" : userName
			}
		}
		WebViewJavascriptBridge.callHandler('mnUMMobHandler', JSON.stringify(data));
	}
	
	//U盟统计退出
	function signOff()
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "signOff",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler('mnUMMobHandler', JSON.stringify(data));
	}
	
	/**
	 * 
	 * 清空别名
	 * 
	 */
	function emptyAlias()
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "emptyAlias",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler('mnPushHandler', JSON.stringify(data));
	}
	
	/*
	 * 更新NavBar状态
	 * position 左中右菜单位置 0 1 2
	 * index：菜单下标
	 * isHide：0不隐藏，1隐藏,
	 * type：0文本，1图片,
	 * param：文本名，图片名
	 * param 是相对type而言的 ，如果type 0 则param 要是文本（包括数字和汉字） 如果type 1 则param 是图片的url
	 * */
	function updateNavBar(params)
	{
		if(!IsPC())
		{
			var data = {
				"method" : "updateNavBar",
				"data" : {
					"position" : params.position,
					"index" : params.index,
					"isHide" : params.isHide,
					"type" : params.type,
					"param" : params.param
				}
			}
			WebViewJavascriptBridge.send(JSON.stringify(data));
		}
		else
		{
			return ;
		}
	}
	
	//baseParam 包含 url ,isHideNavBar,titleType , leftType 。 格式是 ： var baseParam = {"url" : "view/userViews/index.html","isHideNavBar" : 0 , "titleType" : 0,"leftType" : 0}
	// isHideNavBar 有 0 和 1 参数  0 表示  不隐藏头部。 1 表示隐藏头部。
	//titleType 有 0 和 1 参数  0 表示  表示普通的（即是有文字或者图标标题）。 1  表示 有输入框的（比如搜索头部）。
	//leftParam 格式是 var leftParam = [{"leftType":0, "type" : 1 ,"param" : "btn_back_nor"}]; //type  0 是文字  1是图片   //leftType 0 表示返回键  //1 表示自定义
	//centerParam 格式是 var centerParam = [{"type" : 0,"param" : "产品详细"}];//type  0 是文字  1是图片
	//rightParam 格式是 var rightParam = [{"type":1,"param":"btn_collect_nor"},{"type":1,"param":"btn_share_nor"}];}//type  0 是文字  1是图片
	//打开新页面，可设置页面头信息     
	function openWebViewController(baseParam,leftParam,centerParam,rightParam, searchBarParam, color){
		if(!IsPC())
		{
			if(color == undefined)
			{
				color = "";
			}
			
			var data = {
				"method" : "openWebViewController",
				"data" : {
					"url" : baseParam.url,
					"isHideNavBar" : baseParam.isHideNavBar,
					"titleType" : baseParam.titleType,//0 表示普通的  1 表示 有输入框的
					"leftParam" : leftParam ,
					"centerParam" : centerParam,
					"rightParam" : rightParam,
					"searchBarParam" : searchBarParam,
					"navBgColor" : color,
					"pageId" : baseParam.url,
				}
			}
			WebViewJavascriptBridge.send(JSON.stringify(data));
		}
		else
		{
			location.href = baseParam.url;
		}
	}
	
	//关闭多个界面
	function closeMoreViewController(pageIds)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "closeMoreViewController",
			"data" : {
				"ids" : pageIds,
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
		
	}
	
	//回到主页
	
	function backToHomeViewController()
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "backToHomeViewController",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
	}
	
	//更新头部按钮右上角数字或图片
	
	/**
	 *position 左中右菜单位置   0 1 2 左中右
	 *index  需要更新的按钮的下表
	 * isHide 隐藏corner
	 * type 0 文本  1 图片
	 * param  相对于type 而言
	 */
	
	function updateNavBarCorner(updateParam)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data =
		{
			"method" : "updateNavBarCorner",
			"data" : {
				"position" : updateParam.position,
				"index" : updateParam.index,
				"isHide" : updateParam.isHide,//0 表示不隐藏的  1 表示 隐藏的
				"type" : updateParam.type ,
				"param" : updateParam.param,
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	//更新底部状态
	function updateTabBarCorner(index,isHide)
	{
		if(IsPC())
		{
			return ;
		}
		
		
		var data =
		{
			"method" : "updateTabBarCorner",
			"data" : {
				"index" : index,
				"isHide" : isHide,//0 表示不隐藏的  1 表示 隐藏的
			}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
	}
	
	//环信登录（比如环信聊天登录）
	function loginEaseMobClient(userName,pwd)
	{
		if(IsPC())
		{
			return ;
		}
		
		var data = {
			"method" : "loginEaseMobClient",
			"data" : {
				"userName" : userName,
				"password" : pwd,
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnHuanxinHandler', JSON.stringify(data));
	}
	
	//环信退出
	function easeMobClientLogOut()
	{
		if(IsPC())
		{
			return ;
		}
		var data = {
			"method" : "logoutEaseMobClient",
			"data" : {
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnHuanxinHandler', JSON.stringify(data));
		
	}
	
	//打开聊天界面
	/**
	 * productModel 产品数据参数
	 * title 产品名称
	 * type 产品类型（’基‘，’宝‘。。。）
	 * expectIncome 预期收入
	 * timeLimit 产品期限
	 * riskLvl 风险等级
	 * productURL 点击产品跳转的url （需要配基地址）
	 */
	
    function privateChat(uName,telephone,senderLogo,receiverLogo,sendRole,receiveRole,productModel)
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	if(productModel == undefined)
    	{
    		productModel = "";
    	}
    	
    	if(receiverLogo == undefined)
    	{
    		receiverLogo = "";
    	}
    	
    	var data = {
    		
			"method" : "privateChat",
			"data" : {
				"userName" : uName,
				"telephone" : telephone,
				"senderLogo" : senderLogo,
				"receiverLogo" : receiverLogo,
				"sendRole": sendRole,
				"receiveRole": receiveRole,
				"productModel" : productModel
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnHuanxinHandler', JSON.stringify(data));
    }
    
    //获取聊天列表
    function getConversationList(onResult)
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
    		
			"method" : "getConversationList",
			"data" : {
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnHuanxinHandler', JSON.stringify(data),onResult);
    	
    }
    
    //删除一个会话
    function deleteConversation(telephone,onResult)
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
    		
			"method" : "deleteConversation",
			"data" : {
				"telephone" : telephone
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnHuanxinHandler', JSON.stringify(data),onResult);
    }
    
    /**
     *shareType 
     * 1 微信朋友分享
     * 2 微信朋友圈分享
     * 3 微博分享
     * 4 短信分享
     * 
     * shareModel 
     * title ： 分享的标题
     * content ： 分享的基础内容
     * icon  分享的图标
     * url ： 分享链接
     * 
     */
    function shareInfo(shareType,shareModel)
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
    		
			"method" : "shareInfo",
			"data" : {
				"shareType" : shareType,
				"param" : shareModel
			}
		}
		
		WebViewJavascriptBridge.callHandler('mnShareHandler', JSON.stringify(data));
    	
    }
	
	//判断是PC还是移动端方法       ----新建 By   谢中龙    2016-03-23
	function IsPC()
    {
    	
    	if (simulate)
    	{
    		return true;
    	}
    	
	    var userAgentInfo = navigator.userAgent;

        var flag = false;
        if(/AppleWebKit.*Mobile/i.test(userAgentInfo))
        {
            if(/Android|webOS|iPhone|iPod|BlackBerry/i.test(userAgentInfo))
            {
                flag = false;
            }
            else
            {
                flag = true;
            }
        }
        else
        {
            flag = true;
        }
        return flag;
       
	}
	
	//同步缓存本地存储    
	function syncSetLocalStorage(str_Key,source){
		if(!IsPC())
		{
			//Mobile调用的本地存储方法
//			setDataToPhoneLocalStorage(str_Key,source);
			SyncManager.syncSetLocalStorage(str_Key,source);
		}
		else
		{
			//PC调用的本地存储方法
			localStorage.setItem(str_Key,source);
		}
		
	}

	// 同步获得本地缓存数据   
	function syncGetLocalStorage(str_Key){
		if(!IsPC())
		{
			//mobile调用的本地存储方法
//			return getDataToPhoneLocalStorage(str_Key);
			return SyncManager.syncGetLocalStorage(str_Key);
		}
		else
		{
			//PC调用的本地存储方法
			return localStorage.getItem(str_Key);
		}
	}

	//调用原生存储接口进行存储
	function setDataToPhoneLocalStorage(tagName,data){
		SyncManager.syncSetLocalStorage(tagName,data);
	}

	//调用原生存储接口获得数据
	function getDataToPhoneLocalStorage(strKey){
		return SyncManager.syncGetLocalStorage(strKey);
	}
	
	//删除本地存储
	function removeLocalStorage(key){
		if(IsPC())
		{
			localStorage.removeItem(key);
			return ;
		}
		
		syncRemoveLocalStorage(key);
	}

	function syncRemoveLocalStorage(strKey)
	{
		SyncManager.syncRemoveLocalStorage(strKey);
	}
	 //在A页面打开B页面，B页面更新A页面数据
    function openWebViewControllerWithDataTransfer(baseParam,leftParam,centerParam,rightParam,color,onResult){
    	if (IsPC())
	    {
	    	location.href = baseParam.url;
	    	return;
	    }
    	
    	if(color == undefined)
    	{
    		color = "";
    	}
    	
    	var data = {
			"method" : "openWebViewControllerWithDataTransfer",
			"data" : {
				"url" : baseParam.url,
				"isHideNavBar" : baseParam.isHideNavBar,
				"titleType" : baseParam.titleType,//0 表示普通的  1 表示 有输入框的
				"leftParam" : leftParam ,
				"centerParam" : centerParam,
				"rightParam" : rightParam,
				"navBgColor" : color,
				"pageId" : baseParam.url
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data), onResult);
    }
    
    //返回原来页面前、存储当前页面输入的值
    function transferData(params){
    	if(IsPC()){
			return ;
		}
		var data = {
			"method" : "transferData",
			"data" : {
				"params" : params, 
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//关闭当前页面
	function closeSelfViewController(noAnim){
        // 如果是PC那么什么都不做
        if (IsPC())
        {
            return ;
        }
        
		var animInt = 0;
		if (noAnim){
			animInt = 0;//有动画
		}else{
			animInt = 1;//无动画
		}
		
		var data = {
			"method" : "closeSelfViewController",
			"data" : {
				"anim" : animInt
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//打开原生页面
    function openViewController(vcId, type, userId, userName, userIcon){
    	if (IsPC())
        {
            location.href="index.html";
        }
    	
    	var data = {
			"method" : "openViewController",
			"data" : {
				"VCId" : vcId,
				"chatType" : type,//1单聊，2群聊
				"userId" : userId,
				"userName" : userName,
				"userIcon" : userIcon
			}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
    }
	
	//激活对应的TabBar
	function setTabbarSelectedIndex(index)
	{
		var data = {
			"method" : "setTabbarSelectedIndex",
			"data" : {
				"index": index
			}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
	}
	
	//重新加载界面
	function reloadWebView()
	{
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "reloadWebView",
			"data" : {}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//设置页面可反弹
	function enableDrag(){
		if(IsPC()){
			return ;
		}
		
		var data = {
			"method" : "enableDrag",
			"data" : {}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//禁止页面反弹
	function disableDrag(){
		if (IsPC())
		{
			return;
		}
		
		var data = {
			"method" : "disableDrag",
			"data" : {}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//设置上下拉有加载效果
	function refresh(refreshType){
		if(IsPC())
		{
			return;
		}
		//refreshType 0:上拉 1:下拉 2:两者都有
		
		var data = {
			"method" : "refresh",
			"data" : {
				"refreshType": refreshType
			}
		}
		
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//下拉刷新
	function downRefresh()
	{
		if(IsPC())
		{
			return;
		}
		//refreshType 0:上拉 1:下拉 2:两者都有
		var data = {
			"method" : "downRefresh",
			"data" : {
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	//上拉刷新
	function UpRefresh()
	{
		if(IsPC())
		{
			return;
		}
		//refreshType 0:上拉 1:下拉 2:两者都有
		var data = {
			"method" : "UpRefresh",
			"data" : {
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//关闭上下拉效果
	function refreshFinish(result){
		//result: 0 提示成功 1提示失败
		if(IsPC())
		{
			return;
		}
		var data = {
			"method" : "refreshFinish",
			"data" : {
				"result": result
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	//相册和拍照
    function photoPicker(isCut, photoType, maxCount, isPress, onResult){
    	if(IsPC()){
			return ;
		}
    	//isCut: 0表示截图  1表示不截图
	   	//photoType: 0：调用照相机 1：相册  2:多图
	   	//maxCount: 最大图片数量
	   	//返回值 localURLs:["图片地址1","图片地址2","图片地址3".....] 
    	var data = {
			"method" : "photoPicker",
			"data" : {
				"isCut" : isCut,
				"photoType" : photoType,
				"maxCount" : maxCount,
				"isPress" : isPress
			}
		}
		WebViewJavascriptBridge.callHandler('mnMediaHandler', JSON.stringify(data), onResult);
    }
    
    
    
    //上传图片
    function uploadFiles(filesArr,onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "uploadFiles",
			"data" : {
				"files" : filesArr,
			}
		}
		WebViewJavascriptBridge.callHandler('mnAliOSSHandler', JSON.stringify(data), onResult);
    }
    
    //删除阿里云已经上传的图片
    function deleteFiles(objectKeysArr,onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "deleteFiles",
			"data" : {
				"objectKeys" : objectKeysArr,
			}
		}
		WebViewJavascriptBridge.callHandler('mnAliOSSHandler', JSON.stringify(data), onResult);
    }
    
    //根据阿里object key 获得对应的图片或者文件的url
    function getConstrainedObjectURLs(objectKeys,onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "getConstrainedObjectURLs",
			"data" : {
				"objectKeys" : objectKeys,
			}
		}
		WebViewJavascriptBridge.callHandler('mnAliOSSHandler', JSON.stringify(data), onResult);
    }
    
    //判断手机是否允许该app访问相册或者相机
    function checkMediaState(onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "getCameraState ",
			"data" : {
			}
		}
    	
		WebViewJavascriptBridge.callHandler('mnSystemHandler', JSON.stringify(data), onResult);
    }
    
    //弹框
    function showDialog(type, title, content, arr, onResult){
    	if(IsPC()){
			return ;
		}
    	//参数  type: 0表示提示框 1表示输入框 2表示底部列表框
		//title: 标题内容（0、1  title必填）
		//content: 提示信息（1 content必填）
		//arr: 底部列表数据（3 arr必填） 
		
		//返回值 提示框（index:0或者1）
		//输入框（index:0或者1、inputContent:输入的内容） 
		//底部列表（index: 0、1、2...）
		
		if(!onResult || onResult == undefined){
			onResult = "";
		}
		
    	var data = {
			"method" : "showDialog",
			"data" : {
				"type" : type,
				"title" : title,
				"content" : content,
				"arr" : arr
			}
		}
		WebViewJavascriptBridge.send(JSON.stringify(data), onResult);
    }
    
    //浏览图片
    function browserPics(index, urls){
    	if(IsPC()){
			return ;
		}
    	//index 需要查看的图片index值
    	//urls 图片数组
    	var data = {
			"method" : "browserPics",
			"data" : {
				"index" : index,
				"urls" : urls
			}
		}
		WebViewJavascriptBridge.callHandler('mnMediaHandler', JSON.stringify(data));
    }
    
    //显示原生加载框
    function showLoading(content)
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
			"method" : "showLoading",
			"data" : {
				"content" : "正在加载"
			}
		}
		WebViewJavascriptBridge.callHandler('mnAppHandler', JSON.stringify(data));
    }
    
    //隐藏原生加载框
    function closeLoading()
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
			"method" : "closeLoading",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler('mnAppHandler', JSON.stringify(data));
    }
    
    //显示加载对话框
    function showProgressDialog(content){
    	
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
			"method" : "showProgressDialog",
			"data" : {
				"content" : content
			}
		}
    	
		WebViewJavascriptBridge.send(JSON.stringify(data));
    }
    

    //隐藏加载对话框
    function dismissProgressDialog(){
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "dismissProgressDialog",
			"data" : {}
		}
    	
		WebViewJavascriptBridge.send(JSON.stringify(data));
    }
    
    
    //打开底部bar遮罩
    function popupTabBarShadow()
    {
    	if(IsPC())
    	{
			return ;
		}
    	
    	var data = {
			"method" : "popupTabBarShadow",
			"data" : {}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
		
    }
    
    //关闭底部bar遮罩
    function closeTabBarShadow()
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "closeTabBarShadow",
			"data" : {}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler",JSON.stringify(data));
		
    }
    
    function uploadFilesToSelfServer (sessionId, pics, onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "uploadFiles",
			"data" : {
				"sessionId" : sessionId,
				"pics" : pics
			}
		}
		WebViewJavascriptBridge.callHandler("mnUploadHandler",JSON.stringify(data), onResult);
    }
	
	//环信登录
	function easeChatLogin (easeParams, onResult)
    {
    	if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "easeChatLogin",
			"data" : {
				"account" : easeParams.account,
				"password" : easeParams.password,
				"userName" : easeParams.userName,
				"userIcon" : easeParams.userIcon
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler",JSON.stringify(data), onResult);
    }
	
	//环信退出
	function easeChatLogout (onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "easeChatLogout",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信获取会话列表
	function getConversationList (onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "getConversationList",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信删除会话记录
	function delConversation (userId, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "delConversation",
			"data" : {
				"userId" : userId
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信消息监听
	function setMessageListener (onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "setMessageListener",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信消息监听
	function removeMessageListener (onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "removeMessageListener",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信修改用户信息
	function updateUserInfo (data, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "updateUserInfo",
			"data" : {
				"userName" : data.userName,
				"userIcon" : data.userIcon,
				"userId" : data.userId
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信退出群聊
	function easeExitGroup (groupId, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "easeExitGroup",
			"data" : {
				"groupId" : groupId,
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信改变群聊名称
	function changeGroupName (groupId, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "changeGroupName",
			"data" : {
				"groupId" : groupId,
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信设置收到消息是否有声音
	function setSettingMsgSound (soundIsOpen, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "setSettingMsgSound",
			"data" : {
				"soundIsOpen" : soundIsOpen,
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信获取收到消息是否有声音
	function getSettingMsgSound (onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "getSettingMsgSound",
			"data" : {
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//环信
	function refreshTabbarUnreadCount (unreadCount, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "refreshTabbarUnreadCount",
			"data" : {
				"unreadCount" : unreadCount
			}
		}
		WebViewJavascriptBridge.callHandler("mnEaseChatHandler", JSON.stringify(data), onResult);
	}
	
	//设置是否侧滑
	function setNoScroll (isNoScroll, onResult)
	{
		if(IsPC()){
			return ;
		}
    	
    	var data = {
			"method" : "setNoScroll",
			"data" : {
				"isNoScroll" : isNoScroll
			}
		}
		WebViewJavascriptBridge.callHandler("mnAppHandler", JSON.stringify(data), onResult);
	}
	
	//设置是否侧滑
	function updateDataModel (baseParam,leftParam,centerParam,rightParam, searchBarParam, color)
	{
		if(IsPC()){
			return ;
		}
    	
    	if(color == undefined)
		{
			color = "";
		}
			
    	var data = {
			"method" : "updateDataModel",
			"data" : {
				"dataModel" : {
					"url" : baseParam.url,
					"isHideNavBar" : baseParam.isHideNavBar,
					"titleType" : baseParam.titleType,//0 表示普通的  1 表示 有输入框的
					"leftParam" : leftParam ,
					"centerParam" : centerParam,
					"rightParam" : rightParam,
					"searchBarParam" : searchBarParam,
					"navBgColor" : color,
					"pageId" : baseParam.url,
				}
			}
			
		}
    	WebViewJavascriptBridge.send(JSON.stringify(data));
	}
	
	window.mnWebMain = {
		//原生调用html5方法
		cbBridgeInited: cbBridgeInited,	//原生和html建立连接
		cbNavRightClicked: undefined,	//点击顶部右按钮
		//顶部左按钮默认点击事件
		cbNavLeftClicked: function(){
//			mnWebMain.closeSelfViewController(0);
		},	//点击顶部左按钮
		cbAppWillEnterForground: undefined,
		cbAppDidEnterBackground: undefined,
		cbViewWillAppear: undefined,	//页面显示时触发
		cbViewWillDisappear: undefined,	//页面隐藏时触发
		//我的方法
		cbLoginSuccessUpdate : undefined,	//登录成功更新数据
		cbUpLoadData : undefined,	//上拉加载
		cbDownRefreshData : undefined,	//下拉刷新
		cbInputFocused : undefined,//输入框获得焦点事件，
		cbTabBarOnClicked : undefined,//底部导航栏点击事件
		cbUpdateConversationList : undefined,//获得消息列表
		cbUpdateConorCount : undefined,//更新消息图标上的数字
		cbUpdataTabBarCorner : undefined,//更新底部coner
		cbAppBeForcedLogOut : undefined,//强制退出app
		cbToRefreshConversationUi : undefined,//刷新环信会话记录
		cbSearchToUpdateH5Ui : undefined,//搜索
		cbSearchClearToUpdateH5Ui : undefined,//清空搜索
		
		//html5调用原生方法
		refreshTabbarUnreadCount : refreshTabbarUnreadCount,
		updateDataModel : updateDataModel,//修改头部栏信息
		setNoScroll : setNoScroll,
		getSettingMsgSound : getSettingMsgSound,
		setSettingMsgSound : setSettingMsgSound,//
		changeGroupName : changeGroupName,//修改群聊名称
		easeExitGroup : easeExitGroup,//退出群聊
		updateUserInfo : updateUserInfo,//修改环信用户信息
		removeMessageListener : removeMessageListener,//移除监听
		setMessageListener : setMessageListener,//环信消息监听
		delConversation : delConversation,//环信删除会话记录
		getConversationList : getConversationList,//环信获取会话列表
		easeChatLogout : easeChatLogout,//环信退出
		easeChatLogin : easeChatLogin,//环信登录
		uploadFilesToSelfServer : uploadFilesToSelfServer, //上传文件到自己服务器
		downloadFile : downloadFile,//下载文件
		openFile : openFile,//打开文件
		checkInternetStatus : checkInternetStatus,//判断是不是已经联网
		popupTabBarShadow : popupTabBarShadow, //打开底部bar遮罩
		closeTabBarShadow : closeTabBarShadow, //关闭底部bar遮罩
		popupModal: popupModal,//弹出二级弹框
		closeModal : closeModal,//关闭二级弹框
		updateNavBar : updateNavBar,//更新导航栏
		updateNavBarCorner : updateNavBarCorner,//更新头部按钮的右上角数字或者图片
		updateTabBarCorner : updateTabBarCorner,//更新底部状态
		callPhone : callPhone,//打电话方法
		signIn : signIn,//U盟统计登录
		signOff : signOff,//U盟退出登录
		sendEmail : sendEmail,//发送邮件
		uploadFiles : uploadFiles,//上传图片
		deleteFiles : deleteFiles,//删除阿里云已经上传的图片
		privateChat : privateChat,//打开聊天界面
		setAlias : setAlias,//设置别名
		emptyAlias : emptyAlias,//清空别名
		getConversationList : getConversationList,//获得聊天列表
		deleteConversation : deleteConversation,//删除某一个会话
		easeMobClientLogOut : easeMobClientLogOut,//环信退出
		loginEaseMobClient : loginEaseMobClient,//环信登录
		getConstrainedObjectURLs : getConstrainedObjectURLs,////根据阿里object key 获得对应的图片或者文件的url
		checkMediaState : checkMediaState,//获得相册和相机权限状态
		setTabbarSelectedIndex : setTabbarSelectedIndex,//激活对应的tabBar
		openUrlInApp : openUrlInApp,//在app内部打开网页链接
		openWebViewController : openWebViewController,	//打开新页面
		backToHomeViewController : backToHomeViewController,//回到主页
		closeMoreViewController : closeMoreViewController,//关闭界面
		syncGetLocalStorage : syncGetLocalStorage,//获得本地存储数据
		syncSetLocalStorage : syncSetLocalStorage,//本地存储
		shareInfo : shareInfo,//分享
		openWebViewControllerWithDataTransfer : openWebViewControllerWithDataTransfer,//在A页面打开B页面，B页面更新A页面数据
		closeSelfViewController : closeSelfViewController,	//关闭当前页面
		openViewController : openViewController,	//打开原生页面
		removeLocalStorage : removeLocalStorage,	//删除本地存储
		enableDrag : enableDrag,	//设置反弹
		disableDrag : disableDrag,	//禁止反弹
		refresh: refresh,	//设置上下拉有加载效果
		transferData : transferData,	//返回原来页面前、存储当前开页面输入的值
		photoPicker : photoPicker,	//相册和拍照
		showDialog : showDialog, //原生弹框
		browserPics : browserPics, //浏览图片
		refreshFinish : refreshFinish,	//关闭上下拉的刷新效果（回弹）
		downRefresh : downRefresh,//下拉刷新
		UpRefresh : UpRefresh,//上拉刷新
		showLoading : showLoading,//显示原生加载框
		closeLoading : closeLoading,//隐藏原生加载框
		showProgressDialog : showProgressDialog,	//显示加载对话框
		dismissProgressDialog : dismissProgressDialog,	//隐藏加载对话框
		reloadWebView : reloadWebView,
	}
	
	// Connect bridge
	function connectWebViewJavascriptBridge(callback) {
		if (window.WebViewJavascriptBridge) {
			callback(WebViewJavascriptBridge)
		}else {
			document.addEventListener('WebViewJavascriptBridgeReady', function() {
				callback(WebViewJavascriptBridge)
			}, false)
		}
	}
	
	// 为了在PC上调试，有些页面的逻辑是在cbBridgeInited中初始化的
	setTimeout(function(){
		if (IsPC())
		{
			if (mnWebMain.cbBridgeInited != undefined){
				mnWebMain.cbBridgeInited();
			}
		}
	}, 500);
	
	// 连接Bridge
	connectWebViewJavascriptBridge(function(bridge){
		
		if (mnWebMain.cbBridgeInited != undefined){
			mnWebMain.cbBridgeInited();
		}
		else
		{
			// alert("bridge inited but no cbBridgeInited");	
		}

		bridge.init(function(message, responseCallback) 
		{
			if (message.method != undefined)
			{
				switch( message.method ){
					case "tapNavRightBtn" :
						if (mnWebMain.cbNavRightClicked != undefined){
							mnWebMain.cbNavRightClicked(message.data);
						}
						break;
					case "tapNavLeftBtn" :
						if (mnWebMain.cbNavLeftClicked != undefined){
							mnWebMain.cbNavLeftClicked(message.data);
						}
						break;
					case "appWillEnterForground" :
						if (mnWebMain.cbAppWillEnterForground != undefined){
							mnWebMain.cbAppWillEnterForground();
						}
						break;
					case "appDidEnterBackground" :
						if (mnWebMain.cbAppDidEnterBackground != undefined){
							mnWebMain.cbAppDidEnterBackground();
						}
						break;
					case "viewWillAppear" :
						if (mnWebMain.cbViewWillAppear != undefined){	//页面显示时触发
							mnWebMain.cbViewWillAppear();
						}
						break;
					case "viewWillDisappear" :
						if (mnWebMain.cbViewWillDisappear != undefined){	//页面显示时触发
							mnWebMain.cbViewWillDisappear();
						}
						break;
					case "cbUpLoadData" :
						if (mnWebMain.cbUpLoadData != undefined){	//上拉加载
							mnWebMain.cbUpLoadData();
						}
						break;
					case "cbDownRefreshData" :
						if (mnWebMain.cbDownRefreshData != undefined){	//下拉刷新
							mnWebMain.cbDownRefreshData();
						}
						break;
					case "cbInputFocused" : 
						if (mnWebMain.cbInputFocused != undefined){	//上拉加载
							mnWebMain.cbInputFocused(message.data);
						}
						break;
					case "cbTabBarOnClicked" : 
						if (mnWebMain.cbTabBarOnClicked != undefined){	//下拉刷新
							mnWebMain.cbTabBarOnClicked(message.data);
						}
						break;
					case "cbUpdateConversationList"	:
						if (mnWebMain.cbUpdateConversationList != undefined){	//下拉刷新
							mnWebMain.cbUpdateConversationList(message.data);
						}
						break;
					case "cbUpdateConorCount" : 
						if (mnWebMain.cbUpdateConorCount != undefined){	//下拉刷新
							mnWebMain.cbUpdateConorCount(message.data);
						}
						break;
					case "cbUpdataTabBarCorner" : 
						if(mnWebMain.cbUpdataTabBarCorner != undefined)
						{
							mnWebMain.cbUpdataTabBarCorner();
						}
						break;
					case "cbAppBeForcedLogOut" :
						if(mnWebMain.cbAppBeForcedLogOut != undefined)
						{
							mnWebMain.cbAppBeForcedLogOut();
						}
						break;
					case "cbToRefreshConversationUi" :
						if(mnWebMain.cbToRefreshConversationUi != undefined)
						{
							mnWebMain.cbToRefreshConversationUi();
						}
						break;
					case "cbSearchToUpdateH5Ui" :
						if(mnWebMain.cbSearchToUpdateH5Ui != undefined)
						{
							mnWebMain.cbSearchToUpdateH5Ui(message.data);
						}
						break;
					case "cbSearchClearToUpdateH5Ui" :
						if(mnWebMain.cbSearchClearToUpdateH5Ui != undefined)
						{
							mnWebMain.cbSearchClearToUpdateH5Ui();
						}
						break;
				}
			}
			
			if (responseCallback)
			{
				responseCallback("");	
			}
		});
	});
	
};
