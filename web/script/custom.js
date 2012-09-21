/*
 * ǰ̨ҳ��ͨ��JavaScript�ļ�
 * @author Gao Youbo
 * @since 2012-07-28
 * 
 */
if(mlog === undefined){var mlog = function(){}};
$.extend(mlog, {
	
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
	 * @param setting.async (Ĭ��: true) Ĭ�������£����������Ϊ�첽����
	 * @param setting.success ���سɹ���Ļص�����
	 */
	loadJavaScript : function(setting){
		if(setting === undefined || setting.url === undefined)
			return;
		
		if(setting.async === undefined)
			setting.async = true;
		
		$.ajax({
            url: setting.url,
            dataType: "script",
            async : setting.async,
            cache: true,
            success: setting.success
        });
	},
	
	/**
	 * ��ȡ��ǰ�������λ��
	 */
	getCursorEndPosition: function (textarea) {
        textarea.focus();
        if (textarea.setSelectionRange) { // W3C
            return textarea.selectionEnd;
        } else if (document.selection) { // IE
            var i = 0,
            oS = document.selection.createRange(),
            oR = document.body.createTextRange(); 
            oR.moveToElementText(textarea);
            oS.getBookmark();
            for (i = 0; oR.compareEndPoints('StartToStart', oS) < 0 && oS.moveStart("character", -1) !== 0; i ++) {
                if (textarea.value.charAt(i) == '\n') {
                    i ++;
                }
            }
            return i;
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
    },
    
    /**
     * ��ȡcookie�б������������
     * @returns
     */
    getCookieCommentAuthor : function() {
    	return getCookie("comment_author_cookie");
    },

    /**
     * ��ȡcookie�б������������
     * @returns
     */
    getCookieCommentEmail : function() {
    	return getCookie("comment_email_cookie");
    },

    /**
     * ��ȡ�����б��������������ҳ��ַ
     * @returns
     */
    getCookieCommentUrl : function() {
    	return getCookie("comment_url_cookie");
    },
	
	/**
	 * Ϊ����ͼ��󶨵���¼�
	 */
	insertEmotions : function(name){
		var _this = this;
		
		if(name === undefined){
			name = "";
		}
		
		$("#emotions" + name + " span").click(function () {
	        var $comment = $("#comment" + name);
	        var endPosition = _this.getCursorEndPosition($comment[0]);
	        var key = "[" + this.className + "]",
	        textValue  = $comment[0].value;
	        textValue = textValue.substring(0, endPosition) + key + textValue.substring(endPosition, textValue.length);
	        $("#comment" + name).val(textValue);

	        if ($.browser.msie) {
	            endPosition -= textValue.split('\n').length - 1;
	            var oR = $comment[0].createTextRange();
	            oR.collapse(true);
	            oR.moveStart('character', endPosition + 6);
	            oR.select();
	        } else {
	            $comment[0].setSelectionRange(endPosition + 6, endPosition + 6);
	        }
	    });
	},
	
	/**
	 * �������еı����ʶ���滻�ɱ���ͼƬ
	 * @param selector ���滻���������
	 */
	replaceCommentsEm : function(selector){
		var _this = this;
		var $commentContents = $(selector);
        for (var i = 0; i < $commentContents.length; i++) {
            var str = $commentContents[i].innerHTML;
            $commentContents[i].innerHTML =  _this.replaceEmString(str);
        }
	},
	
	/**
	 * �滻����html�ı�
	 */
	replaceEmString : function(str){
		var _this = this;
		var commentSplited = str.split("[em");
        if (commentSplited.length === 1) {
            return str;
        }
        str = _this._processEm(commentSplited[0]);
        if ($.trim(commentSplited[0]) === "") {
            str = "";
        }
        for (var j = 1; j < commentSplited.length; j++) {
            var key = commentSplited[j].substr(0, 2);
            str += "<span class='em" + key + "'></span>" + this._processEm(commentSplited[j].slice(3));
        }
        return str + "<div class='clear'></div>";
	},
	
	_processEm: function (str) {
        if (str.replace(/\s/g, "") === "") {
            return "";
        }
        
        var strList = [], 
        resultStr = "",
        brList = ["<br>", "<br/>", "<BR>", "<BR/>"];
        for (var j = 0; j < brList.length; j++) {
            if (str.indexOf(brList[j]) > -1) {
                strList = str.split(brList[j]);
            }
        }
        
        if (strList.length === 0) {
            return "<span class='em-span'>" + str + "</span>";
        }
        
        for (var i = 0; i < strList.length; i++) {
            resultStr += "<span class='em-span'>" + strList[i] + "</span>";
            if (i !== strList.length - 1) {
                resultStr +="<br class='em-br'>";
            }
        }
        return resultStr;
    },
    
    /*
     * @description ��ʼ�� SyantaxHighlighter
     * @param {Array} languages ��Ҫ���ص����� 
     */
    initSyntaxHighlighter: function(languages){
    	for(var i = 0; i < languages.length; i++){
    		switch(languages[i]){
	    		case "groovy":
	                languages[i] =  'groovy				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushGroovy.js';
	                break;
	            case "java":
	                languages[i] =  'java				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushJava.js';
	                break;
	            case "php":
	                languages[i] =  'php				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushPhp.js';
	                break;
	            case "scala":
	                languages[i] =  'scala				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushScala.js';
	                break;
	            case "sql":
	                languages[i] =  'sql				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushSql.js';
	                break;
	            case "applescript":
	                languages[i] =  'applescript			' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushAppleScript.js';
	                break;
	            case "as3": 
	            case "actionscript3":
	                languages[i] =  'actionscript3 as3                  ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushAS3.js';
	                break;
	            case "bash":
	            case "shell":
	                languages[i] =  'bash shell                         ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushBash.js';
	                break;
	            case "coldfusion":
	            case "cf":
	                languages[i] =  'coldfusion cf			' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushColdFusion.js';
	                break;
	            case "c#":
	            case "c-sharp":
	            case "csharp":
	                languages[i] =  'c# c-sharp csharp                  ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushCSharp.js';
	                break;
	            case "cpp":
	            case "c":
	                languages[i] =  'cpp c				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushCpp.js';
	                break;	
	            case "css":
	                languages[i] =  'css				' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushCss.js';
	                break;
	            case "delphi":
	            case "pascal":
	                languages[i] =  'delphi pascal			' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushDelphi.js';
	                break;			
	            case "diff":
	            case "patch":
	            case "pas":
	                languages[i] =  'diff patch pas			' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushDiff.js';
	                break;			
	            case "erl":
	            case "erlang":
	                languages[i] =  'erl erlang                         ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushErlang.js';
	                break;			
	            case "js":
	            case "jscript":
	            case "javascript":
	                languages[i] =  'js jscript javascript              ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushJScript.js';
	                break;			
	            case "jfx":
	            case "javafx":
	                languages[i] =  'jfx javafx                 	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushJavaFX.js';
	                break;			
	            case "perl":
	            case "pl":
	                languages[i] =  'perl pl                    	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushPerl.js';
	                break;			
	            case "plain":
	            case "text":
	                languages[i] =  'text plain                 	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushPlain.js';
	                break;			
	            case "ps":
	            case "powershell":
	                languages[i] =  'ps powershell                      ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushPowerShell.js';
	                break;			
	            case "py":
	            case "python":
	                languages[i] =  'py python                          ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushPython.js';
	                break;			
	            case "rails":
	            case "ror":
	            case "ruby":
	            case "rb":
	                languages[i] =  'ruby rails ror rb          	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushRuby.js';
	                break;	
	            case "sass":
	            case "scss":
	                languages[i] =  'sass scss                  	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushSass.js';
	                break;
	            case "vb":
	            case "vbnet":
	                languages[i] =  'vb vbnet                   	' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushVb.js';
	                break;			
	            case "xml":
	            case "xhtml":
	            case "xslt": 
	            case "html":
	                languages[i] =  'xml xhtml xslt html                ' + mlog.variable.base + '/script/SyntaxHighlighter/scripts/shBrushXml.js';
	                break;	
	            default:
	                break;
    		}
    	}
    	// code high lighter
        SyntaxHighlighter.autoloader.apply(null, languages);
        SyntaxHighlighter.config.stripBrs = true;
        SyntaxHighlighter.all();
    },
    
    /*
     * @description ���� SyntaxHighlighter 
     * @param {String} SHTheme SyntaxHighLighter ��ʽ
     * @param {String} selector SyntaxHighLighter ����
     */
    loadSyntaxHighlighter : function(SHTheme, selector){
    	var cssName = SHTheme ? SHTheme : "shCoreEclipse";
    	var _this = this;
    	// load css
        _this.loadStyleSheet(mlog.variable.base + "/script/SyntaxHighlighter/styles/" + cssName + ".css");
        
        // load js
        /**
    	 * ����JavaScript�ļ�
    	 * @param setting ������
    	 * @param setting.url JavaScript��ַ
    	 * @param setting.async (Ĭ��: true) Ĭ�������£����������Ϊ�첽����
    	 * @param setting.success ���سɹ���Ļص�����
    	 */
        _this.loadJavaScript({
        	url : mlog.variable.base + "/script/SyntaxHighlighter/scripts/shCore.js",
        	success : function(){
        		// get brush settings
                var languages = [], isScrip = false;
                $(selector).each(function () {
                    var name = this.className.split(";")[0];
                    var language = name.substr(7, name.length - 1);
                    if (this.className.indexOf("html-script: true") > -1 && (language !== "xml" && language !== "xhtml" && language !== "xslt" && language != "html")) {
                        isScrip = true;
                    }
                    languages.push(language);
                });
                // when html-script is true, need shBrushXml.js
                if (isScrip) {
                	_this.loadJavaScript({
                		url : mlog.variable.base + "/script/SyntaxHighlighter/scripts/shBrushXml.js",
                		success: function() {
                            _this.initSyntaxHighlighter(languages);
                        }
                	});
                } else {
                    _this.initSyntaxHighlighter(languages);
                }
        	}
        });
    },
    
    /*
     * @description �����﷨����
     * @param {Obj} setting �﷨�������ò���
     * @param {Obj} setting.SHTheme �﷨���� SyntaxHighLighter ��ʽ
     * @param {Obj} setting.contentSelector ������������
     */
    parseLanguage: function (setting) {
        var isPrettify = false;
        var isSH = false;
        
        var selector = setting ? (setting.contentSelector ? setting.contentSelector : ".content") : ".content";
        selector = selector + " pre";
        
        $(selector).each(function () {
            if (this.className.indexOf("brush") > -1) {
                isSH = true;
            } 
            
            if (this.className.indexOf("prettyprint") > -1) {
                isPrettify = true;
            }
        });
        
        if (isSH) {
        	var SHTheme = setting ? (setting.SHTheme ? setting.SHTheme : undefined) : undefined;
            this.loadSyntaxHighlighter(SHTheme, selector);
        }
        
        if (isPrettify) {
            // load css
            this.loadStyleSheet(mlog.variable.base + "/script/prettify/prettify.css");
            // load js
            this.loadJavaScript({
            	url : mlog.variable.base + "/script/prettify/prettify.js"
            })
            // load function
            $(document).ready(function () {
                prettyPrint();
            });
        }
    },
    
    /**
     * ��ʼ���༭�� 
     */
    initEditor : function(_id){
    	var _this = this;
    	_this.loadJavaScript({url: mlog.variable.base + "/script/common.js"});
    	mspring.editor.init({
			id: _id,
			type: 'simple'
		});
    },
    
    /**
     * �ظ�
     */
    reply : function(){
    	
    },
	
	/**
	 * @description ����/�Զ���ҳ�����
     * @param {Object} setting �����趨
     * @param {Object} setting.language �����������
     * @param {Object} setting.contentSelector ������������,Ĭ��".content"
	 */
	load : function(setting){
		var _this = this;
		// language
		_this.parseLanguage(setting);
	},
	
    /**
     * �Զ�����
     */
    autoLoad : function(){
    	var _this = this;
    	
    	//Ϊ�������󶨵�� �¼�
		_this.insertEmotions();
    }
});

/**
 * �Զ�����
 */
$(document).ready(function(){
	mlog.autoLoad();
});
