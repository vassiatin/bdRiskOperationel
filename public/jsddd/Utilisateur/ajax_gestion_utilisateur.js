var ajax_gestionUtilisateur = {

    rechercher_droits_by_module: function () {

        var id = $('#module').val();
        console.log(id);
        $('#loader').removeAttr("hidden").css("visibility", "visible");
        if (id != null) {
            $('#div_liste_droits_by_module').html(' ');
            $.ajax({
                type: "POST",
                url: Routing.generate('droits_utilisateurs_par_module'),
                data: {
                    idModule: id,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#div_liste_droits_by_module').html(data);
                    $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                    $('#div_listeDetailcommandeParDateAjax').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"' +
                        'width="100%" id="dt-example-responsive" ><thead><tr><th>Modules</th><th>Libellé Droit</th><th>Route Name</th>' +
                        '<th>Actif?</th><th>Supprimer</th><th>Crée le</th><th>Crée Par</th><th>Actions</th><th>RIB</th>' +
                        '</tr></thead></table>');

                    // var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    // alert(msg);
                }
            });
        }
    },


    liste_des_responsable: function (estRespo,estDirecte) {
        var estResponsable = estRespo;
        // $('#loader').removeAttr("hidden").css("visibility", "visible");

        if (estResponsable != null) {
            /*if (estResponsable === 1) {
                console.log(estResponsable);
                $('#div_modal_liste_utilisateurs').html(' ');
            }
            else {
                $('#div_modal_liste_utilisateursDefinitive').html(' ');
            }*/
            $('#div_modal_liste_utilisateursDefinitive').html(' ');
            $.ajax({
                type: "POST",
                url: Routing.generate('user_list_responsable'),
                data: {
                    estResponsable: estResponsable,
                    estDirecte: estDirecte,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#div_modal_liste_utilisateursDefinitive').html(data);
                    /*if (estResponsable === 1)
                        $('#div_modal_liste_utilisateurs').html(data);
                    else
                        $('#div_modal_liste_utilisateursDefinitive').html(data);
                    */
                    // e.preventDefault();
                },
                error: function (error) {
                    // $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                  /*  if (estResponsable === 1)
                        $('#div_modal_liste_utilisateurs').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"' +
                            'width="100%" id="dt-example-responsive" ><thead><tr><th></th><th>Utilisateurs</th><th>T?</th>' +
                            '</tr></thead></table>');
                    else
                        $('#div_modal_liste_utilisateursDefinitive').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"' +
                            'width="100%" id="dt-example-responsive" ><thead><tr><th></th><th>Utilisateurs</th><th>T?</th>' +
                            '</tr></thead></table>');*/

                    $('#div_modal_liste_utilisateursDefinitive').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"' +
                        'width="100%" id="dt-example-responsive" ><thead><tr><th></th><th>Utilisateurs</th><th>T?</th>' +
                        '</tr></thead></table>');

                    // var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    // alert(msg);
                }
            });
        }
    },

    recuperer_id_courrier_courant: function (id) {
        $('#id_courrierCourant').val(id);
        $('#id_courrierCourantDefinitive').val(id);
    }

}