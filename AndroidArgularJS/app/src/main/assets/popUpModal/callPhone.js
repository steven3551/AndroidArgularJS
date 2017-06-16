/*
 *公用确认框 
 * 
 * 
 */

var $callPhoneDialog = {
	
	body : $("body"),
	
	show : function(callback){
		
		var html = '';
		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-call-phone-container">呼叫</div>';
		
		this.body.append(html);
		
		$(".popUp-bg").on("click",function(){
			$callPhoneDialog.hide();
		});
		
		$(".popUp-call-phone-container").on("click",function(){
			callback();
			$callPhoneDialog.hide();
		});
		
	},
	
	hide : function(){
		
		$(".popUp-bg").remove();
		$(".popUp-call-phone-container").remove();
		
	}
	
}
