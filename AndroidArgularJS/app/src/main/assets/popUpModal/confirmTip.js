/*
 *公用确认框 
 * 
 * 
 */

var $confirmTip = {
	
	body : $("body"),
	
	show : function(tip){
		
		var html = '';
//		html += '<div class="popUp-bg"></div>';
		html += '<div class="popUp-container">';
		html += '<div class="popUp-tip">'+tip+'</div>';
		html += '<div class="popUp-confirm-container">';
		html += '<a class="popUp-confirm">确认</a>';
		html += '</div>';
		html += '</div>';
		
		this.body.append(html);
		
		$(".popUp-bg").on("click",function(){
			$confirmTip.hide();
		});
		
		$(".popUp-confirm-container").on("click",function(){
			$confirmTip.hide();
		});
		
	},
	
	hide : function(){
		
//		$(".popUp-bg").remove();
		$(".popUp-container").remove();
		
	}
	
}
