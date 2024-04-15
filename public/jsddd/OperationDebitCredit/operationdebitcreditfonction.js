// ajaxOperationDebitCredit.chargerCodeSchema($('.typeProduit').val());
//

/*
Choix du type de produit
*/
//
//
//

$(document).ready(function () {

    var root = "operation_debit_credit_";
    var root2 = "operation_debit_credit_detailsOperationDebitCredit_";









});

//****************************************
//******* Séparateur de Millier **********
//****************************************
function addThousandSeparator(value) {
    var settings = {
        'thousands' : ' '
    };
    var totalThousandsPoints = (value.length - 3) / 3;
    var thousandsPointsAdded = 0;
    while (totalThousandsPoints > thousandsPointsAdded) {
        thousandsPointsAdded++;
        value = value.replace(/(\d+)(\d{3}.*)/, "$1".concat(settings.thousands).concat("$2"));
    }

    return value;
}



/**
 *  validation du formulaire
 */
$('#btn_confrimation').on('click', function ()
{

    var codeTypeOperation = $('.typeOperation').val();
    var libelleTypeOperation = $(`.typeOperation option:selected`).text();

    var montant = $('.valeur').val();
    var montantEnLettres = $('.montantEnLettres').val();

    var intitule = $('#intituleCompte').val();
    var deposant = $('.nomDeposant').val();

    var confirmaiton = `Confirmez-vous l'operation <b>${libelleTypeOperation}</b> de <b>${montant}</b> sur le compte du client <b>${intitule}</b>`;


    switch (codeTypeOperation)
    {
        //Depot despeces
        case 'DEPESP':
            confirmaiton += ` par <b>${deposant}</b>`
            break;

        //Retrait despeces
        case 'RETESP':

            break;

        //Retrait par cheque
        case 'RETCHQ':

            break;

        //Retrait par ordre de virement
        case 'RETOV':

            break;

        //Depot par cheque
        case 'DEPCHQ':
            confirmaiton += ` par <b>${deposant}</b>`

            break;

        //Depot par ordre de virement
        case 'REAVOV':
            confirmaiton += ` par <b>${deposant}</b>`


            break;

        //Depot par ordre de virement permanent
        case 'DOVP':
            confirmaiton += ` par <b>${deposant}</b>`

            break;

        //Commission fermeture de compte
        case 'COMFERT':

            break;

        //Frais de gestion
        case 'FTGEST':

            break;

        default:
            break;
    }

    $('#confirmationModalBody').html(confirmaiton);


    // return false;

});




// 10,875,535 operations/sec
function capitalizeFirstLetter(string) {
    return string.replace(/(\b\w)/gi,function(m){return m.toUpperCase();});
}


//*******************************************
//********** Number to Letters **************
//*******************************************
// JavaScript Document
/****************************************************************************

 ________________________________________________________________________	*
 About 		:	Convertit jusqu'à  999 999 999 999 999 (billion)		*
 avec respect des accords								*
 _________________________________________________________________________	*
 Auteur  	:	GALA OUSSE Brice, Engineer programmer of management		*
 Mail    	:	bricegala@yahoo.fr, bricegala@gmail.com 										*
 Tél	    	:	+237 99 37 95 83/ +237 79 99 82 80										*
 Copyright 	:	avril  2007												*
 _________________________________________________________________________	*

 */

function Unite( nombre ){
    var unite;
    switch( nombre ){
        case 0: unite = "Zéro";		break;
        case 1: unite = "Un";		break;
        case 2: unite = "Deux";		break;
        case 3: unite = "Trois"; 	break;
        case 4: unite = "Quatre"; 	break;
        case 5: unite = "Cinq"; 	break;
        case 6: unite = "Six"; 		break;
        case 7: unite = "Sept"; 	break;
        case 8: unite = "Huit"; 	break;
        case 9: unite = "Neuf"; 	break;
    }//fin switch
    return unite;
}//-----------------------------------------------------------------------

