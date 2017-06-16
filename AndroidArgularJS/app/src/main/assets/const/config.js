/*
 *Enterprise office const parameter 
 * 
 * cao qi 
 * 2016 - 08 - 30
 * */
/**************服务器基地址*******************/
const baseUrl = "http://123.206.85.73/office/index.php/";
//const baseUrl = "http://mc.meeno.net:9092/office/index.php/";



/*************页面基地址********************/
var pageBaseUrl = "";
/**************模拟器调试（方便在浏览器中调试）参数*******************/
const simulate = false;

if (simulate)
{
//	pageBaseUrl = "http://192.168.2.135:8020/EnterpriseOffice/";
pageBaseUrl = "http://127.0.0.1:8020/EnterpriseOffice/";
}
else
{
    pageBaseUrl = "" ;
}

/***************VCID****************/
const VCID_INDEX = "indexViewController";
const VCID_SINGLE_CHAT = "singleChatController";//原生单聊
//const VCID_CHAT_ROOM = "chatRoomController";//原生群聊

//是否是android设备
const isAndroid = navigator.userAgent.indexOf("Android") > -1;//Android终端
//const isiOS = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端

/***************apiUrl****************/
var apiUrl = 
{
	API_COMMON_CLEARREDIS : baseUrl + "common/clearRedis", // 清除缓存
	API_COMMON_GET_CONFIG_DATA : baseUrl + "common/getConfigData", // 获取常量
	API_ACCOUNT_REGISTER : baseUrl + "account/registerUserWithGes", //注册
	API_ACCOUNT_LOGIN : baseUrl + "account/login", //登录
	API_ACCOUNT_RELOGIN : baseUrl + "account/reLogin", //重登录
	API_ACCOUNT_MODPWD : baseUrl + "account/changePassword", //验证码修改密码
	API_ACCOUNT_GETCODE : baseUrl + "account/getMobileCode", //获取短信验证码
	API_ACCOUNT_LOGIN_WITH_CODE : baseUrl + "account/loginWithCode", //短信登录
	API_ACCOUNT_MOD_USERINFO : baseUrl + "app/User/modInfo", //修改用户信息
	API_ACCOUNT_MOD_PWD_OLDPWD : baseUrl + "account/changePasswordWithOldPWD", //旧密码修改用户密码
	API_ACCOUNT_INSIDE_MEMBER : baseUrl + "account/isContainInfo", //是否为公司内部员工
	API_ACCOUNT_CAN_REGISTER : baseUrl + "account/canUserRegister", //验证账号是否可以注册
	API_GET_USER_PAGE : baseUrl + "app/Setting/userPage", //我的用户界面权限
	API_GET_USER_BASIC_INFO : baseUrl + "app/User/getUserBaseInfo", //获取用户基本信息
	API_GET_USER_WORK_INFO : baseUrl + "app/User/getUserWorkExpInfo", //获取用户任职信息
	API_GET_USER_RECORD_INFO : baseUrl + "app/User/getUserWorkResumeInfo", //获取用户履历信息
	API_GET_USER_EDUCATION_INFO : baseUrl + "app/User/getUserEducationInfo", //获取用户教育背景信息
	API_GET_USER_FAMILY_INFO : baseUrl + "app/User/getUserFamilyInfo", //获取用户家庭背景信息
	API_GET_USER_SALARY_LIST : baseUrl + "app/User/getUserSalaryInfo", //获取用户薪资信息
	API_VERIFY_SEARCH_SALARY_CODES : baseUrl + "account/validVerifyCode", //检查验证码合法性
	API_UPLOAD_FILE : baseUrl + "app/upload/uploadImages", //上传图片
	API_GET_CHAT_ROOM_INFO : baseUrl + "app/EaseChatMob/getGroupInfo", //获取群组信息
	API_ADD_CHAT_ROOM : baseUrl + "app/EaseChatMob/createGroups", //创建群组
	API_ADD_CHAT_ROOM_MEMBERS : baseUrl + "app/EaseChatMob/addMembers", //添加群组成员
	API_GET_FOLLOWED_PEOPLE : baseUrl + "app/User/getFoucesRelationInfo", //关注的人
	API_GET_CONTACTS_LIST : baseUrl + "app/User/getAddressBook", //获取所有的通讯录
	API_GET_SIMPLE_USER_INFO : baseUrl + "app/User/getUserSimpleInfo", //获取简单信息
	API_MOD_CONTACT_FOLLOWED : baseUrl + "app/User/setFoucesInfo", //修改是否关注
	API_GET_GROUPS_LIST : baseUrl + "app/EaseChatMob/getUserGroups", //获取群组列表
	API_DEL_GROUP : baseUrl + "app/EaseChatMob/removeFromGroup", //群众移除群组
	API_MOD_GROUP_INFO : baseUrl + "app/EaseChatMob/changeGroupInfo", //修改群信息
	API_GET_NOTICE_AND_NEWS : baseUrl + "app/CompanyNewsNotify/getNewsAndNotify", //获取新闻和通知
	API_GET_SEARCH_USERS : baseUrl + "app/User/searchUserWith", //搜索用户
	API_GET_SEARCH_GROUPS : baseUrl + "app/User/searchUserGroupWith", //搜索群组
	API_DEL_GROUP2 : baseUrl + "app/EaseChatMob/deleteGroup", //群主删除群组
	API_ADD_STATISTICS : baseUrl + "app/PageStatistics/add", //统计
}
/***************page配置Url****************/
var pageUrl = 
{
	APP_GUIDE_PAGE_URL : pageBaseUrl + "guide.html",
	APP_LOADING_PAGE_URL : pageBaseUrl + "loading.html",
	APP_LOGIN_PAGE_URL : pageBaseUrl + "login.html",
	APP_REGISTER_PAGE_URL : pageBaseUrl + "register.html",
	APP_SHOW_SERVICEPRO_PAGE_URL : pageBaseUrl + "service-protocol.html",//服务协议
	APP_SHOW_PRIVACYPOL_PAGE_URL : pageBaseUrl + "privacy-policy.html",//服务协议
	APP_INPUT_PHONE_PAGE_URL : pageBaseUrl + "inputPhone.html",
	APP_CODES_PAGE_URL :　pageBaseUrl + "codes.html",
	APP_CANNOT_RECEIVE_CODES_PAGE_URL : pageBaseUrl + "codeNotReceive.html",//收不到验证码
	APP_SET_PASSWORD_PAGE_URL :　pageBaseUrl + "setPassword.html",
	APP_INDEX_PAGE_URL :　pageBaseUrl + "index.html",
	APP_CONTACT_PAGE_URL :　pageBaseUrl + "contact.html",
	APP_CHATROOMLIST_URL : pageBaseUrl + "chatRoomList-contact.html",//群聊列表
	APP_CHATROOM_MSG_URL : pageBaseUrl + "chatRoomMsg.html",//进入群聊
	APP_CHATROOM_PEOPLE_URL : pageBaseUrl + "chatPeopleNum.html",//查看群聊人数
	APP_MY_COMMON_PAGE_URL :　pageBaseUrl + "my-common.html",//我的-普通用户
	APP_MY_MANAGER_PAGE_URL :　pageBaseUrl + "my-manager.html",//我的-部门经理
	APP_MY_COMMONINFO_PAGE_URL :　pageBaseUrl + "commonInfo-my.html",//我的-基本信息
	APP_MY_POSTINFO_PAGE_URL :　pageBaseUrl + "postInfo-my.html",//我的-履历信息
	APP_MY_EDUINFO_PAGE_URL :　pageBaseUrl + "eduInfo-my.html",//我的-学历信息
	APP_MY_FAMILYINFO_PAGE_URL :　pageBaseUrl + "familyInfo-my.html",//我的-家庭信息
	APP_SETTING_PAGE_URL :　pageBaseUrl + "setting.html",
	APP_PERSONAL_DETAIL_PAGE_URL :　pageBaseUrl + "personalDetail.html",//个人详情
	APP_CHAT_MSG_PAGE_URL :　pageBaseUrl + "chatMsg.html",
	APP_SEARCH_FRIEND_PAGE_URL : pageBaseUrl + "searchFriends.html",//搜索朋友结果
	APP_NOTICE_PAGE_URL : pageBaseUrl + "notice.html",//企业通知
	APP_NOTICE_DETAIL_PAGE_URL : pageBaseUrl + "noticeDetail.html",
	APP_NEWS_PAGE_URL : pageBaseUrl + "news.html",//企业新闻
	APP_NEWS_DETAIL_PAGE_URL : pageBaseUrl + "newsDetail.html",//企业新闻详情
	APP_ADD_FRIENDS_PAGE_URL : pageBaseUrl + "addFriends-contact.html",//添加朋友
	APP_COMMON_INFO_PAGE_URL : pageBaseUrl + "commonInfo-my.html",//基本信息详情
	APP_EDUCAATION_INFO_PAGE_URL : pageBaseUrl + "eduInfo-my.html",//教育信息详情
	APP_FAMILY_INFO_PAGE_URL : pageBaseUrl + "familyInfo-my.html",//家庭信息详情
	APP_MY_COMMON_PAGE_URL : pageBaseUrl + "my-common.html",//我的信息(普通用户)
	APP_MY_MANAGER_PAGE_URL : pageBaseUrl + "my-manager.html",//我的信息(部门经理)
	APP_MY_INFO_PAGE_URL : pageBaseUrl + "my-info.html",//我的基本信息
	APP_MY_SALARY_PAGE_URL : pageBaseUrl + "my-salary.html",//我的薪水
	APP_MY_POST_INFO_PAGE_URL : pageBaseUrl + "postInfo-my.html",//我的任职信息
	APP_MY_RECORD_INFO_PAGE_URL : pageBaseUrl + "recordInfo-my.html",//我的履历信息
	APP_RESET_PWD1_PAGE_URL : pageBaseUrl + "resetPwd1.html",//重置密码1
	APP_RESET_PWD2_PAGE_URL : pageBaseUrl + "resetPwd2.html",//重置密码2
	APP_SALARY_YEAR_SEARCH_PAGE_URL : pageBaseUrl + "salaryYearSearch-my.html",//查询结果
	APP_START_CHAT_ROOM_PAGE_URL : pageBaseUrl + "startChatRoom.html",//发起群聊
	APP_GESTURE_LOGIN_PAGE_URL : pageBaseUrl + "gestureLogin.html",//手势登录
	APP_GESTURE_SETTING_PAGE_URL : pageBaseUrl + "gestureSetting.html",//设置手势密码
	APP_TEST_CHAT_PAGE_URL : pageBaseUrl + "chat.html",//测试聊天
	APP_INDEX_RIGHT_POPMODAL : pageBaseUrl + "indexAndContactRightPopModal.html",//首页和通讯录顶部右侧点击弹框
	APP_CREATE_CHAT_ROOM_POPMODAL : pageBaseUrl + "createChatRoom.html",//
	APP_LONG_TOUCH_DEL_MSG : pageBaseUrl + "longTouchToDelMsg.html",//
	APP_PHOTO_PICK_POP_MODAL : pageBaseUrl + "photoPickPopModal.html",//
	APP_EXIT_LOGOUT_POP_MODAL : pageBaseUrl + "exitLogoutPopModal.html",//
	APP_CALL_SERVICE_POP_MODAL : pageBaseUrl + "callServicePopModal.html",//
	APP_MOD_CHAT_ROOM_NAME_MODAL : pageBaseUrl + "modChatRoomNameModal.html",//
	APP_CALL_PHONE_POP_MODAL : pageBaseUrl + "callPhonePopModal.html",//
}

