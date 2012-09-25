/**
 * @author GaoYoubo
 * @since 2012-09-25
 * formԪ�صĲ����ʹ���
 */
if(typeof(mlog) === "undefined"){var mlog = function(){}};

mlog.editor = {};

$.extend(mlog.editor,{
	/*
     * @description ��ʼ���༭��
     * @param conf �༭����ʼ������
     * @param conf.type �༭������kindeditor/tinymce
     * @param conf.model �༭����ʾģʽsimple/all
     * @param conf.id �༭����ȾԪ�� id
     * @param conf.fun �༭���״μ�����ɺ�ص�����
     * @param conf.language ����
     */
	init : function(conf){
		if(conf.type === undefined) conf.type = 'kindeditor';
		if(conf.model === undefined) conf.model = 'all';
		
		//KindEditor
		if(conf.type === 'kindeditor'){
			mlog.editor.KindEditor.init({
				model : conf.model,
				id : conf.id,
				fun : conf.fun,
				language : conf.language
			});
		}
		else if(conf.type === 'tinymce'){
			mlog.editor.TinyMCE.init({
				model : conf.model,
				id : conf.id,
				fun : conf.fun,
				language : conf.language
			});
		}
		else{}
	}
});


/**
 * KindEditor��չ
 * @type 
 */
mlog.editor.KindEditor = {};
$.extend(mlog.editor.KindEditor, {
	/*
     * @description ��ʼ��KindEditor�༭��
     * @param conf �༭����ʼ������
     * @param conf.model �༭����ʾģʽsimple/all
     * @param conf.id �༭����ȾԪ�� id
     * @param conf.fun �༭���״μ�����ɺ�ص�����
     * @param conf.language ����
     */
	init : function(conf){
		if(typeof(KindEditor) === "undefined") return;
		if(conf.language === undefined) conf.language = "zh_CN";
		if(conf.model === undefined) conf.model = 'all';
		
		if(conf.model === "all"){
			this[conf.id] = KindEditor.create('#' + conf.id, {
				langType : conf.language,
                items: ["formatblock", "fontname", "fontsize", "|", "bold", "italic", "underline", "strikethrough", "forecolor", "|",
                		"link", "unlink", "image", "media", "|", "pagebreak", "emoticons", "code", "/",
                		"undo", "redo", "|", "insertunorderedlist", "insertorderedlist", "indent", "outdent", "|", 
                		"justifyleft", "justifycenter", "justifyright", "justifyfull", "|", "plainpaste", "wordpaste", "|", 
                		"clearhtml", "source", "preview"
                	],
                afterCreate: function () {
                    // TODO: chrome bug
                    //window.onhashchange = admin.setCurByHash;
                    if (typeof(conf.fun) === "function") {
                        conf.fun();
                    }
                }
            });
		}
		else if(conf.model === "simple"){
			this[conf.id] = KindEditor.create('#' + conf.id, {
                langType : conf.language,
                resizeType: 0, 
                items: ["bold", "italic", "underline", "strikethrough", "|", "undo", "redo", "|", 
                "insertunorderedlist", "insertorderedlist", "|", "emoticons"
                ]
            });
		}
	}
});


mlog.editor.TinyMCE = {};
$.extend(mlog.editor.TinyMCE, {
	/*
     * @description ��ʼ��KindEditor�༭��
     * @param conf �༭����ʼ������
     * @param conf.model �༭����ʾģʽsimple/all
     * @param conf.id �༭����ȾԪ�� id
     * @param conf.fun �༭���״μ�����ɺ�ص�����
     * @param conf.language ����
     */
	init : function(conf){
		if(typeof(tinyMCE) === "undefined") return;
		if(conf.language === undefined) conf.language = "zh-cn";
		if(conf.model === undefined) conf.model = 'all';
		
		if(conf.model === "all"){
            tinyMCE.init({
                // General options
                language: conf.language,
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
		}
		else if(conf.model === "simple"){
			tinyMCE.init({
                // General options
                language: conf.language,
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
		}
	}
});