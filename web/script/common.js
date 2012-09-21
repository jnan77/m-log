/**
 * @author Gao Youbo
 */
var mspring = {};

/**
 * ѡ��ѡ������checkbox
 */
mspring.checkAll = function(_this, cbName) {
	var array = document.getElementsByName(cbName);
	for ( var i = 0; i < array.length; i++) {
		array[i].checked = _this.checked;
	}
}

/**
 * ��ֻѡ��ǰcheckboxʱ�� ���ص�ǰcheckbox��ֵ
 */
mspring.checkThis = function(_this, cbName) {
	var array = document.getElementsByName(cbName);
	var count = 0;
	for ( var i = 0; i < array.length; i++) {
		if (array[i].checked) {
			count++;
		}
		if (count >= 2) {
			return;
		}
	}
	return _this.value;
}

/**
 * �ύ��
 */
mspring.submitForm = function(formId, action) {
	var form = document.getElementById(formId);
	if (action) {
		form.action = action;
	}
	form.submit();
}

/**
 * ȷ���ύ��
 */
mspring.confirmSubmit = function(formId, action, msg) {
	var default_msg = 'ȷ��ɾ��ѡ������';
	if (msg) {
		default_msg = msg;
	}
	if (confirm(default_msg)) {
		mspring.submitForm(formId, action);
	}
}

mspring.validateForm = function(formId, callback) {
	var form = document.getElementById(formId);
	if (form) {
		$.metadata.setType("attr", "validate");
		/**
		 * �Զ���check����,�÷���������ajax���
		 * @param value ��ǰ��֤��Ԫ�ص�ֵ
		 * @param element ��ǰ��֤��Ԫ��
		 * @param param ��ǰ��֤���ݵĲ���
		 */
		$.validator.addMethod("ajaxCheck", function(value, element, param) {
			try{
				if (param.length == 0) {
					return true;
				}
				var url = param[0];
				var param_name = param[1];
				if (param_name) {
					url += "?" + param_name + "=" + value;
				}
				var text = $.ajax({
					url : url,
					async : false
				}).responseText;
				
				var validationResult = eval('('+text+')');
				$.validator.messages["ajaxCheck"] = validationResult.message != undefined ? validationResult.message : $.validator.messages["ajaxCheck"];
				var result = false;
				if(validationResult.result === true){
					result = true;
				}
				return result;
			}
			catch(e){
				mspring.tip("<font color='red'>Validator error:" + e.message + "</font>");
			}
		});
		$(form).validate({
			success : callback,
			/* ��д������ʾ��Ϣ����,��alert��ʽ����������Ϣ */
			showErrors : function(errorMap, errorList) {

				/* ����������ʽ */
				for ( var i = 0; this.errorList[i]; i++) {
					var error = this.errorList[i];
					this.settings.highlight && this.settings.highlight.call( this, error.element, this.settings.errorClass, this.settings.validClass);
					// this.showLabel(error.element,error.message);
				}
				if (this.errorList.length) {
					this.toShow = this.toShow.add(this.containers);
				}
				if (this.settings.success) {
					for ( var i = 0; this.successList[i]; i++) {
						this.showLabel(this.successList[i]);
					}
				}
				if (this.settings.unhighlight) {
					for ( var i = 0, elements = this.validElements(); elements[i]; i++) {
						this.settings.unhighlight.call(this,
								elements[i],
								this.settings.errorClass,
								this.settings.validClass);
					}
				}
				this.toHide = this.toHide.not(this.toShow);
				this.hideErrors();
				this.addWrapper(this.toShow).show();
				/* end ����������ʽ */

				var msg = "";
				$.each(errorList, function(i, v) {
					// v.element.style =
					msg += (v.message + "<br />");
				});
				if (msg) {
					mspring.tip("<font color='red'>" + msg + "</font>");
				}
			},
			// ʧȥ����ʱ����֤
			onfocusout : false,
			// ����ʱ����֤
			onkeyup : false,
			// ���ʱ����֤
			onclick : false
		});
	}
}

/**
 * tip��Ϣ
 */
