$('.majuscules').keyup(function ()
{
    var val = $(this).val();
    val = val.toUpperCase()
    $(this).val(val);
});



$('.btnAction').click(function ()
{
    var action = $(this).data('action');

    var codeTypeDemande = $(this).data('codetypedemande');

    // var detailsHtml = '<table class="table table-bordered table-striped" >';
    var detailsHtml = '<div class="col-md-12" >';
    var labelPieceARattacher = '';

    // alert(codeTypeDemande)
    if (codeTypeDemande === 'DEPOT')
    {
        var montant = $(this).data('montant');
        var libelleTypeDepot = $(this).data('typedepot');
        var fichier = $(this).data('fichier');

        // detailsHtml += '' +
        //     '<tr>'
        //     + '<td>' + 'Montant à déposer' + '</td>'
        //     + '<td>' + montant + '</td>'
        //     + '</tr>'
        // ;

        detailsHtml += '' +
            '<div class="col-md-6" style="margin-bottom: 20px;">'
            + '<div class="col-md-6"><strong>' + 'Montant à déposer:' + '</strong></div>'
            + '<div class="col-md-6">' + montant + '</div>'
            + '</div>'
        ;


        // detailsHtml += '' +
        //     '<tr>'
        //     + '<td>' + 'Type de dépôt' + '</td>'
        //     + '<td>' + libelleTypeDepot + '</td>'
        //     + '</tr>'
        // ;
        detailsHtml += '' +
            '<div class="col-md-6" style="margin-bottom: 20px;">'
            + '<div class="col-md-6"><strong>' + 'Type de dpôt:' + '</strong></div>'
            + '<div class="col-md-6">' + libelleTypeDepot + '</div>'
            + '</div>'
        ;

        // detailsHtml += '' +
        //     '<tr>'
        //     + '<td>' + 'Fichier Joint' + '</td>'
        //     + '<td>' + '<a target="_blank" href="' + fichier + '">' + 'Fichier Joint </a>' + '</td>'
        //     + '</tr>'
        // ;
        detailsHtml += '' +
            '<div class="col-md-6" style="margin-bottom: 20px;">'
            + '<div class="col-md-6"><strong>' + 'Fichier joint:' + '</strong></div>'
            + '<div class="col-md-6">' + '<a target="_blank" href="' + fichier + '">' + 'Fichier Joint' + '</a></strong></div>'
            + '</div>'
        ;

        labelPieceARattacher = 'Pièce : Avis de crédit/débit'
    }
    else if (codeTypeDemande === 'RETRAIT')
    {
        var montant = $(this).data('montant');
        var modePaiement = $(this).data('modepaiement');

        // detailsHtml += '' +
        //     '<tr>'
        //     + '<td>' + 'Montant à retirer' + '</td>'
        //     + '<td>' + montant + '</td>'
        //
        //     + '</tr>'
        // ;
        detailsHtml += '' +
            '<div class="col-md-6" style="margin-bottom: 20px;">'
            + '<div class="col-md-6"><strong>' + 'Montant à retirer:' + '</strong></div>'
            + '<div class="col-md-6">' + montant + '</div>'
            + '</div>'
        ;

        // detailsHtml += '' +
        //     '<tr>'
        //     + '<td>' + 'Mode de paiement' + '</td>'
        //     + '<td>' + modePaiement + '</td>'
        //     + '</tr>'
        // ;
        detailsHtml += '' +
            '<div class="col-md-6" style="margin-bottom: 20px;">'
            + '<div class="col-md-6"><strong>' + 'Mode de paiement:' + '</strong></div>'
            + '<div class="col-md-6">' + modePaiement + '</div>'
            + '</div>'
        ;

        labelPieceARattacher = 'Pièce : Avis de crédit/débit, Swift ou chèque'


    }
    else if (codeTypeDemande === 'ANNUL-RETRAIT')
    {
        labelPieceARattacher = 'Pièce : Fiche de demande avec la mention ANNULER et vissée par les deux acteurs de validation'

    }
    else if (codeTypeDemande === 'FERMCOMPTE')
    {
        labelPieceARattacher = 'Pièce : Document de résiliation du contrat du client'

    }

    // detailsHtml += '' +
    //     '<div class="col-md-6"  style="margin-bottom: 20px;">'
    //     + '<div class="col-md-6"><strong>' + 'Solde espèces:' + '</strong></div>'
    //     + '<div class="col-md-6" id="soldeEspeces" style="color: green">' + '0' + '</div>'
    //     + '</div>'
    // ;

    // detailsHtml += '' +
    //     '<div class="col-md-6" style="margin-bottom: 20px;">'
    //     + '<div class="col-md-6"><strong>' + 'Valo. titres:' + '</strong></div>'
    //     + '<div class="col-md-6" id="valorisationTitres" style="color: green">' + '0' + '</div>'
    //     + '</div>'
    // ;


    detailsHtml += '</div>';
    // console.log(detailsHtml);

    $('#divDetails').html(detailsHtml);


    // //Liens show compte client et consultation portefeuille
    // var lienShowCompteClient = $(this).data('lienshowclient');
    // $('#lienShowClient').attr('href', lienShowCompteClient);
    //
    // var liensPortefeuilleClient = $(this).data('lienportefeuilleclient');
    // $('#lienPortefeuilleClient').attr('href', liensPortefeuilleClient);

    var codeDemande = $(this).data('codedemande');
    $('input[name=codeDemande]').val(codeDemande);

    if (action === 'enregistrerDemande')
    {
        $('#divMarqueTraiterDemande').hide('slow');
        $('#divTraiterDemandeUser').hide('slow');

        $('#divEnregistrerDemande').show('slow');
    }
    else if (action === 'marquerTraiterDemande')
    {
        $('#labelPieceARattacher').html(labelPieceARattacher);

        $('#divEnregistrerDemande').hide('slow');
        $('#divTraiterDemandeUser').hide('slow');

        $('#divMarqueTraiterDemande').show('slow');
    }
    else if (action === 'valider' || action === 'annuler')
    {
        $('#action').val(action);

        $('#divMarqueTraiterDemande').hide('slow');
        $('#divEnregistrerDemande').hide('slow');

        $('#divTraiterDemandeUser').show('slow');
    }
    else if (action === 'detailsDemandeTraiter' || action === 'detailsDemandeAnnuler')
    {
        $('#divMarqueTraiterDemande').hide('slow');
        $('#divEnregistrerDemande').hide('slow');
        $('#divTraiterDemandeUser').hide('slow');

        $('#infosClient').hide();
    }


    var numCompte = $(this).data('numcompte');
    $('#numCompte').val(numCompte);

    /*
    On récupère les informations du client //solde especes, valorisation de ses titres //signature compte
     */
    if (action !== 'detailsDemandeTraiter' && action !== 'detailsDemandeAnnuler')
    {
        actualiserInfosClient();
    }


    $('.tableHistoriqueDemande').hide();
    $('#tableHistoriqueDemande'+codeDemande).show();

    //alert('ok')



});

