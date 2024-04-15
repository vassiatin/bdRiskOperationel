var ajax_CompteClient = {
    RecuperationTitre: function () {
        var typeTitre = $('#typeTitre').val();
        // $('#listeTitre').html('<option><b>Veuillez patienter svp...</b></option>');
        var newOption = '<option><b>Veuillez patienter svp...</b></option>';

        $('#listeTitre').append(newOption);
        $('#listeTitre').trigger("chosen:updated");
        // console.log(typeTitre);
        $.ajax({
            type: "POST",
            url: Routing.generate('liste_Titre_By_CodeTypeTitre'),
            data: {
                typeTitre: typeTitre
            },
            // $('#listeTitre').html(data);
            success: function (data) {
                // console.log('du');
                // $('#listeTitre').html(data);
                $('#listeTitre').empty(); //remove all child nodes
                var newOption = data;
                $('#listeTitre').append(newOption);
                $('#listeTitre').trigger("chosen:updated");
                $('#listeTitre').trigger("change");
            }
        });
    },
    RecuperationForm: function () {
        var titre = $('#symbol').val();
        var typeTitre = $('#typeTitre').val();
        $('#orderform').html('<option><b>Veuillez patienter svp...</b></option>');
        $.ajax({
            type: "POST",
            url: Routing.generate('Recuperation_Titre_Info'),
            data: {
                titre: titre,
                typeTitre: typeTitre
            },
            // $('#listeTitre').html(data);
            success: function (data) {
                $('#orderform').html(data);
            }
        });
    },

    RecuperationProspect: function () {
        var telephone = $('#telephone').val();
        var nomSigle = $('#nomSigle').val();
        var indicatif = $(".selected-dial-code").text();
        var phone = indicatif + " " + telephone;
         console.log(phone);
        if ((telephone !== '' ) || nomSigle !== '') {
            $.ajax({
                type: "POST",
                url: Routing.generate('recuperationProspect'),
                data: {
                    telephone: phone,
                    nomSigle: nomSigle
                },
                //dataType : 'json',

                success: function (prospect) {
                    var retour =JSON.parse(prospect);
                    /*for (i=0; i<prospect.length;i++) {
                        $('#clientbundle_compteclient_intitule').val(retour.prospect[i].nom+ " "+retour.prospect[i].prenom);
                        $('#agence').val(retour.prospect[i].agence_id);
                        $('#tel_fixe').val(retour.prospect[i].telephone_fix);
                        $('#email').val(retour.prospect[i].telephone);
                        $('#id_prospect').val(retour.prospect[i].prospect_id);
                        $('#connaissance').val(retour.prospect[i].connaitBourse);
                        //$('#objectif').val(retour.prospect[i].commentaire);
                    }*/
                    $('#clientbundle_compteclient_intitule').val(retour.prospect.prospect.nom + " "+ retour.prospect.prospect.prenom);
                    $('#clientbundle_compteclient_codeAgence').val(retour.prospect.prospect.agence_id);
                    $('#id_prospect').val(retour.prospect.prospect.code);
                    var id_prospect=$('#id_prospect').val();
                    $('#connaissance').val(retour.prospect.prospect.connaitBourse);
                    $('#objectif').val(retour.prospect.prospect.commentaire);

                    retour.prospect.contacts.forEach( function(courant){
                            if(courant.typeAdresse=='Téléphone Fix')
                            {
                                $('#tel_fixe').val(courant.valeur);
                            }else
                            {
                                if(courant.typeAdresse=='Téléphone')
                                {
                                    $('#tel_mobile').val(courant.valeur);
                                }
                                else {
                                    if(courant.typeAdresse=='Email')
                                    {

                                        $('#email').val(courant.valeur);
                                    }
                                    else {
                                        if(courant.typeAdresse=='Boite Postale')
                                        {

                                            $('#bp').val(courant.valeur);
                                        }
                                        else {
                                            if(courant.typeAdresse=='Ville')
                                            {
                                                $('#ville').val(courant.valeur);
                                            }
                                            else {
                                                if(courant.typeAdresse=='Pays Résidence')
                                                {
                                                    $('#pays').val(courant.valeur);
                                                }
                                            }
                                        }
                                    }
                                }
                            }
                    }
                    )

                    //console.log(retour.prospect[0].agence_id,typeof(retour));
                    // $('#clientbundle_compteclient_numCompte').val(dataRetour);
                }
            });

        }
    },
    RecuperationTitreobligation: function () {
        $('#tabTitre').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );;
        $.ajax({
            type: "POST",
            url: Routing.generate('RecupererTitrep'),
            data: {
                // typeTitre: typeTitre
            },
            success: function (data) {
                $('#tabTitre').empty().html(data);
            }
        });
    },

    RecupererSignataire: function () {
        var telephone = $('#signataire-telephone').val();
        var nomSigle = $('#signataire-nom').val();
         var indicatif = $("#dial_codeSignataire").val();
        var tablo=indicatif.split(' ');
        var indice=tablo[0];
        var phone = indice+" "+ telephone;
         console.log(indicatif);
        if ((telephone !== '' ) || nomSigle !== '') {
            $.ajax({
                type: "POST",
                url: Routing.generate('RecupererSignataire'),
                data: {
                    telephone: phone,
                    nomSigle: nomSigle
                },
                //dataType : 'json',
                success: function (data) {
                    var retour =JSON.parse(data);
                    console.log(retour.prospect.prospect.nom);
                    //$('#tableau').html(retour);
                }
            });

        }
    },
    
    ListeOrdreAgPeriode: function () {
        $('#listeordrePriode').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        var date1 = $('#dr-example-single').val();
        var date2 = $('#dr-example-single1').val();
        var role = $('#role').val();
        $.ajax({
            type:"POST",
            url:Routing.generate('ordreAgencePeriode'),
            data: {
                date1: date1,
                date2: date2,
                role: role
            },
            success: function (data) {
                $('#listeordrePriode').html(data);
            }
        })
    },
    
    ListeOrdreAgExec: function () {
        $('#listeordreExec').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        var date1 = $('#dr-example-single').val();
        var date2 = $('#dr-example-single1').val();
        var role = $('#role').val();
        $.ajax({
            type:"POST",
            url:Routing.generate('ordreAgenceExecute'),
            data: {
                date1: date1,
                date2: date2,
                role: role
            },
            success: function (data) {
                $('#listeordreExec').html(data);
            }
        })
    },

    ListeSaisirDirect: function () {
        $('#saisirDirect').empty();
        $('#loader').removeAttr("hidden").css("visibility", "visible");
        var date1 = $('#dr-example-single').val();
        var date2 = $('#dr-example-single1').val();
        var role = $('#role').val();
        $.ajax({
            type:"POST",
            url:Routing.generate('saisir_direct_periodique'),
            data: {
                date1: date1,
                date2: date2,
                role: role
            },
            success: function (data) {
                $('#loader').css("visibility", "hidden").attr('hidden', 'hidden');
                $('#saisirDirect').html(data);
            }
        })
    },
    
    ListeOrdreAvaliderN1: function () {
        $('#listeOrdreAvaliderN1').empty().append(' <div  class="loader-content" >\n' +
            '<div class="sk-double-bounce" style="top: 2em;">\n' +
            '<div class="sk-child sk-double-bounce1"></div>\n' +
            '<div class="sk-child sk-double-bounce2"></div>\n' +
            '</div>\n' +
            '</div>'
        );
        var codeAgence = $('#codeAgence').val();
        $.ajax({
            type:"POST",
            url:Routing.generate('ordre_envoye'),
            data: {
                codeAgence: codeAgence
            },
            success: function (data) {
                $('#listeOrdreAvaliderN1').html(data);
            }
        })
    },
    
    getIdOrdre: function () {
        $('#cacheLoader').removeAttr('hidden');
        var tab = [];
        $('.idOrdre').each(function () {
            if ($(this).is(':checked')){
                tab.push($(this).val())
            }
        });
        var codeAgence = $('#codeAgence').val();
        var validation = $('#validation').val();
        var data = JSON.stringify(tab);
        var route = '';
        if (validation === 'validationN2'){
             route = 'validation_prenotation';
        }else {
            route = 'verification_prenotation';
        }
       $.ajax({
           type:'POST',
           url: Routing.generate(route),
           data: {tabID:data,code:codeAgence},
           success:function (url) {
               $('#ouvrir_pdf').removeAttr('hidden');
               $('#ouvrir_pdf').attr('href',url);
               // var win = window.open('', '_blank');
                $('#cacheLoader').attr('hidden','hidden  ');
               // win.location.href = url;
           },
       });
    },

    getclientinfobycode: function (id) {
        //console.log('Yes Boss');
        $.ajax({
            type: "POST",
            url: Routing.generate('getclientinfobycode'),
            data: {
                id: id,            },
            success: function (data) {
                $('#modal-body').html(data);

            }

        })
    },
	
    //Affichage portefeuille
    Liste_portefeuilleTitre: function (numCpte) {
        // $('#listeTitrePriode').empty().append(' <div  class="loader-content">\n' +
        //     '  <div class="sk-double-bounce" style="top: 2em;">\n' +
        //     '  <div class="sk-child sk-double-bounce1"></div>\n' +
        //     '  <div class="sk-child sk-double-bounce2"></div>\n' +
        //     '  </div>\n' +
        //     '  </div>'
        // );
        $('#loarding').show();
        $('#printReleve').hide();
        $('#liste_portefeuille').html('');
        var dateEstimation = $('#dtp_dateFin').val();
        var dateDebut = $('#dtp_dateDebut').val();
        // var numCompte = '0116000011';
        var numCompte =numCpte;
        var codeSociete = 'AFB';
        console.log(dateEstimation,numCompte,numCpte,codeSociete);
        $.ajax({
            type:"POST",
            url:Routing.generate('recuperer_portefeuille'),
            data: {
                dateEstimation: dateEstimation,
                numCompte: numCompte,
                codeSociete:codeSociete,
                dateDebut:dateDebut
            },
            success: function (data) {
                $('#loarding').hide();
                $('#liste_portefeuille').html(data);
                $('#printbtn').show();
            }
        })
    },

    //Affichage releve
    Liste_ReleveCompte: function (numCpte) {
        // $('#listeTitrePriode').empty().append(' <div  class="loader-content">\n' +
        //     '  <div class="sk-double-bounce" style="top: 2em;">\n' +
        //     '  <div class="sk-child sk-double-bounce1"></div>\n' +
        //     '  <div class="sk-child sk-double-bounce2"></div>\n' +
        //     '  </div>\n' +
        //     '  </div>'
        // );
        console.log("test   "+numCpte);
        $('#loarding').show();
        $('#printbtn').hide();
        $('#liste_portefeuille').html(' ');
        var dateEstimation = $('#dtp_dateFin').val();
        var dateDebut = $('#dtp_dateDebut').val();
        // var numCompte = '0116000011';
        var numCompte =numCpte;
        var codeSociete = 'AFB';
        console.log(numCompte);
        console.log(dateEstimation,numCompte,numCpte,codeSociete);
        $.ajax({
            type:"POST",
            url:Routing.generate('recuperer_releve'),
            data: {
                dateEstimation: dateEstimation,
                numCompte: numCompte,
                codeSociete:codeSociete,
                dateDebut:dateDebut
            },
            success: function (data) {
                $('#loarding').hide();
                $('#liste_portefeuille').html(data);
                // $('#liste_Releve').html(data);
                $('#printReleve').show();
            }
        })
    },

    //Affichage releve
    Liste_HistoriqueCUMP: function (numCpte) {
        // $('#listeTitrePriode').empty().append(' <div  class="loader-content">\n' +
        //     '  <div class="sk-double-bounce" style="top: 2em;">\n' +
        //     '  <div class="sk-child sk-double-bounce1"></div>\n' +
        //     '  <div class="sk-child sk-double-bounce2"></div>\n' +
        //     '  </div>\n' +
        //     '  </div>'
        // );
        $('#loarding').show();
        var dateEstimation = $('#dtp_dateFin').val();
        var dateDebut = $('#dtp_dateDebut').val();
        var symbol = $('#symbol').val();
        // var numCompte = '0116000011';
        var numCompte =numCpte;
        var codesociete = 'AFB';
        console.log(dateEstimation,numCompte,numCpte,codesociete);
        $.ajax({
            type:"POST",
            url:Routing.generate('recuperer_Cump'),
            data: {
                dateEstimation: dateEstimation,
                numCompte: numCompte,
                codesociete:codesociete,
                dateDebut:dateDebut,
                symbol:symbol
            },
            success: function (data) {
                $('#loarding').hide();
                $('#liste_cump').html(data);
                $('#printbtn').show();
            }
        })
    },

    //Affichage blocage du client
    getBlocagesClient: function (numCpte) {
        $('#retourBlocage').empty();
        $('#loaderB').removeAttr("hidden").css("visibility", "visible");;
        var numCompte =numCpte;
        $.ajax({
            type:"POST",
            url:Routing.generate('recuperer_blocages'),
            data: {
                numCompte: numCompte,
            },
            success: function (data) {
                if (data === 500){
                    alert('une erreur est survenu lors de la reherche des blocage du client'+' '+ numCompte)
                }
                $('#loaderB').css("visibility", "hidden").attr('hidden', 'hidden');
                $('#retourBlocage').html(data);
            }
        })
    },
    
    //recherche compte client par filtre
    getFiltreCompteClients: function () {
        $('#retourListe').empty();
        $('#loaderregelement').removeAttr("hidden").css("visibility", "visible");
        var typeCompte = $('#typeCompte').val();
        var typeGestion = $('#typeGestion').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('client_filtre'),
            data: {typeCompte:typeCompte,typeGestion: typeGestion},
            success: function (data) {

                if (data === 500){
                    $('#retourListe').addClass('alert alert-info').html('Votre session est expirée!!Reconnectez vous!!');
                    $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }

                $('#retourListe').removeClass('alert alert-info').html(data);
                $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');

            },
            error: function (error) {
                var msg = 'Erreur lors de la recupération des reglements/livraison' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    //get the liste of collecteur
    getListeCollecteur: function () {

        $('#filtreCollecteur').empty();
        $('#loader').removeAttr("hidden").css("visibility", "visible");
        var filtre = $('#filtreCollecteur').val();

        $.ajax({
            type: 'POST',
            url: Routing.generate('collecteur_filtre'),
            data: {filtre: filtre},
            success: function (data) {

                if (data === 500){
                    $('#retourListe').addClass('alert alert-info').html('Votre session est expirée!!Reconnectez vous!!');
                    $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }

                $('#retourListe').removeClass('alert alert-info').html(data);
                $('#loader').css("visibility", "hidden").attr('hidden', 'hidden  ');

            },
            error: function (error) {
                var msg = 'Erreur lors de la recupération des reglements/livraison' + ' ' + error.message;
                alert(msg);
            }
        })
    },

    //get the reference of collecteur
    getRefCollecteur: function (reference,id) {
        $('#numCollecteur').val(reference);
        $('#idCollecteur').val(id);
        $('#modalFiltreCollecteur').modal('hide');

    },

    getCompteclient: function () {
        var numCompte = $('#numCompte').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('information_client'),
            data: {numCompte: numCompte},
            success: function (data) {
                $('#retour').html(data)
            },
            error: function (error) {
                var msg = 'Erreur lors de la recupération des reglements/livraison' + ' ' + error.message;
                alert(msg);
            }
        })
    }
	
};