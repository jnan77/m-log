/**
 * @author GaoYoubo
 * @since 2012-09-25
 * mlog.utils
 */
if(typeof(mlog) === "undefined"){var mlog = function(){}};
mlog.utils = {};
$.extend(mlog.utils, {
	/**
	 * ��ȡվ��ĸ�·��
	 * ���Ƽ�ʹ�ô˷�����ȡ��վ·��,������װ����������·����ʱ����������.
	 * �Ƽ�ʹ��mlog.variable.base��blogurl
	 * @return {}
	 */
	getWebRootPath : function(){
		var path = location.href ; 
		var pathArr = path.split("/"); 
		return pathArr[0]+"//"+pathArr[2]+"/"+pathArr[3] ;
	},
	
	/**
	 * ��ȡXMLHttpRequest
	 */
	getXMLHttpRequest : function(){
		if (window.XMLHttpRequest) {
            return new XMLHttpRequest();
        } else if (window.ActiveXObject) {// code for IE6, IE5
            return new ActiveXObject("Microsoft.XMLHTTP");
        }
	},
	
	 /**
     * ��ȡCookieֵ
     */
    getCookie : function(sName) {
    	var arr = document.cookie.match(new RegExp("(^| )" + sName + "=([^;]*)(;|$)"));
    	if (arr != null) {
    		return unescape(arr[2]);
    	}
    	return null;
    },

    /**
     * ����cookieֵ
     * @param sName ����
     * @param sValue ֵ
     * @param iExpireDays cookie����ʱ��(��λ����)
     */
    setCookie : function(sName, sValue, iExpireDays) {
    	if (iExpireDays) {
    		var dExpire = new Date();
    		dExpire.setTime(dExpire.getTime() + parseInt(iExpireDays * 24 * 60 * 60 * 1000));
    		document.cookie = sName + "=" + escape(sValue) + "; expires=" + dExpire.toGMTString() + "; path=/";
    	} else {
    		document.cookie = sName + "=" + escape(sValue) + "; path=/";
    	}
    }
});

mlog.utils.loader = {};
$.extend(mlog.utils.loader, {
	/**
	 * ����JS�ļ�,�ڴ����صı���IE
	 * @param {} path��JS�ļ���·��
	 * @param {} callback��JS�ļ����سɹ���Ļص�����
	 */
    loadJavaScript : function(path, callback) {  
        try {  
            var script = document.createElement('script');  
            script.src = path;  
            script.type = "text/javascript";  
            document.getElementsByTagName("head")[0].appendChild(script);  
            if( script.addEventListener ) {
                script.addEventListener("load", callback, false);  
            } else if(script.attachEvent) {
                script.attachEvent("onreadystatechange", function(){  
                        if(script.readyState == 4  
                            || script.readyState == 'complete'  
                            || script.readyState == 'loaded') {  
                            callback();  
                        }
                });  
            }
        } catch(e) {
            callback();  
        }
    },
    
   	/**
	 * ����StyleSheet
	 * @param url stylesheet�ĵ�ַ
	 */
	loadStyleSheet : function(url){
		if (document.createStyleSheet) {
            return document.createStyleSheet(url);
        } else {
            $("head").append($("<link rel='stylesheet' href='" + url + "' type='text/css' charset='utf-8' />"));
        }
	}
	
//	
//	/**
//	 * ����JavaScript�ļ�
//	 * @param setting ������
//	 * @param setting.url JavaScript��ַ
//	 * @param setting.async (Ĭ��: false) Ĭ�������£����������Ϊͬ������
//	 * @param setting.success ���سɹ���Ļص�����
//	 */
//	loadJavaScript : function(setting){
//		if(setting === undefined || setting.url === undefined) {
//			return;
//		}
//		//Ĭ��ͬ������JS�ļ�
//		if(setting.async === undefined) setting.async = false;
//		
//		//���ر���IE
//		if($.browser.msie){
//			$(document).append("<script type='text/javascript' src='" + setting.url + "'</script>"); 
//		}
//		else{
//			$.ajax({
//	            url: setting.url,
//	            dataType: "script",
//	            async : setting.async,
//	            cache: true,
//	            success: setting.success
//	        });
//		}
//	},
});


/**
 * startWith
 * @param {} s
 * @return {Boolean}
 */
String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
}

/**
 * endWidth
 * @param {} s
 * @return {Boolean}
 */
String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}