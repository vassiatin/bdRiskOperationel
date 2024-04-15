$('#caisse').change(chargerListeApproReceptionneCaisse);

function chargerListeApproReceptionneCaisse(e)
{
    e.preventDefault();

    var codeCaisse = $('#caisse').val();

    if (codeCaisse !== '')
    {
        $.ajax({
            type: "POST",
            url: Routing.generate('approvisionnementcaisse_charger_liste_reception_appro_caisse'),
            data: {
                codeCaisse: codeCaisse
            },
            beforeSend: function () {
                $("#loaderReceptionApprovisionnement").show();
            },
            success: function (data)
            {
                var code = data.code;

                if (code === 200)
                {
                    var tableauReception = data.tableauReception;

                    $('#tableauReceptionApprovisionnement').html(tableauReception);
                    $('#loaderReceptionApprovisionnement').hide();

                }
                else
                {
                    alert("Erreur lors de la recuperation des receptions : " + data.message);
                    $('#loaderReceptionApprovisionnement').hide();
                }

            },
            error: function (error) {

                var message = "Errreur lors de la recuperation des receptions \n " + error.message;
                alert(message);
                $('#loaderReceptionApprovisionnement').hide();
            }
        });
    }


}

$('body').on('click', '.btnBilletApprovisionnement', chargerBilletageApprovisionnement);

function chargerBilletageApprovisionnement(e)
{
    e.preventDefault();

    var btnBillets = $(this);

    var idApprovisionnement = btnBillets.data('approvisionnement');

    $.ajax({
        type: "POST",
        url: Routing.generate('approvisionnement_charger_billetage_approvisionnement'),
        data: {
            idApprovisionnement: idApprovisionnement
        },
        beforeSend: function () {
            $("#loaderBilletageApprovisionnement").show();
        },
        success: function (data)
        {
            var code = data.code;

            if (code === 200)
            {
                var billetageApprovisionnement = data.billetageApprovisionnement;

                $('#tableauBilletageApprovisionnement').html(billetageApprovisionnement);
                $('#loaderBilletageApprovisionnement').hide();

            }
            else
            {
                alert("Erreur lors de la recuperation du billetage : " + data.message);
                $('#loaderBilletageApprovisionnement').hide();
            }

        },
        error: function (error) {

            var message = "Errreur lors de la recuperation du billetage \n " + error.message;
            alert(message);
            $('#loaderBilletageApprovisionnement').hide();
        }
    });

}

$('body').on('click', '#checkAll', checkAllCheckBoxes)

function checkAllCheckBoxes()
{
    var btnChekAll = $(this);
    var etat = btnChekAll.prop('checked');

    $('input[type=checkbox]').each(function ()
    {
        $(this).prop('checked', etat)
    });


}


$('#confirmer').click(confirmationReceptionApprovisionnement);

function confirmationReceptionApprovisionnement(e)
{
    e.preventDefault();

    var montantTotal = 0, i=0;
    var caisse = $('#caisse').val();
    // var dateReception = $('#dateReception').val();

    $('.checkBoxAppro:checked:enabled').each(function ()
    {
        var montant = parseInt($(this).data('montant'));
        i++;
        montantTotal += montant;
    });
    montantTotal = montantTotal.toString();
    montantTotal = addThousandSeparator(montantTotal);

    var confirmation = 'Confirmez-vous la réception de <strong>' + i + '</strong> approvisionnement(s) d\'un montant total de <strong>' +
        montantTotal + ' FCFA</strong> sur la <strong> ' + caisse /*+ '</strong> à la date du <strong>' + dateReception*/ + '</strong?'

    $('#confirmationModalBody').html(confirmation);

}