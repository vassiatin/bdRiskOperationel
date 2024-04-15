$('.banqueEmettrice').attr('required', 'required');
$('.compteBancaireEmettrice').attr('required', 'required');


$('.ligneDemandeAjoutOrdreVirement').dblclick(selectionnerDemandeOrdreVirement);

$('.ligneDemandeAjoutOrdreVirement').css(
    {
        'cursor' : 'pointer'
    }
)

// $('#estProcurationInput').click(function ()
// {
//     if ($(this).prop('checked') === true)
//     {
//         $('#divFichierRIB').show('slow');
//     }
//     else
//     {
//         $('#divFichierRIB').hide('slow');
//     }
// });


$('#tableauDemandesToOrdreVirement').css(
    {
        'overflow' : 'auto'
    }
);

var ligneDemandeSelectionner = '';
function selectionnerDemandeOrdreVirement()
{
    var ligne = $(this);

    if (!ligne.hasClass('ligneSelectionner'))
    {
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

        ligneDemandeSelectionner = ligne;
    }

}


$('#btnAjouterDemande').click(ajouterDemandeOrdreVirement)

var montantTotal = 0; var montantTotalLettres = '';
var tableauDemandesOrdreVirement = $('#tableauDemandesOrdreVirementBody');

function ajouterDemandeOrdreVirement()
{
    var codeDemande = $('#codeDemandeInput').val();
    var dateDemande = $('#dateDemandeInput').val();
    var numCompte = $('#numCompteInput').val();
    var intitule = $('#intituleInput').val();
    var montant = $('#montantInput').val();
    var montantLettres = $('#montantLettresInput').val();
    var codeCompteBancaireBeneficiaire = $('#compteBancaireBeneficaireInput').val();
    var intituleCompteBancaireBeneficiaire = $('#compteBancaireBeneficaireInput option:selected').text();
    // var estProcuration = $('#estProcurationInput').prop('checked');
    // var fichierRib = $('#fichierRIBInput').clone()
    // console.log(fichierRib)

    // var inputFichierRibClone = fichierRib.clone();
    // inputFichierRibClone.attr('id', 'fichierRIB'+codeDemande);


    var montantFloat = montant.replace(/ /gi, "");
    montantFloat = parseInt(montantFloat);

    // estProcuration = (estProcuration === true) ? 'Oui' : 'Non';


    var ligne = '<tr class="ligneDemandeOrdreVirement" id="ligneDemandeOrdreVirement' + codeDemande + '"' +
        ' data-codedemande="' + codeDemande + '"' +
        ' data-montant="' + montantFloat + '">' +
        '<td class="client">' + numCompte + ' - ' + intitule + '</td>' +
        '<td class="dateDemande">' + dateDemande + '</td>' +
        '<td class="montant">' + montant + '</td>' +
        '<td class="compteBancaire">' + intituleCompteBancaireBeneficiaire + '</td>' +
        // '<td class="estProcuration">' + estProcuration + '</td>' +
        '<td class="fichierRIB">' + '<input accept="application/pdf" type="file" name="fichierRIB' + codeDemande + '">' + '</td>' +
        '<td>' + '<button type="button" class="btn btn-danger btnSupprimerDemande" data-codedemande="'+codeDemande+'" data-montant="'+montantFloat+'">Suppr.</button>' + '</td>' +
        '<td hidden class="codeDemande">' + codeDemande + '</td>' +
        '<td hidden class="numCompteBancaire">' + codeCompteBancaireBeneficiaire + '</td>' +
        '</tr>';
    tableauDemandesOrdreVirement.append(ligne);



    montantTotal += montantFloat;
    var montantTotalString = montantTotal.toString();
    montantTotalString = addThousandSeparator(montantTotalString);
    $('.montantTotal').val(montantTotalString);

    montantTotalLettres = NumberToLetter(montantTotal);
    montantTotalLettres = capitalizeFirstLetter(montantTotalLettres);
    $('.montantTotalLettres').val(montantTotalLettres);

    $('#modalAjoutDemandeOrdreVirementBody :input').val('');
    $(`#compteBancaireBeneficaireInput`).trigger("chosen:updated");
    $(` #compteBancaireBeneficaireInput`).trigger("change");
    $('#estProcurationInput').prop('checked', false);
    $('#divFichierRIB').hide();

    ligneDemandeSelectionner.addClass('ligneSelectionner');
    ligneDemandeSelectionner.css({
        'background-color':'#dddddd'
    })

}