var storageKey = 
{
	SESSION_ID : "SESSION_ID",
	LOGIN_TOKEN : "LOGIN_TOKEN",
	USER_DATA : "USER_DATA",
	SKIP_TYPE : "SKIP_TYPE",
	INPUT_CODES : "INPUT_CODES",
	GESTURE_TYPE : "GESTURE_TYPE",
	IS_FIRST_ENTER : "IS_FIRST_ENTER",
	IS_OPEN_GESTURE : "IS_OPEN_GESTURE",
	GESTURE_COUNT : "GESTURE_COUNT",
	GESTURE_ERROR_TIME : "GESTURE_TIME",
}

var gestureTypeKey = 
{
	LOGIN_GESTURE : 1,
	SET_GESTURE : 2,
	SALARY_VERTIFY_GESTURE : 3,
}

var skipTypeKey = 
{
	REGISTER_TYPE : 1,
	MOD_PWD_TYPE : 2,
	LOGIN_TYPE : 3,
}

var startChatRoomSkipTypeKey = 
{
	SKIP_TO_START_CHAT_ROOM_TYPE: "SKIP_TO_START_CHAT_ROOM_TYPE",
	GROUP_ID : "GROUP_ID",
	GROUP_MEMBER_IDS : "GROUP_MEMBER_IDS",
}