function Dizaine( nombre ){
    switch( nombre ){
        case 10: dizaine = "Dix"; break;
        case 11: dizaine = "Onze"; break;
        case 12: dizaine = "Douze"; break;
        case 13: dizaine = "Treize"; break;
        case 14: dizaine = "Quatorze"; break;
        case 15: dizaine = "Quinze"; break;
        case 16: dizaine = "Seize"; break;
        case 17: dizaine = "Dix-sept"; break;
        case 18: dizaine = "Dix-huit"; break;
        case 19: dizaine = "Dix-neuf"; break;
        case 20: dizaine = "Vingt"; break;
        case 30: dizaine = "Trente"; break;
        case 40: dizaine = "Quarante"; break;
        case 50: dizaine = "Cinquante"; break;
        case 60: dizaine = "Soixante"; break;
        case 70: dizaine = "Soixante-dix"; break;
        case 80: dizaine = "Quatre-vingt"; break;
        case 90: dizaine = "Quatre-vingt-dix"; break;
    }//fin switch
    return dizaine;
}//-----------------------------------------------------------------------


function NumberToLetter( nombre ){
    var i, j, n, quotient, reste, nb ;
    var ch
    var numberToLetter='';
    //__________________________________

    if(  nombre.toString().replace( / /gi, "" ).length > 15  )	return "dépassement de capacité";
    if(  isNaN(nombre.toString().replace( / /gi, "" ))  )		return "Nombre non valide";

    nb = parseFloat(nombre.toString().replace( / /gi, "" ));
    if(  Math.ceil(nb) !== nb  )	return  "Nombre avec virgule non géré.";

    n = nb.toString().length;
    switch( n ){
        case 1: numberToLetter = Unite(nb); break;
        case 2: if(  nb > 19  ){
            quotient = Math.floor(nb / 10);
            reste = nb % 10;
            if(  nb < 71 || (nb > 79 && nb < 91)  ){
                if(  reste === 0  ) numberToLetter = Dizaine(quotient * 10);
                if(  reste === 1  ) numberToLetter = Dizaine(quotient * 10) + "-et-" + Unite(reste);
                if(  reste > 1   ) numberToLetter = Dizaine(quotient * 10) + "-" + Unite(reste);
            }else numberToLetter = Dizaine((quotient - 1) * 10) + "-" + Dizaine(10 + reste);
        }else numberToLetter = Dizaine(nb);
            break;
        case 3: quotient = Math.floor(nb / 100);
            reste = nb % 100;
            if(  quotient === 1 && reste === 0   ) numberToLetter = "Cent";
            if(  quotient === 1 && reste !== 0   ) numberToLetter = "Cent" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0    ) numberToLetter = Unite(quotient) + " Cents";
            if(  quotient > 1 && reste !== 0    ) numberToLetter = Unite(quotient) + " Cent " + NumberToLetter(reste);
            break;
        case 4 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient === 1 && reste === 0   ) numberToLetter = "Mille";
            if(  quotient === 1 && reste !== 0   ) numberToLetter = "Mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0    ) numberToLetter = NumberToLetter(quotient) + " Mille";
            if(  quotient > 1 && reste !== 0    ) numberToLetter = NumberToLetter(quotient) + " Mille " + NumberToLetter(reste);
            break;
        case 5 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient === 1 && reste === 0   ) numberToLetter = "Mille";
            if(  quotient === 1 && reste !== 0   ) numberToLetter = "Mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0    ) numberToLetter = NumberToLetter(quotient) + " Mille";
            if(  quotient > 1 && reste !== 0    ) numberToLetter = NumberToLetter(quotient) + " Mille " + NumberToLetter(reste);
            break;
        case 6 :  quotient = Math.floor(nb / 1000);
            reste = nb - quotient * 1000;
            if(  quotient === 1 && reste === 0   ) numberToLetter = "mille";
            if(  quotient === 1 && reste !== 0   ) numberToLetter = "mille" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0    ) numberToLetter = NumberToLetter(quotient) + " mille";
            if(  quotient > 1 && reste !== 0    ) numberToLetter = NumberToLetter(quotient) + " mille " + NumberToLetter(reste);
            break;
        case 7: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un million";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 8: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un million";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 9: quotient = Math.floor(nb / 1000000);
            reste = nb % 1000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un million";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un million" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " millions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " millions " + NumberToLetter(reste);
            break;
        case 10: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un milliard";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 11: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un milliard";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 12: quotient = Math.floor(nb / 1000000000);
            reste = nb - quotient * 1000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un milliard";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un milliard" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " milliards";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " milliards " + NumberToLetter(reste);
            break;
        case 13: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un billion";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 14: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un billion";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
        case 15: quotient = Math.floor(nb / 1000000000000);
            reste = nb - quotient * 1000000000000;
            if(  quotient === 1 && reste === 0  ) numberToLetter = "un billion";
            if(  quotient === 1 && reste !== 0  ) numberToLetter = "un billion" + " " + NumberToLetter(reste);
            if(  quotient > 1 && reste === 0   ) numberToLetter = NumberToLetter(quotient) + " billions";
            if(  quotient > 1 && reste !== 0   ) numberToLetter = NumberToLetter(quotient) + " billions " + NumberToLetter(reste);
            break;
    }//fin switch
    /*respect de l'accord de quatre-vingt*/
    if(  numberToLetter.substr(numberToLetter.length-"quatre-vingt".length,"quatre-vingt".length) === "quatre-vingt"  ) numberToLetter = numberToLetter + "s";

    return numberToLetter;
}//-----------------------------------------------------------------------


