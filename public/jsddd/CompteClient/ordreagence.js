$(function () {

    $("#souscMin").keyup(function () {
//console.log('ok bien');
        var montant = Number($(this).val());
        var valeurN = Number($('#valeurN').val());
        var total = (montant * valeurN);
        $("#montant").val(total);
    });

    $("#qte").keyup(function () {
        var quantite = Number($(this).val());
        var prix = Number($('#prix').val());
        var total = (quantite * prix);
        $("#montant").val(total);
    });

    //fonctions permettant de calculer les valeurs de la simulation des souscription des bon tcn
    $('#quantite').keyup(function () {
        //var formater = new Intl.NumberFormat();
        var quantite = Number($(this).val());
        var nominal = Number($('#valeur').val());
        var montantBrut = (quantite * nominal);
        //console.log(new Intl.NumberFormat().format(montantBrut))
        $('#brut').val(montantBrut.toLocaleString());
    });

    $('#tauxTcn').keyup(function () {
        var formater = new Intl.NumberFormat();
        var taux = Number($(this).val());
        var quantite = Number($("#quantite").val());
        var nominal = Number($('#valeur').val());
        var montantBrut = (quantite * nominal);
        //alert(formater.format(montantBrut));
        var duree = Number($('#duree').val());
        var interet = (taux * montantBrut * duree) / (360 * 100);
        $('#interet').val(formater.format(interet));
        var interetUnitaire = interet / quantite;
        $('#interetUnitaire').val(formater.format(interetUnitaire));
        var nature = $('#nature').val();
        var NetUnitaire = 0;
        var Net = 0;
        if (nature == 'Pré Compté') {
            NetUnitaire = nominal - interetUnitaire;
            Net = montantBrut - interet;
            /* var tab = [];
             tab.push(NetUnitaire);
             tab.push(Net);
             alert(tab);*/
        } else {
            NetUnitaire = nominal;
            Net = montantBrut;
        }
        $('#netUnitaire').val(formater.format(NetUnitaire));
        $('#net').val(formater.format(Net));
        var TauxRendement = interet / (NetUnitaire * 100);
        $('#tauxRend').val(TauxRendement.toFixed(4));
        $('#tauxRende').val(TauxRendement.toFixed(4));
    });//fin du calcul

    //calcul des valeurs pour la soiuscription d'un client a un titre tcn*
    $('#quantiteSouscrit').keyup(function () {
        var qute = Number($(this).val());
        var nominal = $('#nominalSousc').val();
        var taux = $('#tauxClientSouscrit').val();
        var montant = nominal * qute;
        var duree = $('#dureeSousc').val();
        var nature = $('#natureSousc').val();
        var interet = (taux * montant * duree) / (360 * 100);
        var Net = 0;
        if (nature == 'Pré Compté') {
            Net = montant - interet;
        } else {
            Net = montant;
        }
        $('#montantSouscrit').val(montant.toLocaleString());
        $('#interetSouscrit').val(interet.toLocaleString());
        $('#netSouscrit').val(Net.toLocaleString());

    });

    $('#esvbundle_ordreavisannonce_typePaiement').change(function () {

        var contenu = $('#esvbundle_ordreavisannonce_typePaiement option:selected').text();
        if (contenu == 'Capital total' || contenu == 'Capital partiel') {
            $('#esvbundle_ordreavisannonce_interetBrut').attr('readonly', 'readonly');
            $('#esvbundle_ordreavisannonce_interetNet').attr('readonly', 'readonly');

            $('#esvbundle_ordreavisannonce_interetBrut').val("");
            $('#esvbundle_ordreavisannonce_interetNet').val("");

            $('#esvbundle_ordreavisannonce_prixRemboursement').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_qteTotaleAmortie').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_montantRemboursement').removeAttr('readonly');
        }
        if (contenu == 'Interet total' || contenu == 'Interet partiel') {

            $('#esvbundle_ordreavisannonce_prixRemboursement').attr('readonly', 'readonly');
            $('#esvbundle_ordreavisannonce_qteTotaleAmortie').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_montantRemboursement').attr('readonly', 'readonly');

            $('#esvbundle_ordreavisannonce_prixRemboursement').val("");
            $('#esvbundle_ordreavisannonce_qteTotaleAmortie').val("");
            $('#esvbundle_ordreavisannonce_montantRemboursement').val("");

            $('#esvbundle_ordreavisannonce_interetBrut').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_interetNet').removeAttr('readonly');
        }

        if (contenu == 'Interet et Capital total' || contenu == 'Interet et Capital partiel') {

            $('#esvbundle_ordreavisannonce_prixRemboursement').val("");
            $('#esvbundle_ordreavisannonce_qteTotaleAmortie').val("");
            $('#esvbundle_ordreavisannonce_montantRemboursement').val("");

            $('#esvbundle_ordreavisannonce_interetBrut').val("");
            $('#esvbundle_ordreavisannonce_interetNet').val("");

            $('#esvbundle_ordreavisannonce_interetBrut').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_interetNet').removeAttr('readonly');

            $('#esvbundle_ordreavisannonce_prixRemboursement').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_qteTotaleAmortie').removeAttr('readonly');
            $('#esvbundle_ordreavisannonce_montantRemboursement').removeAttr('readonly');
        }


    });

    $('#esvbundle_ordreavisannonce_interetBrut').keyup(function () {
        var tauxbrut = $('#esvbundle_ordreavisannonce_tauxBrut').val();
        var coupon = $('#esvbundle_ordreavisannonce_interetBrut').val();
        var fiscalite = $('#esvbundle_ordreavisannonce_fiscalite').val();
        var montant = (1-(fiscalite/100)) * coupon;
        $('#esvbundle_ordreavisannonce_interetNet').val(montant.toFixed(4));
    });

    $('#esvbundle_ordreavisannonce_interetNet').keyup(function () {
        var tauxnet = $('#esvbundle_ordreavisannonce_tauxNet').val();
        var coupon = $('#esvbundle_ordreavisannonce_interetNet').val();
        var fiscalite = $('#esvbundle_ordreavisannonce_fiscalite').val();
        var montant = (coupon/(1-(fiscalite/100))) ;
        $('#esvbundle_ordreavisannonce_interetBrut').val(montant.toFixed(4));
    });

    $('#esvbundle_ordreavisannonce_prixRemboursement').keyup(function () {
        var prix = $('#esvbundle_ordreavisannonce_prixRemboursement').val();
        var qte = $('#esvbundle_ordreavisannonce_qteTotaleAmortie').val();
        var montant = prix * qte;
        $('#esvbundle_ordreavisannonce_montantRemboursement').val(montant);
    });

    $('#esvbundle_ordreavisannonce_qteTotaleAmortie').keyup(function () {
        var qte = $('#esvbundle_ordreavisannonce_qteTotaleAmortie').val();
        var prix = $('#esvbundle_ordreavisannonce_prixRemboursement').val();
        var montant = qte * prix;
        $('#esvbundle_ordreavisannonce_montantRemboursement').val(montant);

    });

    $('#annonceS').change(function () {
        var a = $('#annonceS').val();
        var c = $('#annonceS').find(':selected').text();
        $('#annon1').val(c);
        var b = a.split(',');
        var titre = b[0];
        var symbole = b[1];
        var dividendeBrut = b[2];
        var dividendeNet = b[3];
        $('#typetitre').val(titre);
        $('#cache1').removeAttr('hidden');
        $('#cache').attr('hidden', 'hidden');
        $('amortiss').removeAttr('checked');
        $("#esvbundle_ordreavisannonce_symbole").val('');
        $("#esvbundle_ordreavisannonce_titre").val('');
        $("#esvbundle_ordreavisannonce_description").val('');
        $("#esvbundle_ordreavisannonce_emetteur").val('');
        $("#esvbundle_ordreavisannonce_place").val('');
        $("#esvbundle_ordreavisannonce_monnaie").val('');
        $("#ordre_avis_dividende_typeTitre").val(titre);
        $("#ordre_avis_dividende_interetBrut").val(dividendeBrut);
        $("#ordre_avis_dividende_interetNet").val(dividendeNet);
        ajaxSouscription.RecuperationTitreAnnonce(titre, symbole);
    });

    $('#forme').submit(function (e) {
        e.preventDefault();
        $('#list_avis').removeAttr('hidden');
        // $('.alert-danger').attr('hidden','hidden');
        $('#list_avis').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );

        var date1 = $('#dr-example-single').val();
        var date2 = $('#dr-example-single1').val();
        var type = $('#type').val();
        /*var generer='',nongenerer='';

        if($('#genere').is(':checked')== true){
            generer = 'generer'
        }

        if($('#tout').is(':checked') == true){
            nongenerer = 'tout'
        }

        if($('#pre').is(':checked') == true){
            nongenerer = 'pre'
        }

        if($('#non').is(':checked')== true){
            nongenerer = 'non'
        }

        if (generer == '' && nongenerer == ''){

            $('#list_avis').attr('hidden','hidden');
            $('.alert-danger').removeAttr('hidden');
            $('.alert-danger').html('Veillez cocher un état svp...');
            return 0;
        }*/
        $.ajax({
            type: 'POST',
            url: Routing.generate('annonceliste'),
            data: {
                date1: date1,
                date2: date2,
                type: type,
                /*generer:generer,
                nongenerer:nongenerer*/
            },
            success: function (data) {
                $('#list_avis').html(data);
                $('#btn_valider').attr('disabled',false);
            }
        })
    });
    $('#formgenerer').submit(function (e) {
        $('#list_avis').removeAttr('hidden');
        $('.alert-danger').attr('hidden', 'hidden');
        $('#list_avis').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        e.preventDefault();
        var date1 = $('#dr-example-single').val();
        var date2 = $('#dr-example-single1').val();
        var type = $('#type').val();

        $.ajax({
            type: 'POST',
            url: Routing.generate('annonceliste_precalcul'),
            data: {
                date1: date1,
                date2: date2,
                type: type
            },
            success: function (data) {
                $('#list_avis').html(data);
            }
        })
    });

    $('#avisp').change(function () {
        $('#idpartientez').removeAttr('hidden');
        $('#idcache').attr('hidden', 'hidden');
        var symbol = $('#avisp').val();
        //alert(symbol);
        $.ajax({
            type: 'POST',
            url: Routing.generate('recupererinfo'),
            data: {
                symbole: symbol
            },
            success: function (data) {
                $('#Symbole').val(symbol);
                $('#designation').val(data.designationtitre);
                $('#coursV').val(data.coursVeille);
                $('#idpartientez').attr('hidden', 'hidden');
                $('#idcache').removeAttr('hidden');
            }
        })
    });

    $('#nouvo').keyup(function () {
        var nbrNouvo = $(this).val();
        var nbrAncien = $('#ancien').val();
        var coef = nbrAncien / nbrNouvo;
        $('#coef').val(coef);
        var cours = $('#coursV').val();
        var coursAjust = coef * cours;
        $('#coursAjust').val(coursAjust)

    });

    $('#ancien').keyup(function () {
        var nbrAncien = $(this).val();
        var nbrNouvo = $('#nouvo').val();
        var coef = nbrAncien / nbrNouvo;
        $('#coef').val(coef);
        var cours = $('#coursV').val();
        var coursAjust = coef * cours;
        $('#coursAjust').val(coursAjust)

    });

    $('#stockAvant').keyup(function () {
        var stockAvt = $(this).val();
        var nouvo = $('#nouvo').val();
        var stockap = stockAvt * nouvo;
        $('#stockNouvo').val(stockap);
    });

    // $('#formeAvis').submit(function (e) {
    //     $('#list_avis').removeAttr('hidden');
    //     $('.alert-danger').attr('hidden', 'hidden');
    //     $('#list_avis').empty().append(' <div  class="loader-content" >\n' +
    //         '<div class="sk-double-bounce" style="top: 2em;">\n' +
    //         '<div class="sk-child sk-double-bounce1"></div>\n' +
    //         '<div class="sk-child sk-double-bounce2"></div>\n' +
    //         '</div>\n' +
    //         '</div>'
    //     );
    //     e.preventDefault();
    //     var date1 = $('#dr-example-single').val();
    //     var date2 = $('#dr-example-single1').val();
    //     var generer = '', nongenerer = '';
    //
    //     if ($('#genere').is(':checked') == true) {
    //         generer = 'generer'
    //     }
    //
    //     if ($('#tout').is(':checked') == true) {
    //         nongenerer = 'tout'
    //     }
    //
    //     if ($('#pre').is(':checked') == true) {
    //         nongenerer = 'pre'
    //     }
    //
    //     if ($('#non').is(':checked') == true) {
    //         nongenerer = 'non'
    //     }
    //     if (generer == '' && nongenerer == '') {
    //         //a coder
    //         $('#list_avis').attr('hidden', 'hidden');
    //         $('.alert-danger').removeAttr('hidden');
    //         $('.alert-danger').html('Veillez cocher un état svp...');
    //         return 0;
    //     }
    //     $.ajax({
    //         type: 'POST',
    //         url: Routing.generate('avislist'),
    //         data: {
    //             date1: date1,
    //             date2: date2,
    //             generer: generer,
    //             nongenerer: nongenerer
    //         },
    //         success: function (data) {
    //             $('#list_avis').empty().html(data);
    //         }
    //     })
    // });

    $('#message').fadeIn().delay(8000).fadeOut();


});

