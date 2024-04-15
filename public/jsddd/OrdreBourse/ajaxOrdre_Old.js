var ajax_ordre_old = {

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
    RecuperationListeTitre: function () {

        // console.log('dov');
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre_typeTitre').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre_typeTitre_chosen').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre[typeTitre]').val();
        }
        console.log(typeTitre);
        $("#cache1").removeAttr('hidden', 'hidden');
        $('#symbol').trigger("chosen:updated");
        $('#symbol').trigger("change");

        $.ajax({
            type: "POST",
            url: Routing.generate('liste_Titre_By_TypeTitre'),
            data: {
                typeTitre: typeTitre
            },
            success: function (data) {
                // console.log(data);
                var newOption = data;
                console.log(newOption);
                console.log($('#symbol').html());
                $('#symbol').empty(); //remove all child nodes
                // console.log($("#symbol"));
                $('#symbol').append(newOption);
                // console.log(newOption);
                console.log($('#symbol').html());

                $('#symbol').trigger("chosen:updated");
                // $('#symbol').trigger("change");
                $("#cache1").attr('hidden', 'hidden');
                // console.log($("#symbol"));

                $('#symbol').trigger("change");
            },
            error:function(error){
                var msg='Erreur lors de la récupération de la liste des titres'+' '+error.message;
                alert(msg);
            }
        });
    },
    RecuperationInformationTitre: function () {
        var titre = $('#symbol').val();
        // alert(titre);
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre_typeTitre').val();
        }
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#boursebundle_transferttitre[typeTitre]').val();
        }
        //console.log(typeTitre);
        // $('#orderform').show();
        $('#orderform').html('<option><b>Veuillez patienter svp...</b></option>').css('color','green');
        $.ajax({
            type: "POST",
            url: Routing.generate('Recuperation_information_titre'),
            data: {
                titre: titre,
                typeTitre: typeTitre
            },
            // $('#listeTitre').html(data);
            success: function (data) {

                 if (data != null || data !== '')
                 {
                     var coursReel = data.coursreel;
                     console.log(data,coursReel);

                     var marge = coursReel * 0.075;
                     var coursSup = parseFloat(coursReel) + parseFloat(marge);
                     var coursInf = parseFloat(coursReel) - parseFloat(marge);
                     //console.log(marge,coursInf,coursSup);
                     $('#courInf').val(coursInf);
                     $('#courSup').val(coursSup);
                     $("#prixUnitaire").val(coursReel);
                     // var courInf = document.getElementById('courInf');
                     //var courSup = document.getElementById('courSup');
                     // if (courInf != null) {
                     //     console.log(courSup);
                     //     if (retour.coursSeance != null || retour.coursSeance != '')
                     //         $('#courInf').val(retour.coursSeance);
                     //     else
                     //         $('#courInf').val(retour.cours);
                     // }
                     // if (courSup != null) {
                     //     if (retour.coursReference != null || retour.coursReference != '')
                     //         $('#courSup').val(retour.coursReference);
                     //     else
                     //         $('#courSup').val(retour.cours);
                     // }

                    // var coursTitre = document.getElementById('coursTitre');
                    // if (coursTitre != null) {
                    //     // console.log(retour.coursSeance);
                    //     if (retour.coursSeance != null || retour.coursSeance != '')
                    //         $('#coursTitre').val(retour.coursSeance);
                    //     else
                    //         $('#coursTitre').val(retour.cours);
                    // }
                    var designationTitre = document.getElementById('designationTitre');
                    if (designationTitre != null) {
                        if (retour.designationtitre != null || retour.designationtitre != '')
                            $('#designationTitre').val(retour.designationtitre);
                        else
                            $('#designationTitre').val( $('#symbol').val() );
                    }
                    var placeTitre = document.getElementById('placeTitre');
                    if (placeTitre != null) {
                        if (retour.codeplacetitre != null || retour.codeplacetitre != '')
                            $('#placeTitre').val(retour.codeplacetitre);
                    }
                    var depositaire = document.getElementById('depositaire');
                    if (depositaire != null) {
                        if (retour.sigledepositaire != null || retour.sigledepositaire != '')
                            $('#depositaire').val(retour.sigledepositaire+' - '+retour.raisonSocialedepositaire);
                    }
                    var classeTitre = document.getElementById('classeTitre');
                    if (classeTitre != null) {
                        if (retour.codeclassetitre != null || retour.codeclassetitre != '')
                            $('#classeTitre').val(retour.codeclassetitre);
                    }
                    var libelleCotation = document.getElementById('libelleCotation');
                    if (libelleCotation != null) {
                        if (retour.libellecotation != null || retour.libellecotation != '')
                            $('#libelleCotation').val(retour.libellecotation);
                    }
                    var cump = document.getElementById('cump');
                    if (cump != null) {
                        // $('#cump').val(retour.cump);
                    }
                    // }
                    $('#orderform').hide();
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération des informations du titre'+' '+error.message;
                alert(msg);
            }
        });
    },

    RecuperationCommissionCourtage: function () {
        $("#cache2").removeAttr('hidden', 'hidden');
        var titre = $('#symbol').val();
        var typeTitre = $('#boursebundle_ordre_typeTitre').val();
        if (typeTitre == null || typeTitre == '') {
            var typeTitre = $('#typeTitre').val();
        }
        //alert(titre);
        var numCompte = $("#client").val();
        var cours = $('#coursTitre').val();
        var qte = $('#quantiteDemande').val();
        var role = $('#boursebundle_operationbourse_role').val();
        var cump = $('#cump').val();
        // console.log(numCompte,cours,qte,role);
        $.ajax({
            type: "POST",
            url: Routing.generate('Recuperation_information_titre'),
            data: {
                titre: titre,
                typeTitre: typeTitre
            },
            success: function (data) {
                var ret= JSON.parse(data);
                var retour1=ret.infoTitre
                 console.log( retour1.codeplacetitre,retour1.libellecotation,retour1.codeclassetitre);
                 //console.log( retour1);
                $('#commissionDepositaire').val(0);
                $('#commissionPlace').val(0);
                $('#commissionSgi').val(0);
                $('#interetCouru').val(0);
                $('#taf').val(0);
                $('#irvm').val(0);
                $('#boursebundle_operationbourse_valeur').val(
                    (0)
                );
                $.ajax({
                    type: "POST",
                    url: Routing.generate('Recuperation_Commissions_Courtage'),

                    data: {
                        numCompte: numCompte,
                        brut: (cours * qte),
                        role: role,
                        numOrdre: '',
                        place: retour1.codeplacetitre,
                        // place: 'BRVM',
                        libelleCotation: retour1.libellecotation,
                        // libelleCotation: 'Coté',
                        classeTitre: retour1.codeclassetitre,
                        // classeTitre: 'ACTION',
                        prenotation: false,
                        symbol: titre
                    },
                    success: function (donnee) {
                        console.log(donnee);
                        if (donnee != null) {
                            var retour = JSON.parse(donnee);
                            //console.log(retour);
                            var taf = 0;
                            var irvm = 0;
                            var plusOuMoinsValue = 0;
                            var interetTotal = 0;
                            if (retour != null)
                            {
                                $('#commissionDepositaire').val(retour.commissionDepositaire);
                                $('#commissionPlace').val(retour.commissionPlace);
                                $('#commissionSgi').val(retour.commissionCourtage);
                                console.log(retour.tauxTaf);
                                taf = ((retour.tauxTaf * retour.commissionCourtage) / 100);
                                interetTotal = retour.interet * qte;

                                $('#interetCouru').val(interetTotal);
                                $('#taf').val(taf);

                                if (role === 'Vente')
                                {
                                    plusOuMoinsValue = (cours * qte) - (retour.cump * qte);
                                    if (plusOuMoinsValue > 0) {
                                        irvm = (plusOuMoinsValue * retour.tauxirvm) / 100;
                                    }
                                    $('#irvm').val(irvm);
                                    $('#boursebundle_operationbourse_valeur').val(
                                        (cours * qte)
                                        - retour.commissionDepositaire
                                        - retour.commissionPlace
                                        - retour.commissionCourtage
                                        + interetTotal
                                        - taf
                                        - irvm
                                    );
                                } else {
                                    $('#boursebundle_operationbourse_valeur').val(
                                        (cours * qte)
                                        + retour.commissionDepositaire
                                        + retour.commissionPlace
                                        + retour.commissionCourtage
                                        + interetTotal
                                        + taf
                                        + irvm
                                    );
                                }


                                /*
                                Les champs cachés pour enregistrer l'historique des commissions appliquees pour le client
                                 */
                                $('#codeProfilCourtage').val(retour.codeProfilCourtage);
                                $('#commissionCourtageAppliquer').val(retour.commissionCourtage);
                                $('#estTauxCourtageAppliquer').val(retour.estTauxCourtage);
                                $('#palierIDCourtageAppliquer').val(retour.idPalierCourtage);
                                $('#valeurCommissionCourtageAppliquer').val(retour.valeurAppliquerCourtage);

                                $('#codeProfilPlace').val(retour.codeProfilPlace);
                                $('#commissionPlaceAppliquer').val(retour.commissionPlace);
                                $('#estTauxPlaceAppliquer').val(retour.estTauxPlace);
                                $('#palierIDPlaceAppliquer').val(retour.idPalierPlace);
                                $('#valeurCommissionPlaceAppliquer').val(retour.valeurAppliquerPlace);

                                $('#codeProfilDepositaire').val(retour.codeProfilDepositaire);
                                $('#commissionDepositaireAppliquer').val(retour.commissionDepositaire);
                                $('#estTauxDepositaireAppliquer').val(retour.estTauxDepositaire);
                                $('#palierIDDepositaireAppliquer').val(retour.idPalierDepositaire);
                                $('#valeurCommissionDepositaireAppliquer').val(retour.valeurAppliquerDepositaire);


                            }
                            else
                                {
                                $('#commissionDepositaire').val(0);
                                $('#commissionPlace').val(0);
                                $('#commissionSgi').val(0);
                                $('#interetCouru').val(0);
                                $('#taf').val(0);
                                $('#irvm').val(0);
                                $('#boursebundle_operationbourse_valeur').val(
                                    (0)
                                );
                            }
                            $("  #loader").css("background", "#FFF");
                            $("#loader-box").hide();
                            $("#cache2").attr('hidden', 'hidden');
                        } else {
                            $('#commissionDepositaire').val(0);
                            $('#commissionPlace').val(0);
                            $('#commissionSgi').val(0);
                            $('#interetCouru').val(0);
                            $('#taf').val(0);
                            $('#irvm').val(0);
                            $('#boursebundle_operationbourse_valeur').val(
                                (0)
                            );
                        }
                    }
                //
                });

            },
            error:function(error){
                var msg='Erreur lors de la récupération des commissions'+' '+error.message;
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
                    var msg='Erreur lors de la récupération du compte client'+' '+error.message;
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

    selectName: function (intitule, numCompte) {
        $("#hidden_input_for_id_compte").val(numCompte);
        $("#boursebundle_ordre_numCompte").val(intitule);
        $("#suggesstion-box").hide();

    },

    listeOrdresCarnet: function (numSeance) {
        var numSeance =numSeance;
        if (numSeance == null || numSeance == '') {
            var typeTitre = $('#typeTitre').val();
        }
        console.log(numSeance);
        //$('#orderform').html('<option><b>Veuillez patienter svp...</b></option>');
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_ordres_carnet'),
            data: {
                numSeance: numSeance
            },
            // $('#listeTitre').html(data);
            success: function (data) {
                console.log(data);
                if (data != null || data != '') {
                    var retour = JSON.parse(data);
                }
            },
            error:function(error){
                var msg='Erreur lors de la récupération des ordres'+' '+error.message;
                alert(msg);
            }
        });
    },

}