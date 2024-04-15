var ajax_osc = {

    RecuperationTitreOSC: function () {
        var chaine = $('#documentOSC').val();
        console.log(chaine);
        var description = $('#documentOSC').find(':selected').text();
        var tablo = chaine.split('#');
        var symbol = tablo[0];
        var typeTitre = 'ACTION';
        console.log(symbol);
        $.ajax({
            type: 'POST',
            url: Routing.generate('recuperer_titre_action'),
            data: {
                typeTitre: typeTitre,
                symbol: symbol
            },
            success: function (data) {
                console.log(data);
                var retour = JSON.parse(data);
                if (retour != null && retour != '') {
                    //alert(retour.codeclassetitre)
                    $("#opcbundle_documentosc_symbole ").val(retour.symboldefauttitre);
                    $("#opcbundle_documentosc_typeTitre").val(retour.codeclassetitre);
                    $("#opcbundle_documentosc_description").val(tablo[3]);
                    $("#opcbundle_documentosc_natureEvenement").val(tablo[2]);
                    $("#opcbundle_documentosc_symboleDroit").val(tablo[4]);
                    $("#opcbundle_documentosc_reference").val(tablo[1]);
                    $("#opcbundle_documentosc_descriptionDroit").val(tablo[5]);
                    $("#libannonce").val(description);
                    $("#idAction").val(tablo[7]);
                    $("#idDroit").val(tablo[8]);

                    var tdate = tablo[6].split('T');
                    $("#opcbundle_documentosc_dateEvenement").val(tdate[0]);
                    if (tdate == null || tdate == '') {
                        $("#opcbundle_documentosc_dateEvenement").val(tablo[6]);
                        $("#opcbundle_documentosc_dateFermeture").val(tablo[6]);
                    } else {
                        $("#opcbundle_documentosc_dateFermeture").val(tdate[0]);
                    }
                    $('#cache1').attr('hidden', 'hidden');
                } else {
                    $('#cache1').attr('hidden', 'hidden');
                    // $('#cache').removeAttr('hidden');
                    alert('Désolé les données n arrive pas à se charger. Contactez l administrateur!!\'')
                    //$('#cache1').html('Désolé les données n arrive pas à se charger. Contactez l administrateur!!');

                }
            },
            error: function () {
                alert('Erreur lors du chargement');
            }
        })
    },

    searchCustomer: function () {

        if ($(" #boursebundle_ordre_numCompte").val().length >= 3) {
            var keyword = $("#boursebundle_ordre_numCompte").val();
            console.log(keyword);
            $.ajax({
                type: "POST",
                url: Routing.generate('Ordre_rechercherClient'),
                data: {keyword: keyword},
                beforeSend: function () {
                    $("#boursebundle_ordre_numCompte").css("background", "#F4f4f4 url(../../frontend/img/Loarder.gif) no-repeat 500px");
                },
                success: function (data) {
                    var obj = jQuery.parseJSON(data);
                    console.log(obj);
                    dataUserSend = obj.data;

                    $("#suggesstion-box").show();
                    $(" #suggesstion-box").html(obj.html);
                    $("#boursebundle_ordre_numCompte").css("background", "#FFF");
                },
                error: function (error) {
                    var msg = 'Erreur lors de la récupération du compte client' + ' ' + error.message;
                    alert(msg);
                }
            });

        } else {
            $("  #boursebundle_ordre_numCompte").css("background", "#FFF");
            // $(".containerFormsDat :input").reset();
            $(".containerFormsDat :input").prop("disabled", true);
            $('.containerFormsDat button').prop("disabled", true);
        }

    },

    selectName: function (intitule, numCompte) {
        $("#hidden_input_for_id_compte").val(numCompte);
        $("#boursebundle_ordre_numCompte").val(intitule);
        $("#suggesstion-box").hide();

    },

    RecuperationInfoSplit: function () {
        var chaine = $('#evenement').val();
        console.log(chaine);
        var description = $('#evenement').find(':selected').text();
        var tablo = chaine.split('#');
        var symbol = tablo[0];
        var typeTitre = 'ACTION';
        console.log(symbol);

        $("#symbole ").val(tablo[0]);
        $("#description").val(tablo[2]);
        $("#referenceEvenement").val(tablo[1]);
        $("#idTitre").val(tablo[4]);
        $("#opcbundle_split_coursAjuste").val(tablo[5]);
        $("#opcbundle_split_ancienneParite").val(tablo[8]);
        $("#opcbundle_split_nouvelleParite").val(tablo[6]);
        $("#libelleEvenement").val(tablo[9]);

        var tdate = tablo[3].split('T');
        $("#opcbundle_split_dateSplit").val(tdate[0]);
        $("#opcbundle_split_dateValeurSplit").val(tdate[0]);
        var drs = document.getElementById('opcbundle_split_dateReverseSplit');
        if (drs != null && drs!='') {
            $("#opcbundle_split_dateReverseSplit").val(tdate[0]);
        }
        var dvrs = document.getElementById('opcbundle_split_dateValeurReverseSplit');
        if (dvrs != null && dvrs!='') {
            $("#opcbundle_split_dateValeurReverseSplit").val(tdate[0]);
        }
        $('#cache1').attr('hidden', 'hidden');

    },
}