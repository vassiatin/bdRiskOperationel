var currentRequest = null;




    function chargerCodeSchema (typeProduit) {

        $('#codeShema').empty(); //remove all child nodes
        var newOption = '<option value="">...</option>';
        $('.concerneBanque').attr('disabled', 'disabled');

        $(`#codeShema`).append(newOption);
        $('#codeShema').trigger("chosen:updated");
        console.log(typeProduit);
        $.ajax({
            type: "POST",
            url: Routing.generate('search_code_schema_by_type_produit'),
            data: {
                idTypeProduit: typeProduit
            },
            success: function (data) {
                $('#codeShema').empty(); //remove all child nodes
                var newOption = data;
                $('#codeShema').append(newOption);
                $('#codeShema').trigger("chosen:updated");
                $('#codeShema').trigger("change");
                // $('#codeShema').html(data);

            }
        });
    };
    // chargerBilletageCaisse: function () {
    //     var codeCaisse = $('#caisse').val();
    //     var codeSchema = $('#codeShema').val();
    //
    //     // $('#modalBilletageBody').html('Veuillez patienter');
    //
    //     $.ajax({
    //         type: "POST",
    //         url: Routing.generate('get_billetage_caisse'),
    //         data: {
    //             codeCaisse: codeCaisse,
    //             codeSchema: codeSchema
    //         },
    //         success: function (data) {
    //             // $('#modalBilletageBody').html(data);
    //
    //             $('.nombre').bind('keyup mouseup', function () {
    //                 var nombre = $(this).val();
    //                 var typeBillet = $(this).data('code');
    //                 var montant = parseInt(nombre) * parseInt(typeBillet);
    //                 var montantString = montant.toString();
    //                 montantString = addThousandSeparator(montantString);
    //                 $('#montant' + typeBillet).val(montantString);
    //
    //                 var total = 0;
    //                 $('.nombre').each(function () {
    //                     var code = $(this).data('code');
    //                     var quantite = $(this).val();
    //
    //                     total += parseInt(code) * parseInt(quantite);
    //                 });
    //
    //                 total = total.toString();
    //                 total = addThousandSeparator(total);
    //                 $('#total').val(total);
    //             });
    //         }
    //     });
    // },


    function chargerContrat (numCompte, idTypeProduit) {

        $("#contrat").html('<option>Veuillez patientez</option>');
        $.ajax({
            type: "POST",
            url: Routing.generate('get_contrat_by_type_produit_numCompte'),
            data: {
                numCompte: numCompte,
                idTypeProduit: idTypeProduit
            },
            success: function (data) {
                $("#contrat").html(data);
                /*var encodeObj = jQuery.parseJSON(data);
                var obj = jQuery.parseJSON(encodeObj.data);
                console.log(encodeObj.html);
                $("#contrat").html(encodeObj.html);*/
            },
            error: function (err) {
                alert(" erreur lors du chargement des coontrat.Vueillez rechoisir le client \n" +
                    "Si le problème continu contacter l'admini")

            }
        });
    };


    /*
    Rechercher un client
     */
    function searchCustomer () {

        if ($("#operation_debi_credit_input_search_client").val().length >= 3)
        {

            currentRequest = $.ajax({
                type: "POST",
                url: Routing.generate('debitcredit_rechercherClient'),
                data: 'keyword=' + $("#operation_debi_credit_input_search_client").val(),
                beforeSend: function () {
                    if (currentRequest != null) {
                        // console.log(currentRequest);
                        currentRequest.abort();
                    }
                    // $('.div_loader').html(loader);
                    $(".div_loader").css("background", "#F4f4f4 url(../../frontend/img/Loarder.gif) no-repeat 500px");
                }
                ,
                success: function (data) {

                    $('#client_search_result').html(data);
                    $('.div_loader').html('');

                },
                error: function (error) {

                    $('.div_loader').html('');
                }
            });

        } else {
            $("  #operation_debit_credit_numCompte").css("background", "#FFF");
            // $(".containerFormsDat :input").reset();
            $(".containerFormsDat :input").prop("disabled", true);
            $('.containerFormsDat button').prop("disabled", true);
        }

    };

    /*
    Choix du client
     */
    function selectName (intitule, numCompte)
    {
        $('#intituleCompte').val(intitule);
        $('.compteClient').val(numCompte);

        // var idTypeProduit = $("#operation_debit_credit_typeProduit").val();
        // $("#hidden_input_for_id_compte").val(numCompte);
        // $("#operation_debit_credit_numCompte").val(intitule);
        // $("#suggesstion-box").hide();
        //
        // ajaxOperationDebitCredit.chargerContrat(numCompte, idTypeProduit);

        this.chargerSoldeCompte();


        $('.close').trigger('click');
    };


    function chargerSoldeCompte () {

        var numCompte = $(".compteClient").val();
        // alert(numCompte);

        if (numCompte !== '')
        {

            $.ajax({
                type: "POST",
                url: Routing.generate('debitcredit_get_solde_especes_client'),
                data: {
                    numCompteClient: numCompte,
                },
                // beforeSend: function () {
                //     $("#operation_debit_credit_numCompte").css("background", "#F4f4f4 url(../../frontend/img/LoaderIcon.gif) no-repeat 500px");
                // },
                success: function (data) {

                    var soldeClient = data.solde;
                    var montantLettres = NumberToLetter(soldeClient);
                    montantLettres = capitalizeFirstLetter(montantLettres);
                    montantLettres += ' de francs CFA';
                    $('.montantLettres').val(montantLettres);
                    alert(montantLettres)


                    // if (datasolde.length > 0) {

                    $('#soldeClient').val(soldeClient.toLocaleString());
                    $('#soldeClientLettres').val(montantLettres);



                },
                error: function (error) {

                    var message = "errreur lors de la recuperation du solde \n " + error.message;
                    alert(message)
                }
            });
        }

    };


    function chargerCompteBancaire  (codeBanque) {

        if (codeBanque !== '') {
            $.ajax({
                type: "POST",
                url: Routing.generate('get_compte_bancaire'),
                data: {
                    codeBanque: codeBanque,
                },
                // beforeSend: function () {

                // },
                success: function (data) {
                    // language=JQuery-CSS
                    $( `   #compteBanque`).empty();

                    $(`#compteBanque`).html('<option>Selectionnez un compte bancaire</option>'  );

                    $(`    #compteBanque`).append(data);
                    // $(`  #compteBanque`).trigger("chosen:updated");
                    // $(` #compteBanque`).trigger("change");
                },
                error: function (error) {

                    var message = "erreur lors de la recuperation des comptes bancaires " + error.message;
                    alert(message)
                }
            });
        }

    };

    function getEcheancierOperation () {

        var codeContrat = $('#contrat').val();
        $('#div_simulation_echeancier').html('');

        if (codeContrat !== '') {

            $('.div_loader').html(loader);
            $.ajax({
                type: "POST",
                url: Routing.generate('debit_credit_echeancier'),
                data: {
                    codeContrat: codeContrat,
                },
                // beforeSend: function () {
                //     $("#operation_debit_credit_numCompte").css("background", "#F4f4f4 url(../../frontend/img/LoaderIcon.gif) no-repeat 500px");
                // },
                success: function (data) {
                    $('#div_simulation_echeancier').html(data);
                    $('.div_loader').html('');
                },
                error: function (error) {
                    $('.div_loader').html('');
                }
            });

        }else{

            alert("veuillez choisir le contrat avant de generer l'echeancier ")
        }

    }