/***************数据请求配置参数****************/
var errCode  = 
{
	SUCCESS : 0 ,
	SESSION_FAILD : 5 ,
	ACCOUNT_NOT_EXISTS : 107,
	PWD_ERROR : 101,
	ACCOUNT_EXISTS : 106,
	RELOGIN_FAILED : 103,
	TOKEN_ERR : 102,
}

/**************用户数据*******************/
var userParams = 
{
	START_PHONE_NUM : "+86",
	PHONE_NUM : "15721400000",
	USER_NAME : "谢中龙",
	USER_ICON : "img/contact_icon.png",
}

var userKeys = 
{
	USERID : "USERID",
	START_PHONE_NUM : "START_PHONE_NUM",
	PHONE_NUM : "PHONE_NUM",
	USER_NAME : "USER_NAME",
	USER_ICON : "USER_ICON",
	PASSWORD : "PASSWORD",
	USER_SALARY_LIST : "USER_SALARY_LIST",
}

/**************底部菜单数据*******************/
var footerMenuTypeAndStyle =
{
	INDEX_TYPE : 0,
	CONTACT_TYPE : 1,
	MY_TYPE : 2,
	SETTING_TYPE : 3, 
	SELECTED_STYLE : "selected-color",
	NO_SELECTED_STYLE : "no-selected-color ",
}
var footerParams = 
{
	
	FOOTER_MENU_LIST : 
	[
		{
			"type" : footerMenuTypeAndStyle.INDEX_TYPE,
			"icon" : "img/message_no2.png",
			"clickIcon" : "img/message_yes.png",
			"title" : "消息",
			"selected" : true,
			"skipPageUrl" : pageUrl.APP_INDEX_PAGE_URL,
			"active" : footerMenuTypeAndStyle.SELECTED_STYLE,
			"msgCountShow" : true,
			"totalMsgCount" : "55",
		},
		{
			"type" : footerMenuTypeAndStyle.CONTACT_TYPE,
			"icon" : "img/contact_no.png",
			"clickIcon" : "img/contact_yes.png",
			"title" : "通讯录",
			"selected" : false,
			"skipPageUrl" : pageUrl.APP_CONTACT_PAGE_URL,
			"active" : footerMenuTypeAndStyle.NO_SELECTED_STYLE,
			"msgCountShow" : false,
			"totalMsgCount" : 0,
		},
		{
			"type" : footerMenuTypeAndStyle.MY_TYPE,
			"icon" : "img/my_no.png",
			"clickIcon" : "img/my_yes.png",
			"title" : "我",
			"selected" : false,
			"skipPageUrl" : pageUrl.APP_MY_COMMON_PAGE_URL,
			"active" : footerMenuTypeAndStyle.NO_SELECTED_STYLE,
			"msgCountShow" : false,
			"totalMsgCount" : 0,
		},
		{
			"type" : footerMenuTypeAndStyle.SETTING_TYPE,
			"icon" : "img/setting_no.png",
			"clickIcon" : "img/setting.png",
			"title" : "设置",
			"selected" : false,
			"skipPageUrl" : pageUrl.APP_SETTING_PAGE_URL,
			"active" : footerMenuTypeAndStyle.NO_SELECTED_STYLE,
			"msgCountShow" : false,
			"totalMsgCount" : 0,
		},
	],
}

/**************登录参数*******************/
var loginBasicParams = 
{
	ICON : "img/login_icon.png",
	DOWN_ARROW : "img/down_arrow.png",
	START_PHONE_NUM : ["+86", "+1", "+44", "+33"],
	PHONE_TIP : "请输入手机号码",
	PASSWORD : "密码",
	PWD_TIP :　"请输入密码",
	BTN_LOGIN : "登录",
	NEW_USER_REGISTER : "新用户注册",
	USE_CODES_LOGIN : "使用验证码登录",
}

/**************新用户注册参数*******************/
var registerHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "新用户注册",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var registerParams = 
{
	COUNTRY_AREA : "国家和地区",
	START_PHONE_NUM_COUNTRY : 
	[
		{
			"startPhoneNum" : "+86",
			"country" : "中国",
		},
		{
			"startPhoneNum" : "+1",
			"country" : "美国",
		},
		{
			"startPhoneNum" : "+44",
			"country" : "英国",
		},
		{
			"startPhoneNum" : "+33",
			"country" : "法国",
		},
	],
	RIGHT_ARROW : "img/right_arrow.png",
	PHONE_NUM : "手机号码",
	PHONE_TIP :　"请输入手机号",
	NEXT_STEP : "下一步",
	NEXT_STEP_TIP : "点击上面按钮“下一步”即表示您同意",
	SERVICE_PROTOCOL : "<<服务协议>>",
	PRIVACY_POLICY : "<<隐私政策>>",
}

