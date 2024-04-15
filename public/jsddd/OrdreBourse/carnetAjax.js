var ajax_carnet = {
    createSeance: function (e) {
        $('#loader').removeAttr("hidden").css("visibility", "visible");
        var dateSeance = $('#dateSeance').val();
        var palce = $('#placeBoursiere').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('creer_seance'),
            data: {dateSeance: dateSeance, palce: palce},
            success: function (data) {
                if (data === 404) {
                    $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSeance').removeClass('alert alert-info').addClass('alert alert-danger').html('Il se peut que certaines séances sont pas encore fermer ou la séance que vous voulez créer existe. Veullez fermer les précedente ou choisissez une autre date!!!')
                        .fadeIn().delay(20000).fadeOut();
                } else {
                    if (data === 405) {
                        $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                        $('#retourSeance').removeClass('alert alert-info').addClass('alert alert-danger').html('Fermer les séances précédentes avant de pouvoir créer d\'autre!!!')
                            .fadeIn().delay(8000).fadeOut();
                    } else {
                        $('#div_seance').html(data);
                        $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                        $('#retourSeance').removeClass('alert alert-danger').addClass('alert alert-info').html('La séance à été créée! Veullez lui ajouter un régistre!!')
                            .fadeIn().delay(8000).fadeOut();
                    }
                }
            }
        })
    },
    createRegiste: function () {
        $('#loadercreateRegistre').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#numSeance').val();
        var dateSeance = $('#dateRegistre').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('create_registre'),
            data: {numSeance: numSeance, dateSeance: dateSeance},
            success: function (data) {
                if (data === 500) {
                    alert('une erreur est survenue!! Réssayer ou contacter l\'administrateur');
                    return 0;
                }
                var code = data.statutCode;
                if (code === 404) {
                    $('#loadercreateRegistre').css("visibility", "visible").attr('hidden', 'hidden');
                    $('#retourRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour).fadeIn().delay(6000).fadeOut();
                } else {
                    $('#loadercreateRegistre').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourRegistre').removeClass('alert alert-danger').addClass('alert alert-info alert-alt').html(data.messageRetour).fadeIn().delay(6000).fadeOut();
                }
            }
        })
    },

    //CETTE FONCTION PERMET D'AFFICHER LA LISTE DES ORDRES SUCCEPTIBLE D'ALLER SUR LE MARCHE
    listeOrdresCarnet: function (numSeance) {
        $('#tabOrdre').empty();
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numRegistre = $('#IDregistre').val();
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_ordres_carnet'),
            data: {
                numRegistre: numRegistre
            },
            success: function (data) {
                if (data != null || data != '') {
                    $('#tabOrdre').html(data);
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                }
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des ordres' + ' ' + error.message;
                alert(msg);
            }
        });
    },


    loardRegistre: function () {
        $('#loarderRegistre').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        var registre = $("#registreSimple").val();
        if (registre === 'regsitre simple') {
            var typeRetour = registre;
        } else {
            var typeRetour = '';
        }
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_registre'),
            data: {
                numSeance: numSeance,
                typeRetour: typeRetour
            },
            success: function (data) {
                if (data != null || data != '') {
                    $('#retourListRegistre').html(data);
                    $('#loarderRegistre').css("visibility", "hidden").attr('hidden', 'hidden');
                }
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des ordres' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    listOrdreRegistre: function () {
        $('#tabOrdre').empty();
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numregistre = $('#IDregistre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_ordres_registre'),
            data: {
                numRegsitre: numregistre
            },
            success: function (data) {
                if (data != null || data != '') {
                    $('#tabOrdre').html(data);
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                }
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des registres' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    enregistrerCarnet: function () {
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        ;
        var numregistre = $('#IDregistre').val();
        if (typeof (numregistre) === 'undefined') {
            $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez sélectionnez la séance et le registre !!!').fadeIn().delay(6000).fadeOut();
            $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
            return 0;
        }
        var tab = [];
        $('.idOrdre').each(function () {
            if ($(this).is(':checked')) {
                tab.push($(this).val())
            }
        });


        if (tab.length === 0) {
            $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez cochez les ordres à enregistrer dans le régistre !!!').fadeIn().delay(6000).fadeOut();
            $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
            return 0;
        }
        $.ajax({
            type: "POST",
            url: Routing.generate('enregistrer_carnet'),
            data: {
                numRegsitre: numregistre,
                choixcocherOrdre: tab
            },
            success: function (data) {

                if (data === 500) {
                    alert('une erreur est survenue!! Réssayer ou rassurez-vous que vous n\'enregistrez pas les mêmes ordres dans le registre et si sa continue contacter l\'administrateur');
                    return 0;
                }
                var code = data.statutCode;
                if (code === 400) {
                    $('#loaderListe').css("visibility", "visible").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour).fadeIn().delay(10000).fadeOut();
                } else {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-danger').addClass('alert alert-info alert-alt').html(data.messageRetour).fadeIn().delay(10000).fadeOut();
                }

            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des ordres' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    modifierCarnet: function () {
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        ;
        var numregistre = $('#IDregistre').val();
        if (typeof (numregistre) === 'undefined') {
            $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez sélectionnez la séance et le registre !!!').fadeIn().delay(6000).fadeOut();
            $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
            return 0;
        }

        var tab = [];
        $('.idOrdre').each(function () {
            if ($(this).is(':checked')) {
                tab.push($(this).val())
            }
        });
        if (tab.length === 0) {
            $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez cochez les ordres à enregistrer dans le régistre !!!').fadeIn().delay(6000).fadeOut();
            $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
            return 0;
        }
        $.ajax({
            type: "POST",
            url: Routing.generate('modifier_carnet'),
            data: {
                numRegsitre: numregistre,
                choixcocherOrdre: tab
            },
            success: function (data) {
                if (data === 500) {
                    alert('une erreur est survenue!! Réssayer ou rassurez-vous que vous n\'enregistrez pas les mêmes ordres dans le registre et si sa continue contacter l\'administrateur');
                    return 0;
                }
                var code = data.statutCode;
                if (code === 400) {
                    $('#loaderListe').css("visibility", "visible").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour).fadeIn().delay(6000).fadeOut();
                } else {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-danger').addClass('alert alert-info alert-alt').html(data.messageRetour).fadeIn().delay(6000).fadeOut();
                }

            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des ordres' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    validerRegistre: function () {
        $('#tabOrdre').empty();
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numregistre = $('#IDregistre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('valider_registre'),
            data: {
                numRegsitre: numregistre
            },
            success: function (data) {
                if (data === 500) {
                    alert('une erreur est survenue!! contacter l\'administrateur');
                    return 0;
                }
                if (data === 400) {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour).fadeIn().delay(4000).fadeOut();
                } else {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-danger').addClass('alert alert-info').html(data.messageRetour).fadeIn().delay(4000).fadeOut();
                }
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des registres' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    FermetureSeance: function () {
        $('#tabOrdre').empty();
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('fermeture_seance'),
            data: {
                numSeance: numSeance
            },
            success: function (data) {
                if (data === 500) {
                    alert('une erreur est survenue!! Réssayer  contacter l\'administrateur');
                    return 0;
                }
                if (data === 400) {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour).fadeIn().delay(4000).fadeOut();
                } else {
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#retourSaveRegistre').removeClass('alert alert-danger').addClass('alert alert-info').html(data.messageRetour).fadeIn().delay(4000).fadeOut();
                }
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des registres' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    downloadRegistre: function () {
        $('#ouvrir_pdf').attr('hidden', 'hidden');
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numRegistre = $('#IDregistre').val();
        var typeRegistre = $('#typeRegistre').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('editer_registre_ajax'),
            data: {
                registre: numRegistre,
                typeRegistre: typeRegistre
            },
            success: function (url) {
                if (url === 500) {
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez renseigner la séance et le registre!!').fadeIn().delay(8000).fadeOut()
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }

                if (url === 401){
                    $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Valider le registre avant de pourvoir imprimer l\'état !!').fadeIn().delay(8000).fadeOut()
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                $('#ouvrir_pdf').removeAttr('hidden').attr('href', url);
                $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden  ');
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des registres' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    loardAffectation: function () {
        $('#retourtfichierTransaction').removeClass('alert alert-danger').empty();
        $('#loaderAffectation').removeAttr("hidden").css("visibility", "visible");

        var numSeance = $('#numSeancepros').val();
        var file_data = $("#fichier_transaction").prop("files")[0];
        var form_data = new FormData();
        form_data.append('file', file_data);
        form_data.append('numSeance', numSeance);

        $.ajax({
            type: "POST",
            url: Routing.generate('charger_transaction'),
            contentType: false,
            processData: false,
            data: form_data,
            success: function (data) {
                $('#retourtfichierTransaction').html(data);
                if (data === 500) {
                    $('#retourtfichierTransaction').addClass('alert alert-danger').html('Veillez sélectionnez la séance et le fichier de transaction');
                    $('#loaderAffectation').css("visibility", "hidden").attr('hidden', 'hidden');
                    return 0;
                }
                if (data === 501) {
                    $('#retourtfichierTransaction').addClass('alert alert-danger').html('Aucun ordre n\'existe dans cette séance ou soit les quantités on été déja vérifiées!!!');
                    $('#loaderAffectation').css("visibility", "hidden").attr('hidden', 'hidden');
                    return 0;
                }

                $('#retourtfichierTransaction').removeClass('alert alert-danger').html(data);
                $('#loaderAffectation').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                var msg = 'Erreur lors de la récupération des registres' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    setAffectation: function () {
        $('#loaderAffectEffec').removeAttr("hidden").css("visibility", "visible");

        $.ajax({
            type: "POST",
            url: Routing.generate('set_affectation_ordre'),
            contentType: false,
            processData: false,
            success: function (data) {
                $('#retourtAffectation').html(data);
                $('#loaderAffectEffec').css("visibility", "visible").attr("hidden", 'hidden');
            },
            error: function (error) {
                var msg = 'Erreur lors des affectations' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    validerAffectation: function () {
        $('#loaderAffectation').removeAttr("hidden").css("visibility", "visible");

        $.ajax({
            type: "POST",
            url: Routing.generate('valider_affectation_ordre'),
            contentType: false,
            processData: false,
            success: function (data) {

                if (data === 404) {
                    $('#loaderAffectation').css("visibility", "visible").attr("hidden", 'hidden');
                    $('#messageValidationAffectation').removeClass('alert alert-info').addClass('alert alert-danger').html('Validation échouée!!');
                } else {
                    $('#loaderAffectation').css("visibility", "visible").attr("hidden", 'hidden');
                    $('#messageValidationAffectation').removeClass('alert alert-danger').addClass('alert alert-info').html('Les ordres ont été bien affectés de leurs exécutions respective!!');
                }

            },
            error: function (error) {
                var msg = 'Erreur lors des affectations' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    downloardRapportQuotidien: function () {
        $('#ouvrir_verificationpdf').attr('hidden', 'hidden');
        $('#loaderListe').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('editer_rapport_quotidien'),
            data: {numSeance: numSeance},
            success: function (url) {
                 // $('#retourSaveRegistre').html(url);
                 // return 0;
                if (url === 500) {
                    $('#retourSaveRegistre').addClass('alert alert-danger').html('Veuillez renseigner la séance!!').fadeIn().delay(4000).fadeOut()
                    $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                // $("#retourValiderVerif").empty();
                //  $('#show_fichier_verification').removeAttr('hidden').html('<iframe  src="' + url + '" ' +
                //      'type="application/pdf" width="100%" height="100%" ></iframe>');
                $('#ouvrir_pdf').removeAttr('hidden').attr('href', url);
                $('#loaderListe').css("visibility", "hidden").attr('hidden', 'hidden  ');
                // $('#retourSaveRegistre').html(data);
            }
        })
    },

    verificationAffectation: function () {
        $('#modal-validation-verification').modal('show');
        $("#retourValiderVerif").empty();
        $('#loaderValiderVeification').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('verification_affectation'),
            data: {numSeance: numSeance},
            success: function (data) {

                if (data === 500) {
                    $('#messageValidationVerification').addClass('alert alert-danger').html('Veuillez renseigner la séance!!').fadeIn().delay(4000).fadeOut()
                    $('#loaderValiderVeification').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                $("#retourValiderVerif").html(data);
                $('#loaderValiderVeification').css("visibility", "hidden").attr('hidden', 'hidden  ');
            }
        })
    },

    validerverification: function () {
        $('#loaderValiderVeification').removeAttr("hidden").css("visibility", "visible");
        var tab = [];
        $('.idOrdre').each(function () {
            tab.push($(this).val());
        });
        var data = JSON.stringify(tab);
        //console.log(data);
        $.ajax({
            type: 'POST',
            url: Routing.generate('valider_verification'),
            data: {tabID: data},
            success: function (data) {
                if (data === 500) {
                    $('#messageValidationVerification').removeClass('alert alert-info').addClass('alert alert-danger').html('Veuillez renseigner la séance!!').fadeIn().delay(6000).fadeOut()
                    $('#loaderValiderVeification').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                $("#messageValidationVerification").removeClass('alert alert-danger').addClass('alert alert-info').html('Les vérifications ont été validées!!').fadeIn().delay(8000).fadeOut();
                $('#loaderValiderVeification').css("visibility", "hidden").attr('hidden', 'hidden  ');
            },
            error: function (error) {
                var msg = 'Erreur lors de la validation de la vérification' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    generationEcritureT: function () {
        $('#modal-generation-ecriture').modal('show');
        $("#retourGeneration").empty();
        $('#loaderGenerationEcriture').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('generation_ecriture_T'),
            data: {numSeance: numSeance},
            success: function (data) {
                if (data === 500) {
                    $('#messageGeneration').addClass('alert alert-danger').html('Veuillez renseigner la séance!!').fadeIn().delay(4000).fadeOut()
                    $('#loaderGenerationEcriture').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                $("#retourGeneration").html(data);
                $('#loaderGenerationEcriture').css("visibility", "hidden").attr('hidden', 'hidden  ');
            }
        })
    },

    validergenerationEcriture: function () {
        $('#loaderGenerationEcriture').removeAttr("hidden").css("visibility", "visible");
        var numSeance = $('#IDseance').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('valider_generation_ecriture_T'),
            data: {numSeance: numSeance},
            success: function (data) {
                // $('#messageGeneration').html(data);
                // return 0;
                if (data === 500) {
                    $('#messageGeneration').addClass('alert alert-danger').html('Veuillez renseigner la séance!!').fadeIn().delay(4000).fadeOut()
                    $('#loaderGenerationEcriture').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }
                var code = data.statutCode;
                //alert(code);
                if (code === 404) {
                    $("#messageGeneration").removeClass('alert alert-info').addClass('alert alert-danger').html(data.messageRetour + ' et' + '  ' + data.execution + '  ' + 'ecriture ont été générée en tout!!').fadeIn();
                    $('#loaderGenerationEcriture').css("visibility", "hidden").attr('hidden', 'hidden  ');
                } else {
                    $("#messageGeneration").removeClass('alert alert-danger').addClass('alert alert-info').html('Le traitement s\'est bien éffectuée avec' + '  ' + data.totalexec + '/' + data.execution + '  ' + 'écriture générée en tout!!' +'  '+'Veuillez rafraichir la liste!!').fadeIn();
                    $('#loaderGenerationEcriture').css("visibility", "hidden").attr('hidden', 'hidden  ');
                }

            },
            error: function (error) {
                var msg = 'Erreur lors du traitement de la génération des écritures de T' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    getReglementLivraison: function () {
        $('#loaderregelement').removeAttr("hidden").css("visibility", "visible");
        var date = $('#dateReglmt').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('liste_reglement_livraison'),
            data: {dateprevu: date},
            success: function (data) {

                $('#retourListe').html(data);
                $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');

            },
            error: function (error) {
                var msg = 'Erreur lors de la recupération des reglements/livraison' + ' ' + error.message;
                alert(msg);
            }
        })
    },

};