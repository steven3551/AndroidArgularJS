
var equal = function(val1,val2){
	/// <summary>判断两个字符串是否相等</summary>     
   /// <param name="val1" type="String">字符串1</param>   
    /// <param name="val2" type="String">字符串2</param>  
	var isEqual = false;
	
	try{
		if(val1.toString() == val2.toString()){
			isEqual = true;
		}
	}catch(e){
		isEqual = false;
	}
	
	return isEqual;
}

//判断是否为空
var isEmpty = function(strVal){
	/// <summary>判断一个字符串是否为空</summary>     
   /// <param name="strVal" type="String">需要判断的字符串</param>        
	var isEmpty = false;
	
	try{
		if(strVal == "" || strVal == "''" || strVal == '' || strVal == "null" || strVal == "{}" || strVal == NaN ||strVal == {} 
		|| strVal == "[]" || strVal == null || strVal == "'[]'" || strVal == "<null>" || strVal == undefined || strVal == []){
			isEmpty = true;
		}else{
			isEmpty = false;
		}
	}catch(e){
		isEmpty = true;
	}
	
	return isEmpty;
}

//深克隆
var deepCopy = function(source)
{
	var result;
	(source instanceof Array) ? (result = []) : (result = {});
	
	for (var key in source) {
		result[key] = (typeof source[key]==='object') ? deepCopy(source[key]) : source[key];
	}    
	return result;  
}

var isValidIP = function (ip)
{
	var reg =  /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/     
   
    return reg.test(ip);
}

var isValidPort = function (str)
{
	var parten=/^(\d)+$/g;
	
    if(parten.test(str)&&parseInt(str)<=65535&&parseInt(str)>=0)
    {
        return true;
    }
    else
    {
        return false;
    }
}

//环信表情转换
var easeChatEmojiTransfer = function ()
{
	
}

var isLoggedIn = function()
{
	/// <summary>判断是否已登录</summary> 
	var token = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_TOKEN);
	if(!isEmpty(token))
	{
		return true;
	}
	else
	{
		return false;
	}
}


var checkRefresh = function () {
	var refreshParam = false;
	
	(mnWebMain.syncGetLocalStorage(storageKey.NEED_REFRESH) == 1) ? 
		(refreshParam = true) : 
		(refreshParam = false);
	
	return refreshParam;
}


var validateProperty = function(val){
	/// <summary>验证form表单的方法</summary>     
   /// <param name="val" type="String">需要验证的字符串</param> 
	if(val == undefined || val == ""){
		return true;
	}else{
		return false;
	}
}

//仿微信消息时间显示
var getMsgFormatedDate = function (dateStr)
{
	if(isEmpty(dateStr))
	{
		var nowDate = new Date();
		var mm = nowDate.getMonth()+1;
		if(mm < 10){
			mm = "0" + mm;
		}
		return nowDate.getFullYear() + "-" + mm + "-" + nowDate.getDate();
	}
	else
	{
		var dateObj = new Date(parseInt(dateStr));
		var yy = dateObj.getFullYear();
		var mm = dateObj.getMonth()+1;
		var dd = dateObj.getDate();
		var hh = dateObj.getHours();
		var min = dateObj.getMinutes();
		
		var dateObj2 = new Date();
		var yy2 = dateObj2.getFullYear();
		var mm2 = dateObj2.getMonth()+1;
		var dd2 = dateObj2.getDate();
		
		if(min < 10)
		{
			min = "0" + min;
		}
		
		if (yy == yy2 && mm == mm2 && dd == dd2)
		{
//			if(hh < 10)
//			{
//				hh = "上午 0" + hh;
//			}
//			else if (hh > 10 && hh <12)
//			{
//				hh = "上午 " + hh;
//			}
//			
//			if (hh >= 12)
//			{
//				hh = hh - 12;
//				
//				if(hh < 10)
//				{
//					hh = "下午 0" + hh;
//				}
//				else
//				{
//					hh = "下午 " + hh;
//				}
//			}
			
			if (hh < 10)
			{
				hh = "0" + hh;
			}
			
			return hh + ":" + min;
		}
		else if (yy == yy2 && mm == mm2 && (dd2 - dd) == 1)
		{
			return "昨天";
		}
		
		if(mm < 10)
		{
			mm = "0" + mm;
		}
		
		if (yy == yy2)
		{
			return mm + "月" + dd + "日";
		}
		
		return yy + "-" + mm + "-" + dd;
	}
}

