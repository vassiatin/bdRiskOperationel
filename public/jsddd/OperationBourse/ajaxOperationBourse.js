var ajax_operationBourse = {


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
                if (data != null && data != '' && data != []) {

                var ret = JSON.parse(data);
                var retour1 = ret.infoTitre
                console.log(retour1.codeplacetitre, retour1.libellecotation, retour1.codeclassetitre);
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
                        libelleCotation: retour1.libellecotation,
                        classeTitre: retour1.codeclassetitre,
                        prenotation: false,
                        symbol: titre
                    },
                    success: function (donnee) {

                        if (donnee != null && donnee!='') {
                            console.log('ret', donnee);
                            var retour = JSON.parse(donnee);
                            console.log(retour);
                            var taf = 0;
                            var irvm = 0;
                            var plusOuMoinsValue = 0;
                            var interetTotal = 0;
                            if (retour != null) {
                                $('#commissionDepositaire').val(retour.commissionDepositaire);
                                $('#commissionPlace').val(retour.commissionPlace);
                                $('#commissionSgi').val(retour.commissionCourtage);
                                console.log(retour.cump);
                                taf = Math.round(((retour.tauxTaf * retour.commissionCourtage) / 100));
                                interetTotal = Math.round(retour.interet * qte);

                                $('#interetCouru').val(interetTotal);
                                $('#taf').val(taf);
                                $('#cump').val(Math.round(retour.cump));
                                if (role == 'Vente') {
                                    plusOuMoinsValue = (cours * qte) - (retour.cump * qte);
                                    if (plusOuMoinsValue > 0) {
                                        irvm = Math.round((plusOuMoinsValue * retour.tauxirvm) / 100);
                                    }
                                    $('#irvm').val(irvm);
                                    $('#boursebundle_operationbourse_valeur').val(Math.round(
                                        (cours * qte)
                                        - retour.commissionDepositaire
                                        - retour.commissionPlace
                                        - retour.commissionCourtage
                                        + interetTotal
                                        - taf
                                        - irvm)
                                    );
                                } else {
                                    $('#boursebundle_operationbourse_valeur').val(Math.round(
                                        (cours * qte)
                                        + retour.commissionDepositaire
                                        + retour.commissionPlace
                                        + retour.commissionCourtage
                                        + interetTotal
                                        + taf
                                        + irvm)
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

                });
            }else{
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
            },
            error:function(error){
                var msg='Erreur lors de la récupération des commissions'+' '+error.message;
                alert(msg);
            }
        });
    },


    Liste_ayant_droit_titre: function () {
        var date = $('#date').val();
        var symbole = $('#symbol').val();
        $('#loader').show();
        $('#loader').css("visibility", "visible");
        $('#list_ayant_droit').empty();
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_ayant_droit_titre'),
            data: {
                date: date,
                symbole: symbole
            },
            success: function (data) {
                $('#loader').css("visibility", "hidden");
                // $('#loader').attr("hidden", "hidden");
                $('#list_ayant_droit').html(data);
            },
            error:function(error){
                var msg='Erreur lors de la récupération des ayants droits '+' '+error.message;
                alert(msg);
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
}