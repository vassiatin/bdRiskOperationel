var ajax_compteDepositaire = {

    RecuperationDepositaire: function () {
        var html;
        $('#loader').show();
        // $('#depositaire').html();
        // $('#depositaire').trigger("chosen:updated");
        console.log('zdn');
        $.ajax({
            type: "POST",
            url: Routing.generate('charger_depositaire'),
            success: function (data) {
                $('#depositaire').empty();
                console.log('ok',data);
                if(data!=null && data!='') {
                    $('#depositaire').html(data);
                    $('#depositaire').trigger("chosen:updated");
                    $('#depositaire').trigger("change");
                }
                $('#loader').hide();
            },
            error:function(error){
                var msg='Erreur lors de la récupération des dépositaire'+' '+error.message;
                alert(msg);
            }
        });
    },

    RecuperationZone: function () {
        var html;
        $('#loader').show();
        console.log('zdn');
        $.ajax({
            type: "POST",
            url: Routing.generate('charger_zone'),
            success: function (data) {
                $('#zone').empty();
                console.log('ok',data);
                if(data!=null && data!='') {
                    $('#zone').html(data);
                    $('#zone').trigger("chosen:updated");
                    $('#zone').trigger("change");
                }
                $('#loader').hide();
            },
            error:function(error){
                var msg='Erreur lors de la récupération des zones'+' '+error.message;
                alert(msg);
            }
        });
    },
    RecuperationCotation: function () {
        var html;
        $('#loader').show();
        console.log('zdn');
        $.ajax({
            type: "POST",
            url: Routing.generate('charger_cotation'),
            success: function (data) {
                $('#cotation').empty();
                console.log('ok',data);
                if(data!=null && data!='') {
                    $('#cotation').html(data);
                    $('#cotation').trigger("chosen:updated");
                    $('#cotation').trigger("change");
                }
                $('#loader').hide();
            },
            error:function(error){
                var msg='Erreur lors de la récupération des cotation'+' '+error.message;
                alert(msg);
            }
        });
    },
    RecuperationPlace: function () {
        var html;
        $('#loader').show();
        console.log('zdn');
        $.ajax({
            type: "POST",
            url: Routing.generate('charger_place'),
            success: function (data) {
                $('#place').empty();
                console.log('ok',data);
                if(data!=null && data!='') {
                    $('#place').html(data);
                    $('#place').trigger("chosen:updated");
                    $('#place').trigger("change");
                }
                $('#loader').hide();
            },
            error:function(error){
                var msg='Erreur lors de la récupération des places'+' '+error.message;
                alert(msg);
            }
        });
    },

    RecuperationClasseTitre: function () {
        var html;
        $('#loader').show();
        console.log('zdn');
        $.ajax({
            type: "POST",
            url: Routing.generate('charger_classeTitre'),
            success: function (data) {
                $('#classeTitre').empty();
                console.log('ok',data);
                if(data!=null && data!='') {
                    $('#classeTitre').html(data);
                    $('#classeTitre').trigger("chosen:updated");
                    $('#classeTitre').trigger("change");
                }
                $('#loader').hide();
            },
            error:function(error){
                var msg='Erreur lors de la récupération des classes titres'+' '+error.message;
                alert(msg);
            }
        });
    },

}