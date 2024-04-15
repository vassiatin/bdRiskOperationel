$('.banqueEmettrice').attr('required', 'required');
$('.compteBancaire').attr('required', 'required');

$('.ligneDemandePourCheque').dblclick(selectionnerDemandePourCheque);

$('.ligneDemandePourCheque').css(
    {
        'cursor' : 'pointer'
    }
)


$('#tableauDemandesPourCheque').css(
    {
        'overflow' : 'auto'
    }
);


function selectionnerDemandePourCheque()
{
    var ligne = $(this);

    var codeDemande = ligne.data('codedemande');
    var numCompte = ligne.data('numcompte');
    var intitule = ligne.data('intitule');
    var montant = ligne.data('montant');
    var montantEnLettres = ligne.data('montantlettres');
    var dateDemande = ligne.data('datedemande');

    $('#numCompteInput').val(numCompte);
    $('#intituleInput').val(intitule);
    $('#montantInput').val(montant);
    $('#montantLettresInput').val(montantEnLettres);
    $('#codeDemandeInput').val(codeDemande);
    $('#dateDemandeInput').val(dateDemande);


}


$('#btnChoisirDemandePourCheque').click(choisirDemandePourCheque)

function choisirDemandePourCheque()
{
    var codeDemande = $('#codeDemandeInput').val();
    var dateDemande = $('#dateDemandeInput').val();
    var numCompte = $('#numCompteInput').val();
    var intitule = $('#intituleInput').val();
    var montant = $('#montantInput').val();
    var montantLettres = $('#montantLettresInput').val();

    $('#codeDemande').val(codeDemande)
    $('#client').val(numCompte + ' - ' + intitule);
    $('.montantCheque').val(montant);
    $('.montantChequeEnLettres').val(montantLettres);
}


function confirmerNewCheque()
{
    var phrase = "Confirmez-vous l'édition du chèque <strong>" + $('.numCheque').val() + "</strong>" +
        " pour le client <strong>" + $('#client').val() + "</strong> d'un montant de <strong>" +
        $('.montantCheque').val() + " (" + $('.montantChequeEnLettres').val() + ")</strong> ? "
    ;

    $('#phraseConfirmation').html(phrase);
}
$('#btnEnregistrer').click(confirmerNewCheque)