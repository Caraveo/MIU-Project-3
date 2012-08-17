var parseAddMemberForm = function(data){
	console.log(data);
};

$(document).ready(function(){
	var addForm = $('#formAddMember'),
		addFormErrorLink = $('#errorXXX');
	
	addForm.validate({
		invalidHandler: function(form, validator){
			addFormErrorLink.click();
			var html = '';
			for(var key in validator.submitted){
				var label = $('label[for^="'+ key +'"]').not('[generated]');
				var legend = label.closest('fieldset').find('ui.controlgroup-label');
				var fieldName = legend.length ? legend.text() : label.text();
				html += '<li>' +fieldName +'</li>';
			
			}
			$("#formErrors ul").html(html);
			
		},
		submitHandler: function(){
			var data = addForm.serializeArray();
			parseAddMemberForm(data);
		}
	});
});