$('body').on('click', '.btnSupprimerDemande', supprimerDemande);

// $('.btnSupprimerDemande').click(supprimerDemande);

function supprimerDemande()
{
    var bouton = $(this);
    var codeDemande = bouton.data('codedemande');
    var montantFloat = bouton.data('montant');

    var ligneDemandeAjoutOrdreVirement = $('#ligneDemandeAjoutOrdreVirement' + codeDemande);
    var ligneDemandeOrdreVirement = $('#ligneDemandeOrdreVirement' + codeDemande);

    ligneDemandeAjoutOrdreVirement.removeClass('ligneSelectionner');
    ligneDemandeAjoutOrdreVirement.css({
        'background-color':'white'
    });

    montantTotal -= montantFloat;
    var montantTotalString = montantTotal.toString();
    montantTotalString = addThousandSeparator(montantTotalString);
    $('.montantTotal').val(montantTotalString);

    montantTotalLettres = NumberToLetter(montantTotal);
    montantTotalLettres = capitalizeFirstLetter(montantTotalLettres);
    $('.montantTotalLettres').val(montantTotalLettres);

    ligneDemandeOrdreVirement.hide('slow')
    setTimeout(function () {
        ligneDemandeOrdreVirement.remove();
    }, 1000)

}


/*
Chargement des comptes bancaires
 */
function chargerCompteBancaire ()
{

    var codeBanque = $('.banqueEmettrice').val();
    // alert(codeBanque)
    if (codeBanque !== '')
    {
        $.ajax({
            type: "POST",
            url: Routing.generate('debitcredit_get_compte_banquaire_banque'),
            data: {
                codeBanque: codeBanque,
            },
            beforeSend: function () {
                $('.compteBancaireEmettrice').empty();
                $('.compteBancaireEmettrice').html('<option value="">Chargement des comptes...</option>'  );

            },
            success: function (data) {
                $('.compteBancaireEmettrice').empty();
                $('.compteBancaireEmettrice').append(data);

            },
            error: function (error) {

                var message = "erreur lors de la recuperation des comptes bancaires " + error.message;
                alert(message)
            }
        });
    }
    else
    {
        $('.compteBancaireEmettrice').empty();
    }

};

$('.banqueEmettrice').change(chargerCompteBancaire);


$('#modalAjoutDemandeOrdreVirement').on('shown.bs.modal', function ()
{
    setTimeout(function () {
        $("#compteBancaireBeneficaireInput").chosen();

    }, 1000)
})

$('#btnConfirmation').click(confirmation);


//Confirmation de l'enregistrement d'un ordre de virement
function confirmation()
{
    $('#tdDateSaisie').html($('.dateSaisie').val());
    $('#tdDateOperation').html($('.dateOperation').val());
    $('#tdDateValeur').html($('.dateValeur').val());
    $('#tdBanqueEmettrice').html($('.banqueEmettrice option:selected').text());
    $('#tdCompteBancaire').html($('.compteBancaireEmettrice option:selected').text());
    $('#tdCivilite').html($('.civilite').val());
    $('#tdMotif').html($('.motifOrdreVirement').val());
    $('#tdMontatTotal').html($('.montantTotal').val());
    $('#tdMontatTotalLettres').html($('.montantTotalLettres').val());

    var tableauDemades = $('#tableauDemandesOrdreVirementBody tr');

    var tableauDemandesConfirmation = $('#tableauDemandesOrdreVirementConfirmationBody');
    tableauDemandesConfirmation.empty();

    var divDataFormulaire = $('#divDataFormulaire');
    var divDetailsDemandes = $('#divDetailsDemandes');
    divDetailsDemandes.empty();

    var demandes = [];
    var compteBancaires = [];
    // var procurations = [];
    $('#fichierRIBs').empty();
    tableauDemades.each(function ()
    {

        var client = $(this).find('.client').html();
        var montant = $(this).find('.montant').html();
        var compteBancaire = $(this).find('.compteBancaire').html();
        // var estProcuration = $(this).find('.estProcuration').html();
        var dateDemande = $(this).find('.dateDemande').html();
        var codeDemande = $(this).find('.codeDemande').html();
        var numCompteBancaire = $(this).find('.numCompteBancaire').html();
        var fichierRIB = $(this).find('input[type=file]').val().replace(/C:\\fakepath\\/i, '')

        // inputFihcierRib = $.parseHTML(inputFihcierRib);
        // console.log(inputFihcierRib);


        demandes.push(codeDemande);
        compteBancaires.push(numCompteBancaire);
        // procurations.push(estProcuration);
        // $('#fichierRIBs').append(inputFihcierRib);

        var ligne = '<tr>' +
            '<td>' + client + '</td>' +
            '<td>' + dateDemande + '</td>' +
            '<td>' + montant + '</td>' +
            '<td>' + compteBancaire + '</td>' +
            '<td>' + fichierRIB + '</td>' +

            '</tr>';
        tableauDemandesConfirmation.append(ligne);

        // var inputCompteBancaire = '<input type="hidden" name="compteBancaire'+codeDemande+'" value="'+compteBancaire+'">';
        // var inputProcuration = '<input type="hidden" name="estProcuration'+codeDemande+'" value="'+estProcuration+'">';
        // // var inputProcuration = '<input type="hidden" name="estProcuration'+codeDemande+'" value="'+estProcuration+'">';
        //
        // divDetailsDemandes.append(inputCompteBancaire);
        // divDetailsDemandes.append(inputProcuration);
    });

    $('#demandes').val(JSON.stringify(demandes));
    $('#compteBancaires').val(JSON.stringify(compteBancaires));
    // $('#procurations').val(JSON.stringify(procurations));

}