//修改日期格式带时分
var getFormatedDate = function(dateStr,dateType){
	/// <summary>把时间戳转化为2016-05-06格式</summary>     
   /// <param name="dateStr" type="dateStr">需要转化的时间戳</param> 
	if(isEmpty(dateType))
	{
		if(isEmpty(dateStr)){
			var nowDate = new Date();
			var mm = nowDate.getMonth()+1;
			if(mm < 10){
				mm = "0" + mm;
			}
			return nowDate.getFullYear() + "-" + mm + "-" + nowDate.getDate();
		}
		else{
			var dateObj = new Date(parseInt(dateStr));
			var yy = dateObj.getFullYear();
			var mm = dateObj.getMonth()+1;
			var dd = dateObj.getDate();
			var hh = dateObj.getHours();
			var min = dateObj.getMinutes();
			if(mm < 10){
				mm = "0" + mm;
			}
			if(min < 10)
			{
				min = "0" + min;
			}
			
			return yy + "-" + mm + "-" + dd + " " + hh + ":" + min;
		}
	}
	else if(equal(dateType,"1"))
	{
		if(isEmpty(dateStr)){
			var nowDate = new Date();
			var mm = nowDate.getMonth()+1;
			if(mm < 10){
				mm = "0" + mm;
			}
			return nowDate.getFullYear() + "-" + mm + "-" + nowDate.getDate();
		}
		else{
			var dateObj = new Date(parseInt(dateStr));
			var yy = dateObj.getFullYear();
			var mm = dateObj.getMonth()+1;
			var dd = dateObj.getDate();
			if(mm < 10){
				mm = "0" + mm;
			}
			if(dd < 10)
			{
				dd = "0" + dd;
			}
			return yy + "-" + mm + "-" + dd;
		}
	}
	
}

//计算两个日期之间的时间
var calTimeBetweenToDates = function(dateStr)
{
	var timestamp = new Date().getTime();
	var df = Math.ceil((parseInt(timestamp) - parseInt(dateStr*1000))/1000);
	if(isEmpty(dateStr))
	{
		return 0;
	}
	else
	{
		return 24*3600 - df;
	}
}

//计算到当前的天数
var calcDays = function(dateStr){
	
	if(isEmpty(dateStr)){
		return '0';
	}else{
		var today = new Date();
		
		var aTime = today.getTime()/1000;
		var bTime = parseInt(dateStr);
		
		var days = Math.ceil((bTime - aTime) / 60 / 60 / 24);
		
		if (days < 0) { days = 0; };
		
		return days;
	}
}

//计算过去了几天
var calDaysLateToToday = function(dateStr)
{
	if(isEmpty(dateStr)){
		return '0';
	}else{
		var today = new Date();
		
		var aTime = today.getTime()/1000;
		var bTime = parseInt(dateStr);
		
		var days = Math.floor((aTime - bTime) / 60 / 60 / 24);
		return days;
	}
}

//判断是否含有中文
var regValidateChinese = function(str)
{
	if(/^[\u4e00-\u9fa5]/.test(str))
	{
		return true;
	}
	
	else
	{
		return false;
	}
}

//过滤中文
var filterChinese = function (s)
{
	var pattern = /^[\u4e00-\u9fa5]/
	var rs = ""; 
	for (var i = 0; i < s.length; i++) 
	{
		rs = rs+s.substr(i, 1).replace(pattern, ''); 
	} 
	return rs; 
}

//过滤非法字符
var filterIllegalChar = function (s)
{
	var pattern = new RegExp("[`~!@#$^&*()=+|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]") 
	var rs = ""; 
	for (var i = 0; i < s.length; i++) 
	{
		rs = rs+s.substr(i, 1).replace(pattern, ''); 
	} 
	return rs; 
}

