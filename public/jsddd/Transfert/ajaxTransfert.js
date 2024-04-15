var libelleCotation = '';
var classeTitre = '';
var ajax_transfert = {

    RecuperationTitre: function () {
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererTitre'),
            data: {
                typeTitre: typeTitre
            },
            success: function (data) {
                $('#tabTitre').html(data);
            }
        });
    },

    Suppression: function (id) {
        //alert('ok');
        var child = $('#delete' + id).closest('tr').find('td');
        var attrChild = child.attr('id');
        var idLigne = $('#' + attrChild).html();
        $('#idLigneSupprimer').val(idLigne);
        $('#mySupprimerCom').modal('show');
        // alert(attrChild);

    },

    RecuperationSymbole: function () {
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        var symbole = $('#setSymbole').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererSym'),
            data: {
                symbole: symbole,
                typeTitre: typeTitre
            },
            success: function (data) {
                $('#divCours').html(data);
            }
        });
    },

    chargerCompte_Ordinaire_BEL: function () {
        var numCompte = $('#compteClient').val();
        console.log(numCompte);

        $.ajax({
            type: "GET",
            url: Routing.generate('recuperer_compte_bel'),
            data: {
                numCompte: numCompte
            },
            success: function (data) {
                if (data != null && data != '') {
                    var retour = JSON.parse(data);
                    console.log(data, retour);
                    $('#numCompteBourseEnLigne').val(retour.numCompte);
                    $('#intituleCompteBourseEnLigne').val(retour.intitule);
                }
            },
            error:function(error){
            var msg='Erreur lors de la récupération'+' '+error.message;
            alert(msg);
        }
        });
    },

    chargerCompte_Ordinaire_Souscompte: function () {
        var numCompte = $('#compteClient').val();
        console.log(numCompte);
        $('#souscompteClient').trigger("chosen:updated");
        $('#souscompteClient').trigger("change");
        $.ajax({
            type: "GET",
            url: Routing.generate('recuperer_compte_ordinaire'),
            data: {
                numCompte: numCompte
            },
            success: function (data) {
                console.log(data);
                if (data != null && data != '') {
                    $('#souscompteClient').empty(); //remove all child nodes
                    $('#souscompteClient').append(data);
                    $('#souscompteClient').trigger("chosen:updated");
                    $('#souscompteClient').trigger("change");

                }else{
                        var msg='aucun sous compte';
                        alert(msg);
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération'+' '+error.message;
                alert(msg);
            }
        });
    },

    chargerCompte_Ord: function () {
        var retour;
        var compteBourseEnLigne = document.getElementById('compteBourseEnLigne');

        if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
            $('#compteBourseEnLigne').trigger("chosen:updated");
            $('#compteBourseEnLigne').trigger("change");
        }
        var compteClient = document.getElementById('compteClient');
        if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
            $('#compteClient').trigger("chosen:updated");
            $('#compteClient').trigger("change");
        }
        $.ajax({
            type: "GET",
            url: Routing.generate('charger_compte_ord'),
            // data: {
            //     typeTitre: typeTitre
            // },
            success: function (data) {
                console.log(data);
                if (data != null) {

                    var newOption = data;
                    if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
                        $('#compteBourseEnLigne').empty(); //remove all child nodes
                        $('#compteBourseEnLigne').append(newOption);
                        $('#compteBourseEnLigne').trigger("chosen:updated");
                        $('#compteBourseEnLigne').trigger("change");
                    } else {
                        if (compteClient != null && compteClient != '') {
                            $('#compteClient').empty(); //remove all child nodes
                            $('#compteClient').append(newOption);
                            $('#compteClient').trigger("chosen:updated");
                            $('#compteClient').trigger("change");
                        }

                    }
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération'+' '+error.message+'\n'+'Veuillez actualiser svp';
                alert(msg);
            }
        });
    },

    chargerCompte_Ord2: function () {
        var retour;
        var souscompteClient = document.getElementById('souscompteClient');
        if (souscompteClient != null && souscompteClient != '') {
            $('#souscompteClient').trigger("chosen:updated");
            $('#souscompteClient').trigger("change");
        }
        $.ajax({
            type: "GET",
            url: Routing.generate('charger_compte_ord'),
            // data: {
            //     typeTitre: typeTitre
            // },
            success: function (data) {
                console.log(data);
                if (data != null && data!=[]) {
                    var newOption = data;
                    if (souscompteClient != null && souscompteClient != '') {
                        var radiosouscompte = $('#SousCompte').val();
                        var radioordinaire = $('#ordinaire').val();
                        if (radiosouscompte != null && radiosouscompte != '' || radioordinaire != null && radioordinaire != '') {
                            $('#souscompteClient').empty(); //remove all child nodes
                            $('#souscompteClient').append(newOption);
                            $('#souscompteClient').trigger("chosen:updated");
                            $('#souscompteClient').trigger("change");
                        }

                    }
                }else{
                    var msg='pas de compte';
                    alert(msg);
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération'+' '+error.message;
                alert(msg);
            }
        });
    },

    charger_SGI: function () {
        var retour;
        $.ajax({
            type: "GET",
            url: Routing.generate('charger_liste_sgi"'),
            // data: {
            //     typeTitre: typeTitre
            // },
            success: function (data) {
                console.log(data);
                if (data != null) {
                    $('#sgi').empty(); //remove all child nodes
                    var newOption = data;
                    $('#sgi').append(newOption);
                    $('#sgi').trigger("chosen:updated");
                    $('#sgi').trigger("change");
                    $("#sgi").attr('hidden', 'hidden');
                }
            }
        });
    },

    precalcul_Transfert_bel: function () {
        $("#cache2").removeAttr('hidden', 'hidden');
        var titre = $('#symbol').val();
        var typeTitre = $('#boursebundle_transferttitre_typeTitre').val();
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }
        var sens = $('#sens').val();
        console.log(sens);
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }
        var compteClient = document.getElementById('compteClient');

        if (compteClient != null && compteClient != '') {
            if (sens == 'Vers Compte Bourse En Ligne') {
                var numCompte = $("#compteClient").val();
            } else {
                if (sens == 'Vers Compte Ordinaire') {
                    var numCompte = $("#numCompteBourseEnLigne").val();
                }
            }
        }
        var qte = $('#quantite').val();

        var libelleCotation = $('#libelleCotation').val();
        var classeTitre = $('#classeTitre').val();
        var comDepositaire = $('#comDepositaire').val();
        var total = 0;

        // titre='BOAD.O12';
        // numCompte='0116000011';
        // typeTitre='OBLIGATION';
        // libelleCotation='Côté';
        // classeTitre='OBLIGATION';
        var typeClient = $('#compteClient').data('typeclient');

        console.log(sens, numCompte, titre, typeTitre, typeClient);
        $('#retourErreurCommission').html("");
        $('#divRetourErreurCommission').hide();
        $.ajax({
            type: "POST",
            url: Routing.generate('precalculer_transfert'),
            data: {
                titre: titre,
                typeTitre: typeTitre,
                libelleCotation: libelleCotation,
                classeTitre: classeTitre,
                numcompteclient: numCompte,
                typeClient: typeClient
            },
            success: function (data) {
                console.log(data);
                var retour = JSON.parse(data);
                if (data != null && retour != null) {

                    var message = retour.message;
                    if (message === 'ok')
                    {
                        console.log(retour, retour.cump);
                        var taf = 0;
                        var irvm = 0;
                        var valeurHB = 0;
                        var interetTotal = 0;
                        $('#cump').val(retour.cump);
                        $('#valeurHb').val(retour.cump * qte);

                        $('#divRetourErreurCommission').hide();
                    }
                    else
                    {
                        $('#retourErreurCommission').html(message);
                        $('#divRetourErreurCommission').show();
                    }


                }else {
                    $('#cump').val(0);
                    $('#valeurHb').val(0);
                    $('#comTransfert').val(0);
                    $('#total').val(0);
                    $('#taxe').val(0);
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération de la commission ou du cump du titre'+'\n'+error.message;
                alert(msg);
            }
        });
    },
    precalcul_Transfert: function () {
        $("#cache2").removeAttr('hidden', 'hidden');
        var titre = $('#symbol').val();
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre_typeTitre_chosen').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre_typeTitre').val();
        }
        var cours = $('#coursTitre').val();
        var qte = $('#quantite').val();
        var sens = $('#sens').val();
        // if (sens == null || sens == '') {
        //     var sens = $('#boursebundle_transferttitre[sens]').val();
        // }
        // if (sens == null || sens == '') {
        //     var sens = $('#boursebundle_transferttitre_sens').val();
        // }
        var libelleCotation = $('#libelleCotation').val();
        var classeTitre = $('#classeTitre').val();
        var comDepositaire = $('#comDepositaire').val();
        var total = 0;

        var compteClient = document.getElementById('compteClient');

        if (compteClient != null && compteClient != '') {
            if (sens == 'Vers Compte Ordinaire' || sens == 'Vers Sous Compte Ordinaire') {
                var numCompte = $("#compteClient").val();
            } else {
                if (sens == 'Sous Compte Vers Compte Ordinaire') {
                    var numCompte = $("#souscompteClient").val();
                }
            }
        }
        var typeClient = $('#compteClient').data('typeclient');

        // titre='BOAD.O12';
        // numCompte='0116000011';
        // typeTitre='OBLIGATION';
        // libelleCotation='Côté';
        // classeTitre='OBLIGATION';
        console.log(sens,numCompte, titre, typeTitre, typeClient);
        $('#retourErreurCommission').html("");
        $('#divRetourErreurCommission').hide();
        $.ajax({
            type: "POST",
            url: Routing.generate('precalculer_transfert'),
            data: {
                titre: titre,
                typeTitre: typeTitre,
                libelleCotation: libelleCotation,
                classeTitre: classeTitre,
                numcompteclient: numCompte,
                typeClient: typeClient
            },
            success: function (data) {
                console.log(data);
                var retour = JSON.parse(data);
                if (data != null && data != []) {
                    console.log(retour, sens);
                    var message = retour.message;
                    console.log(message);
                    if (message === "ok")
                    {
                        console.log("ok");
                        var taf = 0;
                        var irvm = 0;
                        var valeurHB = 0;
                        var interetTotal = 0;
                        $('#cump').val(retour.cump);
                        $('#valeurHb').val(retour.cump * qte);
                        //if (sens == 'Départ') {
                        // console.log(retour.valeurMinimale);
                        $('#comTransfert').val(retour.valeurMinimale);
                        taf = ((retour.tauxTaf * retour.valeurMinimale) / 100);
                        total = (parseFloat(taf) + parseFloat(retour.valeurMinimale) + parseFloat(comDepositaire));
                        $('#taxe').val(taf);
                        //$('#total').val(total);
                        /*} else {
                            $('#comTransfert').val(0);
                            $('#taxe').val(0);
                            $('#total').val(comDepositaire);
                        }*/

                        $('#divRetourErreurCommission').hide();
                    }
                    else
                    {
                        $('#retourErreurCommission').html(message);
                        $('#divRetourErreurCommission').show();
                        // console.log($('#retourErreurCommission'))
                    }

                } else {
                    $('#cump').val(0);
                    $('#valeurHb').val(0);
                    $('#comTransfert').val(0);
                    $('#total').val(0);
                    $('#taxe').val(0);


                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération de la commission ou du cump du titre'+'\n'+error.message;
                alert(msg);
            }
        });
    },

    searchCustomer: function () {
        if ($(" #boursebundle_ordre_numCompte").val().length >= 3) {
            var keyword = $("#boursebundle_ordre_numCompte").val();
            console.log(keyword);
            $.ajax({
                type: "POST",
                url: Routing.generate('Ordre_rechercherClient'),
                data: {keyword: keyword},
                beforeSend: function () {
                    $("#boursebundle_ordre_numCompte").css("background", "#F4f4f4 url(../../frontend/img/Loarder.gif) no-repeat 500px");
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    console.log(obj);
                    dataUserSend = obj.data;

                    $("#suggesstion-box").show();
                    $(" #suggesstion-box").html(obj.html);
                    $("#boursebundle_ordre_numCompte").css("background", "#FFF");
                },
                error:function(error){
                    var msg='Erreur lors de la récupération du compte client'+'\n'+error.message;
                    alert(msg);
                }
            });

        } else {
            $("  #boursebundle_ordre_numCompte").css("background", "#FFF");
            // $(".containerFormsDat :input").reset();
            $(".containerFormsDat :input").prop("disabled", true);
            $('.containerFormsDat button').prop("disabled", true);
        }

    },

    searchCompteClient: function (typeRecherche) {
        if ($(" #txt_recherche").val().length >= 3) {
            if (typeRecherche == 'depart') {
                var keyword = $("#txt_recherche").val();
                $("#cache1").removeAttr('hidden', 'hidden');
                $("#client_search_result").html();
            }
            else {
                if (typeRecherche == 'arrive') {

                    var keyword = $("#txt_recherche2").val();
                    $("#cache2").removeAttr('hidden', 'hidden');
                    $("#client_search_result2").html()
                }
                else {
                    if (typeRecherche == 'operationBourse' || typeRecherche == 'ordreBourse'
                    || typeRecherche=='transfertCpteOrdBEL' || typeRecherche=='demandeNantissement') {

                        var keyword = $("#txt_recherche").val();
                        $("#cache1").removeAttr('hidden', 'hidden');
                        $("#client_search_result").html()
                    }
                }
            }
            console.log(keyword);
            $.ajax({
                type: "POST",
                url: Routing.generate('Ordre_rechercherClient'),
                data: {
                    keyword: keyword,
                    typeRecherche: typeRecherche
                },
                beforeSend: function () {
                    $("#boursebundle_ordre_numCompte").css("background", "#F4f4f4 url(../../frontend/img/Loarder.gif) no-repeat 500px");
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    console.log(obj.html);
                    dataUserSend = obj.data;
                    if (typeRecherche == 'depart') {
                        $("#client_search_result").show();
                        $(" #client_search_result").html(obj.html);
                        $("#boursebundle_ordre_numCompte").css("background", "#FFF");
                        $("#cache1").attr('hidden', 'hidden');
                    } else {
                        if (typeRecherche == 'arrive') {
                            $("#client_search_result2").show();
                            $(" #client_search_result2").html(obj.html);
                            $("#boursebundle_ordre_numCompte").css("background", "#FFF");
                            $("#cache2").attr('hidden', 'hidden');
                        } else {

                            if (typeRecherche == 'operationBourse' || typeRecherche == 'ordreBourse'
                                || typeRecherche=='transfertCpteOrdBEL' || typeRecherche=='demandeNantissement') {
                                $("#client_search_result").show();
                                $(" #client_search_result").html(obj.html);
                                $("#client").css("background", "#FFF");
                                $("#cache1").attr('hidden', 'hidden');
                            }
                        }
                    }
                },
                error: function (error) {
                    var msg = 'Erreur lors de la récupération du compte client' + '\n' + error.message;
                    alert(msg);
                }
            });
        }else {
            $("  #boursebundle_ordre_numCompte").css("background", "#FFF");
            // $(".containerFormsDat :input").reset();
            $(".containerFormsDat :input").prop("disabled", true);
            $('.containerFormsDat button').prop("disabled", true);
        }
    }
