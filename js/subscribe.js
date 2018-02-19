/* Subscribe handler */

function flashBorder(times)
{
    $(".subscribe-input").css("border", "1px solid rgba(255, 0, 0, 0.5)");
    $(".subscribe-input-btn").css("border", "1px solid rgba(255, 0, 0, 0.5)");

    setTimeout(function(){
        $(".subscribe-input").css("border", "1px solid rgba(255, 255, 255, 0.5)");
        $(".subscribe-input-btn").css("border", "1px solid rgba(255, 255, 255, 0.5)");

        if(times>0){
            setTimeout(function(){
                flashBorder(times-1);
            }, 100);
        }
    }, 100);
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function CheckSubscribeEmail(elem){
    var email = $("#"+elem.id).val();

    if( validateEmail(email) )
    {
        $("#"+elem.id).css("border", "1px solid rgba(255, 255, 255, 0.5)");
        $("#"+elem.id+"-btn").css("border", "1px solid rgba(255, 255, 255, 0.5)");
    }
    else{
        $("#"+elem.id).css("border", "1px solid rgba(255, 0, 0, 0.5)");
        $("#"+elem.id+"-btn").css("border", "1px solid rgba(255, 0, 0, 0.5)");
    }
}

function SubscribeClick(elem, isInput=false){
    var email = "";

    if(isInput) email = $(elem).val();
    else email = $(elem).prev().val();

    if(!validateEmail(email))
    {
        return false;
    }

    $.post("subscribe.php",
    {
        email: email
    },
    function(data){
        var result = JSON.parse(data);
        var status = result["status"];
        var msg = result["msg"];

        swal({
            title: "",
            text: msg,
            timer: 3000,
            showConfirmButton: true,
            type: status,
            confirmButtonText: "Close",
        });

    });
}

$('.subscribe-input').keypress(function(e) {
    if(e.which == 13) {
        SubscribeClick(this, true);
        return false;
    }
});

$('.subscribe-input').on('input', function() {
    CheckSubscribeEmail(this);
});

$(".subscribe-input-btn").click(function(){
    SubscribeClick(this);
});

/* End subscribe handler */