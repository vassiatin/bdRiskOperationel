var ajax = {
    getselectfield: function () {
        //var numrow = $('tr').length;
        var numrow = parseInt(document.getElementById("signtable").rows.length);
        var newrow = (numrow) + 1;
        //alert(parseInt(document.getElementById("groupesignataire"+numrow).value));
        var currentGroup = parseInt(document.getElementById("groupesignataire" + numrow).value);
        //alert( $('#action'+numrow));


        $.ajax({
            type: "POST",
            url: Routing.generate('addSelectField'),
            data: {
                numrow: numrow,
                groupe: currentGroup
            },
            success: function (data) {
                $('#action' + numrow).html(" ");
                $('#signtable').append(data);
                $('#totsigna').val(newrow);
            }
        })
    },

    getselectfieldGroupe: function () {
        //var numrow = $('tr').length;
        var numrow = parseInt(document.getElementById("signtable").rows.length);
        var newrow = numrow + 1;

        var currentGroup = parseInt(document.getElementById("groupesignataire" + numrow).value);
        var nextGroup = currentGroup + 1;
        // alert(currentGroup);

        $.ajax({
            type: "POST",
            url: Routing.generate('addSelectField'),
            data: {
                numrow: numrow,
                groupe: nextGroup
            },
            success: function (data) {
                $('#signtable').append(data);
                $('#totsigna').val(newrow);
                if (numrow != 1) {
                    $('#action' + numrow).html(" ");
                }
            }
        })
    },

    getPieceSelectfield: function () {
        var numrow = document.getElementById("piecetable").rows.length;
        var newrow = numrow + 1;
        $.ajax({
            type: "POST",
            url: Routing.generate('addPieceSelectField'),
            data: {
                numrow: numrow
            },
            success: function (data) {
                $('#piecetable').append(data);
                $('#totpiece').val(newrow);
            }
        })
    },

    getSousCategories: function () {

        var categories = $('#categories').val();
        $('#typeperson').hide();
        $.ajax({
            type: "POST",
            url: Routing.generate('getsouscategories'),
            data: {
                categories: categories
            },
            success: function (data) {
                $('#souscategories').html(data);

            }

        })

    },

    getTypePersonne: function () {

        var souscategories = $('#sous_categorie').val();
        var whereFrom = $('#comptefromsite').val();

        $.ajax({
            type: "POST",
            url: Routing.generate('gettypepersonne'),
            data: {
                souscategories: souscategories,

            },
            success: function (data) {
                $('#typeperson').show();
                //alert(data.trim());
                if (data.trim() == 'MO') {
                    $('#personne').val('Personne Morale');
                } else {
                    $('#personne').val('Personne Physique');
                }
                //On charge les pieces
                if (whereFrom === 'oui') {

                } else {
                    ajax.getTypePiecePersonne(data.trim());
                }

            }

        })
    },

    filtreClient: function (appelleDou) {
        $('#loader').removeAttr('hidden');
        var date_debut = $('#date_debut').val();
        var date_fin = $('#date_fin').val();
        var keyword = $('#keyword').val();
        // $('#dt-example-responsive').html(" ");
        $('#dt_responsive_div').html(" ");

        $.ajax({
            type: "POST",
            url: Routing.generate('filtreclient'),
            data: {
                datedebut: date_debut,
                datefin: date_fin,
                keyword: keyword,
                appelleDou: appelleDou

            },
            success: function (data) {
                // $('#dt-example-responsive').html(data);
                $('#dt_responsive_div').html(data);
                $('#loader').attr('hidden', 'hidden');
            }

        })
    },

    listeSousCompte: function (numCompte, intitule) {
        $.ajax({
            type: 'POST',
            url: Routing.generate('sousCompteClient'),
            data: {'numCompte': numCompte},
            success: function (data) {
                $('#intitule').val(intitule);
                $('#numCompte').val(numCompte);
                $('#retourListe').html(data);
                $('.modal-sous-compte').modal('hide')
            }
        })
    },

    showProfilSignataire: function (index) {
        $('#modalProfilSignataire').modal('show');

        var photo = $('#photo' + index).val();
        var signature = $('#signature' + index).val();

        $('#imgPhoto').empty().append(' <img src="/boursika/web/uploads/comptesclient/' + photo + '"\n' +
            '                                      class=" img-rounded-corners img-thumbnail" alt="avatar">');
        $('#imgSignature').empty().append('<img src="/boursika/web/uploads/comptesclient/' + signature + '"\n' +
            '                                          class=" img-rounded-corners img-thumbnail" alt="avatar">');


    },

    addObservation: function (id) {

        var commentaire = $('#commentaire').val();

        $.ajax({
            type: "POST",
            url: Routing.generate('addCommentaire'),
            data: {
                commentaire: commentaire,
                idCompte: id
            },
            success: function (data) {

                $('#dt-example-responsive2 tr:last').after('<tr>' + data.note + '</tr><tr>' + data.dateEnregistrement + '</tr><tr> </tr>');
            }

        })
    },


    getTypePiecePersonne: function (typepersonne) {

        $.ajax({
            type: "POST",
            url: Routing.generate('getpersonnetypepiece'),
            data: {
                typepersonne: typepersonne
            },
            success: function (data) {
                $('#piecetable').html(data);
            }

        })
    },

    getProfil: function () {

        var souscategories = $('#sous_categorie').val();
        $.ajax({
            type: "POST",
            url: Routing.generate('gettypepersonne'),
            data: {
                souscategories: souscategories
            },
            success: function (data) {
                $('#typeperson').show();
                //alert(data);
                if (data == 'MO') {
                    $('#personne').val('Personne Morale');
                } else {
                    $('#personne').val('Personne Physique');
                }
            }

        })
    },


    getclient: function () {

        var nomclient = $('#nomclient').val();
        var prenomclient = $('#prenomclient').val();
        var personne = $('#personne').val();
        $('#loader').show();
        $('#tableListe').hide();
        $.ajax({
            type: "POST",
            url: Routing.generate('getclientlist'),
            data: {
                nomclient: nomclient,
                prenomclient: prenomclient,
                personne: personne
            },
            success: function (data) {
                $('#loader').hide();
                $('#tableListe').html(data).show();
                // $('#clientform').html(data);

            }

        })
    },

    getclientinfo: function (id) {

        var code = $('#code' + id).text();
        var nom = $('#nom' + id).text();
        var prenom = $('#prenom' + id).text();
        var typepersonne = $('#personne' + id).text();
        $.ajax({
            type: "POST",
            url: Routing.generate('getclientinfo'),
            data: {
                nomclient: nom,
                prenomclient: prenom,
                personne: typepersonne,
                code: code
            },
            success: function (data) {
                $('#closemodal').trigger('click');
                $('#clientform').html(data);

            }

        })
    },

    // getPdfContratCollecteur: function (id) {
    //     var data = id;
    //     $.ajax({
    //         type: "POST",
    //         url: Routing.generate('getclientinfo'),
    //         data: {
    //            id:data
    //         },
    //         success: function (data) {
    //             $('#closemodal').trigger('click');
    //             $('#clientform').html(data);
    //
    //         }
    //
    //     })
    // },
    recherche: function () {
        var typePersonne = $('#typePersonne').val();
        var nomPersonne = $('#nomi').val();
        var prenomPersonne = $('#prenomi').val();
        $('#loarding').show();
        //console.log(nomPersonne, typePersonne,prenomPersonne);


        $.ajax({
            type: "POST",
            url: Routing.generate('affichePers'),
            data: {
                typePersonne: typePersonne,
                nomPersonne: nomPersonne,
                prenomPersonne: prenomPersonne
            },
            success: function (data) {
                $('#loarding').hide();
                $('#info').html(data);

            }
        });


    },

    getTypeCollecteur: function () {

        var typeCollecteur = $('#collecteur').val();
        $('#typeperson').show();
        if (typeCollecteur == 'Personne morale') {
            $('#personne').val('Personne Morale');
            $('#typeCollecteur').val('Personne Morale');
        } else {
            $('#personne').val('Personne Physique');
            $('#typeCollecteur').val('Personne Physique');
        }
    },

    getcollecteur: function () {

        var nomclient = $('#nomclient').val();
        var prenomclient = $('#prenomclient').val();
        var personne = $('#personne').val();
        $('#loader').show();
        $('#tableListe').hide();
        $.ajax({
            type: "POST",
            url: Routing.generate('getcollecteurlist'),
            data: {
                nomclient: nomclient,
                prenomclient: prenomclient,
                personne: personne
            },
            success: function (data) {
                $('#loader').hide();
                $('#tableListe').html(data).show();
                // $('#clientform').html(data);

            }

        })
    },

    getcollecteurinfo: function (id) {

        var nom = $('#nom' + id).text();
        var prenom = $('#prenom' + id).text();
        var code = $('#code' + id).text();
        var typepersonne = $('#personne' + id).text();
        $.ajax({
            type: "POST",
            url: Routing.generate('getcollecteurinfo'),
            data: {
                nomclient: nom,
                prenomclient: prenom,
                personne: typepersonne,
                code: code
            },
            success: function (data) {
                $('#closemodal').trigger('click');
                $('#clientform').html(data);

            }

        })
    },

    getAffectationCollecteur: function () {
        var ref = $('#comptecollecteur').val();
        console.log(ref);
        $.ajax({
            type: 'POST',
            url: Routing.generate('affectation_a_valider'),
            data: {refCollecteur: ref},
            success: function (data) {
                $('.compteAffecter').html(data)
            }
        })
    },

    getFormComplementaire: function () {
        $('#formComplementaire').hide();
        $('#loade').show();
        var collecteur = $('#personne').val();
        if (collecteur == '') {
            $('#loade').hide();
            $('#formComplementaire').show().empty().addClass('alert alert-info').append('<span>Veuillez remplir l\'étape précédente correctement...</span>')
        } else {
            var typecollecteur = '';
            if (collecteur == 'Personne Morale') {
                typecollecteur = 'prospectmoral'
            } else {
                typecollecteur = 'prospectphysique'
            }
            $.ajax({
                type: "POST",
                url: Routing.generate("getformcollecteur"),
                data: {
                    typecollecteur: typecollecteur,
                },
                success: function (data) {
                    $('#loade').hide();
                    $('#formComplementaire').show().html(data);
                }

            })
        }
    },

    affectationValeur: function (codeProsper) {

        var jsonObject = $('#hidden_input_object_prosper').val();

        var typenaturepersonne = $('#naturepers').val();

        $('#closemodal').trigger("click");
        var obj = JSON.parse(jsonObject);
        //console.log(obj);
        obj.forEach(function (id) {
            if (id.prospect.code === codeProsper) {
                console.log(id.contacts);
                // var email = id.contacts.find(element = element.typeAdresse === param("Email"));
                var email = id.contacts.find(findEmail);
                // var telephone = id.contacts.find(element = element.typeAdresse === param("Téléphone Mobile"));
                var telephone = id.contacts.find(findTelephone);
                //console.log(test);
                //console.log(telephone);

                $('#idPersonne').val(codeProsper);
                $('#nom').val(id.prospect.nom);
                $('#prenom').val(id.prospect.prenom);
                $('#profession').val(id.prospect.profession);
                $('#fonction').val(id.prospect.fonction);
                $('#codeagence').val(id.prospect.codeAgence);
                $('#civilite').val(id.prospect.civilite);
                $('#code').val(id.prospect.code);
                $('#naturepersonne').val(typenaturepersonne);
                $('#typeprospect').val(id.prospect.type_prospect);

                if ((id.prospect.sexe) == 'F')
                    $('#sexe').val('Féminin');
                else
                    $('#sexe').val('Masculin');

                if (telephone != null)
                    $('#contact').val(telephone.valeur);

                if (email != null)
                    $('#email').val(email.valeur);

                $('#resultatrecherche').val(id.prospect.nom + ' ' + id.prospect.prenom);

            }

        });


    },

};

function findEmail(contact) {
    return contact.typeAdresse == 'Email';
}

function findTelephone(contact) {
    return contact.typeAdresse == 'Téléphone Mobile';
}


function param(param) {
    return param;
}