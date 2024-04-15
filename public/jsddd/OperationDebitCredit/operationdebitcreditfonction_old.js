// ajaxOperationDebitCredit.chargerCodeSchema($('.typeProduit').val());
//

/*
Choix du type de produit
*/

$(document).ready(function () {

    // function testNotyFy() {
    //
    //     var notify;
    //     notify = new notificationManager({container: $('#notificationsContainer'), position: "topright"});
    //
    //
    //     notify.addNotification(
    //         {
    //             message: "<b>Erreurs</b><br/>Le formulaire n'a pas été bien rempli",
    //             animate: true,
    //             autoRemove: true,
    //             backgroundColor: "#FFF",
    //             progressColor: "#333",
    //         });
    // }


});

$('.typeProduit').change(function () {
    var typeProduit = $(this).val();
    console.log(typeProduit);
    // $('#montant_dispo').val('');
    // $('#montantGele').val('');
    // $('#operation_debit_credit_numCompte ').val('');
    // $('#libelle ').val('');
    // $('#caisse').val('vide');
    // $('#btn_billetage').hide();
    $('#div_valeur').removeAttr('class').attr('class', 'col-md-8');
    $('#hidden_input_montant').val('');
    $('#ogi_microfinancebundle_t_operationdebitcredit_valeur').val('');
    ajaxOperationDebitCredit.chargerCodeSchema(typeProduit);
});
/*
Choix du type de produit
*/
$('#contrat').change(function () {

    ajaxOperationDebitCredit.chargerSoldeCompte();
});


/*
Choix du code schéma
 */
$('#codeShema').change(function () {
    var codeSchema = $('#codeShema').val();

    //Espece
    if (codeSchema.search('ESP') !== -1 || codeSchema.search('SCRPT') !== -1 || codeSchema === "D_TPE_CAI_CAUTIO") {
        // console.log('espece');
        // alert(('bien recu'));
        $('#div_billetage').show();

        $('#operation_debit_credit_valeur').show();
        $('#hidden_input_montant').css('display', 'none');

        $('#div_valeur').removeAttr('class').attr('class', 'col-md-5');

        $('.concerneBanque').attr('disabled', 'disabled');

        $('.nombre').attr('required', 'required');
    }

    //Cheque
    else {

        $('#div_billetage').hide();

        $('#operation_debit_credit_valeur').hide();
        $('#hidden_input_montant').css('display', 'block');

        $('#div_valeur').removeAttr('class').attr('class', 'col-md-8');
        $('.concerneBanque').removeAttr('disabled');

        // ajaxOperationDebitCredit.chargerBilletageCaisse();
        $('.nombre').removeAttr('required');

    }
});


/*
Click sur le bouton billetage
 */
// $('#btn_billetage').click(function () {
//
// });

/*$('#caisse').change(function () {
    var codeSchema = $('#codeShema').val();
    // ajaxOperationDebitCredit.chargerBilletageCaisse();
    if (codeSchema.search('ESP') !== -1 || codeSchema.search('espèce') !== -1 || codeSchema.search('espece') !== -1) {
        $('#div_billetage').fadeIn(1000);
    } else {
        $('#div_billetage').fadeOut(1000);

    }

});*/


$('#btn_confrimation').on('click', function () {




    // setTimeout( app._loading.show($("#op_debit_credit_form_container"), {
    //     spinner: true,
    //     text: 'liaison en cours...',
    //     dark: true
    // }),5000);


    $('span.removableSpan').remove();
    // $(this).removeAttr('data-target').removeAttr('data-toggle');
    let codeSchema = $('#codeShema').val();
    codeSchema = $.trim(codeSchema);
    let montant = $('#hidden_input_montant').val();
    let contrat = $('#contrat').val();
    let caisse = $('#caisse').val();
    let compte = $('#hidden_input_for_id_compte').val();
    let nomDeposant = $('#operation_debit_credit_nomDeposant').val();
    let adrDeposant = $('#operation_debit_credit_adresseDeposant').val();
    let numBordereau = $('#operation_debit_credit_numeroBordereau').val();
    let observation = $('#operation_debit_credit_observations').val();
    var montantDispo = ($('#hidden_montant_dispo').val());
    var montantLettre = ($('#operation_debit_credit_detailsOperationDebitCredit_montantLettre').val());

    var error = 0;



    if (codeSchema === null) {
        $('#codeShema').after(`<span  class="text-danger"><b>Vueillez renseigner le schema utiliser</b></span>`);
        error++;

    }


    if (montant === '0') {
        $('#hidden_input_montant').after(`<span  class="removableSpan text-danger">vous ne pouvez passer une operation de 0 FCFA</span>`);
        error++;
    }

    if (contrat === '') {
        $('#contrat').after(`<span  class="removableSpan text-danger">Un contrat doit être selectionné </span>`);
        error++;
    }
    if (compte === '') {
        $('#contrat').after(`<span  class="removableSpan text-danger">Le contrat ne peut être vide</span>`);
        error++;
    }

    console.log(caisse);
    if (caisse === '') {

        $('#caisse').after(`<span  class=" removableSpan text-danger">la caisse ne peut etre vide  </span>`);
        error++;
    }
    if (montantLettre === '') {

        $('#operation_debit_credit_detailsOperationDebitCredit_montantLettre').after(`<span  class="removableSpan text-danger">Ce champ ne peut etre vide</span>`);
        error++;
    }
    if (numBordereau === '') {

        $('#operation_debit_credit_numeroBordereau').after(`<span  class="removableSpan text-danger">Ce champ ne peut être vide </span>`);
        error++;
    }
    if (observation === '') {

        $('#operation_debit_credit_detailsOperation_observations').after(`<span  class="removableSpan text-danger">Une caisse doit etre selectionnée pour continuer l'operation</span>`);
        error++;
    }


    //on verifie si cest une opération espèce
    if (codeSchema != null || contrat != null || compte !== '') {

        var libelleSchema = $("#codeShema option:selected").html();
        libelleSchema = libelleSchema.toLowerCase();


        if (libelleSchema.search("ret") !== -1) {

            let montantRestant = montantDispo - montant;

            if (montantRestant < 0) {
                alert('ifbnjfkf');
                $('#div_valeur .removableSpan').remove();
                $('#hidden_input_montant').after(`<span  class="removableSpan text-danger">Le solde disponible ne couvre pas les frais de l'operation</span>`);

                return false;
            }

        }

    }

    if (error > 0) {
        var notify;
        notify = new notificationManager({container: $('#notificationsContainer'), position: "topright"});


        notify.addNotification(
            {
                message: "<b>Erreurs</b><br/>Le formulaire n'a pas été bien rempli",
                animate: true,
                autoRemove: true,
                backgroundColor: "red",
                progressColor: "#333",
                position:"topright"
            });
    }else{
        $('#modalConfirmation').modal('show');

    }

    return false;

});