/**************输入手机号参数*******************/
var inputPhoneHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "输入手机号",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var inputPhoneParams = 
{
	COUNTRY_AREA : "国家和地区",
	START_PHONE_NUM_COUNTRY : 
	[
		{
			"startPhoneNum" : "+86",
			"country" : "中国",
		},
		{
			"startPhoneNum" : "+1",
			"country" : "美国",
		},
		{
			"startPhoneNum" : "+44",
			"country" : "英国",
		},
		{
			"startPhoneNum" : "+33",
			"country" : "法国",
		},
	],
	RIGHT_ARROW : "img/right_arrow.png",
	PHONE_NUM : "手机号码",
	PHONE_TIP :　"请输入手机号",
	NEXT_STEP : "下一步",
}

/**************填写验证码参数*******************/
var codesHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : "img/doubt.png",
	MID_TITLE : "填写验证码",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var codesParams = 
{
	PHONE_TIP : "验证码已发送到手机:",
	NEXT_STEP :　"下一步",
	FIRST_TEXT : "收不到验证码?",
	SEND_MESSAGE :　"重发短信",
	ANSWER_PHONE : "接听电话",
	OR : "或",
	LAST_TEXT : "获取验证码",
	CODES : ["1", "5", "0", "4"],
}

/**************设置密码参数*******************/
var setPasswordHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "设置密码",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var setPasswordParams = 
{
	TITLE_TIP : "设置密码后,你可以用手机号和密码登录",
	PHONE_TIP : "手机号码",
	PWD_TIP : "密码",
	PWD_PLACEHOLDER_TIP : "请输入6~20位密码",
	CONFIRM_PWD_TIP : "确认密码",
	CONFIRM_PWD_PLACEHOLDER_TIP : "再次输入密码",
	SHOW_PWD_TIP : "显示密码",
	HIDE_PWD_TIP : "隐藏密码",
	NEXT_STEP :　"设置手势密码",
	SHOW_PWD_ICON : "img/showPwd.png",
	HIDE_PWD_ICON : "img/hidePwd.png",
}

/**************首页参数*******************/
var indexHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : "img/add.png",
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var msgType = 
{
	NOTICE : 1,
	NEWS : 2,
	CHAT_ROOM : 3,
	SINGLE_CHAT : 4,
}

var indexParams = 
{
	SELECTED_FOOTER_MENU_TYPE : footerMenuTypeAndStyle.INDEX_TYPE,
	SEARCH_ICON : "img/search.png",
	SEARCH_TIP : "搜索",
	MESSAGELIST : 
	[
		{
			"type" : msgType.NOTICE,
			"msgId" : 1,
			"leftIcon" : "img/qiyetongzhi.png",
			"msgFrom" : "企业通知",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : "上午10:22",
			"msgCount" : "1",
			"userId" : 1,
		},
		{
			"type" : msgType.NEWS,
			"msgId" : 2,
			"leftIcon" : "img/qiyexiaoxi.png",
			"msgFrom" : "企业新闻",
			"msgContent" : "恭祝我公司这个月即将上市",
			"msgTime" : "上午10:22",
			"msgCount" : "2",
			"userId" : 1,
		},
		{
			"type" : msgType.CHAT_ROOM,
			"msgId" : 3,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "公司设计部讨论群",
			"msgContent" : "今天中午一起吃个饭",
			"msgTime" : "2月23日",
			"msgCount" : "8",
			"userId" : 1,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 4,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户1",
			"msgContent" : "帮我打一份报表",
			"msgTime" : "2月23日",
			"msgCount" : "10",
			"userId" : 1,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 5,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "谢中友",
			"msgContent" : "晚上到我家",
			"msgTime" : "2月23日",
			"msgCount" : "1",
			"userId" : 2,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 4,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户3",
			"msgContent" : "帮我打一份报表",
			"msgTime" : "2月23日",
			"msgCount" : "10",
			"userId" : 3,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 5,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户4",
			"msgContent" : "晚上到我家",
			"msgTime" : "2月23日",
			"msgCount" : "1",
			"userId" : 4,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 4,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户5",
			"msgContent" : "帮我打一份报表",
			"msgTime" : "2月23日",
			"msgCount" : "10",
			"userId" : 5,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 5,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户6",
			"msgContent" : "晚上到我家",
			"msgTime" : "2月23日",
			"msgCount" : "1",
			"userId" : 6,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 4,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户7",
			"msgContent" : "帮我打一份报表",
			"msgTime" : "2月23日",
			"msgCount" : "10",
			"userId" : 7,
		},
		{
			"type" : msgType.SINGLE_CHAT,
			"msgId" : 5,
			"leftIcon" : "img/contact_icon.png",
			"msgFrom" : "用户8",
			"msgContent" : "晚上到我家",
			"msgTime" : "2月23日",
			"msgCount" : "1",
			"userId" : 8,
		},
	],
}

/**************单聊参数*******************/
var chatMsgHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "谢中龙",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var chatMsgType = 
{
	OTHER_MSG : 1,
	MY_MSG : 2,
	TEXT_MSG : 3,
	AUDIO_MSG : 4,
}

var chatMsgParams = 
{
	AUDIO_ICON : "img/yuyin.png",
	EMO_ICON : "img/biaoqing.png",
	MORE_ICON : "img/more.png",
	CHAT_MSG_LIST : 
	[
		{
			"type" : chatMsgType.OTHER_MSG,
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行嘎多风格的矮冬瓜多个大爱的多个矮冬瓜矮冬瓜个大概爱的个的官方矮冬瓜爱的风格地方噶大嘎达三天",
			"msgTime" : "上午10:22",
		},
		{
			"type" : chatMsgType.MY_MSG,
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : "上午10:30",
		},
		{
			"type" : chatMsgType.OTHER_MSG,
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : null,
		},
		{
			"type" : chatMsgType.MY_MSG,
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : null,
		},
	],
}