var total =0;

/*
Gestion du billetage
 */

function calculBilletage()
{
    $('.billet').bind('keyup mouseup',function ()
    {
        var num = $(this).data('num') ;
        var nombre = $(this).val();nombre = parseInt(nombre);
        var stock = $('#stock'+num).val(); stock = parseInt(stock);
        var codeOperation = $('.typeOperation').val();

        var estApprovisionnement = $('#estApprovisionnement').val();

        console.log(stock);

        if (nombre === "")
        {
            nombre =0;
            $(this).val(0);
        }

        if ((estApprovisionnement === 'true' && nombre > stock)  || (codeOperation === "RETESP" && nombre > stock))
        {
            nombre = stock;
            $(this).val(stock);
            alert('Vous ne pouvez pas dépasser le stock du billet');
        }
        nombre = parseInt(nombre);

        var coupure = parseInt($(this).data('coupure')) ;
        var montantFloat = coupure*nombre;
        var montantString = montantFloat.toString();
        montantString = addThousandSeparator(montantString);

        total =0;

        $('.billet').each(function()
        {
            var nombre =  parseInt($(this).val());

            var coupure = parseInt($(this).data('coupure')) ;
            total += coupure * nombre ;

        });

        $('#montant' + num).val(montantString);

        $('#montantTotal').val(total);

        // total = total.toLocaleString();
        total = addThousandSeparator(total.toString());

        $('#montantTotalAfficher').html(total);

    });


}
calculBilletage();


$('#modalBilletage').on('hidden.bs.modal', function () {
    var montantTotal = parseInt($('#montantTotal').val());
    var montantTotalString = addThousandSeparator(montantTotal.toString());

    $('.valeur').val(montantTotalString);
    var montantTotalLettre = NumberToLetter(montantTotal);
    $('.montantEnLettres').val(montantTotalLettre);

});


/*
Chargement des comptes bancaires
 */
