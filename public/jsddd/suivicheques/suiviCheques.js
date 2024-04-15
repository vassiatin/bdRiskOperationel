/*
Click des boutons de confirmation
 */
function confirmation()
{

    var idSuiviCheque = $(this).data('idcheque');
    $('#cheque').val(idSuiviCheque);

    var path = $(this).data('href');
    $('#formSuiviCheques').attr('action', path);

    var phrase = "Confirmez-vous ";
    var numCheque = $(this).data('numcheque');
    var banque = $(this).data('banque');

    var action = $(this).data('actionn');
    // alert(action);
    //Remise a lencaissement
    if (action === "encaissement")
    {
        phrase += "<strong>la remise en l'encaissement </strong>";
        $('#date').attr('required', 'required').show();
    }

    //Annulation remise a l'encaissement
    else if (action === "annuler_encaissement")
    {
        phrase += "<strong>l'annulation de la remise à l'encaissement </strong>";
        $('#date').removeAttr('required').hide();
    }

    //Reception avis cheque encaissé
    else if (action === "encaisser")
    {
        phrase += "<strong>la réception avis de crédit sur chèque encaissé </strong>";
        $('#date').attr('required', 'required').show();
    }

    //Annulation cheque encaissé
    else if (action === "annuler_encaisser")
    {
        phrase += "<strong>l'annulation de la réception avis de crédit sur chèque encaissé </strong>";
        $('#date').removeAttr('required').hide();
    }

    //Annulation de depot de cheque
    else if (action === "annuler_depot")
    {
        phrase += "<strong>l'annulation du dépôt </strong>";
        $('#date').removeAttr('required').hide();
    }



    phrase += " du chèque <strong>" + numCheque + " " + banque + "</strong> ?";

    console.log(phrase);
    $('#phraseConfirmationn').html(phrase);
}
$('body').on('click', '.btnConfirm', confirmation);


/*
Affichage des chèques encaissés
 */
$('#chargerChequesEncaisser').click(function ()
{
    var periode = $("#periode").val();

    if (periode !== "")
    {
        $('#loader').show();
        $('#divTable').empty();

        $.ajax({
            type: "POST",
            url: Routing.generate('suivicheques_rechercher_cheques_encaisser_periode'),
            data: {
                periode: periode
            },
            success: function (data)
            {
                $('#loader').hide();

                var code = data.code;

                if (code === 200)
                {
                    $('#divTable').html(data.vue);
                }
                else
                {
                    alert(data.message);
                }

            },
            error: function () {
                $('#loader').hide();
                alert("Une erreur inattendue est survenue");
            }
        });
    }
});

/*
Affichage détails chèques encaissés
 */
function detailsChequeEncaisser()
{
    var numCheque = $(this).data('numcheque');
    var numCompte = $(this).data('numcompte');
    var intitule = $(this).data('intitule');
    var created = $(this).data('created');
    var dateEncaissement = $(this).data('dateencaissement');
    var dateEncaisser = $(this).data('dateencaisser');
    var banque = $(this).data('banque');

    $('#modalDetailSuiviCheque #detailsNumCheque').html(numCheque);
    $('#modalDetailSuiviCheque #detailsNumCompte').html(numCompte);
    $('#modalDetailSuiviCheque #detailsIntitule').html(intitule);
    $('#modalDetailSuiviCheque #detailsDateDepot').html(created);
    $('#modalDetailSuiviCheque #detailsDateEncaissement').html(dateEncaissement);
    $('#modalDetailSuiviCheque #detailsDateReception').html(dateEncaisser);
    $('#modalDetailSuiviCheque #detailsBanque').html(banque);
}
$('body').on('click', '#detailsChequeEncaisser', detailsChequeEncaisser);