function AffichargeInfo(id) {

    var symbole = $("#symbole" + id).text().trim();
    var description = $("#description" + id).text().trim();
    var deposiatire = $('#depositaire' + id).text().trim();
    var emetteur = $('#emetteur' + id).text().trim();

    $("#setSymbole").val(symbole);
    $("#setDescription").val(description);
    $("#setDepositaire").val(deposiatire);
    $("#setEmetteur").val(emetteur);
    /* ajaxs.RecuperationSymbole();*/

}

function Afficher(id) {
    var raison = $("#raisonSociale" + id).text().trim();
    $('#depositaire').val(raison);
}

function AfficherE(id) {
    var emetteur = $("#emetteur" + id).text().trim();
    $('#emetteur').val(emetteur);
}

var ajaxs = {

    RecuperationTitre: function () {
        // var typeTitre = $('#typeTitre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererTitre'),
            data: {
                // typeTitre: typeTitre
            },
            success: function (data) {
                $('#tabTitre').html(data);
            }
        });
    },

};

var ajaxSouscription = {

    RecuperationEmetteur: function () {
        $('#listeEmetteur').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_emetteur'),
            data: {},
            success: function (data) {
                $('#listeEmetteur').html(data);
            }
        })
    },
    InfoSouscription: function (id) {

        var idSoucription = $('#idT' + id).text();
        $.ajax({
            type: "POST",
            url: Routing.generate('InfoSouscriptionPlus'),
            data: {
                idSoucription: idSoucription
            },
            success: function (data) {
                $('#InfoPlus').html(data);
            }
        });
    },
    InfoSouscriptionBON: function (id) {

        var idSoucription = $('#idT' + id).text();
        $.ajax({
            type: "POST",
            url: Routing.generate('InfoSouscription_bon_Plus'),
            data: {
                idSoucription: idSoucription
            },
            success: function (data) {
                $('#InfoPlus').html(data);
            }

        });
    },
    RecuperationPrix: function () {
        var taux = $("#tauxS").val();

        if (taux == "") {
            $('#prixS').removeAttr('hidden').text('Veuillez entré un taux svp...').css('color', 'red');
            return
        } else {
            $('#prixS').removeAttr('hidden').text(' Veuillez patientez svp...').css('color', 'blue');
            $('#label').removeAttr('hidden');
        }

        var symbole = $('#symbS').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('prixSimulation'),
            data: {
                taux: taux,
                symbole: symbole
            },
            success: function (data) {
                $('#prixS').html(data).css('color', 'black');
            }
        })
    },
    RecuperationTitreAnnonce: function (titre, symb) {
        $.ajax({
            type: 'POST',
            url: Routing.generate('recupeannoncetitre'),
            data: {
                titre: titre,
                symbol: symb
            },
            success:function (data) {
               // console.log(data);
                var retour =JSON.parse(data);
                //undefined
                if (retour != null && retour !='') {
                    //alert(retour.codeclassetitre)
                    $("#esvbundle_ordreavisannonce_symbole, #ordre_avis_dividende_symbole ").val(retour.symboldefauttitre);
                    $("#esvbundle_ordreavisannonce_titre, #ordre_avis_dividende_titre").val(retour.codeclassetitre);
                    $("#esvbundle_ordreavisannonce_description,#ordre_avis_dividende_description").val(retour.designationtitre);
                    $("#esvbundle_ordreavisannonce_emetteur,#ordre_avis_dividende_emetteur").val(retour.emetteur);
                    $("#esvbundle_ordreavisannonce_place,#ordre_avis_dividende_place").val(retour.codeplacetitre);
                    $("#esvbundle_ordreavisannonce_monnaie,#ordre_avis_dividende_monnaie").val('CFA');
                    if (isNaN(retour.tauxFiscLocal)) {
                        $('#esvbundle_ordreavisannonce_fiscalite').val(0);
                    } else {
                        $('#esvbundle_ordreavisannonce_fiscalite').val(retour.tauxFiscLocal);
                    }
                    if ((titre) == 'obligation') {
                        if (isNaN(retour.tauxBrutObligation)) {
                            $('#esvbundle_ordreavisannonce_tauxBrut').val(0);
                        } else {
                            $('#esvbundle_ordreavisannonce_tauxBrut').val(retour.tauxBrutObligation);
                        }

                        if (isNaN(retour.tauxNetObligation)) {
                            $('#esvbundle_ordreavisannonce_tauxNet').val(0);
                        } else {
                            $('#esvbundle_ordreavisannonce_tauxNet').val(retour.tauxNetObligation);
                        }
                    } else {
                        if ((titre) == 'action') {
                            if (isNaN(retour.tauxBrutAction)) {
                                $('#esvbundle_ordreavisannonce_tauxBrut').val(0);
                            } else {
                                $('#esvbundle_ordreavisannonce_tauxBrut').val(retour.tauxBrutAction);
                            }

                            if (isNaN(retour.tauxNetAction)) {
                                $('#esvbundle_ordreavisannonce_tauxNet').val(0);
                            } else {
                                $('#esvbundle_ordreavisannonce_tauxNet').val(retour.tauxNetAction);
                            }
                        } else {
                            if (isNaN(retour.tauxBrutTcn)) {
                                $('#esvbundle_ordreavisannonce_tauxBrut').val(0);
                            } else {
                                $('#esvbundle_ordreavisannonce_tauxBrut').val(retour.tauxBrutTcn);
                            }

                            if (isNaN(retour.tauxNetTcn)) {
                                $('#esvbundle_ordreavisannonce_tauxNet').val(0);
                            } else {
                                $('#esvbundle_ordreavisannonce_tauxNet').val(retour.tauxNetTcn);
                            }
                        }

                    }

                    if (typeof( retour.modeAmortissement) != 'undefined'){
                        $('#esvbundle_ordreavisannonce_amortiss').attr('checked','checked');
                    }
                    $('#cache1').attr('hidden','hidden');
                    //$('#cache').removeAttr('hidden');
                }else {
                    $('#cache1').attr('hidden','hidden');
                   // $('#cache').removeAttr('hidden');
                    alert('Désolé les données n arrive pas à se charger. Contactez l administrateur!!\'')
                    //$('#cache1').html('Désolé les données n arrive pas à se charger. Contactez l administrateur!!');

                }
            }
        })
    },
    RecuperationAnnonce: function () {
        $.ajax({
            type: 'POST',
            url: Routing.generate('recupererAnnonce'),
            data: {},
            success: function (data) {
                $('#annonce').html(data);
            },
            error: function (error) {
                alert(error);
            }
        })
    },
    RecuperationAnnonceDividende: function () {
        $.ajax({
            type: 'POST',
            url: Routing.generate('recupererAnnonceDividende'),
            data: {},
            success: function (data) {
                $('#annonce').html(data);
            }
        })
    },

    RecuperationAvis: function () {
        $.ajax({
            type: 'POST',
            url: Routing.generate('recupereravisannonce'),
            data: {},
            success: function (data) {
                $('#avis').html(data);
            }
        })
    }
};

var ajaxSouscriptionDepositaire = {

    RecuperationDepositaire: function () {
        $('#listeDepositaire').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_depositaire'),
            data: {},
            success: function (data) {
                $('#listeDepositaire').html(data);
            }
        })
    }

};