function actualiserInfosClient()
{
    var numCompte = $('#numCompte').val();
    $.ajax({
        type: "POST",
        url: Routing.generate('demande_get_infos_client'),
        data: {
            numCompte: numCompte,
        },
        beforeSend: function ()
        {
            $('#myLoader').show('slow');
            $('.myLoaderInfoClient').show('slow');
            $('#btnActualiserInfosClient').hide('slow');

            $('body #soldeEspeces').html(0);
            $('body #valorisationTitres').html(0);
            $('body #signature').attr('src', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQM4MWyU9VYXYNDPMiRPKKIs-J2QlCfkNbMXAhKQHhR0lBv7ZXe&s');
            $('body .inputSoldeEspeces').val(0);

            $('.submit').attr('disabled', 'disabled');

        },
        success: function (data)
        {
            $('.submit').removeAttr('disabled');



            $('body #soldeEspeces').html(data.soldeEspeces);
            $('body #valorisationTitres').html(data.valorisationTitres);
            $('body #signature').attr('src', data.signaturee);
            $('body .inputSoldeEspeces').val(data.soldeEspeces);

            if (data.code != 200)
            {
                alert(data.messagee);

                $('#myLoader').hide('slow');
                $('.myLoaderInfoClient').hide('slow');
                $('#btnActualiserInfosClient').show('slow');
            }
            else
            {
                $('#myLoader').hide('slow');
                $('.myLoaderInfoClient').hide('slow');
                $('#btnActualiserInfosClient').hide('slow');
            }

            // var image =

            // setTimeout(function () {
            //     $('#soldeEspeces').show(2000);
            //     $('#valorisationTitres').show(2000);
            //     $('#signature').show(2000);
            // }, 3000);

            // setTimeout(function () {
            //     $('#soldeEspeces').show(2000);
            //     $('#valorisationTitres').show(2000);
            //     $('#signature').show(2000);
            // }, 4000);

        },
        error: function (error)
        {
            //$('.myLoader').toggleClass('fa-spin').show('slow');
            $('.submit').removeAttr('disabled');

            $('#myLoader').hide('slow');
            $('.myLoaderInfoClient').hide('slow');
            $('#btnActualiserInfosClient').show('slow');

            alert("Une erreur est intrvenue lors de la recupertion des inforamtions du client : " + error.message);
        }
    });
}

$('#btnActualiserInfosClient').click(actualiserInfosClient);