/**************群聊参数*******************/
var chatRoomMsgHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "开发元气一组(6)",
	MID_SKIP_URL : null,
	RIGHT_ICON : "img/chatPeopleNum.png",
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}

var chatRoomMsgType = 
{
	OTHER_MSG : 1,
	MY_MSG : 2,
}

var chatRoomBackSkipType =
{
	BACK_SKIP_TYPE : "BACK_SKIP_TYPE",
}

var chatRoomMsgParams = 
{
	AUDIO_ICON : "img/yuyin.png",
	EMO_ICON : "img/biaoqing.png",
	MORE_ICON : "img/more.png",
	CHAT_MSG_LIST : 
	[
		{
			"type" : chatMsgType.OTHER_MSG,
			"name" : "谢中龙",
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行嘎多风格的矮冬瓜多个大爱的多个矮冬瓜矮冬瓜个大概爱的个的官方矮冬瓜爱的风格地方噶大嘎达三天",
			"msgTime" : "上午10:22",
		},
		{
			"type" : chatMsgType.MY_MSG,
			"name" : "我",
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : "上午10:30",
		},
		{
			"type" : chatMsgType.OTHER_MSG,
			"name" : "梁勇",
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游旅行三天",
			"msgTime" : null,
		},
		{
			"type" : chatMsgType.MY_MSG,
			"name" : "我",
			"icon" : "img/contact_icon.png",
			"msgContent" : "公司秋游飞洒地方阿斯顿发啊盎司个啊啊嘎嘎爱的啊旅行三天飞洒地方",
			"msgTime" : null,
		},
	],
}

/**************个人详情参数*******************/
var personalDetailHeaderParams = 
{
	LEFT_ICON : "img/top_back2.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : null,
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : "header-background-color",
}

var personalDetailParams = 
{
	PERSONAL_ICON : "img/contact_icon.png",
	PERSONAL_NAME : "谢中龙",
	CHAT_LEFT_ICON : "img/message_no.png",
	CHAT_LEFT_TITLE : "聊天",
	FOLLOW_RIGHT_ICON : "img/plus.png",
	FOLLOW_RIGHT_TITLE : "关注",
	CONTACT_WAY_LIST : 
	[
		{
			"icon" : "img/shouji.png",
			"title" : "手机号",
			"contactWay" : "185-2148-3210",
		},
		{
			"icon" : "img/dianhua.png",
			"title" : "电话",
			"contactWay" : "62145213",
		},
		{
			"icon" : "img/youxiang.png",
			"title" : "邮箱",
			"contactWay" : "xpeng@163.com",
		},
	],
	ENTERPRISE_INFO_LIST :
	[
		{
			"icon" : "img/gonghao.png",
			"title" : "工号",
			"info" : "20151258",
		},
		{
			"icon" : "img/bumen.png",
			"title" : "部门",
			"info" : "研发部",
		},
		{
			"icon" : "img/jigou.png",
			"title" : "机构",
			"info" : "北京长生久视科技发展公司",
		},
	],
	
}

/**************聊天人数参数*******************/
var chatPeopleNumHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "聊天信息(6)",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var chatPeopleNumParams = 
{
	ADD_ICON : "img/addPeople.png",
	ADD_NAME : "添加朋友",
	EXIT_CHAT_ROOM : "退出该群",
	CHAT_PEOPLE_NUM : 6,
	CHAT_PEOPLE_LIST : 
	[
		{
			"icon" : "img/contact_icon.png",
			"name" : "谢中龙",
		},
		{
			"icon" : "img/contact_icon.png",
			"name" : "梁勇",
		},
		{
			"icon" : "img/contact_icon.png",
			"name" : "鹏鹏",
		},
		{
			"icon" : "img/contact_icon.png",
			"name" : "潘明山",
		},
		{
			"icon" : "img/contact_icon.png",
			"name" : "陈俊",
		},
		{
			"icon" : "img/contact_icon.png",
			"name" : "Andy",
		},
	],
	
}

/**************企业新闻参数*******************/
var newsHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "企业新闻",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var newsParams = 
{
	SKIP_TITLE : "阅读全文",
	SKIP_ICON : "img/next.png",
	NEWS_LIST : 
	[
		{
			"title" : "公司国庆节的活动集锦系列",
			"time" : "8月15日",
			"icon" : "img/news_icon.png",
			"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.",
		},
		{
			"title" : "公司国庆节的活动集锦系列",
			"time" : "8月15日",
			"icon" : "img/news_icon.png",
			"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.",
		},
	],
	
}

/**************企业新闻详情参数*******************/
var newsDetailHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "新闻详情",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var newsDetailParams = 
{
	NEWS_DETAIL : 
	{
		"title" : "公司国庆节活动丰富多彩,系列集锦都在这里!快看!!",
		"time" : "2016-08-15 下午14:15",
		"department" : "策划部",
		"icon" : "img/news_icon.png",
		"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.噶阿萨德阿斯顿发阿道夫阿迪嘎嘎 or哦 覆盖那啊偶噶人而OK哦鹅肉聂荣加热啊叽叽嘎嘎几个人人就加几个jargon你过那就耳机哦挂机加几个人高如果客人进入而加工按人均啊机构如果爱人发的阿发 阿尔 发的热爱过他的安放好点啊该方法噶爱的节",
	},
}

/**************企业通知参数*******************/
var noticeHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "企业通知",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var noticeParams = 
{
	SKIP_TITLE : "阅读全文",
	SKIP_ICON : "img/next.png",
	NEWS_LIST : 
	[
		{
			"title" : "公司国庆节的活动集锦系列",
			"time" : "8月15日",
			"icon" : "img/news_icon.png",
			"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.",
		},
		{
			"title" : "公司国庆节的活动集锦系列",
			"time" : "8月15日",
			"icon" : "img/news_icon.png",
			"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.",
		},
	],
	
}

