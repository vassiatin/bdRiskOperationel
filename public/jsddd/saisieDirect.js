$(function() {
        $('#getInfo').on('click',function () {
            var nomCient = $('#nomClient').text();
            var numClient = $('#numClient').text();
            $('#setNum').val(numClient);
            $('#setName').val(nomCient);
        })

    /*$('.getSymb').on('click',function () {
        var symbol = $('#symbole').text();
        var descrip = $('#description').text();
        $('#setSymbole').val(symbol);
        $('#setTitre').val(descrip);



    })*/


    $('#changeTypeOrdre').on('change',function () {
            var valeur = $('#changeTypeOrdre').val();

            if( valeur ==='Limité' ){

                $('#prix').style('readonly',false);
            }else{
                $('#prix').prop('readonly',true);
            }

        })

    $("#prix").keyup(function(){

        var montant = Number($(this).val());
        var priUnit = Number($('#prixUnit').val());
        var total = (montant * priUnit);
        $("#montant").val(total);
    });

    $('#message').fadeIn().delay(2000).fadeOut();

    });

function selectCompte(id){

    var symbole = $("#symbole"+id).text().trim();
    var description = $("#description"+id).text().trim();

    $("#setSymbole").val(symbole) ;
    $("#setTitre").val(description) ;
    ajaxs.RecuperationSymbole();

}



/*
var ajaxs = {

    RecuperationTitre: function () {
        var typeTitre = $('#typeTitre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererTitre'),
            data: {
                typeTitre: typeTitre
            },
            success: function (data) {
                $('#tabTitre').html(data);
            }
        });
    },


    RecuperationSymbole: function () {
        var typeTitre = $('#typeTitre').val();
        var symbole = $('#setSymbole').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererSym'),
            data: {
                symbole: symbole,
                typeTitre: typeTitre
            },
            success: function (data) {
                $('#dernierCours').val(data.coursVeille);
                $('#datederCours').val(data.datecours);
                $('#prixUnit').val(data.coursVeille);
                $('#solde').val(50000);
                $('#titreC').val(data.idTitreC);

                var DerCours =data.coursVeille;
                var Dercourmajore = (data.coursVeille*0.075);

                var coursSup = DerCours + Dercourmajore;

                var coursInf = DerCours - Dercourmajore;

                $('#coursSup').val(coursSup);
                $('#coursInf').val(coursInf);
            }
        });
    }

}*/
