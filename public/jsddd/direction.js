$('#add-agent').click(function(){
	  

    const index=+$('#widgets-counter').val();

	 const tmpl=$('#direction_agents').data('prototype').replace(/__name__/g,index);

	 $('#direction_agents').append(tmpl);

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
     const count=+$('#direction_agents div.form-group').length;
    
    $('#widgets-counter').val(count);


 }

handleDeleteButtons();
updateCounter();