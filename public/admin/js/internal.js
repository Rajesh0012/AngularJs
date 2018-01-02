$.validate({
    scrollToTopOnError: false
});

function setRemember() {
    var checkval = $('#rem_value').val();
    //var remember = $('#flowers').val();
    //alert(checkval);
    if (checkval) {
        if (checkval == 'off')
        {
            $('#rem_value').val('on');
            $('#flowers').attr('checked', true);

        }
        else
        {
            $('#rem_value').val('off');
            $('#flowers').attr('checked', false);
        }

    }
    else {
        $('#rem_value').val('on');
        $('#flowers').attr('checked', true);
    }
}

$('#match_type').click(function () {
    var mtype = $('input[name=tipslect]:checked').val();
    if (typeof mtype == "undefined") {
        $('#msid').html('Please select atleast one.');
        return false;
    }
    else {
        $('#msid').html('');

        if (mtype == 'Game') {
            window.location = siteurl + "/admin/games";
        }

        if (mtype == 'Featured Match') {
            window.location = siteurl + "/admin/featurematch";
        }
    }
    //alert(mtype); 
});

$('.select-filter').click(function () {
    var seltype = $('input[name=select_filter]:checked').val();
    if (typeof seltype == 'undefined') {

        $('#bid').css('display', 'none');
        $('#tid').css('display', 'none');
    }
    else {

        $('#bid').css('display', 'inline-block');
        $('#tid').css('display', 'inline-block');
    }

});

$('#bid').css('display', 'none');
$('#tid').css('display', 'none');

/*$('.lbl-check').click(function(){
 var chtype = $('input[name=filter]:checked').val();
 alert(chtype);
 });*/

tinymce.init({
    selector: "textarea",
    height: 300,
    plugins: [
        "advlist autolink autosave link image lists charmap print preview hr anchor pagebreak spellchecker",
        "searchreplace wordcount visualblocks visualchars code fullscreen insertdatetime media nonbreaking",
        "table contextmenu directionality emoticons template textcolor paste fullpage textcolor colorpicker textpattern"
    ],
    toolbar1: "newdocument fullpage | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | styleselect formatselect fontselect fontsizeselect",
    toolbar2: "cut copy paste | searchreplace | bullist numlist | outdent indent blockquote | undo redo | link unlink anchor image media code | insertdatetime preview | forecolor backcolor",
    // toolbar3: "table | hr removeformat | subscript superscript | charmap emoticons | print fullscreen | ltr rtl | spellchecker | visualchars visualblocks nonbreaking template pagebreak restoredraft",

    menubar: false,
    toolbar_items_size: 'small',
    style_formats: [{
            title: 'Bold text',
            inline: 'b'
        }, {
            title: 'Red text',
            inline: 'span',
            styles: {
                color: '#ff0000'
            }
        }, {
            title: 'Red header',
            block: 'h1',
            styles: {
                color: '#ff0000'
            }
        }, {
            title: 'Example 1',
            inline: 'span',
            classes: 'example1'
        }, {
            title: 'Example 2',
            inline: 'span',
            classes: 'example2'
        }, {
            title: 'Table styles'
        }, {
            title: 'Table row 1',
            selector: 'tr',
            classes: 'tablerow1'
        }],
    templates: [{
            title: 'Test template 1',
            content: 'Test 1'
        }, {
            title: 'Test template 2',
            content: 'Test 2'
        }],
    content_css: [
    ]
});

function Logout(){

    window.location = siteurl + "/admin/auth/logout";
}



$('#cms-doc').on('change', function () {
    var xVal = $(this).val();
    $('#upload-doc').val(xVal);
    // alert('ok');
});

function createTip(tour_id,event_id){
   window.location = siteurl + "/admin/tips/add_tips_feature_match?tid="+btoa(tour_id)+'&eid='+btoa(event_id);
}

$(function(){

    $('#flowers').click(function () {
        if (this.checked) {
            $('#showtrash').fadeIn('slow');
        } else {
            $('#showtrash').fadeOut('slow');
        }

    })



})


function Category(str) {

    $.ajax({
        
        type:'GET',
        url:siteurl +'/admin/Sports/getCategories',
        data:{id:str},

        success:function (data) {

            $('#category').html(data);
        },
        error:function (jqXHR,exception) {

            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'URL page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }

            alert(msg);
        }
        
        
    })

}

function getTournament(str) {


    $.ajax({

        type:'GET',
        url:siteurl + '/admin/Sports/getTournament',
        data:{id:str},

        success:function (data) {

            $('#tournament').html(data);
        },
        error:function (jqXHR,exception) {

            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'URL page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }

            alert(msg);
        }


    })

}



function getEvent() {

    var tournamentId= $('#tournament').find(":selected").val();

    $.ajax({

        type:'GET',
        url: siteurl + '/admin/Sports/getEvent',
        data:{id:tournamentId},

        success:function (data) {

            $('#eventhere').html(data);
        },
        error:function (jqXHR,exception) {

            var msg = '';
            if (jqXHR.status === 0) {
                msg = 'Not connect.\n Verify Network.';
            } else if (jqXHR.status == 404) {
                msg = 'URL page not found. [404]';
            } else if (jqXHR.status == 500) {
                msg = 'Internal Server Error [500].';
            } else if (exception === 'parsererror') {
                msg = 'Requested JSON parse failed.';
            } else if (exception === 'timeout') {
                msg = 'Time out error.';
            } else if (exception === 'abort') {
                msg = 'Ajax request aborted.';
            } else {
                msg = 'Uncaught Error.\n' + jqXHR.responseText;
            }

            alert(msg);
        }


    })

}

function resetsearch() {

    window.location.href=siteurl + "/admin/users/user_list";

}