/**************企业通知详情参数*******************/
var noticeDetailHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "通知详情",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var noticeDetailParams = 
{
	NOTICE_DETAIL : 
	{
		"title" : "公司国庆节活动丰富多彩,系列集锦都在这里!快看!!",
		"time" : "2016-08-15 下午14:15",
		"department" : "策划部",
		"icon" : "img/news_icon.png",
		"content" : "公司国庆节举办的丰富多彩的活动,有利于与员工身心愉悦,增加了凝聚力.噶阿萨德阿斯顿发阿道夫阿迪嘎嘎 or哦 覆盖那啊偶噶人而OK哦鹅肉聂荣加热啊叽叽嘎嘎几个人人就加几个jargon你过那就耳机哦挂机加几个人高如果客人进入而加工按人均啊机构如果爱人发的阿发 阿尔 发的热爱过他的安放好点啊该方法噶爱的节",
	},
}

/**************设置参数*******************/
var settingHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "设置",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var settingParams = 
{
	SELECTED_FOOTER_MENU_TYPE : footerMenuTypeAndStyle.SETTING_TYPE,
	RESET_PWD_ICON : "img/reset_pwd.png",
	RESET_PWD_NAME : "重设密码",
	OPEN_GESTURE_PWD : "开启手势密码",
	CLOSE_GESTURE_PWD : "关闭手势密码",
	MOD_GESTURE_PWD : "修改手势密码",
	NEXT_ICON : "img/right_arrow.png",
	OPEN_GESTURE_ICON : "img/hidePwd.png",
	CLOSE_GESTURE_ICON : "img/showPwd.png",
	LOGOUT_NAME : "退出登录",
}

/**************重置密码1参数*******************/
var resetPwd1HeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "设置密码",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var resetPwd1Params = 
{
	OLD_PWD : "旧密码",
	OLD_PWD_PLACEHOLDER : "请输入密码",
	NEW_PWD : "新密码",
	NEW_PWD_PLACEHOLDER : "请输入6~20位密码",
	CONFIRM_PWD : "确认密码",
	CONFIRM_PWD_PLACEHOLDER : "请再次输入密码",
	CODES_MOD_PWD : "验证码修改",
	BTN_CONFIRM_TEXT : "确定",
}

/**************重置密码2参数*******************/
var resetPwd2HeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "设置密码",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var resetPwd2Params = 
{
	OLD_PWD : "新密码",
	OLD_PWD_PLACEHOLDER : "请输入密码",
	NEW_PWD : "确认密码",
	NEW_PWD_PLACEHOLDER : "请输入6~20位密码",
	BTN_CONFIRM_TEXT : "确定",
}

/**************发起群聊参数*******************/
var startChatRoomHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : "取消",
	MID_ICON : null,
	MID_TITLE : "选择联系人",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : "确定",
	RIGHT_SKIP_URL : pageUrl.APP_CHATROOM_MSG_URL,
	HEADER_STYLE : "start-chat-room-header",
}

var startChatRoomSelectedType = 
[
	{
		"isSelected" : true,
		"icon" : "img/yes.png",
	},
	{
		"isSelected" : false,
		"icon" : "img/circle.png",
	},
]

var startChatRoomParams = 
{
	SEARCH_ICON : "img/search.png",
	SEARCH_TIP : "搜索",
	START_CHAT_ROOM_FRIEND_LIST : 
	[
		{
			"headLetter" : "A",
			"friendList" :
			[
				{
					"userId" : "1",
					"leftIcon" : "img/contact_icon.png",
					"name" : "A用户1",
					"isSelected" : false,
				},
				{
					"userId" : "2",
					"leftIcon" : "img/my_icon.png",
					"name" : "A谢中友",
					"isSelected" : false,
				},
			],
		},
		{
			"headLetter" : "B",
			"friendList" :
			[
				{
					"userId" : "3",
					"leftIcon" : "img/contact_icon.png",
					"name" : "B用户3",
					"isSelected" : false,
				},
				{
					"userId" : "4",
					"leftIcon" : "img/my_icon.png",
					"name" : "B用户4",
					"isSelected" : false,
				},
			],
		},
		{
			"headLetter" : "C",
			"friendList" :
			[
				{
					"userId" : "5",
					"leftIcon" : "img/contact_icon.png",
					"name" : "C用户5",
					"isSelected" : false,
				},
				{
					"userId" : "6",
					"leftIcon" : "img/my_icon.png",
					"name" : "C用户6",
					"isSelected" : false,
				},
			],
		},
		{
			"headLetter" : "D",
			"friendList" :
			[
				{
					"userId" : "7",
					"leftIcon" : "img/contact_icon.png",
					"name" : "D用户7",
					"isSelected" : false,
				},
				{
					"userId" : "8",
					"leftIcon" : "img/my_icon.png",
					"name" : "D用户8",
					"isSelected" : false,
				},
			],
		},
		
	],
}

/**************添加朋友参数*******************/
var addFriendHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "添加朋友",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var followType = 
[
	{
		"isFollowed" : true,
		"text" : "已关注",
		"active" : "is-follow",
	},
	{
		"isFollowed" : false,
		"text" : "关注",
		"active" : "un-follow",
	},
]

