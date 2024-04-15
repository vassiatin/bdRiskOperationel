var ajax_gestionCourrier = {

    liste_derniers_courriers_entrants: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_rechercheCourrier').html(' ');
        $.ajax({
            type: "POST",
            url: Routing.generate('recherche_courrier_arrive'),
            data: {
                estAjax: true,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);

                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },


    courrierEntrantByName: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");

        $('#liste_rechercheCourrier').html(' ');
        var intitule = $('#intitule').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierEntrantByName'),
            data: {
                intitule: intitule,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },

    list_tout_courrier_associe_ByName: function (estDepart) {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_rechercheCourrierAssocie').html(' ');
        console.log(estDepart);
        var intitule = $('#intitule').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_tout_courrier_associe_ByName'),
            data: {
                intitule: intitule,
                estDepart: estDepart,
            },
            success: function (data) {
                $('#liste_rechercheCourrierAssocie').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            }
        });
    },

    courrierEntrantByObject: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");

        $('#liste_rechercheCourrier').html(' ');
        var objet = $('#objetCourrier').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierEntrantByObject'),
            data: {
                objet: objet,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste' + ' ' + error.message;
                // alert(msg);
            }
        });
    },

    au_dblclk_rech: function (id, objet, intitule) {
        console.log(id, objet, intitule);
        $('#infoCourrierAssocie').val(id + '#' + objet + '#' + intitule);
        $('#recherche_courrierSortantAssocie').modal('hide');
        $('#recherche_courrierEntrantAssocie').modal('hide');
    },



    courrierEntrantByPeriode: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_rechercheCourrier').html(' ');
        var dateDebut = $('#dateDebut').val();
        var dateFin = $('#dateFin').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierEntrantByPeriode'),
            data: {
                dateFin: dateFin,
                dateDebut: dateDebut,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },


    rechercher_userAccessCourrier_by_user: function () {

        var id = $('#id_utilisateur').val();
        console.log(id);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        if (id != null) {
            $('#div_useraccesscourrier').html(' ');
            $.ajax({
                type: "POST",
                url: Routing.generate('rechercher_userAccessCourrier_by_user'),
                data: {
                    id_utilisateur: id,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#div_useraccesscourrier').html(data);
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    // var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    // alert(msg);
                }
            });
        }
    },


    pointGlobalTraitementCourrierArrive: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_point_global_traitement_courrier').html(' ');
        var agence = $('#id_agence').val();
        var departement = $('#id_departement').val();
        var dateDebut = $('#dateDebut').val();
        var dateFin = $('#dateFin').val();
        var estTraiter = $('#estCocher').val();
        console.log(agence, departement, dateDebut, dateFin, estTraiter);
        $.ajax({
            type: "POST",
            url: Routing.generate('parametre_point_global_courriers_arrives'),
            data: {
                estAjax: true,
                agence: agence,
                departement: departement,
                dateDebut: dateDebut,
                dateFin: dateFin,
                estTraiter: estTraiter,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_point_global_traitement_courrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },


    courrierSortantByName: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");

        $('#liste_rechercheCourrier').html(' ');
        var intitule = $('#intitule').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierSortantByName'),
            data: {
                intitule: intitule,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },

    courrierSortantByObject: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");

        $('#liste_rechercheCourrier').html(' ');
        var objet = $('#objetCourrier').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierSortantByObject'),
            data: {
                objet: objet,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },


    courrierSortantByPeriode: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_rechercheCourrier').html(' ');
        var dateDebut = $('#dateDebut').val();
        var dateFin = $('#dateFin').val();
        var id_departement = $('#id_departement').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('list_courrierSortantByPeriode'),
            data: {
                dateFin: dateFin,
                dateDebut: dateDebut,
                id_departement: id_departement,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },

    liste_derniers_courriers_sortants: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#liste_rechercheCourrier').html(' ');
        var id_departement = $('#id_departement').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('recherche_derniers_courriers_departs'),
            data: {
                estAjax: true,
                id_departement: id_departement,
            },
            success: function (data) {
                console.log('bon', data);
                $('#liste_rechercheCourrier').html(data);

                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
            },
            error: function (error) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                // alert(msg);
            }
        });
    },

}