$('.btnDetailsOrdreVirement').click(function ()
{
    var numOrdreVirement = $(this).data('numordre');
    var dateSaisie = $(this).data('datesaisie');
    var dateOperation = $(this).data('dateoperation');
    var dateValeur = $(this).data('datevaleur');
    var banque = $(this).data('banque');
    var compte = $(this).data('compte');
    var montant = $(this).data('montant');
    var montantLettres = $(this).data('montantlettres');
    var civilite = $(this).data('civilite');
    var motif = $(this).data('motif');
    var fichierDecharge = $(this).data('fichierdecharge');
    var fichierAvisDebitCredit = $(this).data('fichieravisdebitcredit');
    var fichierPreuveEnvoieSwift = $(this).data('fichierpreuveswift');
    var ordreVerifier = $(this).data('estverifier');
    var ordreTraiter = $(this).data('esttraiter');

    $('#tdDateSaisie').html(dateSaisie);
    $('#tdDateOperation').html(dateOperation);
    $('#tdDateValeur').html(dateValeur);
    $('#tdBanqueEmettrice').html(banque);
    $('#tdCompteBancaire').html(compte);
    $('#tdMontatTotal').html(montant);
    $('#tdMontatTotalLettres').html(montantLettres);
    $('#tdCivilite').html(civilite);
    $('#tdMotif').html(motif);
    $('#lienFichierDecharge').attr('href', fichierDecharge);
    $('#lienFichierAvisDebitCredit').attr('href', fichierAvisDebitCredit);
    $('#lienFichierPreuveEnvoieSwift').attr('href', fichierPreuveEnvoieSwift);

    $('#tdOrdreVerifier').html(ordreVerifier);
    $('#tdOrdreTraiter').html(ordreTraiter);


    if (fichierDecharge === '#')
    {
        $('#lienFichierDecharge').text('Ordre non déchargé')
    }
    if (fichierAvisDebitCredit === '#')
    {
        $('#lienFichierAvisDebitCredit').text('Avis débit crédit non rattaché')
    }
    if (fichierPreuveEnvoieSwift === '#')
    {
        $('#lienFichierPreuveEnvoieSwift').text('Swift non déchargé')
    }


    $('.tableauDemandesOrdreVirement').hide();
    $('#tableauDemandesOrdreVirement'+numOrdreVirement).show()
});

$('.rattacherPiece').click(function () {
    var numOrdre = $(this).data('numordre');
    $('#inputNumOrdre').val(numOrdre);
});

$('.verifierTraiter').click(function ()
{
    var texteConfirmation = $(this).data('texteconfirmation');

    var numOrdre = $(this).data('numordre');
    $('#inputNumOrdre').val(numOrdre);
    $('#confirmationTexteVerificationTraitement').html(texteConfirmation)
});