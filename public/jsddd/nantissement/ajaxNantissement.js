var demandeNantissement = {
    getFiltreDemande: function () {
        $('#retourListe').empty();
        $('#loaderregelement').removeAttr("hidden").css("visibility", "visible");
        var typeDemande= $('#typeDemande').val();
        var estTraite = $('#estTraite').val();
        $.ajax({
            type: 'POST',
            url: Routing.generate('demandeNantissement_filtre'),
            data: {typeDemande: typeDemande, estTraite: estTraite},
            success: function (data) {

                if (data === 500) {
                    $('#retourListe').addClass('alert alert-info').html('Votre session est expirée!!Reconnectez vous!!');
                    $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');
                    return 0;
                }

                $('#retourListe').removeClass('alert alert-info').html(data);
                $('#loaderregelement').css("visibility", "hidden").attr('hidden', 'hidden  ');

            },
            error: function (error) {
                var msg = 'Erreur lors de la recupération des demandes de nantissement' + ' ' + error.message;
                alert(msg);
            }
        })
    }
}