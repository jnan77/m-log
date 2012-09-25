/**
 * @author GaoYoubo
 * @since 2012-09-25
 * mlog.utils
 */
if(typeof(mlog) === "undefined"){var mlog = function(){}};
mlog.utils = {};
$.extend(mlog.utils, {
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
	},
	
	/**
	 * ����JavaScript�ļ�
	 * @param setting ������
	 * @param setting.url JavaScript��ַ
	 * @param setting.async (Ĭ��: false) Ĭ�������£����������Ϊͬ������
	 * @param setting.success ���سɹ���Ļص�����
	 */
	loadJavaScript : function(setting){
		if(setting === undefined || setting.url === undefined)
			return;
		
		//Ĭ��ͬ������JS�ļ�
		if(setting.async === undefined) setting.async = false;
		
		$.ajax({
            url: setting.url,
            dataType: "script",
            async : setting.async,
            cache: true,
            success: setting.success
        });
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