var addFriendParams = 
{
	SEARCH_ICON : "img/search.png",
	SEARCH_TIP : "搜索",
	ADD_FRIEND_LIST : 
	[
		{
			"headLetter" : "A",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "AIMY",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "阿西吧",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "B",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "巴拉巴拉小魔仙",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "八嘎呀路",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "C",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "cao",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "吃饭",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "D",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "迪斯科",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "大大大",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "E",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "鹅鹅鹅",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "嗯嗯",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "X",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "谢中龙",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "谢中友",
					"isFollowed" : false,
				},
			],
		},
	],
	
}
/**************通讯录参数*******************/
var contactHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "通讯录",
	MID_SKIP_URL : null,
	RIGHT_ICON : "img/add.png",
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var contactParams = 
{
	SELECTED_FOOTER_MENU_TYPE : footerMenuTypeAndStyle.CONTACT_TYPE,
	SEARCH_ICON : "img/search.png",
	DEL_ICON : "img/x.png",
	SEARCH_TIP : "根据部门,邮箱,手机号,电话号码进行搜索",

	CONTACT_LIST : 
	[
		{
			"headLetter" : "A",
			"contactPeopleList" :
			[
				{
					"userId" : 1,
					"leftIcon" : "img/contact_icon.png",
					"name" : "A用户1",
					"isFollowed" : true,
				},
			],
		},
		{
			"headLetter" : "B",
			"contactPeopleList" :
			[
				{
					"userId" : 3,
					"leftIcon" : "img/contact_icon.png",
					"name" : "B用户3",
					"isFollowed" : true,
				},
			],
		},
		{
			"headLetter" : "C",
			"contactPeopleList" :
			[
				{
					"userId" : 5,
					"leftIcon" : "img/contact_icon.png",
					"name" : "C用户5",
					"isFollowed" : true,
				},
				{
					"userId" : 6,
					"leftIcon" : "img/my_icon.png",
					"name" : "C用户6",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "D",
			"contactPeopleList" :
			[
				{
					"userId" : 7,
					"leftIcon" : "img/contact_icon.png",
					"name" : "D用户7",
					"isFollowed" : true,
				},
				{
					"userId" : 8,
					"leftIcon" : "img/my_icon.png",
					"name" : "D用户8",
					"isFollowed" : false,
				},
			],
		},
	],
	
}
/**************群聊列表参数*******************/
var chatRoomListHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "群聊",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var chatRoomListParams = 
{
	SEARCH_ICON : "img/search.png",
	SEARCH_TIP : "搜索",
	
	CHATROOM_LIST : 
	[
		{
			"chatRoomIcon" : "img/contact_icon.png",
			"chatRoomName" : "元气一组",
		},
		{
			"chatRoomIcon" : "img/my_icon.png",
			"chatRoomName" : "逗逼二组",
		},
	]
}












/**************我的(普通用户)参数*******************/
var myCommonHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "我的",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myCommonParams = 
{
	SELECTED_FOOTER_MENU_TYPE : footerMenuTypeAndStyle.MY_TYPE,
	MY_ICON : "img/contact_icon.png",
	MY_NAME : "谢中龙",
	
}

/**************我的(部门经理)参数*******************/
var myManagerHeaderParams = 
{
	LEFT_ICON : null,
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "我的",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myManagerParams = 
{
	SELECTED_FOOTER_MENU_TYPE : footerMenuTypeAndStyle.MY_TYPE,
	MY_ICON : "img/contact_icon.png",
	MY_NAME : "谢中龙",
	
}

/**************我的薪资参数*******************/
var mySalaryHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "工资查询",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var mySalaryParams = 
{
	MY_SALARY_LIST : [
		{
			"salaryYear" : "2016年",
			"salaryMonth" : "08月",
			"totalSum" : "5404",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2016年",
			"salaryMonth" : "07月",
			"totalSum" : "5404",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
	],
	
	SALARY_YEAR_LIST : [
		{
			"salaryYearId" : "1",
			"salaryYear" : "2016年",
			"salaryMonth" : [
				{
					"month" : "01月",
					"salary" : "5000",
				},
				{
					"month" : "02月",
					"salary" : "5000",
				},
				{
					"month" : "03月",
					"salary" : "5000",
				},
				{
					"month" : "04月",
					"salary" : "5000",
				},
				{
					"month" : "05月",
					"salary" : "5000",
				},
				{
					"month" : "06月",
					"salary" : "5000",
				},
			],
			"realSum" : "30000",
		},
		{
			"salaryYearId" : "2",
			"salaryYear" : "2015年",
			"salaryMonth" : [
				{
					"month" : "01月",
					"salary" : "5000",
				},
				{
					"month" : "02月",
					"salary" : "5000",
				},
				{
					"month" : "03月",
					"salary" : "5000",
				},
				{
					"month" : "04月",
					"salary" : "5000",
				},
				{
					"month" : "05月",
					"salary" : "5000",
				},
				{
					"month" : "06月",
					"salary" : "5000",
				},
			],
			"realSum" : "30000",
		},
	]
	
}

/**************我的薪资--查询结果参数*******************/
var mySalarySearchHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "查询结果",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var salaryYearSearchParams = 
{
	"startTimeYear" : "2015年",
	"startTimeMonth" : "01月",
	"endTimeYear" : "2016年",
	"endTimeMonth" : "07月",
	SALARY_YEAR_SEARCH_LIST : [
		{
			"salaryYear" : "2016年",
			"salaryMonth" : "08月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2016年",
			"salaryMonth" : "07月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2016年",
			"salaryMonth" : "03月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2015年",
			"salaryMonth" : "07月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2015年",
			"salaryMonth" : "10月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
		{
			"salaryYear" : "2014年",
			"salaryMonth" : "06月",
			"totalSum" : "5000",
			"personalTax" : "152",
			"deduceTotal" : "325",
			"realSum" : "4560",
			"pension" : "256",
			"insuranceHouseFound" : "111",
		},
	]
	
}
/**************收不到验证码参数*******************/
var codesNotReceiveHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "验证码收不到",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}
/**************服务协议参数*******************/
var serviceProtocolHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "服务协议",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}
/**************隐私政策参数*******************/
var privacyPolicyHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : "返回",
	MID_ICON : null,
	MID_TITLE : "隐私政策",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
}



























































































































































































































































































































































































































































































































































































/**************搜索朋友参数*******************/
var searchFriendHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "搜索结果",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var searchFriendParams = 
{
	SEARCH_NAME : null,
	DELETE_ICON : "img/x.png",
	SEARCH_FRIEND_LIST : 
	[
		{
			"headLetter" : "A",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "AIMY",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "阿西吧",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "B",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "巴拉巴拉小魔仙",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "八嘎呀路",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "C",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "cao",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "吃饭",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "D",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "迪斯科",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "大大大",
					"isFollowed" : false,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "逗逼二组",
					"isFollowed" : true,
				},
			],
		},
		{
			"headLetter" : "E",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "鹅鹅鹅",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "嗯嗯",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "X",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "谢中龙",
					"isFollowed" : true,
				},
				{
					"leftIcon" : "img/my_icon.png",
					"name" : "谢中友",
					"isFollowed" : false,
				},
			],
		},
		{
			"headLetter" : "Y",
			"friendList" :
			[
				{
					"leftIcon" : "img/contact_icon.png",
					"name" : "元气一组",
					"isFollowed" : true,
				},
			],
		},
	],
	
}

