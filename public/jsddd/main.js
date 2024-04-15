// $().

function delRow(numrow){
    $('#row' + numrow).remove();
    var row = $('#totsigna').val();
    var newrow = row - 1;
    $('#totsigna').val(newrow);
    alert( $('#action'+newrow));
    $('#action'+newrow).html('<button class="btn-sm btn-success text-center" onclick="ajax.getselectfield()">\n' +
        '            <i class="fa fa-plus-circle"></i>\n' +
        '        </button>\n' +
        '\n' +
        '\n' +
        '        <button class="btn-sm btn-danger text-center" onclick="delRow('+newrow+')">\n' +
        '            <i class="fa fa-minus-circle"></i>\n' +
        '        </button>');
};

function delRowP(numrow){
    $('#rowP' + numrow).remove();
    var row = $('#totpiece').val();
    var newrow = row - 1;
    $('#totpiece').val(newrow);
};

// var term= $(".signers").val();
// console.log(term);
function search(numrow) {
    // $('#loader').show();
    $('#signers' + numrow).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: Routing.generate("getsignataire"),
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data);
                    // $('#loader').hide();
                }
            });
        },
        minLength: 2
    });
    // $('#loader').hide();
}

$('.signers').on("keyup", function () {
    // $('#loader').show();
    $(this).autocomplete({
        source: function (request, response) {
            $.ajax({
                url: Routing.generate("getsignataire"),
                data: {
                    term: request.term
                },
                success: function (data) {
                    response(data);
                    // $('#loader').hide();
                }
            });
        },
        minLength: 2
    });
    // $('#loader').hide();
});

function radiobtn() {
    var radioId = $('input[type=radio][name=signprincipal]:checked').attr('id');
    var idVal = radioId.split('-');
    var a = 'signers'+idVal[1];
    var value= '#'+a;
    var principalsigners = $(value).val();
    // console.log(principalsigners);
    $('#selectedSigner').val(principalsigners)
}


function datatable()
{
    document.addEventListener("DOMContentLoaded", function () {
        app._loading.show($("#dt-ext-responsive"), {spinner: true});
        $("#dt-example-responsive").DataTable({
            dom: "Bfrtip",
            buttons: ["csv", "pdf", "print",
                {
                    extend: 'colvis',
                    columns: ':gt(0)',
                    text: 'Visibilité des colonne'
                }
            ],
            "responsive": true,
            "initComplete": function (settings, json) {
                setTimeout(function () {
                    app._loading.hide($("#dt-ext-responsive"));
                }, 1000);
            },
            "language": {
                "sProcessing": "Traitement en cours...",
                "sSearch": "Rechercher&nbsp;:",
                "sLengthMenu": "Afficher _MENU_ &eacute;l&eacute;ments",
                "sInfo": "Affichage de l'&eacute;l&eacute;ment _START_ &agrave; _END_ sur _TOTAL_ &eacute;l&eacute;ments",
                "sInfoEmpty": "Affichage de l'&eacute;l&eacute;ment 0 &agrave; 0 sur 0 &eacute;l&eacute;ment",
                "sInfoFiltered": "(filtr&eacute; de _MAX_ &eacute;l&eacute;ments au total)",
                "sInfoPostFix": "",
                "sLoadingRecords": "Chargement en cours...",
                "sZeroRecords": "Aucun &eacute;l&eacute;ment &agrave; afficher",
                "sEmptyTable": "Aucune donn&eacute;e disponible dans le tableau",
                "oPaginate": {
                    "sFirst": "Premier",
                    "sPrevious": "Pr&eacute;c&eacute;dent",
                    "sNext": "Suivant",
                    "sLast": "Dernier"
                },
                "oAria": {
                    "sSortAscending": ": activer pour trier la colonne par ordre croissant",
                    "sSortDescending": ": activer pour trier la colonne par ordre d&eacute;croissant"
                },
                "select": {
                    "rows": {
                        _: "%d lignes séléctionnées",
                        0: "Aucune ligne séléctionnée",
                        1: "1 ligne séléctionnée"
                    }
                }
            }
        });


    });
}