mspring.tip = function(msg){
	$.dialog({
		// title: "��֤��Ϣ",
		title : false,
		content : msg,
		time : 2,
		min : false,
		max : false,
		icon : 'error.gif',
		// cancel: function(){},
		close : function() {
			var duration = 400, /* ����ʱ�� */
			api = this, opt = api.config, wrap = api.DOM.wrap, top = $(window).scrollTop() - wrap[0].offsetHeight;
			wrap.animate(
				{
					top : top + 'px',
					opacity : 0
				}, 
				duration, function() {
					opt.close = $.noop;
					api.close();
				}
			);
			return false;
		}
	});
}

mspring.editor = {
	/*
     * @description ��ʼ���༭��
     * @param conf �༭����ʼ������
     * @param conf.type �༭������
     * @param conf.id �༭����ȾԪ�� id
     * @param conf.fun �༭���״μ�����ɺ�ص�����
     */
    init: function (conf) {
    	var language = "zh";
        if (language === "zh") {
            language = "zh-cn";
        }
        
        if (conf.type && conf.type === "simple") {
            try {
                tinyMCE.init({
                    // General options
                    language: language,
                    mode : "exact",
                    elements : conf.id,
                    theme : "advanced",

                    // Theme options
                    theme_advanced_buttons1 : "bold,italic,underline,strikethrough,|,undo,redo,|,bullist,numlist",
                    theme_advanced_buttons2 : "",
                    theme_advanced_buttons3 : "",
                    theme_advanced_toolbar_location : "top",
                    theme_advanced_toolbar_align : "left",
                
                    valid_children : "+body[style]"
                });
            } catch (e) {
            	alert("TinyMCE load fail");
            }
        } else {
            try {
            	tinyMCE.init({
                    // General options
                    language: 'zh-cn',
                    mode : "exact",
                    elements : conf.id,
                    theme : "advanced",
                    plugins : "autosave,style,advhr,advimage,advlink,preview,inlinepopups,media,paste,fullscreen,syntaxhl",

                    // Theme options
                    theme_advanced_buttons1 : "forecolor,backcolor,|,bold,italic,underline,strikethrough,|,justifyleft,justifycenter,justifyright,justifyfull,formatselect,fontselect,fontsizeselect",
                    theme_advanced_buttons2 : "bullist,numlist,outdent,indent,|,undo,redo,|,sub,sup,blockquote,charmap,image,iespell,media,|,advhr,link,unlink,anchor,cleanup,|,pastetext,pasteword,code,preview,fullscreen,syntaxhl",
                    theme_advanced_buttons3 : "",
                    theme_advanced_toolbar_location : "top",
                    theme_advanced_toolbar_align : "left",
                    theme_advanced_resizing : true,
                    theme_advanced_statusbar_location : "bottom",

                    extended_valid_elements: "pre[name|class],iframe[src|width|height|name|align]",

                    valid_children : "+body[style]",
                    relative_urls: false,
                    remove_script_host: false,
                    oninit : function () {
                    	//window.onhashchange = admin.setCurByHash;
                        if (typeof(conf.fun) === "function") {
                            conf.fun();
                        }
                    },
                    //����jquery-validation���쳣����ÿ��tinyMCE���ݸı��ǣ���ִ��triggerSave()����
                    onchange_callback : function(){
                    	tinyMCE.triggerSave();
                    }
                });
            } catch (e) {
            	alert("TinyMCE load fail");
            }
        }
    },
    
    /*
     * @description ��ȡ�༭��ֵ
     * @param {string} id �༭��id
     * @returns {string} �༭��ֵ
     */
    getContent: function (id) {
        var content = "";
        try {
            content = tinyMCE.get(id).getContent();
        } catch (e) {
            content = $("#" + id).val();
        }
        return content;
    },
    
    /*
     * @description ���ñ༭��ֵ
     * @param {string} id �༭�� id
     * @param {string} content ���ñ༭��ֵ
     */
    setContent: function (id, content) {
        try {
            if (tinyMCE.get(id)) {
                tinyMCE.get(id).setContent(content);
            } else {
                $("#" + id).val(content);
            }
        } catch (e) {
            $("#" + id).val(content);
        }
    }
};



/*****************************/
String.prototype.endWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substring(this.length - s.length) == s)
		return true;
	else
		return false;
	return true;
}

String.prototype.startWith = function(s) {
	if (s == null || s == "" || this.length == 0 || s.length > this.length)
		return false;
	if (this.substr(0, s.length) == s)
		return true;
	else
		return false;
	return true;
}