function chargerCompteBancaire ()
{

    var codeBanque = $('.notreBanque').val();

    if (codeBanque !== '') {
        $.ajax({
            type: "POST",
            url: Routing.generate('debitcredit_get_compte_banquaire_banque'),
            data: {
                codeBanque: codeBanque,
            },
            beforeSend: function () {
                $('.compteBancaire').empty();
                $('.compteBancaire').html('<option>Chargement...</option>');
            },
            success: function (data) {
                // language=JQuery-CSS
                $('.compteBancaire').empty();

                // $('.compteBancaire').html('<option>Selectionnez un compte bancaire</option>'  );

                $('.compteBancaire').append(data);
                // $(`  #compteBanque`).trigger("chosen:updated");
                // $(` #compteBanque`).trigger("change");
            },
            error: function (error) {

                var message = "erreur lors de la recuperation des comptes bancaires " + error.message;
                alert(message)
            }
        });
    }

};

$('.notreBanque').change(chargerCompteBancaire);


/*
Conversion du montant de la valeur en lettres
 */
$('.valeur').blur(function (e)
{
    var valeur = $(this).val();
    valeur = valeur.replace(/ /gi, "");
    valeur = parseInt(valeur);
    console.log(valeur);

    var valeurLetres = NumberToLetter(valeur);
    valeurLetres = capitalizeFirstLetter(valeurLetres);
    // $(this).val(valeur.toLocaleString());
    $('.montantEnLettres').val(valeurLetres);
});


/*
Gestion du choix du type d'operation
 */

selectionTypeOperation();