/**************我的信息参数*******************/
var myInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back2.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : null,
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : "header-background-color",
}

var myInfoParams = 
{
	PERSONAL_ICON : "img/ease_default_avatar.png",
	PERSONAL_NAME : "谢中龙",
}

/**************我的基本信息参数*******************/
var myBasicInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "基本信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myBasicInfoParams = 
{
	
}

/**************我的任职信息参数*******************/
var myWorkingInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "任职信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myWorkingInfoParams = 
{
	
}

/**************我的履历信息参数*******************/
var myRecordInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "履历信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myRecordInfoParams = 
{
	
}

/**************我的学历信息参数*******************/
var myEducationInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "学历信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myEducationInfoParams = 
{
	
}

/**************我的家庭信息参数*******************/
var myFamilyInfoHeaderParams = 
{
	LEFT_ICON : "img/top_back.png",
	LEFT_TITLE : null,
	MID_ICON : null,
	MID_TITLE : "家庭信息",
	MID_SKIP_URL : null,
	RIGHT_ICON : null,
	RIGHT_TITLE : null,
	RIGHT_SKIP_URL : null,
	HEADER_STYLE : null,
}

var myFamilyInfoParams = 
{
	
}

/**************聊天表情参数*******************/
var chatEmojiParams = 
{
	SWIPER_EMOJI_1 : 
	[
		"img/faces/ee_1.png",
		"img/faces/ee_2.png",
		"img/faces/ee_3.png",
		"img/faces/ee_4.png",
		"img/faces/ee_5.png",
		"img/faces/ee_6.png",
		"img/faces/ee_7.png",
		"img/faces/ee_8.png",
		"img/faces/ee_9.png",
		"img/faces/ee_10.png",
		"img/faces/ee_11.png",
		"img/faces/ee_12.png",
		"img/faces/ee_13.png",
		"img/faces/ee_14.png",
		"img/faces/ee_15.png",
		"img/faces/ee_16.png",
		"img/faces/ee_17.png",
		"img/faces/ee_18.png",
		"img/faces/ee_19.png",
		"img/faces/ee_20.png",
	],
	SWIPER_EMOJI_2 : 
	[
		"img/faces/ee_16.png",
		"img/faces/ee_17.png",
		"img/faces/ee_18.png",
		"img/faces/ee_19.png",
		"img/faces/ee_20.png",
		"img/faces/ee_21.png",
		"img/faces/ee_22.png",
		"img/faces/ee_23.png",
		"img/faces/ee_24.png",
		"img/faces/ee_25.png",
		"img/faces/ee_26.png",
		"img/faces/ee_27.png",
		"img/faces/ee_28.png",
		"img/faces/ee_29.png",
		"img/faces/ee_30.png",
		"img/faces/ee_31.png",
		"img/faces/ee_32.png",
		"img/faces/ee_33.png",
		"img/faces/ee_34.png",
		"img/faces/ee_35.png",
	],
}

var dateParams =
{
	START_YEAR : "START_YEAR",
	START_MONTH : "START_MONTH",
	END_YEAR : "END_YEAR",
	END_MONTH : "END_MONTH",
	START_YAER_LIST :
	[
		{
			"hasclass" : "date-no-selected",
			"year" : "",
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2005,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2006,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2007,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2008,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2009,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2010,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2011,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2012,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2013,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2014,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2015,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2016,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2017,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2018,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2019,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2020,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2021,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2022,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2023,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2024,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2025,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2026,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2027,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2028,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2029,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2030,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2031,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2032,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2033,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2034,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2035,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2036,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2037,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2038,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2039,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2040,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2041,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2042,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2043,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2044,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2045,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2046,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2047,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2048,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2049,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2050,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : "",
		},
	],
	START_MONTH_LIST : 
	[
		{
			"hasclass" : "date-no-selected",
			"month" : "",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "01",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "02",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "03",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "04",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "05",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "06",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "07",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "08",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "09",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "10",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "11",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "12",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "",
		},
	],
	END_YEAR_LIST : 
	[
		{
			"hasclass" : "date-no-selected",
			"year" : "",
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2005,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2006,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2007,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2008,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2009,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2010,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2011,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2012,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2013,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2014,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2015,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2016,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2017,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2018,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2019,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2020,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2021,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2022,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2023,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2024,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2025,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2026,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2027,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2028,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2029,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2030,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2031,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2032,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2033,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2034,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2035,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2036,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2037,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2038,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2039,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2040,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2041,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2042,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2043,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2044,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2045,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2046,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2047,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2048,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2049,
		},
		{
			"hasclass" : "date-no-selected",
			"year" : 2050,
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "",
		},
	],
	END_MONTH_LIST : 
	[
		{
			"hasclass" : "date-no-selected",
			"month" : "",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "01",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "02",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "03",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "04",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "05",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "06",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "07",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "08",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "09",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "10",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "11",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "12",
		},
		{
			"hasclass" : "date-no-selected",
			"month" : "",
		},
	],
}

