
$('#add-service').click(function(){
	
	
	console.log('ok');


    const index=+$('#widgets-counter').val();

	 const tmpl=$('#direction_services').data('prototype').replace(/__name__/g,index);

	 $('#direction_services').append(tmpl);

$('#widgets-counter').val(index+1)
console.log(index);
	  
	 handleDeleteButtons();

 }

 )

 function handleDeleteButtons(){
	 $('button[data-action="delete"]').click(function(){
		 const target=this.dataset.target;
		 console.log(target);

		 $(target).remove();

	 }

	 )
 }

 function updateCounter(){
     const count=+$('#direction_services div.form-group').length;
    
    $('#widgets-counter').val(count);


 }

handleDeleteButtons();
updateCounter();