function selectionTypeOperation()
{
    var codeTypeOperation = $('.typeOperation').val();
    // alert(codeTypeOperation);

    switch (codeTypeOperation)
    {
        //Depot despeces
        case 'DEPESP':
            //On Désactive les champs concernant la banque
            $('.concerneBanque').attr('disabled', 'disabled').removeAttr('required');
            $('.valeur').attr('readonly', 'readonly').attr('required', 'required');

            //On active le billetage de la caisse
            $('#btn_billetage').removeAttr('disabled', 'disabled').attr('required', 'required');
            //On active la caisse
            $('.caisse').removeAttr('disabled', 'disabled').attr('required', 'required');
            //On active le bordereau
            $('.numeroBordereau').removeAttr('disabled', 'disabled').attr('required', 'required');

            $('.nomDeposant').removeAttr('disabled').attr('required', 'required');
            $('.adresseDeposant').removeAttr('disabled').attr('required', 'required');
            break;

            //Retrait despeces
        case 'RETESP':
            //On Désactive les champs concernant la banque et la valeur
            $('.concerneBanque').attr('disabled', 'disabled').removeAttr('required');
            $('.valeur').attr('readonly', 'readonly').attr('required', 'required');

            //On active le billetage de la caisse
            $('#btn_billetage').removeAttr('disabled', 'disabled').attr('required', 'required');
            //On active la caisse
            $('.caisse').removeAttr('disabled', 'disabled').attr('required', 'required');
            //On active le bordereau
            $('.numeroBordereau').removeAttr('disabled', 'disabled').attr('required', 'required');

            $('.nomDeposant').attr('disabled', 'disabled').removeAttr('required');
            $('.adresseDeposant').attr('disabled', 'disabled').removeAttr('required');
            break;

            //Retrait par cheque
        case 'RETCHQ':
            //On active numcheque, notre banque, compte bancaire valeur, numero bordereau
            $('.numCheque').removeAttr('disabled').attr('required', 'required');
            $('.notreBanque').removeAttr('disabled').attr('required', 'required');
            $('.compteBancaire').removeAttr('disabled').attr('required', 'required');
            $('.valeur').removeAttr('readonly').attr('required', 'required');
            $('.numeroBordereau').removeAttr('disabled').attr('required', 'required');

            //On desactive banque emettrice, la caisse, le billetage,
            $('.banqueEmettrice').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');

            $('.nomDeposant').attr('disabled', 'disabled').removeAttr('required');
            $('.adresseDeposant').attr('disabled', 'disabled').removeAttr('required');
            break;

           //Retrait par ordre de virement
        case 'RETOV':
            //On desactive le billetage, la caisse et le bordereau, numCheque, banque emettrice
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');
            $('.numeroBordereau').attr('disabled', 'disabled').removeAttr('required');
            $('.numCheque').attr('disabled', 'disabled').removeAttr('required');
            $('.banqueEmettrice').attr('disabled', 'disabled').removeAttr('required');

            //On active notre banque et le compte bancaire et la valeur
            $('.notreBanque').removeAttr('disabled').attr('required', 'required');
            $('.compteBancaire').removeAttr('disabled').attr('required', 'required');
            $('.valeur').removeAttr('readonly').attr('required', 'required');

            $('.nomDeposant').attr('disabled', 'disabled').removeAttr('required');
            $('.adresseDeposant').attr('disabled', 'disabled').removeAttr('required');
            break;

            //Depot par cheque
        case 'DEPCHQ':
            //On active tout ce qui concerne la banque, la valeur, le bordereau
            $('.concerneBanque').removeAttr('disabled').attr('required', 'required');
            $('.valeur').removeAttr('readonly').attr('required', 'required');
            $('.numeroBordereau').removeAttr('disabled', 'disabled').attr('required', 'required');

            //On désactive le billetage et la caisse
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');

            $('.nomDeposant').removeAttr('disabled').attr('required', 'required');
            $('.adresseDeposant').removeAttr('disabled').attr('required', 'required');

            break;

            //Depot par ordre de virement
        case 'REAVOV':
            //On desactive numcheque, le billetage, la caisse, le borderaeau
            $('.numCheque').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');
            $('#numeroBordereau').attr('disabled', 'disabled').removeAttr('required');

            //On active la banque emmettrice, notre banque, le compte bancaire, la valeur
            $('.banqueEmettrice').removeAttr('disabled').attr('required', 'required');
            $('.notreBanque').removeAttr('disabled').attr('required', 'required');
            $('.compteBancaire').removeAttr('disabled').attr('required', 'required');
            $('.valeur').removeAttr('readonly').attr('required', 'required');

            $('.nomDeposant').removeAttr('disabled').attr('required', 'required');
            $('.adresseDeposant').removeAttr('disabled').attr('required', 'required');
            break;

            //Depot par ordre de virement permanent
        case 'DOVP':

            break;

            //Commission fermeture de compte
        case 'COMFERT':
            //On desactive tout ce qui concerne banque, caisse, billetage, bordereau
            $('.concerneBanque').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');
            $('.numeroBordereau').attr('disabled', 'disabled').removeAttr('required');

            //On active la valeur,
            $('.valeur').removeAttr('readonly').attr('required', 'required');

            $('.nomDeposant').attr('disabled', 'disabled').removeAttr('required');
            $('.adresseDeposant').attr('disabled', 'disabled').removeAttr('required');

            break;

            //Frais de gestion
        case 'FTGEST':
            //On desactive tout ce qui concerne banque, caisse, billetage, bordereau
            $('.concerneBanque').attr('disabled', 'disabled').removeAttr('required');
            $('.caisse').attr('disabled', 'disabled').removeAttr('required');
            $('#btn_billetage').attr('disabled', 'disabled').removeAttr('required');
            $('.numeroBordereau').attr('disabled', 'disabled').removeAttr('required');

            //On active la valeur,
            $('.valeur').removeAttr('readonly').attr('required', 'required');

            $('.nomDeposant').attr('disabled', 'disabled').removeAttr('required');
            $('.adresseDeposant').attr('disabled', 'disabled').removeAttr('required');

            break;

        default:
            break;
    }



}

$('.typeOperation').change(selectionTypeOperation);

$('.majuscules').keyup(function () {
    var val = $(this).val();
    val = val.toUpperCase();
    $(this).val(val);
})