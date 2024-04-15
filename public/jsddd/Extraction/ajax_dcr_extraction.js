var ajax_dcr_extraire = {

    dcr_depot_a_vue_a_terme: function (type) {
       var dateFin= $('#dateFin').val();
       var typeDemande= type;
       console.log(dateFin);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
            console.log(dateFin);
            $('#div_listeDepotAvueAjax').html(' ');
            $.ajax({
                type: "GET",
                url: Routing.generate('extraction_data_dcr_depot_a_vue_a_terme'),
                data: {
                    dateFin: dateFin,
                    typeDemande: typeDemande,
                },
                success: function (data) {
                    $('#div_listeDepotAvueAjax').html(data);
                        $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                    alert(msg);
                }
            });
    },


    dcr_depot_a_terme_comptable: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        console.log(dateFin);
        $('#div_listeDepotAvueAjax').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('extraction_data_dfc_dat_comptable'),
            success: function (data) {
                $('#div_listeDepotAvueAjax').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },


    balance_format_fidel: function (type) {
        var dateFin= $('#dateFin').val();
        var typeDemande= type;
        console.log(dateFin);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        console.log(dateFin);
        $('#div_listeDepotAvueAjax').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('balance_format_fidel'),
            data: {
                dateFin: dateFin,
                typeDemande: typeDemande,
            },
            success: function (data) {
                $('#div_listeDepotAvueAjax').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },


    operations_by_gestionnaire: function () {
        var dateDebut= $('#dateDebut').val();
        var dateFin= $('#dateFin').val();
        var idGestionnaire= $('#idGestionnaire').val();
        var sens= $('#sens').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListeOperationsParGestionnaire').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('operation_par_gestionnaire'),
            data: {
                sens: sens,
                dateDebut: dateDebut,
                dateFin: dateFin,
                idGestionnaire: idGestionnaire,
            },
            success: function (data) {
                $('#div_ListeOperationsParGestionnaire').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    portefeuille_par_agence_gestionnaire: function () {
        var codeAgence= $('#codeAgence').val();
        var dateFin= $('#dateFin').val();
        var idGestionnaire= $('#idGestionnaire').val();
        var sens= $('#sens').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListePorteuille').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('portefeuille_par_agence'),
            data: {
                codeAgence: codeAgence,
                dateFin: dateFin,
                idGestionnaire: idGestionnaire,
            },
            success: function (data) {
                $('#div_ListePorteuille').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    echeances_attendues_by_periode: function () {
        var dateDebut= $('#dateDebut').val();
        var dateFin= $('#dateFin').val();
        var idGestionnaire= $('#idGestionnaire').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_EcheanceAttendues').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('echeances_attendues_by_periode'),
            data: {
                dateDebut: dateDebut,
                dateFin: dateFin,
                idGestionnaire: idGestionnaire,
            },
            success: function (data) {
                $('#div_EcheanceAttendues').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    credits_directs_by_periodeGestionnaire: function () {
        var dateDebut= $('#dateDebut').val();
        var dateFin= $('#dateFin').val();
        var idGestionnaire= $('#idGestionnaire').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_listeCreditDirects').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('credits_directs_by_periodeGestionnaire'),
            data: {
                dateDebut: dateDebut,
                dateFin: dateFin,
                idGestionnaire: idGestionnaire,
            },
            success: function (data) {
                $('#div_listeCreditDirects').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    liste_particulier_ayant_compte_epargne: function () {
        var idGestionnaire= $('#idGestionnaire').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_particulierAyantCompteEpargne').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('liste_particulier_ayant_compte_epargne'),
            data: {
                idGestionnaire: idGestionnaire,
            },
            success: function (data) {
                $('#div_particulierAyantCompteEpargne').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    liste_comptes_debiteurs_by_agency_manager: function () {
        var idGestionnaire= $('#idGestionnaire').val();
        var codeAgence= $('#codeAgence').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListeComptesDebiteurs').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('liste_comptes_debiteurs_by_agence_gestionnaire'),
            data: {
                idGestionnaire: idGestionnaire,
                codeAgence: codeAgence,
            },
            success: function (data) {
                $('#div_ListeComptesDebiteurs').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    liste_comptes_ouverts_ou_fermes_by_agence_gestionnaire: function () {
        var idGestionnaire= $('#idGestionnaire').val();
        var codeAgence= $('#codeAgence').val();
        var dateDebut= $('#dateDebut').val();
        var dateFin= $('#dateFin').val();
        var typeCompte= $('#typeCompte').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListeComptesOuverts_ouFermes').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('liste_comptes_ouverts_ou_fermes_by_agence_gestionnaire'),
            data: {
                idGestionnaire: idGestionnaire,
                codeAgence: codeAgence,
                dateDebut: dateDebut,
                dateFin: dateFin,
                type: typeCompte,
            },
            success: function (data) {
                $('#div_ListeComptesOuverts_ouFermes').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

}