//判断师傅含有特殊字符
var illegalChar = function(str)
{
    var pattern=/[`~!@#\$%\^\&\*\(\)_\+<>\?:"\{\},\.\\\/;'\[\]]/im;  
    if(pattern.test(str)){  
        return false;     
    }     
    return true; 
}

//手机号验证
var validatePhoneNum = function(phoneNum){
	/// <summary>验证手机号码的正则表达式</summary>     
   /// <param name="phoneNum" type="string">需要验证的手机号</param>
	
	if(!/^(13[0-9]|14[0-9]|15[0-9]|17[0-9]|18[0-9])\d{8}$/i.test(phoneNum))
	{
	  	return false;
	}
	else
	{
		return true;
	}
}

var isCardNo = function(card)  
{  
   // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X  
   /// <summary>验证身份证号码的正则表达式</summary>     
   /// <param name="card" type="string">需要验证的身份证号码</param>
   var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;  
   if(reg.test(card) === false)  
   {  
       return  false;  
   }
   return true;
}

var validateEmail = function(email)
{
	/// <summary>验证邮箱的正则表达式</summary>     
   /// <param name="email" type="string">需要验证的邮箱地址</param>
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	 if (filter.test(email))
	 {
	 	return true;
	 }
	 else 
	 {
	 	return false;
	 }
}

//验证必须是数字
var valdiateNumberFormat = function(val)
{
	var reg = new RegExp("^[0-9]*$");  
    if(!reg.test(val))
    {
       return false;
    }  
    else
    {
    	return true;
    }
}

//手机号码隐藏中间四位
var changePhoneNumFormat = function(phoneNum){
	/// <summary>手机号码隐藏中间四位 表现形式 138****7898</summary>     
   /// <param name="phoneNum" type="string">需要转化的手机号</param>
	var fixedPhoneNum = phoneNum.substr(0,3) + "****" + phoneNum.substr(phoneNum.length-4,4);
	return fixedPhoneNum;
}

var hideIdCardNumberFormat  = function(IdCardNum)
{
	var fixedIdCardNum = IdCardNum.substring(0,3) + "****" + IdCardNum.substring(14,IdCardNum.length);
	return fixedIdCardNum;
}

//根据不同类型的用户登录显示文本
var changeLogionPageRole = function(userType){
	/// <summary>根据不同类型的用户登录显示文本 根据userType 1 ，2 ， 形式转化为 “用户版”，“理财师版”</summary>     
   /// <param name="phoneNum" type="string">需要转化的手机号</param>
	switch(userType)
	{
		case "1" : 
			return "用户版";
			break;
		case "2" : 
			return "理财师版";
			break;
		default :
			return "用户版";
			break;
	}
}

//使用jq 点击事件
var goBack = function(domClass){
	/// <summary>登录界面返回按钮执行事件</summary>     
   /// <param name="domClass" type="string">需要验证的手机号</param>
	$(domClass).off('tap').on('tap',function(e){
		e.stopPropagation();
		mnWebMain.closeSelfViewController(0);
	});
}

var getQueryString = function(name) {
	
	/// <summary>获得url后面所带的参数的值</summary>     
   /// <param name="name" type="string">所带的参数key值</param>
   
   var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)","i");
   var r = window.location.search.substr(1).match(reg);
   if (r!=null) return (r[2]); return null;
}

var errPopUpModal = function(msg)
{
	/// <summary>错误消息弹框</summary>     
   /// <param name="msg" type="string">错误消息</param>
   
	mnWebMain.syncSetLocalStorage(storageKey.MSG_DES,msg);
	mnWebMain.popupModal(popUpModalPageUrl.POP_UP_ERR_PAGE_URL,function(data){});
}

var changeLevelToDesc = function(level, isFullName)
{
	/// <summary>改变理财师的类型 把 1转化 为顾  2 转化为专</summary>     
   /// <param name="level" type="string">级别参数</param>
	var leveldesc = "";
	switch(parseInt(level))
	{
		case 1 :
			if (isFullName == 1) {
				leveldesc = "顾问";
			}else{
				leveldesc = "顾";
			}
			break;
		case 2 :	
			if (isFullName == 1) {
				leveldesc = "专家";
			}else{
				leveldesc = "专";
			}
			break;
	}
	return leveldesc;
}

var setPlannerLevelStyle = function (level) {
	var levelStyle = "";
	var level = Number(level);
	
	switch (level) {
		case 1: levelStyle = 'planner-level-adv'; break;
		case 2: levelStyle = 'planner-level-pro'; break;
		default: levelStyle = '';
	}
	
	return levelStyle;
}


const EXPORT_PARAMS = ["银行","资管","基金","信托","私募","互联网","海外投资","保险"];
const PRODUCT_TYPE = ["银","资","基","信","私","互","海","保"];
const ARTICLE_TYPE = ["财","理","生","其","私","互","海","保"];
const RISK_LEVEL = ["低","中","高"];
const RISK_LEVEL_FULL = ["低风险","中风险","高风险"];
const AGE_RANGE = ["18以下","19-30","31-50","51-60","60以上"];
const FINANCE_EXPERIENCE = ["无","2以下","2-5","5-8","8以上"];
const FINANCE_MONEY = ["10万以下","10-20万","20-50万","50-100万","100万以上"];
const EDUCATION = ["中学","本专科","硕士","博士","其他"];
const PARENT_STATUS = ["在职","退休"];
const CHILDREN_STATUS = ["无子女","幼儿园","小学","中学","工作"];
const SEX = ["男","女"];
const BUY_WAY = ["线上购买","线下到签","线下快递"];

//根据下表获得对应的购买方式
var getBuyWayByNum = function(num)
{
	var buyWayDesc = "";
	var buyWayArr = [];
	
	if(isEmpty(num))
	{
		buyWayDesc = "线上购买，线下到签，线下快递";
	}
	else
	{
		
		for(var i = 0 ; i < JSON.parse(num).length ; i++)
		{
			var index = parseInt(JSON.parse(num)[i]) - 1;
			buyWayArr.push(BUY_WAY[index]);
		}
		
		if(buyWayArr.length == 1)
		{
			buyWayDesc = buyWayArr[0];
		}
		
		else if(buyWayArr.length == 2)
		{
			buyWayDesc = buyWayArr[0] + "/" + buyWayArr[1];
		}
		
		
		else
		{
			for(var j = 0 ; j < buyWayArr.length - 1 ; j++)
			{
				buyWayDesc += buyWayArr[j] + "/";
			}
			buyWayDesc += buyWayArr[buyWayArr.length - 1];
		}
		
	}
	
	return buyWayDesc;
	
}

//获得当前时间的时间戳
var getTimeStamp = function()
{
	var timestamp = Date.parse(new Date());
	timestamp = timestamp / 1000;
	return timestamp;
}


var getChildrenStatusDesc = function(childenStatus)
{
	var childrenStatusDes = "";
	var childrenStatusDesArr = [];
	if(isEmpty(childenStatus))
	{
		childrenStatusDes = "未设置";
	}
	else
	{
		if(JSON.parse(childenStatus).length > 0)
		{
			for(var i = 0 ; i < JSON.parse(childenStatus).length ; i++)
			{
				var index = parseInt(JSON.parse(childenStatus)[i]) - 1;
				childrenStatusDesArr.push(CHILDREN_STATUS[index]);
			}
			
			if(childrenStatusDesArr.length == 1)
			{
				childrenStatusDes = childrenStatusDesArr[0];
			}
			
			else if(childrenStatusDesArr.length == 2)
			{
				childrenStatusDes = childrenStatusDesArr[0] + "/" + childrenStatusDesArr[1];
			}
			
			else
			{
				for(var j = 0 ; j < childrenStatusDesArr.length - 1 ; j++)
				{
					childrenStatusDes += childrenStatusDesArr[j] + "/";
				}
				childrenStatusDes += childrenStatusDesArr[childrenStatusDesArr.length - 1];
			}
		}
	}
	
	return childrenStatusDes;
}

var getParentStatusDesc = function(parentStatus)
{
	var parentStatusDes = "";
	if(isEmpty(parentStatus))
	{
		parentStatusDes = "未设置";
	}
	else
	{
		parentStatusDes = PARENT_STATUS[parseInt(parentStatus) - 1];
	}
	
	return parentStatusDes;
}

var getEducationDescByEducationKey = function(education)
{
	var educationDesc = "";
	if(isEmpty(education))
	{
		educationDesc = "未设置";
	}
	else
	{
		educationDesc = EDUCATION[parseInt(education) - 1];
	}
	
	return educationDesc;
}

var changeExportTypeToDesc = function(exportArr)
{
	/// <summary>根据理财师专家key获得理财师专长描述</summary>     
   /// <param name="exportArr" type="string">级别数组比如[1，2，3，。。]</param>
	var exportDescArr = [];
	var exportStr = "";
	if(JSON.parse(exportArr).length > 0)
	{
		for(var i = 0 ; i < JSON.parse(exportArr).length ; i++)
		{
			var index = parseInt(JSON.parse(exportArr)[i]) - 1;
			exportDescArr.push(EXPORT_PARAMS[index]);
		}
		
		if(exportDescArr.length == 1)
		{
			exportStr = exportDescArr[0];
		}
		
		else if(exportDescArr.length == 2)
		{
			exportStr = exportDescArr[0] + "/" + exportDescArr[1];
		}
		
		else
		{
			for(var j = 0 ; j < exportDescArr.length - 1 ; j++)
			{
				exportStr += exportDescArr[j] + "/";
			}
			exportStr += exportDescArr[exportDescArr.length - 1];
		}
	}
	else
	{
		exportStr = "未设置";
	}
	return exportStr;
}

var changeArticleType = function(type,isArticle)
{
	/// <summary>改变文章类型通过type key</summary>     
   /// <param name="type" type="string">文章类型key</param>
	
	var articleType = "";
	if(isArticle)
	{
		if(!isEmpty(type))
		{
			articleType = ARTICLE_TYPE[parseInt(type)-1]
		}
		
		else
		{
			articleType = "财";
		}
	}
	else
	{
		if(!isEmpty(type))
		{
			articleType = PRODUCT_TYPE[parseInt(type)-1]
		}
		
		else
		{
			articleType = "银";
		}
	}
	
	
	return articleType;
}


//获得资讯设精状态
var changeNewsStatusToDesc = function (status)
{
	if(equal(status,3))
	{
		return {txt: "精", class: 'news-type-good'};
	}
	else
	{
		return {txt: "普", class: 'news-type-gernral'};
	}
}


//获得产品状态
var getProductStateDescByState = function(state)
{
	if(equal(state,1))
	{
		return "审核中";
	}
	else
	{
		return "已发布";
	}
}

//获得产品销售状态
var getProductSalingStatusDescByStatus = function(status)
{
	if(equal(status,2))
	{
		return {statusDesc : "预售",hasClass : "pre"};
	}
	else if(equal(status,4))
	{
		return {statusDesc : "售罄",hasClass :  "over"};
	}
	else
	{
		return {statusDesc : "",hasClass :  "hide"};
	}
}


var changeRiskLevelToDesc = function(riskLevel,changeType)
{
	/// <summary>通过危险系数 获得危险具体描述</summary>     
   /// <param name="riskLevel" type="string">危险系数</param>
	var riskDesc = "";
	if(changeType == 1)
	{
		if(!isEmpty(riskLevel))
		{
			if(JSON.parse(riskLevel).length == 1)
			{
				riskDesc = RISK_LEVEL[JSON.parse(riskLevel)[0]-1];
			}
			else if(JSON.parse(riskLevel).length == 2)
			{
				riskDesc = RISK_LEVEL[JSON.parse(riskLevel)[0]-1] + "/" + RISK_LEVEL[JSON.parse(riskLevel)[1]-1];
			}
			
		}
		else
		{
			riskDesc = "未设置";
		}
	}
	else
	{
		if(!isEmpty(riskLevel))
		{
			riskDesc = RISK_LEVEL[parseInt(riskLevel)-1]
		}
		else
		{
			riskDesc = "未设置";
		}
	}
	
	return riskDesc;
}

var setRiskLevelStyle = function(riskLevel) {
	var riskStyle = '';
	var riskLevel = Number(riskLevel);
	
	switch (riskLevel) {
		case 1: riskStyle = 'low-risk-level'; break;
		case 2: riskStyle = 'middle-risk-level'; break;
		case 3: riskStyle = 'height-risk-level'; break;
		default: riskStyle = 'middle-risk-level'; break;
	}
	
	return riskStyle;
}


var changeProductStatusToDesc = function(statusNum)
{
	// 状态：1审核，2预售，3销售，4售罄，5过期，6作废
	var statusDesc = '';
	var statusNum = parseInt(statusNum);
	
	switch (statusNum) {
		case 1: statusDesc = '审核'; break;
		case 2: statusDesc = '预售'; break;
		case 3: statusDesc = '销售'; break;
		case 4: statusDesc = '售罄'; break;
		case 5: statusDesc = '过期'; break;
		case 6: statusDesc = '作废'; break;
		default: statusDesc = ''; break;
	}
	
	return statusDesc;
}


//判断是否已登录
var isLoggedIn = function()
{
	var token = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_TOKEN);
	return !isEmpty(token);
}

//跳转到登录界面

var goToLoginPage = function()
{
	
	var isOpenLoginPage = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_PAGE_IS_OPENED);
	if(equal(isOpenLoginPage,0))
	{
		mnWebMain.removeLocalStorage(storageKey.LOGIN_TOKEN);
		mnWebMain.removeLocalStorage(storageKey.SESSION_ID);
		mnWebMain.syncSetLocalStorage(storageKey.IS_REFRESH,true);
		mnWebMain.syncSetLocalStorage(storageKey.LOGIN_PAGE_IS_OPENED,1);
		
		var baseParam = 
		{
			"url" : pageUrl.APP_LOGIN_PAGE_URL,
			"isHideNavBar" : 0,
			"titleType" : 0,
		}
		var leftParam = [{"leftType" : 1,"type" : 1 , "param" : "btn_back_bg"}];
		var centerParam = [];
		var rightParam = [];
		var color = "ffffff";
		mnWebMain.openWebViewController(baseParam,leftParam,centerParam,rightParam,color);
	}
	
}

//获得年龄详细
var changetAgeRangeDesc = function(ageRange)
{
	var ageRangeDesc = "";
	if(!isEmpty(ageRange))
	{
		ageRangeDesc = AGE_RANGE[parseInt(ageRange)-1];
	}
	else
	{
		ageRangeDesc = "未设置";
	}
	
	return ageRangeDesc;
}

//根据理财经验key获得理财描述
var changeFinanceExperienceDesc = function(financeExp)
{
	var financeExpDesc = "";
	if(!isEmpty(financeExp))
	{
		financeExpDesc = FINANCE_EXPERIENCE[parseInt(financeExp)-1];
	}
	else
	{
		financeExpDesc = "未设置";
	}
	
	return financeExpDesc;
}

//根据理财金额key 获得理财描述
var changeFinanceMoney = function(financeMoney) {
	var financeMoneyDesc = "";
	if(!isEmpty(financeMoney))
	{
		financeMoneyDesc = FINANCE_MONEY[parseInt(financeMoney)-1];
	}
	else
	{
		financeMoneyDesc = "/";
	}

	return financeMoneyDesc;
}

// 转换投资期限
var changeTimeLimitDataToDesc = function(timeLimitData) {
	var timeLimitDesc;
	
	switch ( Number(timeLimitData) ) {
		case 0: timeLimitDesc = '/'; break;
		case NaN: timeLimitDesc = '/'; break;
		default: timeLimitDesc = timeLimitData + ' (天)'; break;
	};
	
	return timeLimitDesc;
}

// 转换预期收益
var changeIncomeDataToDesc = function(incomeData, type) {
	var incomeDesc;
	
	if (isEmpty(incomeData) || incomeData == '""')
	{
		incomeDesc = '/';
	}
	else if(incomeData.indexOf("+") > -1)
	{
		var index = incomeData.indexOf("+");
		incomeDesc = incomeData.substr(0,index) + "%起";
	}
	else if (incomeData == '浮动收益' || type == 1)
	{
		incomeDesc = incomeData;
	} 
	else 
	{
		incomeDesc = incomeData + '%';
	}
	
	return incomeDesc;
}


//转换性别
var changeSexCodeToDesc = function (sexCode) {
	var sexCode = Number(sexCode);
	var sexDesc;
	(sexCode == 1) ? (sexDesc = '女') : (sexDesc = '男');
	return sexDesc;
}

//转换抗风险能力
var changeAntiRiskCodeToDesc = function (antiRiskCode) {
	var antiRiskCode = Number(antiRiskCode);
	var antiRiskDesc;
	
	switch (antiRiskCode) {
		case 1: antiRiskDesc = '低风险'; break;
		case 2: antiRiskDesc = '中风险'; break;
		case 3: antiRiskDesc = '高风险'; break;
		default: antiRiskDesc = '低风险'; break;
	}
	
	return antiRiskDesc;
}


//转换购买方式
var changeBuyWayCodeToDesc = function (buyWayCode) {
	var buyWayCode = Number(buyWayCode);
	var buyWayDesc;
	
	switch (buyWayCode) {
		case 1: buyWayDesc = '线上购买'; break;
		case 2: buyWayDesc = '线下到签'; break;
		case 3: buyWayDesc = '线下快递'; break;
		default: buyWayDesc = '线上购买'; break;
	}
	
	return buyWayDesc;
}

//转换是否保本
var changeBreakevenCodeToDesc = function (breakevenCode) {
	var breakevenCode = Number(breakevenCode);
	var breakevenDesc;
	
	switch (breakevenCode) {
		case 0: breakevenDesc = '否'; break;
		case 1: breakevenDesc = '是'; break;
		default: breakevenDesc = '否'; break;
	}
	
	return breakevenDesc;
}




//根据选择的星星数量得到文本
var getDisplayTextBySelectedStarsNum = function(num)
{
	var displayText = "";
	switch(num)
	{
		case 0 : 
			displayText = "糟糕";
			break;
		case 1 : 
			displayText = "很不满意";
			break;
		case 2 : 
			displayText = "不满意";
			break;
		case 3 : 
			displayText = "满意";
			break;
		case 4 : 
			displayText = "较满意";
			break;
		case 5 : 
			displayText = "很满意";
			break;	
	}
	return displayText;
}


//js  深拷贝方法
var deepCopy = function(source)
{
	var result;
	
	(source instanceof Array) ? (result = []) : (result = {});
	
	for (var key in source) 
	{
		if (isEmpty(source[key]))
		{
			result[key] = source[key];
		}
		else
		{
			result[key] = (typeof source[key]==='object') ? deepCopy(source[key]) : source[key];
		}
		
	}    
	return result;  
}


//联系客服
 var contactCusService = function(uName,telephone,senderLogo,receiverLogo,sendRole,receiveRole)
 {
 	/// <summary>联系客服方法</summary>     
   /// <param name="uName" type="string">用户名</param>
    /// <param name="telephone" type="string">手机号（注册的账号）</param>
     /// <param name="senderLogo" type="string">我的logo</param>
      /// <param name="receiverLogo" type="string">目标人的logo</param>
      
      
 	mnWebMain.privateChat(uName,telephone,senderLogo,receiverLogo,sendRole,receiveRole);
//  mnWebMain.showProgressDialog("当前没有客服可以联系");
 }

//联系理财师
var contactFinancialPlanner = function(uName,telephone,senderLogo,receiverLogo,sendRole,receiveRole)
{
	/// <summary>联系理财师</summary>     
    /// <param name="uName" type="string">用户名</param>
    /// <param name="telephone" type="string">手机号（注册的账号）</param>
     /// <param name="senderLogo" type="string">我的logo</param>
      /// <param name="receiverLogo" type="string">目标人的logo</param>
    mnWebMain.privateChat(uName,telephone,senderLogo,receiverLogo,sendRole,receiveRole);
// mnWebMain.showProgressDialog("您联系的理财师正忙，别急！");
}


//打开加载框
var showLoading = function()
{
	/// <summary>显示加载数据框</summary>     
	mnWebMain.showLoading(errParam.ON_LOADING_DATA);
}

var hideLoading = function()
{
	/// <summary>隐藏加载数据框</summary>     
	mnWebMain.closeLoading();
}

var updateNavBarCorner = function(isHide,param)
{
	var updateParam = 
	{
		"position" : 2,
		"index" : 0,
		"isHide" : isHide,
		"type" : 0 ,
		"param" : param,
	}
	mnWebMain.updateNavBarCorner(updateParam);
}

//根据银行卡号获得银行卡所属银行
var getBankNameByCardNo = function(bankNo)
{
	/// <summary>银行卡号</summary> 
	/// <param name="bankNo" type="string">银行卡号</param>
	var bankName = "";
	var cutedBankNo = bankNo.substr(0,6);
	for(var i = 0 ; i < bankInfoArr.length ; i ++)
	{
		if(equal(bankInfoArr[i].bin,cutedBankNo))
		{
			bankName = bankInfoArr[i].bankName;
			break;
		}
	}
	return bankName;
}

///第三方分享

var thirdShare = function(shareType,title,content,icon,url)
{
	/// <summary>第三方分享</summary> 
	/// <param name="shareType" type="string">分享平台类型 1微信朋友2微信朋友圈3微博4短信</param>
	/// <param name="title" type="string">分享标题</param>
	/// <param name="content" type="string">分享基础内容</param>
	/// <param name="icon" type="string">缩略图</param>
	/// <param name="url" type="string">分享链接</param>
	
	var params = {};
	params.title = title;
	params.content = content;
	params.url = url;
	params.icon = icon;
	
	mnWebMain.shareInfo(shareType,params);
}


/**
 *上拉加载方法
 * pageIndex 
 * pageSize
 * callBack 函数
 */
var uploadData = function(reqUrl,pageIndex,pageSize,callBack)
{
	var param = {};
	param.startIndex = pageIndex;
	param.num = pageSize;
	
	jqHttpRequest.asyncHttpRequest(reqUrl,param,callBack);
}

//显示文字有连接
//查找关键字和显示高亮
//点击有下载效果
var replacePlainTextToLink = function(str,link)
{
	var newStr = "";
	if(!isEmpty(str))
	{
		newStr = '<a download = "'+ link +'">'+ str +'</a>';
	}
	
	return newStr;
}


//设置别名
var setAlias = function(telephone)
{
	mnWebMain.setAlias(telephone);
}

//清空别名
var emptyAlias = function()
{
	mnWebMain.emptyAlias();
}

//
var getSignContent = function(fncPlannerName,price,cusName,servicePhone)
{
	var signContent = "甲方（投资者）：" + cusName + "<br />";
	signContent += "乙方（产品理财师）：" + fncPlannerName + "<br />";
	signContent += "丙方：上海硕驹信息科技有限公司" + "<br />";
	signContent += "甲方、乙方在丙方及“加裕”平台见证下，签订本理财产品购买协议。具体理财产品相关信";
	signContent += "息以“加裕”平台数据库记录及展示的为准，购买理财的金额及交易方式以“加裕”平台网";
	signContent += "络记录为准，甲乙双方在相关网络途径点击确认即表明认可并接受本协议的全部条款。如任";
	signContent += "何一方存在违背本协议的情形，丙方可通过查封账号、通过法律途径等方式代表各方行驶本";
	signContent += "合同约定的权利。甲乙双方在本网签合同之后的交易应参照本协议规定的方式执行。乙方在";
	signContent += "根据本协议及“加裕”平台记录的交易关键数据及产品信息，执行甲方购买产品的操作，并";
	signContent += "在操作完成后向丙方支付返佣及平台管理费。如乙方并未如本协议及平台记录的信息执行后";
	signContent += "在操作完成后向丙方支付返佣及平台管理费。如乙方并未如本协议及平台记录的信息执行后。<br />";
	signContent += "本协议未能约定的部分，三方应协商解决，协商不一致的，任何一方可向任何法院及仲裁机构申请法律或仲裁解决。";
	return signContent;
}

//随机获得一个客服
var getRandomCusService = function(callBack)
{
	jqHttpRequest.asyncHttpRequest(requestApiUrl.GET_RANDOM_CUS_SERVICE,{},callBack);
}

var updateTabBarConer =  function(isHide)
{
	var index = 4;
	var userType = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_ROLE);
	
	if(equal(userType,1))
	{
		index = 4;
	}
	else if(equal(userType,3))
	{
		index = 2;
	}
	else
	{
		index = 3;
	}
	
	mnWebMain.updateTabBarCorner(index,isHide);
}

var timer;
//计算活跃度
var calLiveness = function()
{
	timer = setInterval(function(){
		
		jqHttpRequest.asyncHttpRequest(requestApiUrl.P_FNC_PLANNER_REPORT,{},function(data){
			
			var onlineTimeLength = data.onlineTimeLength;
			if(parseInt(onlineTimeLength) > 120)
			{
				clearInterval(timer);
			}
		});
	},300000);
}

//发送邮件
var sendEmail = function(receiverEmail,title,content)
{
	var param = {};
	param.email = receiverEmail;
	param.title = title;
	param.message = content;
	showLoading();
	jqHttpRequest.asyncHttpRequest(requestApiUrl.SEND_EMAIL,param,function(data){
		mnWebMain.showProgressDialog('发送成功');
		hideLoading();
	});
}


var logOut = function()
{
	//清空别名
	mnWebMain.signOff();
	mnWebMain.removeLocalStorage(storageKey.LOGIN_TOKEN);
	mnWebMain.removeLocalStorage(storageKey.SESSION_ID);
	mnWebMain.removeLocalStorage(storageKey.HAS_BIO);
	mnWebMain.syncSetLocalStorage(storageKey.IS_NEED_RELOAD,false);
	mnWebMain.removeLocalStorage(storageKey.LOGIN_ROLE);
	mnWebMain.removeLocalStorage(storageKey.USER_DATA);
	mnWebMain.easeMobClientLogOut();
	
}

var login = function()
{
	var userName = mnWebMain.syncGetLocalStorage(storageKey.PLATFORM_ID);
	var pass = mnWebMain.syncGetLocalStorage(storageKey.PASSWORD);
	var loginRole = mnWebMain.syncGetLocalStorage(storageKey.LOGIN_ROLE);
	if(isEmpty(userName) || isEmpty(pass))
	{
		goToLoginPage();
		return ;
	}
	
	var param = 
	{
		"platform" : 1,
		"platformId" : userName,
		"password" : pass,
	};
	
	jqHttpRequest.syncHttpRequest(requestApiUrl.LOGIN_API_URL,param,function(data){
		
		mnWebMain.syncSetLocalStorage(storageKey.IS_REFRESH,true);
		mnWebMain.syncSetLocalStorage(storageKey.IS_NEED_RELOAD,true);
		mnWebMain.syncSetLocalStorage(storageKey.SESSION_ID,userObj.PHPSESSID);
		mnWebMain.syncSetLocalStorage(storageKey.LOGIN_TOKEN,userObj.token);
		
	});
}
