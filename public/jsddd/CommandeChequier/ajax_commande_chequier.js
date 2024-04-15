var ajax_commandeCheq = {

    recuperation_des_commandes: function () {
        // var  xhr=getXMLHttpRequest();
        // console.log('dov');
        var borneInferieur = $('#borneInferieur').val();
        var derNumCheque = $('#derNumCheque').val();
        console.log(borneInferieur);
        // $('#btn_generer').removeAttr("enabled").attr('enabled',false);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        $('#div_listecommandeAjax').html(' ');
        console.log(borneInferieur);
        if (borneInferieur != null && borneInferieur != '' && borneInferieur > 0 ) {
            // $('#div_listecommandeAjax').empty();
            $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
            $.ajax({
                type: "POST",
                url: Routing.generate('recuperer_tranche_des_commandes'),
                data: {
                    borneInferieur: borneInferieur,
                    // async: false
                },
                success: function (data_borneSuperieure) {
                    console.log('bon', data_borneSuperieure);
                    $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
                    // data_borneSuperieure=JSON.parse(data_borneSuperieure);
                    console.log('bon', data_borneSuperieure);
                    if (data_borneSuperieure != null && data_borneSuperieure != '' && data_borneSuperieure!= "0" && data_borneSuperieure!= 0) {
                        console.log('noé',data_borneSuperieure);
                        $('#borneSuperieure').val(data_borneSuperieure);
                        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
                        /**************************************************/
                        $.ajax({
                            type: "POST",
                            url: Routing.generate('commande_data_importation'),
                            data: {
                                borneInferieur: borneInferieur,
                                borneSuperieur: data_borneSuperieure,
                                derNumCheque: derNumCheque,
                                // async: false
                            },
                            success: function (data) {
                                console.log('bon', data);
                                $('#div_listecommandeAjax').html(data);
                                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                                $('#btn_generer').removeAttr("disabled").attr('enabled',true);
                            },
                            error: function (error) {
                                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                                var msg = 'Erreur lors de la récupération de la liste des commandes suivant la tranche : ' + borneInferieur + '  '+ borneSuperieure;
                                alert(msg);
                            }
                        });
                        /**************************************************/
                    } else {
                        // alert('Aucune commande en attente');
                        $('#borneSuperieure').val(' ');
                        console.log('else');
                        // $('#retourSaveRegistre').removeClass('alert alert-info').addClass('alert alert-danger').html('Aucune commande en attente de récupération!!!').fadeIn().delay(6000).fadeOut();
                        $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                        return 0;
                    }
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    var msg = 'Erreur lors de la récupération de la tranche des commandes.';
                    alert(msg);
                }
            });
        } else {
            var msg = 'le dernier numéro de demande généré et celui à prendre sont inexistants.';
            alert(msg);
            return 0;
        }
    },

    generation_des_commandes: function () {
        $('#loader_generationcommande').removeAttr("hidden").css("visibility", "visible");
        $.ajax({
            type: "POST",
            url: Routing.generate('generation_commande_chequier'),
            data: {},
            success: function () {
                $('#loader_generationcommande').css("visibility", "hidden").attr('hidden', 'hidden');
                //var msg = 'Génération réussie.';
                //alert(msg);
            },
            error: function () {
                $('#loader_generationcommande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur survenue lors de la génération.';
                alert(msg);
            }
        });
    },

    recherche_Detailcommande_chequier_date: function (idCommande,date) {
        var idCommande = idCommande;
        var dateCommande = date;//$('#btn_valider').val();

       dateCommande=(dateCommande==null || dateCommande=='')? $('#dateCommande').val():dateCommande;
       console.log(idCommande,dateCommande);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        if (dateCommande != null && idCommande != null  ) {
            console.log(dateCommande);
            $('#div_listeDetailcommandeParDateAjax').html(' ');
            $.ajax({
                type: "POST",
                url: Routing.generate('recherche_Detailcommande_chequier_date'),
                data: {
                    idCommande: idCommande,
                    dateCommande: dateCommande,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#div_listeDetailcommandeParDateAjax').html(data);
                        $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    alert(msg);
                }
            });
        } else {
            var msg = 'les paramètres sont incorrectes.';
            alert(msg);
            return 0;
        }
    },


    recherche_Commande_parDate: function () {

        var dateCommande =$('#dateCommande').val();
        console.log(dateCommande);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        if (dateCommande != null ) {
            console.log(dateCommande);
            $('#liste_commandeParDate').html(' ');
            $('#div_listeDetailcommandeParDateAjax').html(' ');

            $.ajax({
                type: "POST",
                url: Routing.generate('recherche_commande_chequier_date'),
                data: {
                    dateCommande: dateCommande,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#liste_commandeParDate').html(data);
                    $('#div_listeDetailcommandeParDateAjax').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"'+
                    'width="100%" id="dt_resultat_recherche" ><thead><tr><th>Agence</th><th>N° Demande</th><th>Intitulé Client</th>' +
                        '<th>Adresse Client</th><th>Nombre</th><th>Début Chèque</th><th>Fin Chèque</th><th>Type Chèque</th><th>RIB</th>' +
                        '<th>Id Bank</th><th>Adresse Banque</th></tr></thead></table>');


                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    alert(msg);
                }
            });
        } else {
            var msg = 'la date est incorrecte';
            alert(msg);
            return 0;
        }
    },


    dix_dernieres_Commande: function () {
// alert('tres bien');
        var dateCommande =$('#dateCommande').val();
        console.log(dateCommande);
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        if (dateCommande != null ) {
            console.log(dateCommande);
            $('#liste_commandeParDate').html(' ');
            $('#div_listeDetailcommandeParDateAjax').html(' ');

            $.ajax({
                type: "POST",
                url: Routing.generate('liste_commande_generes'),
                data: {
                    estAjax: true,
                },
                success: function (data) {
                    console.log('bon', data);
                    $('#liste_commandeParDate').html(data);
                    $('#div_listeDetailcommandeParDateAjax').html('<table class="dt-example-responsive table table-bordered table-striped nowrap" cellspacing="0"'+
                        'width="100%" id="dt_resultat_recherche"><thead><tr><th>Agence</th><th>N° Demande</th><th>Intitulé Client</th>' +
                        '<th>Adresse Client</th><th>Nombre</th><th>Début Chèque</th><th>Fin Chèque</th><th>Type Chèque</th><th>RIB</th>' +
                        '<th>Id Bank</th><th>Adresse Banque</th></tr></thead></table>');


                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                },
                error: function (error) {
                    $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                    var msg = 'Erreur lors de la récupération de la liste des commandes' + ' ' + error.message;
                    alert(msg);
                }
            });
        } else {
            var msg = 'la date est incorrecte';
            alert(msg);
            return 0;
        }
    },


    imprimer_commandes_generees: function () {
        $('#loader_commande').removeAttr("hidden").css("visibility", "visible");
        // alert('gooood');
        $.ajax({
            type: "POST",
            url: Routing.generate('imprimer_commandes_generee'),
            data: {},
            success: function (data) {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                //var msg = 'Génération réussie.';
                // alert(data);
                if (url === 200){
                    return 0;
                }
                // $('#ouvrir_pdf').removeAttr('hidden').attr('href', url);
            },
            error: function () {
                $('#loader_commande').css("visibility", "hidden").attr('hidden', 'hidden');
                var msg = 'Erreur survenue lors de la génération du document pdf.';
                alert(msg)
            }
        });
    },

}