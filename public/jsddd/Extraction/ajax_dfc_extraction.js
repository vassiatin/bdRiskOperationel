var ajax_dfc_extraire = {


    balance_BD: function (type) {
        var dateFin= $('#dateFin').val();
        var dateDebut= $('#dateDebut').val();
        var avecTous251180= $('#avecTous251180').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        console.log(dateFin);
        $('#div_balanceBD').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('balance_BD'),
            data: {
                dateFin: dateFin,
                dateDebut: dateDebut,
                avecTous251180: avecTous251180,
            },
            success: function (data) {
                $('#div_balanceBD').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },


    od: function () {
        var dateFin= $('#dateFin').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        console.log(dateFin);
        $('#div_operationDiverses').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('operations_diverses'),
            data: {
                dateFin: dateFin,
            },
            success: function (data) {
                $('#div_operationDiverses').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    operation_par_valeur: function () {
        var dateDebut= $('#dateDebut').val();
        var dateFin= $('#dateFin').val();
        var valeur= $('#valeur').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        console.log(dateFin);
        $('#div_ListeOperations').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('oparations_superieures_a_x_montant'),
            data: {
                dateDebut: dateDebut,
                dateFin: dateFin,
                valeur: valeur,
            },
            success: function (data) {
                $('#div_ListeOperations').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    comptes_client_par_solde: function () {
        var typeCompte= $('#typeCompte').val();
        var valeur= $('#valeur').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListeComptesClient').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('comptes_soldes_superieures_a_x_montant'),
            data: {
                typeCompte: typeCompte,
                valeur: valeur,
            },
            success: function (data) {
                $('#div_ListeComptesClient').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    comptes_ouverts_et_fermes_au_bout_dune_periode: function () {
        var nombreJours= $('#nombreJours').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_ListeComptesClient').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('comptes_ouverts_et_fermes_au_bout_dune_periode'),
            data: {
                nombreJours: nombreJours,
            },
            success: function (data) {
                $('#div_ListeComptesClient').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la récupération' + ' ' + error.message;
                alert(msg);
            }
        });
    },

    transferts_emis_recus: function () {
        var typeTransfert= $('#typeTransfert').val();
        var dateFin= $('#dateFin').val();
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_Transfert').html(' ');
        $.ajax({
            type: "GET",
            url: Routing.generate('transferts_emis_recus'),
            data: {
                typeTransfert: typeTransfert,
                dateFin: dateFin,
            },
            success: function (data) {
                $('#div_Transfert').html(data);
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