,



    selectName: function (intitule, numCompte,type, typeClient =null) {
        console.log('oui');
        // var compteBourseEnLigne = document.getElementById('compteBourseEnLigne');
        //
        // if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
        //     $('#compteBourseEnLigne').trigger("chosen:updated");
        //     $('#compteBourseEnLigne').trigger("change");
        // }
        // var compteClient = document.getElementById('compteClient');
        // if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
        //     $('#compteClient').trigger("chosen:updated");
        //     $('#compteClient').trigger("change");
        // }
        //
        // if (compteBourseEnLigne != null && compteBourseEnLigne != '') {
        //     $("#hidden_input_for_id_compte").val(numCompte);
        //     $('#compteBourseEnLigne').text(intitule);
        //     $('#compteBourseEnLigne').append(intitule);
        //     $('#compteBourseEnLigne').trigger("chosen:updated");
        //     $('#compteBourseEnLigne').trigger("change");
        // } else {
        //     if (compteClient != null && compteClient != '') {
        //         $("#hidden_input_for_id_compte").val(numCompte)
        //         $('#compteClient').text(intitule);
        //         $('#compteClient').append(intitule);
        //         $('#compteClient').trigger("chosen:updated");
        //         $('#compteClient').trigger("change");
        //
        //     }
        //
        // }


        if(type=='depart'|| type=='transfertCpteOrdBEL') {
            $("#compteClient").val(numCompte);
            $("#compteClient").data('typeclient', typeClient);
            $("#intituleCompteOrdinaire").val(intitule);
            console.log($("#compteClient").data('typeclient'))

            if(type=='transfertCpteOrdBEL') {
                // alert('ent');
                this.chargerCompte_Ordinaire_BEL();
            }
            $(".close").trigger('click');
            // $("#rechercheClient").modal('hide');
        }else{
            if(type=='arrive') {
                $("#compteClientOrdinaire").val(numCompte);
                $("#compteClientOrdinaire").data('typeclient', typeClient);
                $("#intituleCompteOrdinaire2").val(intitule);
                $(".close").trigger('click');

            }else{
                if(type=='operationBourse' || type == 'ordreBourse' || type=='demandeNantissement' ) {
                    $("#client").val(numCompte);
                    $("#client").data('typeclient',typeClient);
                    $("#intituleclient").val(intitule);
                    $(".close").trigger('click');

                }
            }
        }
        $("#hidden_input_for_id_compte").val(numCompte);
        $("#boursebundle_ordre_numCompte").val(intitule);
        $(".close").trigger('click');


    },

}