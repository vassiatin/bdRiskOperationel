$('body').on('click', '.estTauxCommissionCheckBox', function () {

    var input = $(this).parent().find('.estTauxCommission');

    if ($(this).prop('checked') === true)
    {
        input.val(true)
    }
    else
    {
        input.val(false)
    }
    // console.log(input.val());
});



//define id sections
var idSections = "sectionsPalier";

//classe de chaque ligne de section
var classSection = "sectionPalier";

//define counter
var sectionsCount = 1;

//define template
var templateSection = $('#' + idSections + ' .' + classSection + ':first').clone();

//classe bouton ajouter
var classeBoutonAjouter = "btnAjouterPalier";

//classe bouton supprimer
var classeBoutonSupprimer = "btnSupprimerPalier";
// var templateMenage = $('#sectionsPalier .sectionPalier:first').clone();


//add index.html.twig section
$('body').on('click', '.' + classeBoutonAjouter, ajouterSection);
// $('.' + classeBoutonAjouter).click(ajouterSection);

function ajouterSection() {

    //increment
    sectionsCount++;


    //loop through each input
    var section = templateSection.clone().find(':input').each(function () {

        //set id to store the updated section number
        var newId = this.id + sectionsCount;

        //update for label
        $(this).prev().attr('for', newId);

        //update id
        this.id = newId;



    }).end()

    //inject index.html.twig section
        .appendTo('#' + idSections);

    //Séparateur de millier
    $('.millier').maskNumber({
        integer: true,
        thousands: ' '
    });

    $('.pourcentage').maskNumber({
        decimal: '.',
        thousands: ' '
    });
    return false;
}

//remove section
$('#' + idSections).on('click', '.' + classeBoutonSupprimer, function () {
    //fade out section
    $(this).parent().fadeOut(300, function () {
        //remove parent element (main section)
        $(this).parent().parent().parent().parent().parent().parent().empty().remove();
        return false;
    });
    return false;
});

//remove section
$('#' + idSections).on('change', '.myselect', function () {

    var type = $(this).find('option:selected').data('type');
    $(this).parent().parent().find('input').attr('type', type);
    // alert(type);
    // var value = $(this).val();


});

