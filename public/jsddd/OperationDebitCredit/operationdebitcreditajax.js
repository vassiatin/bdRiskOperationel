var currentRequest = null;

var ajaxOperationDebitCredit = {


    /*
    Rechercher un client
     */
    searchCustomer: function () {

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
                    $('#loader').show();
                    // $(".div_loader").css("background", "#F4f4f4 url(../../frontend/img/Loarder.gif) no-repeat 500px");
                }
                ,
                success: function (data) {

                    $('#client_search_result').html(data);
                    $('.div_loader').html('');
                    $("#loader").hide();

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

    },

    /*
    Choix du client
     */
    selectName: function (intitule, numCompte)
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
    },


    chargerSoldeCompte: function () {

        var numCompte = $(".compteClient").val();
        var dateValeur = $('.dateValeur').val();
        // alert(numCompte);

        if (numCompte !== '')
        {
            $.ajax({
                type: "POST",
                url: Routing.generate('debitcredit_get_solde_especes_client'),
                data: {
                    numCompteClient: numCompte,
                    dateValeur: dateValeur,
                },
                beforeSend: function () {
                    $(".soldeClient").val("...");
                    $("#soldeClientLettres").val("...");
                },
                success: function (data)
                {
                    var code = data.code;

                    if (code === 200)
                    {
                        var soldeClient = data.solde;
                        var montantLettres = NumberToLetter(soldeClient);
                        montantLettres = capitalizeFirstLetter(montantLettres);
                        $('.montantLettres').val(montantLettres);


                        // if (datasolde.length > 0) {

                        $('.soldeClient').val(addThousandSeparator(soldeClient.toString()));
                        $('#soldeClientLettres').val(montantLettres);

                    }
                    else
                    {
                        alert("Erreur lors de la recuperation du solde du client : " + data.message);
                    }




                },
                error: function (error) {

                    var message = "Errreur lors de la recuperation du solde \n " + error.message;
                    alert(message);
                }
            });
        }

    },


    chargerBilletage: function () {

        var codeCaisse = $(".caisse").val();
        var dateOperation = $('.dateOperation').val();
        var codeOperation = $('.typeOperation').val();
        // alert(numCompte);

        var estApprovisionnement = $('#estApprovisionnement').val();

        if (codeCaisse !== '' && dateOperation !== '')
        {
            $.ajax({
                type: "POST",
                url: Routing.generate('debitcredit_get_billetage_caisse'),
                data: {
                    codeCaisse: codeCaisse,
                    dateOperation: dateOperation,
                    codeOperation: codeOperation,
                    estApprovisionnement: estApprovisionnement
                },
                beforeSend: function () {
                    $("#loaderBilletage").show();
                },
                success: function (data)
                {
                    var code = data.code;

                    if (code === 200)
                    {
                        var billetage = data.billetageVue;

                        $('#tableauBilletage').html(billetage);
                        calculBilletage();

                        $('#loaderBilletage').hide();

                    }
                    else
                    {
                        alert("Erreur lors de la recuperation du billetage de la caisse : " + data.message);
                        $('#loaderBilletage').hide();
                    }

                },
                error: function (error) {

                    var message = "Errreur lors de la recuperation du billetage de la caisse \n " + error.message;
                    alert(message);
                    $('#loaderBilletage').hide();
                }
            });
        }

    },


};

