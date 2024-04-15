ajaxOperationDebitCredit.chargerBilletage();

$('.caisse').change(ajaxOperationDebitCredit.chargerBilletage);

$('.dateOperation').change(ajaxOperationDebitCredit.chargerBilletage);

$('#confirmer').click(confirmationAllegement);

function confirmationAllegement()
{
    var caisse = $('.caisse').val();  var banque = $('.banque option:selected').text();
    var montant = $('#montantTotalAfficher').html();
    var dateOperation = $('.dateOperation').val();

    var confirmation = "Confirmez vous l'allègement de la <strong>" + caisse +  "</strong> vers <strong>" + banque
        + "</strong> d'un montant de <strong>" + montant + "</strong> à la date du <strong>" + dateOperation + "</strong> ?";

    $('#confirmationModalBody').html(confirmation);

}