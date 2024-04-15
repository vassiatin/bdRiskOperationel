//On vide les caisses
emptyCaissesReceptrice();

function emptyCaissesReceptrice()
{
    $('.caisseReceptrice').empty();
}


$('.caisse').change(chargerCaissesReceptrice);
$('.caisse').change(ajaxOperationDebitCredit.chargerBilletage);

$('.dateOperation').change(ajaxOperationDebitCredit.chargerBilletage);


function chargerCaissesReceptrice() {
    var codeCaisse = $('.caisse').val();

    var selectCaisseReceptrice = $('.caisseReceptrice');

    if (codeCaisse !== '')
    {
        $.ajax({
            type: "POST",
            url: Routing.generate('approvisionnementcaisse_charger_caisse_receptrice'),
            data: {
                codeCaisse: codeCaisse
            },
            beforeSend: function () {
                emptyCaissesReceptrice()
                selectCaisseReceptrice.append('<option>Veuillez patienter...</option>');
            },
            success: function (data)
            {
                var code = data.code;

                if (code === 200)
                {
                    var caisses = data.caisses;

                    emptyCaissesReceptrice()
                    selectCaisseReceptrice.append(caisses);
                    // console.log(selectCaisseReceptrice);
                }
                else
                {
                    alert("Erreur lors du chargement des caisses : " + data.message);
                    emptyCaissesReceptrice()
                }

            },
            error: function (error) {

                var message = "Errreur lors de la recuperation du billetage de la caisse \n " + error.message;
                alert(message);
                emptyCaissesReceptrice()
            }
        });
    }
}


$('#confirmer').click(confirmationApprovisionnement);

function confirmationApprovisionnement()
{
    var caisse = $('.caisse').val(); var caisseReceptrice = $('.caisseReceptrice').val();
    var montant = $('#montantTotalAfficher').html();
    var dateOperation = $('.dateOperation').val();

    var confirmation = "Confirmez vous l'approvisionnement de la <strong>" + caisse +  "</strong> vers la <strong>" + caisseReceptrice
    + "</strong> d'un montant de <strong>" + montant + "</strong> à la date du <strong>" + dateOperation + "</strong> ?";

    $('#confirmationModalBody').html(confirmation);

}