var ajax_portefeuilleReleve = {
    filtreClient: function () {

        var date_debut = $('#date_debut').val();
        var date_fin = $('#date_fin').val();
        var keyword = $('#keyword').val();
        $('#dt-example-responsive').html(" ");
        $('#loader').css("visibility", "visible");

        $.ajax({
            type: "POST",
            url: Routing.generate('filtreclient'),
            data: {
                datedebut: date_debut,
                datefin: date_fin,
                keyword: keyword

            },
            success: function (data) {
                $('#dt-example-responsive').html(data);
                $('#loader').css("visibility", "hidden");
            }

        })
    },
};
// $.type(prospect)
//i = 0; i < prospect.length; i++